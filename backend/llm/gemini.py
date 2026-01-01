import asyncio
import os
import requests
from dotenv import load_dotenv
from typing import Optional
from services.llm.llm_factory import LLMFactory 
from core.config import settings
load_dotenv()


llm_model = LLMFactory.create(
    provider=None,  
    temperature=0.7,
    streaming=False 
)

async def ask_gemini(prompt: str, temperature: float = 0.7, max_output_tokens: int = 1024) -> str:
    """
    Async wrapper cho LLM generation (Gemini hoặc provider khác từ Factory).
    Wrap sync invoke bằng asyncio.to_thread để tránh blocking.
    """
    try:
       
        current_model = LLMFactory.create(
            temperature=temperature,
            streaming=False  
        )
        
        response = await asyncio.to_thread(
            current_model.invoke, 
            prompt
        )
        
        if hasattr(response, 'content') and response.content:
            text = response.content.strip()
        elif isinstance(response, str): 
            text = response.strip()
        else:
            raise ValueError("LLM response is empty or invalid")
        
        return text
    
    except Exception as e:
        raise RuntimeError(f"LLM generation failed: {str(e)}")

async def list_models(provider: Optional[str] = None) -> list[str]:
    """
    List available models cho provider cụ thể (mở rộng từ Gemini).
    """
    provider = (provider or settings.CHAT_PROVIDER).lower()  
    
    if provider == "gemini":
        try:
            api_key = os.getenv("GEMINI_API_KEY")
            response = requests.get(
                f"https://generativelanguage.googleapis.com/v1beta/models?key={api_key}"
            )
            if not response.ok:
                raise Exception(f"API error: {response.status_code} {response.reason}")
            data = response.json()
            gemini_models = [
                m["name"].replace("models/", "") for m in data["models"] if "gemini" in m["name"]
            ]
            print("Available Gemini models:", gemini_models)
            return gemini_models
        except Exception as error:
            print(f"Error listing Gemini models: {error}")
            return []
    
    elif provider == "ollama":
        try:
            ollama_url = settings.OLLAMA_API_BASE.rstrip('/') + "/api/tags"
            resp = requests.get(ollama_url)
            if resp.ok:
                data = resp.json()
                ollama_models = [m["name"] for m in data.get("models", [])]
                print("Available Ollama models:", ollama_models)
                return ollama_models
            else:
                raise Exception(f"Ollama API error: {resp.status_code}")
        except Exception as error:
            print(f"Error listing Ollama models: {error}")
            return []
    
   
    elif provider == "openai":
        
        print("OpenAI models: Use OpenAI dashboard for list.")
        return ["gpt-4o", "gpt-3.5-turbo"] 
    
    else:
        raise ValueError(f"Unsupported provider for listing models: {provider}")