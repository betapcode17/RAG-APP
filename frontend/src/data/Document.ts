// data/Document
import type { Document } from "../types/document";

export const Documents: Document[] = [
  {
    id: "doc-001",
    name: "RAG Knowledge Base",
    size: "12MB",
    status: "completed",
    createdAt: new Date(),
  },
  {
    id: "doc-002",
    name: "Vector Database",
    size: "30MB",
    status: "processing",
    createdAt: new Date(),
  },
  {
    id: "doc-003",
    name: "AI Manual",
    size: "8MB",
    status: "failed",
    createdAt: new Date(),
  },
];
