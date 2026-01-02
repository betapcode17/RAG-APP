import type { KnowledgeBase } from "../../../types/knowledge_base";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

interface Props {
  value?: number;
  items: KnowledgeBase[];
  onChange: (id: number) => void;
}

export function KBSelect({ value, items, onChange }: Props) {
  return (
    <Select
      value={value?.toString()}
      onValueChange={(v) => onChange(Number(v))}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select Knowledge Base" />
      </SelectTrigger>

      <SelectContent>
        {items.map((kb) => (
          <SelectItem key={kb.id} value={kb.id.toString()}>
            {kb.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
