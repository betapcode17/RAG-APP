from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class DocumentUploadCreate(BaseModel):
    knowledge_base_id: int
    file_name: str
    file_hash: str
    file_size: int
    content_type: str
    temp_path: str
    status: str = "pending"
    error_message: Optional[str] = None

class DocumentUploadResponse(BaseModel):
    id: int
    knowledge_base_id: int
    file_name: str
    file_hash: str
    file_size: int
    content_type: str
    temp_path: Optional[str] = None
    status: str
    error_message: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True