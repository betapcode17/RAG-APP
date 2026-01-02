import { useEffect, useState } from "react";
import type { KnowledgeBase } from "../../types/knowledge_base";
import { KnowledgeBaseApi } from "../../api/knowledge_base.api";

export const useKnowledgeBases = (user_id?: number) => {
  const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBase[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!user_id) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setKnowledgeBases([]);
      return;
    }

    let cancelled = false;

    setLoading(true);
    KnowledgeBaseApi.getKnowledgeBases(user_id)
      .then((data) => {
        if (!cancelled) setKnowledgeBases(data ?? []);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [user_id]);

  return {
    knowledgeBases,
    loading,
    error,
  };
};
