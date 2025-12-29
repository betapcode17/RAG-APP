from llm.embedding import embed
from vector.chroma import get_collection


async def retrieve_context(
    question: str,
    knowledge_base_id: int,
    k: int = 3
):
    try:
        # 1️ Embed câu hỏi
        q_embedding = await embed(question)

        # 2️ Lấy collection
        collection = await get_collection()

        # 3️ Query với filter knowledge_base_id
        results = collection.query(
            query_embeddings=[q_embedding],
            n_results=k,
            where={"knowledge_base_id": knowledge_base_id},
            include=["documents", "metadatas", "distances"]
        )

        # 4️ Lấy text
        documents = results.get("documents", [])
        if not documents or not documents[0]:
            return ""

        context = "\n".join(documents[0])

        # debug
        distances = results.get("distances", [[]])
        print(f" KB {knowledge_base_id} | distances:", distances[0])

        return context

    except Exception as error:
        print(f" Lỗi retrieve_context: {error}")
        return ""
