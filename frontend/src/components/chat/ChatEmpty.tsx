import { Button } from "../ui/button";
import { MessageCircleMore } from "lucide-react";
import { SampleQuestions } from "./SampleQuestions";

const ChatEmpty = () => {
  return (
    <div className="flex flex-col  items-center py-3 flex-1 overflow-y-auto">
      <Button variant="outline" size="icon" className="rounded-full">
        <MessageCircleMore />
      </Button>
      <h2 className="text-xl font-semibold">
        Welcome to the RAG Chat Assistant
      </h2>
      <p className="text-muted-foreground mt-1">
        Start the conversation by sending a question or selecting from the
        sample questions below.
      </p>
      <SampleQuestions></SampleQuestions>
    </div>
  );
};

export default ChatEmpty;
