// store/useChatStore.ts
import { create } from "zustand";
import type { UIMessage } from "../types/ui-message";
import type { Chat } from "../types/chat";

interface ChatState {
  messages: UIMessage[];
  isTyping: boolean;

  chats: Chat[];
  activeChatId: number | null;

  addMessage: (msg: UIMessage) => void;
  setTyping: (value: boolean) => void;
  resetMessages: () => void;

  setChats: (chats: Chat[]) => void;
  addChat: (chat: Chat) => void;
  setActiveChat: (id: number | null) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isTyping: false,

  chats: [],
  activeChatId: null,

  addMessage: (msg) =>
    set((state) => ({
      messages: [...state.messages, msg],
    })),

  setTyping: (value) => set({ isTyping: value }),

  resetMessages: () => set({ messages: [], isTyping: false }),

  setChats: (chats) => set({ chats }),

  addChat: (chat) =>
    set((state) => ({
      chats: [chat, ...state.chats],
    })),

  setActiveChat: (id) =>
    set({
      activeChatId: id,
      messages: [],
      isTyping: false,
    }),
}));
