# backend/routers/knowledge_bases.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from core.database import get_db
from models import KnowledgeBase  # Từ models/__init__.py (đã sửa trước)
from schemas import KnowledgeBaseCreate, KnowledgeBaseResponse  # SỬA: Batch import từ __init__.py

router = APIRouter(prefix="/knowledge-bases", tags=["Knowledge Bases"])

@router.post("/", response_model=KnowledgeBaseResponse)
def create_kb(
    payload: KnowledgeBaseCreate,
    db: Session = Depends(get_db),
    user_id: int = 1 
):
    kb = KnowledgeBase(
        name=payload.name,
        description=payload.description,
        user_id=user_id
    )
    db.add(kb)
    db.commit()
    db.refresh(kb)
    return kb

@router.get("/", response_model=List[KnowledgeBaseResponse])
def list_kb(
    db: Session = Depends(get_db),
    user_id: int = 1  # Demo
):
    return db.query(KnowledgeBase).filter(KnowledgeBase.user_id == user_id).all()  # Filter user