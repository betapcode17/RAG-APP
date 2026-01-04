"use client";

import { useLocation, NavLink, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from "../ui/sidebar";

import { sidebarMenu } from "../../config/sidebar-menu";
import { useChats } from "../../hooks/chat/useChats";
import ChatItem from "../sidebar/ChatItem";
import { Atom } from "lucide-react";
import { useRenameChat } from "../../hooks/chat/useRenameChat";
import { useDeleteChat } from "../../hooks/chat/useDeleteChat";

export default function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const user_id = 1;
  const { chats, activeChatId } = useChats(user_id);
  const { renameChat } = useRenameChat();
  const { deleteChat } = useDeleteChat();
  return (
    <Sidebar collapsible="icon">
      <div className="flex flex-row justify-between m-3 items-center">
        <Atom className="h-5" />
        <SidebarTrigger />
      </div>

      <SidebarContent>
        {sidebarMenu.map((group) => (
          <SidebarGroup key={group.group}>
            <SidebarGroupLabel>{group.group}</SidebarGroupLabel>

            <SidebarMenu>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                    >
                      <NavLink to={item.href}>
                        <Icon />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}

        <SidebarGroup>
          <SidebarGroupLabel>Chats</SidebarGroupLabel>

          <div className=" space-y-1">
            {chats.map((chat) => (
              <ChatItem
                chat={chat}
                active={chat.id === activeChatId}
                onSelect={(chat) => navigate(`/chat/${chat.id}`)}
                onRename={(chatId, title) => renameChat(chatId, user_id, title)}
                onDelete={(chat) => {
                  if (confirm("Xóa chat này?")) deleteChat(chat.id, user_id);
                }}
              />
            ))}
          </div>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="text-xs text-muted-foreground px-2">
        © 2025 Your App
      </SidebarFooter>
    </Sidebar>
  );
}
