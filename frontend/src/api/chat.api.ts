import api from "../lib/api";
import type { Chat } from "../types/chat";

export const ChatApi = {
  getChats: async (user_id: number): Promise<Chat[]> => {
    const res = await api.get("/chat", { params: user_id });
    return res.data;
  },
  getDetailChats: async (chat_id: number, user_id: number) => {
    const res = await api.get(`/chat/${chat_id}`, {
      params: { user_id },
    });
    return res.data;
  },

  createChat: async (user_id: number): Promise<Chat> => {
    const res = await api.post("/chat", null, {
      params: { user_id },
    });
    return res.data;
  },

  ask: async (
    chat_id: number,
    knowledge_base_id: number,
    document_id: number,
    user_id: number,
    question: string
  ) => {
    const res = await api.post(
      `/chat/${chat_id}/ask`,
      { question },
      {
        params: {
          knowledge_base_id,
          document_id,
          user_id,
        },
      }
    );

    return res.data;
  },
};
