"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ClipboardList, PlusCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const citizenLinks = [
  { href: "/citizen/dashboard", icon: Home, label: "Home" },
  { href: "/citizen/complaints", icon: ClipboardList, label: "Complaints" },
  { href: "/citizen/complaints/new", icon: PlusCircle, label: "Report" },
  { href: "/citizen/profile", icon: User, label: "Profile" },
];

const workerLinks = [
  { href: "/worker/dashboard", icon: Home, label: "Home" },
  { href: "/worker/route", icon: ClipboardList, label: "Route" },
  { href: "/worker/verify", icon: PlusCircle, label: "Verify" },
  { href: "/worker/profile", icon: User, label: "Profile" },
];

export function MobileNav({ role }: { role: "citizen" | "worker" }) {
  const pathname = usePathname();
  const links = role === "citizen" ? citizenLinks : workerLinks;

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-background/80 backdrop-blur-xl border-b border-border">
        <Link href={`/${role}/dashboard`} className="flex items-center gap-2">
          <Image src="/logo.png" alt="Chokho" width={32} height={32} className="rounded-sm" />
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono text-muted-foreground">ONLINE</span>
        </div>
      </header>
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-t border-border">
        <div className="flex items-center justify-around py-2 max-w-lg mx-auto">
          {links.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <link.icon className={cn("h-5 w-5", isActive && "stroke-[2.5px]")} />
                <span className="text-[10px] font-medium">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
