
from langchain_openai import OpenAIEmbeddings
from langchain_ollama import OllamaEmbeddings
from langchain_community.embeddings import DashScopeEmbeddings
from langchain_google_genai import GoogleGenerativeAIEmbeddings

from core.config import settings


class EmbeddingsFactory:
    @staticmethod
    def create():
        embeddings_provider = settings.EMBEDDINGS_PROVIDER.lower()

        if embeddings_provider == "openai":
            return OpenAIEmbeddings(
                openai_api_key=settings.OPENAI_API_KEY,
                openai_api_base=settings.OPENAI_API_BASE,
                model=settings.OPENAI_EMBEDDINGS_MODEL
            )

        elif embeddings_provider == "dashscope":
            return DashScopeEmbeddings(
                model=settings.DASH_SCOPE_EMBEDDINGS_MODEL,
                dashscope_api_key=settings.DASH_SCOPE_API_KEY
            )

        elif embeddings_provider == "ollama":
            return OllamaEmbeddings(
                model=settings.OLLAMA_EMBEDDINGS_MODEL,
                base_url=settings.OLLAMA_API_BASE
            )

        elif embeddings_provider == "gemini":
            return GoogleGenerativeAIEmbeddings(
                model=settings.GEMINI_EMBEDDINGS_MODEL,
                google_api_key=settings.GEMINI_API_KEY
            )

        else:
            raise ValueError(f"Unsupported embeddings provider: {embeddings_provider}")
