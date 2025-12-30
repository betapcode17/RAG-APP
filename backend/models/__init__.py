# backend/models/__init__.py
# Import models theo ERD đơn giản (không có DocumentUpload, ProcessingTask, chat_knowledge_bases)

from .user import User
from .chat import Chat
from .knowledge_base import KnowledgeBase
from .message import Message
from .document import Document

# Export
__all__ = [
    "User", "Chat", "KnowledgeBase", "Message", "Document"
]