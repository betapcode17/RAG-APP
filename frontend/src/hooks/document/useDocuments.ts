import { useEffect, useState } from "react";
import type { Document } from "../../types/document";
import { DocumentApi } from "../../api/document.api";

export const useDocuments = (knowledge_base_id?: number) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!knowledge_base_id) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDocuments([]);
      return;
    }

    let cancelled = false;

    setLoading(true);
    DocumentApi.getDocuments(knowledge_base_id)
      .then((data) => {
        if (!cancelled) setDocuments(data ?? []);
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
  }, [knowledge_base_id]);

  return {
    documents,
    loading,
    error,
  };
};
