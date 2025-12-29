from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from core.database import get_db
from schemas.document import DocumentCreate, DocumentResponse
from models.document import Document

router = APIRouter(prefix="/documents", tags=["Documents"])


@router.post("/", response_model=DocumentResponse)
def create_document(
    payload: DocumentCreate,
    db: Session = Depends(get_db)
):
    doc = Document(**payload.model_dump())
    db.add(doc)
    db.commit()
    db.refresh(doc)
    return doc


@router.get("/", response_model=list[DocumentResponse])
def list_documents(db: Session = Depends(get_db)):
    return db.query(Document).all()
