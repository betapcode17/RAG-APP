import ChatInput from "../components/chat/chatInput/ChatInput";
import { ChatView } from "../components/chat/ChatView";

export const ChatLayout = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <ChatView />
      </div>

      <ChatInput />
    </div>
  );
};
