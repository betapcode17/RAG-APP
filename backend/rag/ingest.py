import os
from utils.chunk import chunk_text
from llm.embedding import embed  
from vector.chroma import get_collection

async def ingest():
    try:
        docs_path = "data/docs.txt"
        if not os.path.exists(docs_path):
            raise FileNotFoundError("File data/docs.txt không tồn tại!")
        
        with open(docs_path, "r", encoding="utf-8") as f:
            text = f.read()
        
        chunks = chunk_text(text)

        if not chunks:
            raise ValueError("Không tạo được chunks từ docs.txt!")

        collection = await get_collection()

        ids = [f"chunk_{i}" for i in range(len(chunks))]
        documents = chunks
        embeddings = []
        metadatas = [{"source": "docs.txt", "chunk_id": i} for i in range(len(chunks))]

        print(f"🔄 Đang embed {len(chunks)} chunks...") 

       
        for i, chunk in enumerate(chunks):
            try:
                embedding = await embed(chunk)
                embeddings.append(embedding)
                print(f"✅ Embed chunk {i+1}/{len(chunks)}")
            except Exception as e:
                print(f"❌ Lỗi embed chunk {i+1}: {e}")
                raise  #

       
        collection.add(
            embeddings=embeddings,
            documents=documents,
            metadatas=metadatas,
            ids=ids
        )

        count = collection.count()
        print(f"✅ Ingest hoàn tất: {count} chunks vào ChromaDB")
    except Exception as error:
        print(f"❌ Lỗi ingest: {error}")
        raise 