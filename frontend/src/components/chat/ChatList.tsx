// // ChatList
// import { BotMessageSquare } from "lucide-react";
// import { useChatStore } from "../../store/useChatStore";
// import ChatMessage from "./ChatMessage";
// import { TypingDots } from "../ui/TypingDots";
// import { Button } from "../ui/button";

// const ChatList = () => {
//   const { message, isTyping } = useChatStore();

//   return (
//     <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
//       {message.map((m, i) => (
//         <ChatMessage key={i} message={m} />
//       ))}

//       {isTyping && (
//         <div className="flex gap-2 items-start">
//           <Button
//             variant="outline"
//             size="icon"
//             className="rounded-full shrink-0"
//           >
//             <BotMessageSquare className="h-4 w-4" />
//           </Button>
//           <div className="rounded-xl px-4 py-3 max-w-md shadow">
//             <TypingDots />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatList;
import ChatMessage from "./ChatMessage";
import type { Message } from "../../types/message";

interface Props {
  messages: Message[];
}

const ChatList = ({ messages }: Props) => {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
      {messages.map((m) => (
        <ChatMessage key={m.id} message={m} />
      ))}
    </div>
  );
};

export default ChatList;
