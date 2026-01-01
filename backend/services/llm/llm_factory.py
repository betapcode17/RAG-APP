from typing import Optional
from langchain_core.language_models import BaseChatModel
from langchain_openai import ChatOpenAI
from langchain_ollama import OllamaLLM
from core.config import settings


class LLMFactory:
    @staticmethod
    def create(
        provider: Optional[str] = None,
        temperature: float = 0,
        streaming: bool = True,
    ) -> BaseChatModel:
        """
        Create a LLM instance based on the provider
        """
        provider = (provider or settings.CHAT_PROVIDER).lower()

        if provider == "openai":
            return ChatOpenAI(
                temperature=temperature,
                streaming=streaming,
                model=settings.OPENAI_MODEL,
                openai_api_key=settings.OPENAI_API_KEY,
                openai_api_base=settings.OPENAI_API_BASE,
            )

       
        elif provider == "ollama":
            return OllamaLLM(
                model=settings.OLLAMA_MODEL,
                base_url=settings.OLLAMA_API_BASE,
                temperature=temperature,
                streaming=streaming,
            )

        elif provider == "gemini":
            from langchain_google_genai import ChatGoogleGenerativeAI

            return ChatGoogleGenerativeAI(
                model=settings.GEMINI_CHAT_MODEL,
                google_api_key=settings.GEMINI_API_KEY,
                temperature=temperature,
                streaming=streaming,
            )

        else:
            raise ValueError(f"Unsupported LLM provider: {provider}")
