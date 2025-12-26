// types/documents.ts
export interface Document {
  id: string;
  name: string;
  size: string;
  status: "completed" | "processing" | "failed";
  createdAt: Date;
}
