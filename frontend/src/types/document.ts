// types/documents.ts
export interface Document {
  id: number;
  knowledge_base_id: number;
  file_path: string;
  file_hash: string;
  file_size: number;
  content_type: string;
  created_at: Date;
  updated_at: Date;
}
