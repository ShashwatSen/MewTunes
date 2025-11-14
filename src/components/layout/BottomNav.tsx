
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Home, Sparkles, Users, Library, Search, Settings, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchDialog } from "@/components/SearchDialog";
import { useAppContext } from "../Providers";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

export function BottomNav() {
    const pathname = usePathname();
    const { user } = useAppContext();
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);

    const mainNav = [
        { href: "/", label: "Home", icon: Home },
        { href: "/discover", label: "Discover", icon: Sparkles },
        { href: "/blend", label: "Blend", icon: Users },
        { href: "/playlists", label: "Playlists", icon: Library },
    ];
    
    const secondaryNav = [
        { label: "Search", icon: Search, onClick: () => setIsSearchOpen(true), href:'' },
    ]

    const AuthButton = () => {
      if (user) {
        return (
          <Link
              href="/settings"
              className={cn(
              "flex flex-col items-center gap-1 text-xs font-medium p-2 rounded-md transition-colors",
              pathname === "/settings"
                  ? "text-primary"
                  : "text-muted-foreground hover:bg-muted"
              )}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        )
      }
      return (
        <Link
            href="/login"
            className={cn(
            "flex flex-col items-center gap-1 text-xs font-medium p-2 rounded-md transition-colors",
            pathname === "/login"
                ? "text-primary"
                : "text-muted-foreground hover:bg-muted"
            )}
        >
            <LogIn className="h-5 w-5" />
            <span>Login</span>
        </Link>
      )
    }

    return (
        <>
            <div className="border-t bg-background/95 backdrop-blur-sm z-50">
                <div className="grid grid-cols-6 items-center justify-items-center h-16">
                    {mainNav.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                        "flex flex-col items-center gap-1 text-xs font-medium p-2 rounded-md transition-colors",
                        pathname === item.href
                            ? "text-primary"
                            : "text-muted-foreground hover:bg-muted"
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                    </Link>
                    ))}
                    {secondaryNav.map((item) => {
                         return (
                             <button
                                key={item.label}
                                onClick={item.onClick}
                                className="flex flex-col items-center gap-1 text-xs font-medium text-muted-foreground p-2 rounded-md transition-colors hover:bg-muted"
                            >
                                <item.icon className="h-5 w-5" />
                                <span>{item.label}</span>
                            </button>
                         )
                    })}
                     <AuthButton />
                </div>
            </div>
            <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
        </>
    );
}
