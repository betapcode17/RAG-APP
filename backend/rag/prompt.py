def build_prompt(context, question):
    return f"""
Bạn là trợ lý AI.
Chỉ trả lời dựa trên thông tin sau:

{context}

Câu hỏi:
{question}
"""