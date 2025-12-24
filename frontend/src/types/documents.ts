// types/documents.ts
export interface Documents {
  id: string;
  name: string;
  size: string;
  status: "completed" | "processing" | "failed";
  createdAt: Date;
}
