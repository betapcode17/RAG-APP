from fastapi import APIRouter, Depends, HTTPException, UploadFile, File  
from sqlalchemy.orm import Session
from typing import List

from core.database import get_db
from models import Document, KnowledgeBase 
from schemas.document import DocumentCreate, DocumentResponse  

router = APIRouter(prefix="/document-uploads", tags=["Document Uploads"]) 

@router.post("/", response_model=DocumentResponse) 
def create_upload(
    file: UploadFile = File(...), 
    db: Session = Depends(get_db),
    user_id: int = 1  # Demo
):
    # Kiểm tra KB thuộc user
    kb = db.query(KnowledgeBase).filter(
        KnowledgeBase.id == file.filename, 
        KnowledgeBase.user_id == user_id
    ).first()
    if not kb:
        raise HTTPException(status_code=404, detail="Knowledge Base not found")
    
   
    file_path = f"/uploads/{file.filename}"  
    file_hash = "dummy_hash" 
    file_size = len( file.read()) 
    file.seek(0) 
    
    doc_payload = DocumentCreate(
        knowledge_base_id=kb.id,
        file_name=file.filename,
        file_path=file_path,
        file_hash=file_hash,
        file_size=file_size,
        content_type=file.content_type
    )
    
    doc = Document(**doc_payload.model_dump())
    db.add(doc)
    db.commit()
    db.refresh(doc)
    return doc

@router.get("/", response_model=List[DocumentResponse])
def list_uploads(
    db: Session = Depends(get_db),
    user_id: int = 1  # Demo
):
   
    return db.query(Document).join(KnowledgeBase).filter(KnowledgeBase.user_id == user_id).order_by(Document.created_at.desc()).all()