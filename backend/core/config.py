from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    EMBEDDINGS_PROVIDER: str = "gemini"
    CHAT_PROVIDER: str = "gemini"
    # OpenAI
    OPENAI_API_KEY: str | None = None
    OPENAI_API_BASE: str | None = None
    OPENAI_EMBEDDINGS_MODEL: str | None = None

    # DashScope
    DASH_SCOPE_API_KEY: str | None = None
    DASH_SCOPE_EMBEDDINGS_MODEL: str | None = None

    # Ollama
    OLLAMA_API_BASE: str | None = None
    OLLAMA_EMBEDDINGS_MODEL: str | None = None

    # Gemini
    GEMINI_API_KEY: str | None = None
    GEMINI_EMBEDDINGS_MODEL: str | None = None
    GEMINI_CHAT_MODEL: str | None = None

    class Config:
        env_file = ".env"
        extra = "ignore"  


settings = Settings()