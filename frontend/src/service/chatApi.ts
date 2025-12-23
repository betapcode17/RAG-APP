import type { ChatRequest, ChatResponse } from "../types/chat";

export async function sendChat(question: string): Promise<ChatResponse> {
  const res = await fetch("http://localhost:3000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question } as ChatRequest),
  });

  if (!res.ok) {
    throw new Error("Chat API failed");
  }

  return res.json();
}
