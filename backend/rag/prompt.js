// rag/prompt.js
export function buildPrompt(context, question) {
  return `
Bạn là trợ lý AI.
Chỉ trả lời dựa trên thông tin sau:

${context}

Câu hỏi:
${question}
`;
}
