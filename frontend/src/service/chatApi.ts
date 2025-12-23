import type { ChatRequest, ChatResponse } from "../types/chat";

export async function sendChat(message: string): Promise<ChatResponse> {
  const res = await fetch("http://localhost:3000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message } as ChatRequest),
  });

  return res.json();
}
