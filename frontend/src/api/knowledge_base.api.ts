import api from "../lib/api";
import type { KnowledgeBase } from "../types/knowledge_base";
export const KnowledgeBaseApi = {
  getKnowledgeBases: async (user_id: number): Promise<KnowledgeBase[]> => {
    const res = await api.get("/knowledge-bases", { params: { user_id } });
    return res.data;
  },
  createKnowledgeBases: async (user_id: number): Promise<KnowledgeBase> => {
    const res = await api.post("/knowledge-bases", null, {
      params: { user_id },
    });
    return res.data;
  },
  getDetailKnowledgeBases: async (kb_id: number, user_id: number) => {
    const res = await api.get(`/knowledge-bases/${kb_id}`, {
      params: { user_id },
    });
    return res.data;
  },
};
