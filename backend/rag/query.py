from llm.embedding import embed
from vector.chroma import get_collection 
from utils.similarity import cosine_similarity  

async def retrieve_context(question, k=3):
    try:
        q_embedding = await embed(question)
        collection = await get_collection()

       
        results = collection.query(
            query_embeddings=[q_embedding],
            n_results=k,
            include=["documents", "metadatas", "distances"]  
        )

       
        top_texts = results["documents"][0] if results["documents"] else []
        if not top_texts:
            return ""

      
        context = "\n".join(top_texts)
        print(f"Top scores (distances): {results['distances'][0]}")  # Log để debug
        return context
    except Exception as error:
        print(f"❌ Lỗi retrieve: {error}")
        return ""