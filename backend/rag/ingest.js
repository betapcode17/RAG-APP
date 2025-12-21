import fs from "fs";
import { chunkText } from "../utils/chunk.js";
import { embed } from "../llm/embedding.js";
import { vectorStore } from "../vector/store.js";

export async function ingest() {
  try {
    if (!fs.existsSync("data/docs.txt")) {
      throw new Error("File data/docs.txt không tồn tại!");
    }
    const text = fs.readFileSync("data/docs.txt", "utf8");
    const chunks = chunkText(text);

    if (chunks.length === 0) {
      throw new Error("Không tạo được chunks từ docs.txt!");
    }

    for (const chunk of chunks) {
      const embedding = await embed(chunk);
      vectorStore.push({ text: chunk, embedding });
    }

    console.log("✅ Ingest hoàn tất:", vectorStore.length, "chunks");
  } catch (error) {
    console.error("❌ Lỗi ingest:", error.message);
  }
}
