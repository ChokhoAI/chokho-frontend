"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { adminComplaints } from "@/lib/mock-data";
import { MapPin, Clock, User, Trash2, Box } from "lucide-react";

export default function ComplaintsManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-serif font-bold">Citizen Reports</h1><p className="text-sm text-muted-foreground mt-1">Manage and assign complaints</p></div>
      </div>

      <Card className="border-border/50">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">ID</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">Trash Type</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">Location</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">Citizen</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">Severity</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">Volume</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">Assigned Worker</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {adminComplaints.map((c: any) => (
                  <tr key={c.formattedId} className="border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer">
                    <td className="p-4 text-xs font-mono">{c.formattedId}</td>
                    <td className="p-4"><div className="flex items-center gap-1.5"><Trash2 className="h-3 w-3 text-primary" /><span className="text-sm font-medium capitalize">{c.trashType.toLowerCase()}</span></div></td>
                    <td className="p-4"><div className="flex items-center gap-1.5"><MapPin className="h-3 w-3 text-muted-foreground" /><span className="text-xs max-w-[150px] truncate">{c.location}</span></div></td>
                    <td className="p-4"><div className="flex items-center gap-1.5"><User className="h-3 w-3 text-muted-foreground" /><span className="text-xs">{c.citizenName}</span></div></td>
                    <td className="p-4">
                      <span className={`text-xs font-mono font-bold ${c.severityScore >= 8 ? "text-red-500" : c.severityScore >= 5 ? "text-orange-500" : "text-amber-400"}`}>
                        {c.severityScore}/10
                      </span>
                    </td>
                    <td className="p-4"><div className="flex items-center gap-1.5"><Box className="h-3 w-3 text-muted-foreground" /><Badge variant="outline" className="text-[10px]">{c.volumeEstimate}</Badge></div></td>
                    <td className="p-4"><Badge variant={c.complaintStatus === "RESOLVED" ? "secondary" : c.complaintStatus === "IN_PROGRESS" ? "default" : "outline"} className="text-[10px]">{c.complaintStatus.replace('_', ' ')}</Badge></td>
                    <td className="p-4 text-xs text-muted-foreground">{c.workerName}</td>
                    <td className="p-4"><div className="flex items-center gap-1.5"><Clock className="h-3 w-3 text-muted-foreground" /><span className="text-[10px] text-muted-foreground">{new Date(c.date).toLocaleDateString()}</span></div></td>
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
