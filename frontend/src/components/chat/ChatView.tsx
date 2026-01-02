import { useParams } from "react-router-dom";
import ChatEmpty from "./ChatEmpty";
import ChatList from "./ChatList";
import { useChatDetail } from "../../hooks/chat/useChatDetail";

export function ChatView() {
  const { chatId } = useParams<{ chatId: string }>();
  const user_id = 1;

  const { messages, loading } = useChatDetail(
    chatId ? Number(chatId) : null,
    user_id
  );

  if (!chatId) return <ChatEmpty />;

  if (loading) return <div className="p-4">Loading...</div>;

  if (messages.length === 0) return <ChatEmpty />;

  return <ChatList messages={messages} />;
}
