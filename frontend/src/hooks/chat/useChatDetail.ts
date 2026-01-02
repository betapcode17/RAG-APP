import { useEffect, useState } from "react";
import type { Message } from "../../types/message";
import { ChatApi } from "../../api/chat.api";

export const useChatDetail = (chat_id: number | null, user_id: number) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!chat_id) return;

    const fetchChatDetail = async () => {
      try {
        setLoading(true);
        const res = await ChatApi.getDetailChats(chat_id, user_id);
        setMessages(res?.messages ?? []);
      } finally {
        setLoading(false);
      }
    };

    fetchChatDetail();
  }, [chat_id, user_id]);
  return {
    messages,
    loading,
  };
};
