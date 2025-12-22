// ChatMessage
import React from "react";
import { Button } from "./ui/button";
import { BotMessageSquare, UserRound } from "lucide-react";

const ChatMessage = () => {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
      {/* ===== USER MESSAGE ===== */}
      <div className="flex flex-col items-end">
        <div className="flex flex-row gap-2 items-start">
          <div className="bg-primary text-primary-foreground rounded-xl px-4 py-3 max-w-md shadow">
            <p className="text-sm ">
              Hãy cho tôi một lộ trình học RAG siêu chi tiết
            </p>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="rounded-full shrink-0"
          >
            <UserRound className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-[11px] text-muted-foreground mt-1">14:02</p>
      </div>

      {/* ===== BOT MESSAGE ===== */}
      <div className="flex flex-col items-start">
        <div className="flex flex-row gap-2 items-start">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full shrink-0"
          >
            <BotMessageSquare className="h-4 w-4" />
          </Button>

          <div className="bg-muted text-foreground rounded-xl px-4 py-3 max-w-md shadow-sm">
            <p className="text-sm leading-relaxed">
              Dưới đây là lộ trình học RAG (Retrieval-Augmented Generation) từ
              cơ bản đến nâng cao, bao gồm nền tảng NLP, vector database,
              embedding, pipeline truy vấn và triển khai thực tế.
            </p>
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground mt-1">14:03</p>
      </div>
    </div>
  );
};

export default ChatMessage;
