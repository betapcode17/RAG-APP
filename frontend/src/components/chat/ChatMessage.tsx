import { Button } from "../ui/button";
import { BotMessageSquare, UserRound } from "lucide-react";
import type { UIMessage } from "../../types/ui-message";
interface Props {
  message: UIMessage;
}
const ChatMessage = ({ message }: Props) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
      <div className="flex gap-2 items-start">
        {!isUser && (
          <Button
            variant="outline"
            size="icon"
            className="rounded-full shrink-0"
          >
            <BotMessageSquare className="h-4 w-4" />
          </Button>
        )}

        <div
          className={`rounded-xl px-4 py-3 max-w-md shadow
            ${"bg-muted text-foreground"}`}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>

        {isUser && (
          <Button
            variant="outline"
            size="icon"
            className="rounded-full shrink-0"
          >
            <UserRound className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
