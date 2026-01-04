import { create } from "zustand";

interface ChatItemState {
  openMenuChatId: number | null;
  editingChatId: number | null;
  editingTitle: string;

  openMenu: (chatId: number) => void;
  closeMenu: () => void;

  startEditing: (chatId: number, title: string) => void;
  setEditingTitle: (title: string) => void;
  stopEditing: () => void;
}

export const useChatItemStore = create<ChatItemState>((set) => ({
  openMenuChatId: null,
  editingChatId: null,
  editingTitle: "",

  openMenu: (chatId) => set({ openMenuChatId: chatId }),
  closeMenu: () => set({ openMenuChatId: null }),

  startEditing: (chatId, title) =>
    set({
      editingChatId: chatId,
      editingTitle: title,
      openMenuChatId: null,
    }),

  setEditingTitle: (title) => set({ editingTitle: title }),

  stopEditing: () =>
    set({
      editingChatId: null,
      editingTitle: "",
    }),
}));
