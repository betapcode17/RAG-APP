import os
import asyncio
import google.generativeai as genai
from dotenv import load_dotenv
import logging  # Thêm để log

# Setup logging (optional, để debug)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load env
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise RuntimeError("Missing GEMINI_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)

EMBEDDING_MODEL = "models/text-embedding-004"
EMBEDDING_DIM = 768


async def embed(text: str) -> list[float]:
    if not text or not text.strip():
        raise ValueError("Input text cannot be empty")
    
    try:
        result = await asyncio.to_thread(
            genai.embed_content,
            model=EMBEDDING_MODEL,
            content=text,
            task_type="retrieval_document",
          
        )

        embedding = result["embedding"]

        actual_dim = len(embedding)
        logger.info(f"Generated embedding with {actual_dim} dimensions for text length {len(text)}")  

        if actual_dim != EMBEDDING_DIM:
            raise ValueError(
                f"Embedding dim mismatch: {actual_dim} != {EMBEDDING_DIM} (expected from {EMBEDDING_MODEL})"
            )

        return embedding

    except Exception as e:
        logger.error(f"Gemini embedding failed for text '{text[:50]}...': {str(e)}")  
        raise RuntimeError(f"Gemini embedding failed: {str(e)}")