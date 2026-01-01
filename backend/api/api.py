from fastapi import APIRouter
from routers import (
    users,
    knowledge_bases,
    documents,
    chats,
    messages
)

api_router = APIRouter()
api_router.include_router(users.router)
api_router.include_router(knowledge_bases.router)
api_router.include_router(documents.router)
api_router.include_router(chats.router)
api_router.include_router(messages.router)