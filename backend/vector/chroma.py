import chromadb
import asyncio  

COLLECTION_NAME = "document_gemini_768"  

client = chromadb.PersistentClient(path="./chroma")

async def get_collection():
  
    RESET_COLLECTION = False  

    if RESET_COLLECTION:
        try:
            client.delete_collection(name=COLLECTION_NAME)
            print(f"Đã xóa collection cũ: {COLLECTION_NAME}")
        except:
            print(f"Collection {COLLECTION_NAME} chưa tồn tại, bỏ qua.")
    else:
        print(f"Sử dụng collection hiện có: {COLLECTION_NAME}")
    
    return client.get_or_create_collection(
        name=COLLECTION_NAME,
        metadata={
            "hnsw:space": "cosine",
            "embedding_model": "gemini-text-embedding-004",
            "dimension": 768, 
        }
    )
