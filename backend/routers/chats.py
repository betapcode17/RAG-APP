

from mailbox import Message
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload

from backend.llm.gemini import ask_gemini
from backend.models.user import User
from backend.rag.prompt import build_prompt
from backend.rag.retriever import retrieve_context
from backend.schemas.chat import ChatAskRequest, ChatResponse, ChatCreate
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



# 
@router.post("/{chat_id}/ask")
def ask_chat(
    chat_id: int,
    payload: ChatAskRequest,
    db: Session = Depends(get_db),
    user_id: int = 1
):
    # 1 check chat
    chat = (
        db.query(Chat)
        .options(joinedload(Chat.knowledge_bases))
        .filter(
            Chat.id == chat_id,
            Chat.user_id == user_id
        )
        .first()
    )

    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    
    question = payload.question.strip()
    if not question:
        raise HTTPException(status_code=400, detail="Question is required")
    
    # 2 Luu message user
    user_message = Message(
        chat_id=chat_id,
        role="user",
        content=question
    )
    db.add(user_message)
    db.commit()
    db.refresh(user_message)


    # 3 Lấy knowledge_base_ids
    if payload.knowledge_base_id:
        knowledge_base_ids = [payload.knowledge_base_id]
    else:
        # fallback (nếu bạn muốn)
        knowledge_base_ids = [kb.id for kb in chat.knowledge_bases]

    context =  retrieve_context(
        question=question,
        knowledge_base_ids=knowledge_base_ids
    )

    if not context:
        answer = "Không tìm thấy thông tin liên quan trong tài liệu."
    else:
        # 5️ Build prompt + hỏi LLM
        prompt = build_prompt(context, question)
        answer = ask_gemini(prompt)

    # 6️ Lưu message assistant
    assistant_message = Message(
        chat_id=chat_id,
        role="assistant",
        content=answer
    )
    db.add(assistant_message)
    db.commit()
    db.refresh(assistant_message)

    # 7️ Trả kết quả
    return {
        "question": question,
        "answer": answer
    }
# DELETE/{chat_id}