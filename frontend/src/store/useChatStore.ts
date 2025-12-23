// chatStore
import { create } from "zustand";
import type { chatState } from "../types/store";

export const useChatStore = create<chatState>((set) => ({
  message: [],
  isTyping: false,
  addUserMessage: (text: string) =>
    set((state) => ({
      message: [
        ...state.message,
        { id: Date.now().toString(), role: "user", content: text },
      ],
    })),
  addAssistantMessage: (text: string) =>
    set((state) => ({
      message: [
        ...state.message,
        { id: Date.now().toString(), role: "assistant", content: text },
      ],
    })),
  updateAssistantMessage: (id: string, text: string) =>
    set((state) => ({
      message: state.message.map((msg) =>
        msg.id === id ? { ...msg, content: text } : msg
      ),
    })),
  clearChat: () => set({ message: [], isTyping: false }),
  setTyping: (v: boolean) => set({ isTyping: v }),
}));
