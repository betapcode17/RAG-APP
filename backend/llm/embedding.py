import os
import asyncio
from dotenv import load_dotenv
import logging
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from core import config  
from services.embedding.embedding_factory import EmbeddingsFactory


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


load_dotenv()

EMBEDDING_DIM = 768

embeddings_model = EmbeddingsFactory.create()


async def embed(text: str) -> list[float]:
    if not text or not text.strip():
        raise ValueError("Input text cannot be empty")
    
    try:
       embedding = await asyncio.to_thread(
            embeddings_model.embed_query,  
            text
        )
       
       actual_dim = len(embedding)
       logger.info(f"Generated embedding with {actual_dim} dimensions for text length {len(text)}")  

       if actual_dim != EMBEDDING_DIM:
            raise ValueError(
                f"Embedding dim mismatch: {actual_dim} != {EMBEDDING_DIM} "
            )

       return embedding

    except Exception as e:
        logger.error(f"Gemini embedding failed for text '{text[:50]}...': {str(e)}")  
        raise RuntimeError(f"Gemini embedding failed: {str(e)}")