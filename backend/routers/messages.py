from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from core.database import get_db
from models import Chat, Message
from schemas.message import MessageCreate, MessageResponse

router = APIRouter(prefix="/chats", tags=["Messages"])

@router.post("/{chat_id}/messages", response_model=MessageResponse)
def create_message(
    chat_id: int,
    payload: MessageCreate,
    db: Session = Depends(get_db),
    user_id: int = 1  # Demo
):
    chat = db.query(Chat).filter(Chat.id == chat_id, Chat.user_id == user_id).first()
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")

    message = Message(chat_id=chat_id, role=payload.role, content=payload.content)
    db.add(message)
    db.commit()
    db.refresh(message)
    return message