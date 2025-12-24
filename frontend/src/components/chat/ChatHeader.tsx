import React from "react";
import { Badge } from "../ui/badge.tsx";
import { Button } from "../ui/button.tsx";
import { SidebarTrigger } from "../ui/sidebar";
import { useChatStore } from "../../store/useChatStore.ts";
import ThemeToggle from "../ui/ThemeToggle.tsx";

const Header = () => {
  const isCleanChat = useChatStore((s) => s.clearChat);

  return (
    <div className="flex items-center justify-between border-b px-4 py-2">
      <div className="flex items-center gap-3">
        <SidebarTrigger />

        <div className="flex flex-col gap-px">
          <h1 className="text-lg font-semibold">RAG Chat Assistant</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              AI-powered knowledge base assistant
            </span>
            <Badge
              variant="outline"
              className="border-green-600 text-green-600"
            >
              API Online
            </Badge>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Button variant="outline" onClick={isCleanChat}>
          Clear Chat
        </Button>
      </div>
    </div>
  );
};

export default Header;
