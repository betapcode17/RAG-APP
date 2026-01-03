import { useState } from "react";
import { ChatApi } from "../../api/chat.api";
import type { Chat } from "../../types/chat";

export const useCreateChat = () => {
  const [loading, setLoading] = useState(false);

  const createChat = async (user_id: number, title: string): Promise<Chat> => {
    try {
      setLoading(true);
      return await ChatApi.createChat(user_id, title);
    } finally {
      setLoading(false);
    }
  };

  return { createChat, loading };
};
