import { ChatApi } from "../../api/chat.api";
import { useChatStore } from "../../store/useChatStore";

export const useRenameChat = () => {
  const updateChatTitle = useChatStore((s) => s.updateChatTitle);

  const renameChat = async (
    chat_id: number,
    user_id: number,
    title: string
  ) => {
    const chat = await ChatApi.renameChat(chat_id, user_id, title);

    // 👇 cập nhật sidebar ngay lập tức
    updateChatTitle(chat_id, title);

    return chat;
  };

  return { renameChat };
};
