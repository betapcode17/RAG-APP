from sqlalchemy import Column, Integer, ForeignKey, Table
from core.database import Base

chat_knowledge_bases = Table(
    "chat_knowledge_bases",
    Base.metadata,
    Column("chat_id", Integer, ForeignKey("chats.id"), primary_key=True),
    Column(
        "knowledge_base_id",
        Integer,
        ForeignKey("knowledge_bases.id"),
        primary_key=True,
    ),
)
