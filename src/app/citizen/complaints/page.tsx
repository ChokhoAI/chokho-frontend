"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { complaints } from "@/lib/mock-data";
import { MapPin, Plus, Filter } from "lucide-react";
import Link from "next/link";

const statusColors: Record<string, string> = {
  pending: "outline",
  "in-progress": "default",
  resolved: "secondary",
  rejected: "destructive",
};

export default function ComplaintsPage() {
  return (
    <div className="px-4 py-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-serif font-semibold">My Complaints</h1>
        <Button variant="ghost" size="sm" className="gap-1.5 text-xs cursor-pointer">
          <Filter className="h-3.5 w-3.5" /> Filter
        </Button>
      </div>

      {/* Stats */}
      <div className="flex gap-2">
        {["All (6)", "Pending (2)", "Active (2)", "Resolved (2)"].map((f, i) => (
          <Badge key={f} variant={i === 0 ? "default" : "outline"} className="text-[10px] cursor-pointer">{f}</Badge>
        ))}
      </div>

      {/* List */}
      <div className="space-y-2">
        {complaints.map((c) => (
          <Link key={c.id} href={`/citizen/complaints/${c.id}`}>
            <Card className="border-border/50 hover:bg-muted/30 transition-colors cursor-pointer mb-2">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono text-muted-foreground">{c.id}</span>
                      <Badge variant="outline" className="text-[9px]">{c.priority}</Badge>
                    </div>
                    <p className="text-sm font-medium">{c.title}</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">{c.location}</p>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1.5">{c.category} • {new Date(c.createdAt).toLocaleDateString()}</p>
                  </div>
                  <Badge variant={statusColors[c.status] as "default" | "secondary" | "outline" | "destructive"} className="text-[10px] shrink-0">
                    {c.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* FAB */}
      <Link href="/citizen/complaints/new" className="fixed bottom-24 right-4 z-40">
        <Button size="lg" className="rounded-full h-14 w-14 shadow-lg cursor-pointer">
          <Plus className="h-6 w-6" />
        </Button>
      </Link>
    </div>
  );
}
