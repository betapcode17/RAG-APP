import google.generativeai as genai
from dotenv import load_dotenv
import os
import requests

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

async def ask_gemini(prompt):
    model = genai.GenerativeModel("gemini-2.5-flash") 
    response = await model.generate_content(prompt)
    return response.text


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