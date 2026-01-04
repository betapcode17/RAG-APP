import { ChatApi } from "../../api/chat.api";
import { useChatStore } from "../../store/useChatStore";

export const useDeleteChat = () => {
  const { deleteChatLocal } = useChatStore();

  const deleteChat = async (chat_id: number, user_id: number) => {
    await ChatApi.deleteChat(chat_id, user_id);
    deleteChatLocal(chat_id);
  };

  return { deleteChat };
};
