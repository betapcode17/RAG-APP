import { vectorStore } from "../vector/store.js";
import { embed } from "../llm/embedding.js";
import { cosineSimilarity } from "../utils/similarity.js";

export async function retrieveContext(question, k = 3) {
  const qEmbedding = await embed(question);

  const scored = vectorStore.map((item) => ({
    text: item.text,
    score: cosineSimilarity(qEmbedding, item.embedding),
  }));

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map((x) => x.text)
    .join("\n");
}
