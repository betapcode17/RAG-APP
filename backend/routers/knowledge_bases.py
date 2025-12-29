from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from core.database import get_db
from schemas.knowledge_base import (
    KnowledgeBaseCreate,
    KnowledgeBaseResponse
)
from models.knowledge_base import KnowledgeBase

router = APIRouter(prefix="/knowledge-bases", tags=["Knowledge Bases"])


@router.post("/", response_model=KnowledgeBaseResponse)
def create_kb(
    payload: KnowledgeBaseCreate,
    db: Session = Depends(get_db),
    user_id: int = 1  # demo
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


@router.get("/", response_model=list[KnowledgeBaseResponse])
def list_kb(db: Session = Depends(get_db)):
    return db.query(KnowledgeBase).all()
