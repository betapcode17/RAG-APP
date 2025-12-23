// chat
export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  isTyping?: boolean;
  createdAt?: number;
}

export interface ChatRequest {
  question: string;
}

export interface ChatResponse {
  answer: string;
}
