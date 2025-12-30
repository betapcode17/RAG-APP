from fastapi import APIRouter
from schemas.rag import PreviewRequest

router = APIRouter(prefix="/rag", tags=["RAG"])

@router.post("/preview", response_model=dict)  
def preview_chunks(payload: PreviewRequest):
    return {
        "document_ids": payload.document_ids,
        "chunk_size": payload.chunk_size,
        "chunk_overlap": payload.chunk_overlap,
        "preview": "demo"
    }