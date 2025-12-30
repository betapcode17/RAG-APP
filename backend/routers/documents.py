from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from core.database import get_db
from models import Document, KnowledgeBase
from schemas.document import DocumentCreate, DocumentResponse

router = APIRouter(prefix="/documents", tags=["Documents"])

@router.post("/", response_model=DocumentResponse)
def create_document(
    payload: DocumentCreate,
    db: Session = Depends(get_db),
    user_id: int = 1  # Demo
):
    # Kiểm tra KB thuộc user
    kb = db.query(KnowledgeBase).filter(KnowledgeBase.id == payload.knowledge_base_id, KnowledgeBase.user_id == user_id).first()
    if not kb:
        raise HTTPException(status_code=404, detail="Knowledge Base not found")
    
    doc = Document(**payload.model_dump())
    db.add(doc)
    db.commit()
    db.refresh(doc)
    return doc

@router.get("/", response_model=List[DocumentResponse])
def list_documents(
    db: Session = Depends(get_db),
    user_id: int = 1  # Demo
):
    # Filter qua KB của user
    return db.query(Document).join(KnowledgeBase).filter(KnowledgeBase.user_id == user_id).all()