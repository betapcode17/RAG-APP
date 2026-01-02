import { Button } from "../../ui/button";
import { ArrowUpFromLine } from "lucide-react";
import { KBSelect } from "./KBSelect";
import { DocumentSelect } from "./DocumentSelect";
import { useState } from "react";
import { useDocuments } from "../../../hooks/document/useDocuments";
import { useKnowledgeBases } from "../../../hooks/knowledge-base/useKnowledgeBases";

const ChatInput = () => {
  const [kbId, setKbId] = useState<number | undefined>();
  const [docId, setDocId] = useState<number | undefined>();
  const [text, setText] = useState("");

  const user_id = 1;

  const { knowledgeBases } = useKnowledgeBases(user_id);
  const { documents, loading } = useDocuments(kbId);

  const canSend = Boolean(kbId && docId && text.trim());

  const handleSend = () => {
    if (!canSend) return;

    console.log({
      knowledge_base_id: kbId,
      document_id: docId,
      question: text,
    });

    setText("");
  };

  return (
    <div className="border-t bg-background px-3 py-2">
      <div className="w-full">
        <div className="flex items-center gap-2 rounded-xl border bg-muted/40 px-2 py-1.5">
          {/* ===== CONTEXT ===== */}
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
            disabled={!docId}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSend();
              }
            }}
            className="
    flex-1
    bg-background
    px-3
    py-1.5
    text-sm
    rounded-md
    border
    border-input
    focus:outline-none
    focus:ring-1
    focus:ring-ring
    disabled:cursor-not-allowed
    disabled:opacity-60
  "
          />

          {/* ===== SEND ===== */}
          <Button
            size="icon"
            disabled={!canSend}
            onClick={handleSend}
            className="h-8 w-8 rounded-lg"
          >
            <ArrowUpFromLine className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
