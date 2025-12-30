from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class DocumentCreate(BaseModel):
    knowledge_base_id: int
    file_name: str
    file_path: str
    file_hash: str
    file_size: int
    content_type: str

class DocumentResponse(BaseModel):
    id: int
    knowledge_base_id: int
    file_name: str
    file_path: Optional[str] = None
    file_hash: str
    file_size: int
    content_type: str
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True