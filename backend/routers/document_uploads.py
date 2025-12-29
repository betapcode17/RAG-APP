from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from core.database import get_db
from schemas.document_upload import (
    DocumentUploadCreate,
    DocumentUploadResponse
)
from models.document_upload import DocumentUpload

router = APIRouter(prefix="/document-uploads", tags=["Document Uploads"])


@router.post("/", response_model=DocumentUploadResponse)
def create_upload(
    payload: DocumentUploadCreate,
    db: Session = Depends(get_db)
):
    upload = DocumentUpload(**payload.model_dump())
    db.add(upload)
    db.commit()
    db.refresh(upload)
    return upload


@router.get("/", response_model=list[DocumentUploadResponse])
def list_uploads(db: Session = Depends(get_db)):
    return db.query(DocumentUpload).order_by(
        DocumentUpload.created_at.desc()
    ).all()
