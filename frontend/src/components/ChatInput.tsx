import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ArrowUpFromLine } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { sendChat } from "../service/chatApi";

const ChatInput = () => {
  const [value, setValue] = useState("");

  const addUserMessage = useChatStore((s) => s.addUserMessage);
  const addAssistantMessage = useChatStore((s) => s.addAssistantMessage);
  const setTyping = useChatStore((s) => s.setTyping);
  const isTyping = useChatStore((s) => s.isTyping);

  const handleSend = async () => {
    if (!value.trim() || isTyping) return;

    const question = value;

    addUserMessage(question);
    setValue("");
    setTyping(true);

    try {
      const res = await sendChat(question);
      addAssistantMessage(res.answer);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      addAssistantMessage("❌ Server error, please try again.");
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="flex gap-2 border-t p-3">
      <Input
        placeholder="Enter your question..."
        value={value}
        disabled={isTyping}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />

      <Button variant="outline" onClick={handleSend} disabled={isTyping}>
        <ArrowUpFromLine />
      </Button>
    </div>
  );
};

export default ChatInput;
