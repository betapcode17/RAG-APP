from fastapi import APIRouter
from routers import (
    users,
    knowledge_bases,
    document_uploads,
    documents,
    chats,
    messages,
    rag
)

api_router = APIRouter()
api_router.include_router(users.router)
api_router.include_router(knowledge_bases.router)
api_router.include_router(document_uploads.router)
api_router.include_router(documents.router)
api_router.include_router(chats.router)
api_router.include_router(messages.router)
api_router.include_router(rag.router)
