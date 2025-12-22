// ChatInput
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ArrowUpFromLine } from "lucide-react";

const ChatInput = () => {
  return (
    <div className="flex p-3 border-2 gap-2">
      <Input type="question" placeholder="Enter your question" />
      <Button type="submit" variant="outline">
        <ArrowUpFromLine />
      </Button>
    </div>
  );
};

export default ChatInput;
