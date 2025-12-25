import type { ColumnDef } from "@tanstack/react-table";
import type { Documents } from "../../types/documents";

export const columns: ColumnDef<Documents>[] = [
  {
    accessorKey: "name",
    header: "name",
  },
  {
    accessorKey: "size",
    header: "size",
  },
  {
    accessorKey: "createdAt",
    header: "createdAt",
  },
  {
    accessorKey: "status",
    header: "status",
  },
];
