import hashlib
import os
import shutil
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File  
from sqlalchemy.orm import Session
from typing import List

from rag.ingest import ingest_document
from vector.chroma import get_collection
from core.database import get_db
from models import Document, KnowledgeBase 
from schemas.document import DocumentCreate, DocumentResponse  

router = APIRouter(prefix="/document", tags=["Document"]) 


UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/", response_model=DocumentResponse) 
async def create_document(
    knowledge_base_id : int,
    file: UploadFile = File(...), 
    db: Session = Depends(get_db),
    user_id: int = 1  # Demo
):
    # Kiểm tra KB thuộc user
    kb = db.query(KnowledgeBase).filter(
        KnowledgeBase.id == knowledge_base_id,
        KnowledgeBase.user_id == user_id
    ).first()
    if not kb:
        raise HTTPException(status_code=404, detail="Knowledge Base not found")
    
   
    # Lưu file ra disk   
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)


    # Tính hash + size
    with open(file_path, "rb") as f:
        content = f.read()
        file_size = len(content)
        file_hash = hashlib.sha256(content).hexdigest()


    # 
    doc = Document(
        knowledge_base_id=knowledge_base_id,
        file_name=file.filename,
        file_path=file_path,
        file_hash=file_hash,
        file_size=file_size,
        content_type=file.content_type,
    )

    db.add(doc)
    db.commit()
    db.refresh(doc)

    # 5️ INGEST VECTOR 
    await ingest_document(
        file_path=doc.file_path,
        user_id=user_id,
        knowledge_base_id=knowledge_base_id,
        document_id=doc.id,
    )
    
    return doc

@router.get("/", response_model=List[DocumentResponse])
def list_uploads(
    db: Session = Depends(get_db),
    user_id: int = 1  # Demo
):
   
    return db.query(Document).join(KnowledgeBase).filter(KnowledgeBase.user_id == user_id).order_by(Document.created_at.desc()).all()

@router.delete("/documents/{document_id}")
def delete_document(
    document_id: int,
    db: Session = Depends(get_db),
    user_id: int = 1
):
    doc = db.query(Document).filter(
        Document.id == document_id,
        Document.user_id == user_id
    ).first()

    if not doc:
        raise HTTPException(404, "Document not found")

    # 1️ Xóa vector
    collection = get_collection()
    collection.delete(
        where={"document_id": document_id}
    )

    # 2️ Xóa DB record
    db.delete(doc)
    db.commit()

    return {"message": "Document & vectors deleted"}
