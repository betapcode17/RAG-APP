import ChatInput from "../components/chat/ChatInput";
import { ChatView } from "../components/chat/ChatView";

export const ChatLayout = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <ChatView />
      </div>

      <div className="border-t bg-background">
        <ChatInput />
      </div>
    </div>
  );
};
