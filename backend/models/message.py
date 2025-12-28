
from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel

class MessageBase(BaseModel):
    content: str
    role : str

class MessageCreate(MessageBase):
    chat_id : int

class MessageResponse(MessageBase):
    id : int
    chat_id : int
    create_at: datetime
    update_at : datetime

    class config : 
        from_attributes = True