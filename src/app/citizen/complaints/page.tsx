"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { complaints, getSeverityBorder } from "@/lib/mock-data";
import { MapPin, Plus, Filter } from "lucide-react";
import Link from "next/link";

type FilterType = "all" | "pending" | "in-progress" | "resolved";

export default function ComplaintsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredComplaints = activeFilter === "all" 
    ? complaints 
    : complaints.filter(c => c.status === activeFilter);

  const counts = {
    all: complaints.length,
    pending: complaints.filter(c => c.status === "pending").length,
    "in-progress": complaints.filter(c => c.status === "in-progress").length,
    resolved: complaints.filter(c => c.status === "resolved").length,
  };

  return (
    <div className="px-4 py-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-serif font-semibold">My Complaints</h1>
        <Button variant="ghost" size="sm" className="gap-1.5 text-xs cursor-pointer">
          <Filter className="h-3.5 w-3.5" /> Filter
        </Button>
      </div>

      {/* Functional Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {([
          { key: "all", label: `All (${counts.all})` },
          { key: "pending", label: `Pending (${counts.pending})` },
          { key: "in-progress", label: `Active (${counts["in-progress"]})` },
          { key: "resolved", label: `Resolved (${counts.resolved})` },
        ] as { key: FilterType; label: string }[]).map((f) => (
          <Badge 
            key={f.key} 
            variant={activeFilter === f.key ? "default" : "outline"} 
            className="text-[10px] cursor-pointer shrink-0"
            onClick={() => setActiveFilter(f.key)}
          >
            {f.label}
          </Badge>
        ))}
      </div>

      {/* List */}
      <div className="space-y-2">
        {filteredComplaints.map((c) => (
          <Link key={c.id} href={`/citizen/complaints/${c.id}`}>
            <Card className={`border-l-4 ${getSeverityBorder(c.severityScore)} ${c.cleaned ? "bg-emerald-500/5 border-emerald-500/20" : "border-border/50"} hover:bg-muted/30 transition-colors cursor-pointer mb-2`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono text-muted-foreground">{c.id}</span>
                      <Badge variant="outline" className="text-[9px]">{c.priority}</Badge>
                      {c.cleaned && <Badge variant="outline" className="text-[9px] text-emerald-500 border-emerald-500/30">Cleaned</Badge>}
                    </div>
                    <p className="text-sm font-medium">{c.category} — {c.location}</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">{c.location}</p>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1.5">{new Date(c.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <Badge variant={c.status === "resolved" ? "secondary" : c.status === "in-progress" ? "default" : "outline"} className="text-[10px] shrink-0">
                      {c.status}
                    </Badge>
                    <span className={`text-xs font-mono font-bold ${c.severityScore >= 8 ? "text-red-500" : c.severityScore >= 5 ? "text-orange-500" : "text-amber-400"}`}>
                      {c.severityScore}/10
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
        {filteredComplaints.length === 0 && (
          <div className="text-center py-8 text-sm text-muted-foreground">No complaints found.</div>
        )}
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
