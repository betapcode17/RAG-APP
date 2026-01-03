import ChatEmpty from "./ChatEmpty";
import ChatList from "./ChatList";
import { useChatDetail } from "../../hooks/chat/useChatDetail";
import { useChatStore } from "../../store/useChatStore";
import { useEffect } from "react";

interface Props {
  chatId: number;
}

export const ChatView = ({ chatId }: Props) => {
  const user_id = 1;
  const { messages, loading } = useChatDetail(chatId, user_id);

  const { addMessage } = useChatStore();

  useEffect(() => {
    if (!messages) return;

    messages.forEach((m) =>
      addMessage({
        role: m.role,
        content: m.content,
      })
    );
  }, [messages, addMessage]);

  if (!chatId) return <ChatEmpty />;
  if (!messages || messages.length === 0) {
    return <ChatEmpty />;
  }
  if (loading) return <div className="p-4">Loading...</div>;

  return <ChatList />;
};
