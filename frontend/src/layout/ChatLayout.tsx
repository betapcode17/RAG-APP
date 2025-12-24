// import ChatEmpty from "../components/ChatEmpty";
import ChatHeader from "../components/ChatHeader";
import ChatInput from "../components/ChatInput";
import { ChatView } from "../components/ChatView";
// import ChatMessage from "../components/ChatMessage";

export const ChatLayout = () => {
  return (
    <section className="flex flex-col h-full">
      <ChatHeader />
      <ChatView></ChatView>
      <ChatInput />
    </section>
  );
};
