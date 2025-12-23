// chatStore
import { create } from "zustand";
import type { ChatMessage } from "../types/chat";

interface chatState {
  message: ChatMessage[];
  isTyping: boolean;
  addUserMessage: (text: string) => void;
  addAssistantMessage: (text: string) => void;
  clearChat: () => void;
}

export const useChatStore = create<chatState>((set) => ({
  message: [],
  isTyping: false,
  addUserMessage: (text: string) =>
    set((state) => ({
      message: [...state.message, { role: "user", text }],
    })),
  addAssistantMessage: (text: string) =>
    set((state) => ({
      message: [...state.message, { role: "assistant", text }],
    })),
  clearChat: () => set({ message: [], isTyping: false }),
}));
