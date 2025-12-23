// ChatInput.tsx
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ArrowUpFromLine } from "lucide-react";
import { useChatStore } from "../store/chat.store";

const ChatInput = () => {
  const [value, setValue] = useState<string>("");
  const addUserMessage = useChatStore((s) => s.addUserMessage);

  const handleSend = () => {
    if (!value.trim()) return;
    addUserMessage(value);
    setValue("");
  };

  return (
    <div className="flex gap-2 border-t p-3">
      <Input
        placeholder="Enter your question..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />

      <Button variant="outline" onClick={handleSend}>
        <ArrowUpFromLine />
      </Button>
    </div>
  );
};

export default ChatInput;
