from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ProcessingTaskBase(BaseModel):
    status: str  # pending | processing | done | failed
    error_message: Optional[str] = None


class ProcessingTaskCreate(ProcessingTaskBase):
    document_id: int
    knowledge_base_id: int


class ProcessingTaskResponse(ProcessingTaskBase):
    id: int
    document_id: int
    knowledge_base_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
