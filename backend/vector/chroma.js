import { ChromaClient } from "chromadb";

export const client = new ChromaClient();

export async function getCollection() {
  return await client.getOrCreateCollection({ name: "document" });
}
