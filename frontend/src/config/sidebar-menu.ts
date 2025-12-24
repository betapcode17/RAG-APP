import {
  LayoutDashboard,
  Database,
  MessageSquare,
  KeyRound,
} from "lucide-react";

export const sidebarMenu = [
  {
    group: "Main",
    items: [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: "/",
      },
      {
        title: "Knowledge Base",
        icon: Database,
        href: "/knowledge",
      },
      {
        title: "Chat",
        icon: MessageSquare,
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
