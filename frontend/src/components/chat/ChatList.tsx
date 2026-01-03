import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import { TypingDots } from "../ui/TypingDots";
import { useChatStore } from "../../store/useChatStore";
import { BotMessageSquare } from "lucide-react";

const ChatList = () => {
  const { messages, isTyping } = useChatStore();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
      {messages.map((m) => (
        <ChatMessage message={m} />
      ))}

      {isTyping && (
        <div className="flex items-start gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-muted">
            <BotMessageSquare className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="rounded-2xl bg-muted px-4 py-2 shadow max-w-xs">
            <TypingDots />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatList;
