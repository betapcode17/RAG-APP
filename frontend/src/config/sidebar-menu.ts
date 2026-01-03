import { LayoutDashboard, Database, SquarePen, KeyRound } from "lucide-react";

export const sidebarMenu = [
  {
    group: "Main",
    items: [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
      },
      {
        title: "Knowledge Base",
        icon: Database,
        href: "/knowledge",
      },
      {
        title: "New Chat",
        icon: SquarePen,
        href: "/chat",
      },
    ],
  },
  {
    group: "Settings",
    items: [
      {
        title: "API Keys",
        icon: KeyRound,
        href: "/api-keys",
      },
    ],
  },
];
