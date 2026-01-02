import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import type { Document } from "../../../types/document";
interface Props {
  value?: number;
  items: Document[];
  disabled?: boolean;
  onChange: (id: number) => void;
}

export function DocumentSelect({ value, items, disabled, onChange }: Props) {
  return (
    <Select
      disabled={disabled}
      value={value?.toString()}
      onValueChange={(v) => onChange(Number(v))}
    >
      <SelectTrigger className="w-[260px]">
        <SelectValue placeholder="Select document" />
      </SelectTrigger>

      <SelectContent>
        {items.map((doc) => (
          <SelectItem key={doc.id} value={doc.id.toString()}>
            {doc.content_type || "Untitled"}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
