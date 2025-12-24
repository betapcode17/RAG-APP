import { Badge } from "./ui/badge.tsx";
import React from "react";
import { Button } from "./ui/button.tsx";
import { useChatStore } from "../store/useChatStore.ts";
import ThemeToggle from "./ui/ThemeToggle.tsx";

const Header = () => {
  const isCleanChat = useChatStore((s) => s.clearChat);
  return (
    <div className="flex justify-between px-6 py-2 border-b">
      <div className="flex flex-col gap-x-px">
        <h1 className="text-lg font-semibold">RAG Chat Assistant</h1>
        <div className="flex items-center gap-2">
          <h1 className="text-sm  text-muted-foreground ">
            AI-powered knowledge base assistant
          </h1>
          <Badge variant="outline" className="text-green-600 border-green-600">
            API Online
          </Badge>
        </div>
      </div>
      <div className="flex flex-row items-center gap-3">
        <ThemeToggle></ThemeToggle>
        <Button variant="outline" onClick={isCleanChat}>
          Clear Chat
        </Button>
      </div>
    </div>
  );
};

export default Header;
