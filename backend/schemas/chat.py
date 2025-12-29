# chat
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from message import MessageResponse



class ChatBase(BaseModel) : 
    title : str

class ChatCreate(ChatBase) :
    knowledge_base_ids : List[int] = None

class ChatUpdate(ChatBase) :
    knowledge_base_ids : Optional[List[int]] = None

class ChatResponse(ChatBase) :
    id : int
    user_id : int
    create_at : datetime
    update_at : datetime
    message : List[MessageResponse] = []
    knowledge_base_ids : List[int] = []

    class config : 
        from_attributes = True

class ChatAskRequest(BaseModel):
    question: str
    knowledge_base_id: Optional[int] = None
