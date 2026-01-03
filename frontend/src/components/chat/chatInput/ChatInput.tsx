import { Button } from "../../ui/button";
import { ArrowUpFromLine } from "lucide-react";
import { KBSelect } from "./KBSelect";
import { DocumentSelect } from "./DocumentSelect";
import { useState } from "react";

import { useDocuments } from "../../../hooks/document/useDocuments";
import { useKnowledgeBases } from "../../../hooks/knowledge-base/useKnowledgeBases";
import { useAskChat } from "../../../hooks/chat/useAskChat";
import { useChatStore } from "../../../store/useChatStore";
import { useCreateChat } from "../../../hooks/chat/useCreateChat";
import { useNavigate } from "react-router-dom";
import { useChats } from "../../../hooks/chat/useChats";

interface ChatInputProps {
  chatId: number | null;
}

const ChatInput: React.FC<ChatInputProps> = ({ chatId }) => {
  const navigate = useNavigate();
  const [kbId, setKbId] = useState<number>();
  const [docId, setDocId] = useState<number>();
  const [text, setText] = useState("");
  const { createChat } = useCreateChat();
  const { addMessage, setTyping } = useChatStore();
  const { setActiveChat } = useChatStore();
  const user_id = 1;
  const { addChatOptimistic } = useChats(user_id);
  const { knowledgeBases } = useKnowledgeBases(user_id);
  const { documents, loading } = useDocuments(kbId);
  const { ask, loading: asking } = useAskChat();

  const canSend = Boolean(kbId && docId && text.trim());

  const handleSend = async () => {
    if (!canSend || asking) return;

    let currentChatId = chatId;

    if (!currentChatId) {
      const chat = await createChat(user_id, text);

      addChatOptimistic(chat);
      setActiveChat(chat.id);

      navigate(`/chat/${chat.id}`, { replace: true });
      currentChatId = chat.id;
    }

    addMessage({
      role: "user",
      content: text,
    });

    setText("");
    setTyping(true);

    try {
      const res = await ask({
        chat_id: currentChatId!,
        knowledge_base_id: kbId!,
        document_id: docId!,
        user_id,
        question: text,
      });

      addMessage({
        role: "assistant",
        content: res.answer,
      });
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="border-t bg-background px-3 py-2">
      <div className="flex items-center gap-2 rounded-xl border bg-muted/40 px-2 py-1.5">
        <KBSelect
          items={knowledgeBases}
          value={kbId}
          onChange={(id) => {
            setKbId(id);
            setDocId(undefined);
          }}
        />

        <span className="text-muted-foreground text-xs">/</span>

        <DocumentSelect
          items={documents}
          value={docId}
          disabled={!kbId || loading}
          onChange={setDocId}
        />

        <input
          type="text"
          placeholder={
            docId
              ? "Ask a question about this document..."
              : "Select a document first"
          }
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={!docId || asking}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSend();
            }
          }}
          className="flex-1 bg-background px-3 py-1.5 text-sm rounded-md border border-input focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-60"
        />

        <Button
          size="icon"
          disabled={!canSend || asking}
          onClick={handleSend}
          className="h-8 w-8 rounded-lg"
        >
          <ArrowUpFromLine className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
