

from fastapi import APIRouter, Depends, HTTPException
from requests import Session

from backend.models.user import User
from backend.schemas.chat import ChatResponse, ChatCreate
from core.database import get_db
from backend.models.chat import Chat


router  = APIRouter()

# POST
@router.post("/", response_model=ChatResponse)
def create_chat(
    payload: ChatCreate,
    db: Session = Depends(get_db),
    user_id: int = 1
):
    chat = Chat(
        title=payload.title,
        user_id=user_id
    )
    db.add(chat)
    db.commit()
    db.refresh(chat)
    return chat
# GET
@router.get("/", response_model=list[ChatResponse])
def list_chats(db : Session = Depends(get_db)):
    return db.query(Chat).all()

# GET/{chat_id}
@router.get("/{chat_id}",response_model=ChatResponse)
def get_chat(
    chat_id : int,
    user_id: int,
    db: Session = Depends(get_db),
  
):
    chat = db.query(Chat).filter(
        chat.id == chat_id,
        chat.user_id == user_id
    ).first()

    if not chat:
        raise HTTPException(
            status_code=404,
            detail="Chat not found"
        )
    return chat

# POST/{chat_id}/message


# DELETE/{chat_id}