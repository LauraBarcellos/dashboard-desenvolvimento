"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, BarChart3, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Clientes",
    href: "/clientes",
    icon: Users,
  },
  {
    title: "Métricas",
    href: "/metricas",
    icon: BarChart3,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      {/* Header com Logo, Separator e Toggle */}
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex flex-col gap-2">
          {/* Primeira linha: Logo (expandido) ou Toggle Colapsar (colapsado) */}
          <div className="flex items-center justify-between gap-2">
            {/* Logo - visível apenas quando expandido */}
            <div className="flex items-center gap-3 min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
              <div className="relative h-8 w-8 shrink-0 flex items-center justify-center">
                <Image
                  src="/devio/icon_white.svg"
                  alt="Devio"
                  width={32}
                  height={32}
                  className="hidden dark:block"
                />
                <Image
                  src="/devio/icon_black.svg"
                  alt="Devio"
                  width={32}
                  height={32}
                  className="block dark:hidden"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold text-sidebar-foreground truncate">Portal Devio</span>
                <span className="text-xs text-sidebar-foreground/70 truncate">Internal Portal</span>
              </div>
            </div>
            
            {/* Toggle Colapsar - visível apenas quando expandido */}
            <SidebarTrigger className="h-8 w-8 shrink-0 group-data-[collapsible=icon]:hidden" />
            
            {/* Toggle Colapsar - visível apenas quando colapsado (centralizado) */}
            <div className="hidden group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center w-full">
              <SidebarTrigger className="h-8 w-8 shrink-0" />
            </div>
          </div>
          
          {/* Separator */}
          <Separator className="bg-sidebar-border" />
          
          {/* Toggle de Tema - sempre visível */}
          <div className="flex items-center justify-between gap-2 group-data-[collapsible=icon]:justify-center">
            <span className="text-xs text-sidebar-foreground/70 group-data-[collapsible=icon]:hidden">
              Tema
            </span>
            <div className="flex items-center justify-center">
              <ModeToggle />
            </div>
          </div>
        </div>
      </SidebarHeader>

      {/* Navegação */}
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => {
            const isActive =
              pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                  <Link href={item.href} className="group-data-[collapsible=icon]:justify-center">
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* Footer com Logout */}
      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          {/* Logout */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Sair">
              <Link href="/login" className="group-data-[collapsible=icon]:justify-center">
                <LogOut className="h-4 w-4 shrink-0" />
                <span className="group-data-[collapsible=icon]:hidden">Sair</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
