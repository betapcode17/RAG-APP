import { useChatStore } from "../store/useChatStore";
import ChatEmpty from "./ChatEmpty";

import ChatList from "./ChatList";

export function ChatView() {
  const messages = useChatStore((s) => s.message);

  if (messages.length === 0) {
    return <ChatEmpty />;
  }

  return <ChatList />;
}
