
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Home, Search, Sparkles, ListMusic, Plus, Library, Settings, Users, LogIn } from "lucide-react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/components/Providers";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SearchDialog } from "../SearchDialog";

export function SidebarNav() {
  const pathname = usePathname();
  const { playlists, user } = useAppContext();
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  const mainNav = [
    { href: "/", label: "Home", icon: Home },
    { href: "/discover", label: "Discover", icon: Sparkles },
    { href: "/blend", label: "Blend", icon: Users },
    { href: "/playlists", label: "My Playlists", icon: Library },
  ];

  return (
    <>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {mainNav.map((item) => (
              <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={{ children: item.label }}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
             <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setIsSearchOpen(true)} tooltip={{children: 'Search'}}>
                    <Search />
                    <span>Search</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between">
            <span>Playlists</span>
            <Button variant="ghost" size="icon" className="h-6 w-6" asChild>
                <Link href="/playlists">
                    <Plus className="h-4 w-4" />
                </Link>
            </Button>
          </SidebarGroupLabel>
          <SidebarMenu>
            {playlists.map((playlist) => (
              <SidebarMenuItem key={playlist.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === `/playlists/${playlist.id}`}
                    size="sm"
                    tooltip={{ children: playlist.name }}
                  >
                    <Link href={`/playlists/${playlist.id}`}>
                      <ListMusic />
                      <span>{playlist.name}</span>
                    </Link>
                  </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
             {playlists.length === 0 && (
                <p className="px-2 text-xs text-muted-foreground">No playlists yet.</p>
             )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
       <SidebarFooter>
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={{children: 'Settings'}} isActive={pathname.startsWith('/settings')}>
                    <Link href="/settings">
                      <Settings />
                      <span>Settings</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              {!user && (
                <SidebarMenuButton asChild tooltip={{children: 'Login'}} isActive={pathname === '/login'}>
                  <Link href="/login">
                    <LogIn />
                    <span>Login</span>
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
        </SidebarMenu>
       </SidebarFooter>
       <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </>
  );
}
