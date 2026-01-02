from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

from schemas.message import MessageResponse

class ChatCreate(BaseModel):
    title: str

class ChatResponse(BaseModel):
    id: int
    title: str
    user_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    messages: List[MessageResponse] = []

    class Config:
        from_attributes = True 

class ChatAskRequest(BaseModel):
    question: str
