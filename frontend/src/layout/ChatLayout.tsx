import { useParams } from "react-router-dom";
import ChatInput from "../components/chat/chatInput/ChatInput";
import { ChatView } from "../components/chat/ChatView";
import ChatEmpty from "../components/chat/ChatEmpty";

export const ChatLayout = () => {
  const { chatId } = useParams<{ chatId?: string }>();

  const parsedChatId = chatId ? Number(chatId) : null;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        {parsedChatId ? <ChatView chatId={parsedChatId} /> : <ChatEmpty />}
      </div>
      <ChatInput chatId={parsedChatId ?? 0} />
    </div>
  );
};
