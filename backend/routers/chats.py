from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from typing import List


from llm.gemini import ask_gemini
from rag.prompt import build_prompt
from rag.retriever import retrieve_context
from core.database import get_db
from models import Chat, Message  
from schemas.chat import ChatCreate, ChatResponse, ChatAskRequest

router = APIRouter(prefix="/chats", tags=["Chats"]) 

@router.post("/", response_model=ChatResponse)
def create_chat(
    payload: ChatCreate,
    db: Session = Depends(get_db),
    user_id: int = 1  
):
    chat = Chat(title=payload.title, user_id=user_id)
    db.add(chat)
    db.commit()
    db.refresh(chat)
    return chat

@router.get("/", response_model=List[ChatResponse])
def list_chats(
    db: Session = Depends(get_db),
    user_id: int = 1  # Demo
):
    return db.query(Chat).filter(Chat.user_id == user_id).all()  

@router.get("/{chat_id}", response_model=ChatResponse)
def get_chat(
    chat_id: int,
    db: Session = Depends(get_db),
    user_id: int = 1  # Demo
):
    chat = db.query(Chat).filter(Chat.id == chat_id, Chat.user_id == user_id).first()
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    return chat

@router.post("/{chat_id}/ask", response_model=dict) 
def ask_chat(
    chat_id: int,
    payload: ChatAskRequest,
    db: Session = Depends(get_db),
    user_id: int = 1
):
    chat = db.query(Chat).options(joinedload(Chat.knowledge_bases)).filter(
        Chat.id == chat_id, Chat.user_id == user_id
    ).first()
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    
    question = payload.question.strip()
    if not question:
        raise HTTPException(status_code=400, detail="Question is required")
    
    # Lưu user message
    user_message = Message(chat_id=chat_id, role="user", content=question)
    db.add(user_message)
    db.commit()
    db.refresh(user_message)

    # Knowledge base IDs
    knowledge_base_ids = [payload.knowledge_base_id] if payload.knowledge_base_id else [kb.id for kb in chat.knowledge_bases]

    context = retrieve_context(question=question, knowledge_base_ids=knowledge_base_ids)
    answer = "Không tìm thấy thông tin liên quan trong tài liệu." if not context else ask_gemini(build_prompt(context, question))

    # Lưu assistant message
    assistant_message = Message(chat_id=chat_id, role="assistant", content=answer)
    db.add(assistant_message)
    db.commit()
    db.refresh(assistant_message)

    return {"question": question, "answer": answer}