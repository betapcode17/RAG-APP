from llm.embedding import embed
from vector.chroma import get_collection

async def retrieve_context(
    question: str,
    knowledge_base_id: int,
    document_id: int,
    k: int = 3
):
    try:
        q_embedding = await embed(question)
        collection = await get_collection()

        results = collection.query(
            query_embeddings=[q_embedding],
            n_results=k,
            where={
                "$and": [
                    {"knowledge_base_id": {"$eq": knowledge_base_id}},
                    {"document_id": {"$eq": document_id}}
                ]
            },
            include=["documents", "metadatas", "distances"]
        )

        documents = results.get("documents", [[]])[0]
        if not documents:
            return ""

        return "\n".join(documents)

    except Exception as e:
        print(f" retrieve_context error: {e}")
        return ""
