from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from typing import List

from core.database import get_db
from models import  Message  
from schemas.message import MessageResponse

router = APIRouter(prefix="/message", tags=["Message"]) 


# GET - ALL Message BY CHAT ID
@router.get("/", response_model=List[MessageResponse])
def list_messages_by_chat_id(
    chat_id : int,
    db: Session = Depends(get_db),
    user_id: int = 1  # Demo
):
    return db.query(Message).filter(Message.chat_id == chat_id).all()  

