import os
import uuid
from utils.file_reader import read_file_content
from utils.semantic_chunk import semantic_chunk_text
from llm.embedding import embed
from vector.chroma import get_collection


async def ingest_document(
    *,
    file_path: str,
    user_id: int,
    knowledge_base_id: int,
    document_id: int,
):

    if not os.path.exists(file_path):
        raise FileNotFoundError(f"File not found: {file_path}")

    text = read_file_content(file_path)

    if not text or not text.strip():
        raise ValueError("Document is empty or unreadable")

    chunks = semantic_chunk_text(
        text=text,
        max_length=800,
        min_length=200,
    )

    if not chunks:
        raise ValueError("Chunking failed – no chunks generated")

    collection = await get_collection()

    collection.delete(
        where={
            "$and": [
                {"document_id": document_id},
                {"knowledge_base_id": knowledge_base_id},
                {"user_id": user_id},
            ]
        }
    )

    ids = []
    metadatas = []
    embeddings = []

    for idx, chunk in enumerate(chunks):
        ids.append(f"{document_id}_{idx}_{uuid.uuid4().hex}")

        metadatas.append({
            "user_id": user_id,
            "knowledge_base_id": knowledge_base_id,
            "document_id": document_id,
            "chunk_index": idx,
            "source": os.path.basename(file_path),
        })

        embedding = await embed(chunk)
        embeddings.append(embedding)

    collection.add(
        ids=ids,
        documents=chunks,
        embeddings=embeddings,
        metadatas=metadatas,
    )

    print("Total vectors:", collection.count())
    
  
    test_embedding = await embed("test") 
    results = collection.query(
        query_embeddings=[test_embedding], 
        n_results=1
    )

    print(results)

    return {
        "status": "success",
        "document_id": document_id,
        "chunks": len(chunks),
        "collection_count": collection.count(),
    }