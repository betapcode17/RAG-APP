import express from "express";
import { ingest } from "../rag/ingest.js";
import { retrieveContext } from "../rag/query.js";
import { askGemini } from "../llm/gemini.js";
import { buildPrompt } from "../rag/prompt.js";

const app = express();
app.use(express.json());

await ingest();

app.post("/chat", async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: "Cần cung cấp question" });
    }

    const context = await retrieveContext(question);
    if (!context) {
      return res.json({
        answer: "Không tìm thấy thông tin liên quan trong tài liệu.",
      });
    }

    const prompt = buildPrompt(context, question);

    const answer = await askGemini(prompt);
    res.json({ answer });
  } catch (error) {
    console.error("Lỗi /chat:", error);
    res.status(500).json({ error: "Lỗi server" });
  }
});

app.listen(3000, () =>
  console.log("🚀 Node-only RAG running on http://localhost:3000")
);
