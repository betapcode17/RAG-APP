from pydantic import BaseModel
from typing import List

class PreviewRequest(BaseModel):
    document_ids: List[int]
    chunk_size: int
    chunk_overlap: int