import chromadb


client = chromadb.PersistentClient(path="./chroma") 
async def get_collection():
    """Lấy hoặc tạo collection (hỗ trợ cosine similarity)."""
    collection = client.get_or_create_collection(
        name="document",
        metadata={"hnsw:space": "cosine"} 
    )
    return collection