from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from typing import List


from llm.gemini import ask_gemini
from rag.prompt import build_prompt
from rag.retriever import retrieve_context
from core.database import get_db
from models import Chat, Message  ,Document
from schemas.chat import ChatCreate, ChatResponse, ChatAskRequest

router = APIRouter(prefix="/chats", tags=["Chats"]) 

# POST - CREATE CHAT
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




# GET - ALL CHAT
@router.get("/", response_model=List[ChatResponse])
def list_chats(
    db: Session = Depends(get_db),
    user_id: int = 1  # Demo
):
    return db.query(Chat).filter(Chat.user_id == user_id).all()  


# GET DETAIL CHAT
@router.get("/{chat_id}", response_model=ChatResponse)
def get_chat(
    chat_id: int,
    db: Session = Depends(get_db),
    user_id: int = 1  # Demo
):
    chat = (
        db.query(Chat)
        .filter(Chat.id == chat_id, Chat.user_id == user_id)
        .first()
    )

    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")

    return chat



@router.post("/{chat_id}/ask", response_model=dict)
async def ask_chat(
    chat_id: int,
    knowledge_base_id: int,
    document_id: int,
    payload: ChatAskRequest,
    db: Session = Depends(get_db),
    user_id: int = 1
):
    # 1️ Check chat
    chat = db.query(Chat).filter(
        Chat.id == chat_id,
        Chat.user_id == user_id
    ).first()

    if not chat:
        raise HTTPException(404, "Chat not found")

    # 2️ Check document thuộc knowledge base
    document = db.query(Document).filter(
        Document.id == document_id,
        Document.knowledge_base_id == knowledge_base_id
    ).first()

    if not document:
        raise HTTPException(404, "Document not found in this knowledge base")

    # 3️ Validate question
    question = payload.question.strip()
    if not question:
        raise HTTPException(400, "Question is required")

    # 4️ Lưu user message
    user_msg = Message(
        chat_id=chat.id,
        role="user",
        content=question
    )
    db.add(user_msg)
    db.commit()

    # 5️ Retrieve context (ASYNC)
    context = await retrieve_context(
        question=question,
        knowledge_base_id=knowledge_base_id,
        document_id=document.id
    )

    # 6️ Generate answer (ASYNC)
    if not context:
        answer = "Không tìm thấy thông tin liên quan trong tài liệu."
    else:
        prompt = build_prompt(context, question)
        answer = await ask_gemini(prompt)

    # 7️ Lưu assistant message
    assistant_msg = Message(
        chat_id=chat.id,
        role="assistant",
        content=answer
    )
    db.add(assistant_msg)
    db.commit()

    return {
        "question": question,
        "answer": answer,
        "document_id": document.id
    }