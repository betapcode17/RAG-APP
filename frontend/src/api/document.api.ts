import type { Document } from "../types/document";
import api from "../lib/api";

export const DocumentApi = {
  getDocuments: async (knowledge_base_id: number): Promise<Document[]> => {
    const res = await api.get("/document", {
      params: { knowledge_base_id },
    });
    return res.data;
  },

  getDetailDocument: async (
    document_id: number,
    knowledge_base_id: number
  ): Promise<Document> => {
    const res = await api.get(`/document/${document_id}`, {
      params: { knowledge_base_id },
    });
    return res.data;
  },

  createDocument: async (
    knowledge_base_id: number,
    file: File
  ): Promise<Document> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await api.post("/document", formData, {
      params: { knowledge_base_id },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  },

  deleteDocument: async (document_id: number, knowledge_base_id: number) => {
    const res = await api.delete(`/document/${document_id}`, {
      params: { knowledge_base_id },
    });
    return res.data;
  },
};
