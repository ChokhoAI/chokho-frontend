"use client";

import { Bell, Search, Menu, LayoutDashboard, Map, MessageSquareWarning, Users, Truck, LogOut, Flame } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarLinks = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Command Center" },
  { href: "/admin/heatmap", icon: Flame, label: "Heatmap" },
  { href: "/admin/routes", icon: Map, label: "Route Optimization" },
  { href: "/admin/complaints", icon: MessageSquareWarning, label: "Citizen Reports" },
  { href: "/admin/workers", icon: Users, label: "Worker Logs" },
  { href: "/admin/vehicles", icon: Truck, label: "Vehicles" },
];

export function AdminHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="flex items-center gap-2 md:gap-4 flex-1 max-w-md">
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 mt-2">
              <div className="px-2 py-1.5 mb-1">
                <p className="text-sm font-semibold font-serif">CHOKHO</p>
                <p className="text-[10px] text-muted-foreground font-mono">ADMIN PORTAL</p>
              </div>
              <DropdownMenuSeparator />
              {sidebarLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link
                      href={link.href}
                      className={`flex items-center gap-2 cursor-pointer ${isActive ? "text-primary font-medium bg-primary/5" : ""}`}
                    >
                      <link.icon className="h-4 w-4" />
                      <span>{link.label}</span>
                    </Link>
                  </DropdownMenuItem>
                );
              })}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive cursor-pointer focus:text-destructive flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-9 bg-muted/50 border-transparent focus:border-border h-9"
          />
        </div>
      </div>
      <div className="flex items-center gap-3 md:gap-4 ml-2">
        <button className="relative p-2 rounded-md hover:bg-muted transition-colors">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 flex items-center justify-center text-[9px]">
            3
          </Badge>
        </button>
        <div className="flex items-center gap-3 pl-3 border-l border-border">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium">Admin Rawat</p>
            <p className="text-[10px] text-muted-foreground font-mono">SUPERINTENDENT</p>
          </div>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/20 text-primary text-xs font-semibold">AR</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
