import asyncio
import google.generativeai as genai
from dotenv import load_dotenv
import os
import requests

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))


MODEL_NAME = "gemini-2.5-flash"



async def ask_gemini(prompt: str, temperature: float = 0.7, max_output_tokens: int = 1024) -> str:
    """
    Async wrapper cho Gemini generate_content.
    Wrap sync call bằng asyncio.to_thread để tránh blocking.
    """
    try:
      
        model = genai.GenerativeModel(MODEL_NAME)
        
   
        response = await asyncio.to_thread(
            model.generate_content,
            prompt,
            generation_config={
                "temperature": temperature,
                "max_output_tokens": max_output_tokens,
            }
        )
        
        
        if response.text:
            return response.text.strip()
        else:
            raise ValueError("Gemini response is empty")
    
    except Exception as e:
        raise RuntimeError(f"Gemini generation failed: {str(e)}")

async def list_models():
    try:
        api_key = os.getenv("GEMINI_API_KEY")
        response = requests.get(
            f"https://generativelanguage.googleapis.com/v1beta/models?key={api_key}"
        )
        if not response.ok:
            raise Exception(f"API error: {response.status} {response.status_text}")
        data = response.json()
        gemini_models = [
            m["name"].replace("models/", "") for m in data["models"] if "gemini" in m["name"]
        ]
        print("Available Gemini models:", gemini_models)
        return gemini_models
    except Exception as error:
        print(f"Error listing models: {error}")
        return []