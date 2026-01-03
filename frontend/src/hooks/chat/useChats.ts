// hooks/chat/useChats.ts
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChatApi } from "../../api/chat.api";
import { useChatStore } from "../../store/useChatStore";
import type { Chat } from "../../types/chat";

export const useChats = (user_id: number) => {
  const { chatId } = useParams<{ chatId: string }>();

  const { chats, setChats, addChat, activeChatId, setActiveChat } =
    useChatStore();

  useEffect(() => {
    if (chatId) {
      setActiveChat(Number(chatId));
    } else {
      setActiveChat(null);
    }
  }, [chatId, setActiveChat]);

  useEffect(() => {
    ChatApi.getChats(user_id).then(setChats);
  }, [user_id, setChats]);

  return {
    chats,
    activeChatId,

    selectChat: (chat: Chat) => setActiveChat(chat.id),

    addChatOptimistic: addChat,
  };
};
