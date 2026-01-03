import { useState, useCallback } from "react";
import { ChatApi } from "../../api/chat.api";

interface AskPayload {
  chat_id: number;
  knowledge_base_id: number;
  document_id: number;
  user_id: number;
  question: string;
}

export const useAskChat = () => {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const ask = useCallback(async (payload: AskPayload) => {
    try {
      setLoading(true);
      setError(null);

      const res = await ChatApi.ask(
        payload.chat_id,
        payload.knowledge_base_id,
        payload.document_id,
        payload.user_id,
        payload.question
      );

      setAnswer(res?.answer ?? null);
      return res;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    ask,
    answer,
    loading,
    error,
  };
};
