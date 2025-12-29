
import google.generativeai as genai
from dotenv import load_dotenv
import os
import asyncio  


load_dotenv()


gemini_api_key = os.getenv("GEMINI_API_KEY")
if not gemini_api_key:
    raise ValueError(" Thiếu GEMINI_API_KEY trong file .env!")


genai.configure(api_key=gemini_api_key)

async def embed(text):
    """
    Tạo embedding vector cho text bằng Gemini (async wrapper cho sync SDK).
    - Model: text-embedding-004 (stable, 768 dims, tốt cho RAG).
    - Input: text (str).
    - Output: list[float] (embedding vector).
    """
    try:
    
        result = await asyncio.to_thread(
            genai.embed_content,
            model="models/text-embedding-004",
            content=text,
            task_type="retrieval_document" 
        )
        return result['embedding'] 
    except Exception as e:
        print(f" Lỗi embedding: {e}")
        raise ValueError(f"Không thể embed text: {text[:50]}...")  