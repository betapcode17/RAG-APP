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

  renameChatLocal: (id: number, title: string) => void;
  deleteChatLocal: (id: number) => void;
  updateChatTitle: (chatId: number, title: string) => void;
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
  renameChatLocal: (id, title) =>
    set((s) => ({
      chats: s.chats.map((c) => (c.id === id ? { ...c, title } : c)),
    })),

  deleteChatLocal: (id) =>
    set((s) => ({
      chats: s.chats.filter((c) => c.id !== id),
      activeChatId: s.activeChatId === id ? null : s.activeChatId,
    })),

  updateChatTitle: (chatId: number, title: string) =>
    set((state) => ({
      chats: state.chats.map((c) => (c.id === chatId ? { ...c, title } : c)),
    })),
}));
