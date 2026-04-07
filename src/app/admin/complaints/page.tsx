"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { complaints } from "@/lib/mock-data";
import { Search, Filter, MapPin, Clock, User } from "lucide-react";

export default function ComplaintsManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-serif font-bold">Citizen Reports</h1><p className="text-sm text-muted-foreground mt-1">Manage and assign complaints</p></div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 cursor-pointer"><Filter className="h-3.5 w-3.5" /> Filter</Button>
          <Button size="sm" className="cursor-pointer">Export</Button>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search complaints..." className="pl-9 h-9 bg-muted/50" />
      </div>

      <Card className="border-border/50">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">ID</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">Category</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">Location</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">Citizen</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">Severity</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">Priority</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">Assigned</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((c) => (
                  <tr key={c.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer">
                    <td className="p-4 text-xs font-mono">{c.id}</td>
                    <td className="p-4"><p className="text-sm font-medium">{c.category}</p></td>
                    <td className="p-4"><div className="flex items-center gap-1.5"><MapPin className="h-3 w-3 text-muted-foreground" /><span className="text-xs max-w-[150px] truncate">{c.location}</span></div></td>
                    <td className="p-4"><div className="flex items-center gap-1.5"><User className="h-3 w-3 text-muted-foreground" /><span className="text-xs">{c.citizenName}</span></div></td>
                    <td className="p-4">
                      <span className={`text-xs font-mono font-bold ${c.severityScore >= 8 ? "text-red-500" : c.severityScore >= 5 ? "text-orange-500" : "text-amber-400"}`}>
                        {c.severityScore}/10
                      </span>
                    </td>
                    <td className="p-4"><Badge variant={c.priority === "critical" ? "destructive" : c.priority === "high" ? "default" : "outline"} className="text-[10px]">{c.priority}</Badge></td>
                    <td className="p-4"><Badge variant={c.status === "resolved" ? "secondary" : c.status === "in-progress" ? "default" : "outline"} className="text-[10px]">{c.status}</Badge></td>
                    <td className="p-4 text-xs text-muted-foreground">{c.assignedWorkerName || "—"}</td>
                    <td className="p-4"><div className="flex items-center gap-1.5"><Clock className="h-3 w-3 text-muted-foreground" /><span className="text-[10px] text-muted-foreground">{new Date(c.createdAt).toLocaleDateString()}</span></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
