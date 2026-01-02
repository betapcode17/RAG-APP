import { useEffect, useState } from "react";
import type { Chat } from "../../types/chat";
import { ChatApi } from "../../api/chat.api";
export const useChats = (user_id: number) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const fetchChats = async () => {
    setLoading(true);
    try {
      const data = await ChatApi.getChats(user_id);
      setChats(data);
    } finally {
      setLoading(false);
    }
  };
  const selectChat = (chat: Chat) => {
    setActiveChatId(chat.id);
  };
  const createChat = async () => {
    const newChat = await ChatApi.createChat(user_id);
    setChats((prev) => [newChat, ...prev]);
    return newChat;
  };

  useEffect(() => {
    fetchChats();
  }, [user_id]);

  return {
    activeChatId,
    selectChat,
    chats,
    loading,
    createChat,
    refetch: fetchChats,
  };
};
