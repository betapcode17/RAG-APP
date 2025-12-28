"use client";

import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "../components/ui/sidebar";

import { sidebarMenu } from "../config/sidebar-menu";
import { NavLink } from "react-router-dom";

export default function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
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
      </SidebarContent>

      <SidebarFooter className="text-xs text-muted-foreground px-2">
        © 2025 Your App
      </SidebarFooter>
    </Sidebar>
  );
}
