from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import asyncio

from rag.ingest import ingest
from rag.query import retrieve_context
from llm.gemini import ask_gemini
from rag.prompt import build_prompt
from api.api import api_router
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


# class ChatRequest(BaseModel):
#     question: str


# @app.on_event("startup")
# async def startup_event():
#     await ingest()

# @app.post("/chat")
# async def chat(request: ChatRequest):
#     try:
#         question = request.question
#         if not question:
#             raise HTTPException(status_code=400, detail="Cần cung cấp question")

#         context = await retrieve_context(question)

#         if not context:
#             return {"answer": "Không tìm thấy thông tin liên quan trong tài liệu."}

#         prompt = build_prompt(context, question)
#         answer = await ask_gemini(prompt)

#         return {"answer": answer}
#     except Exception as error:
#         print(f"Lỗi /chat: {error}")
#         raise HTTPException(status_code=500, detail="Lỗi server")


app.include_router(api_router)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 