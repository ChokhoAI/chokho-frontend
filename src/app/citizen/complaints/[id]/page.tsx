"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { complaints } from "@/lib/mock-data";
import { ArrowLeft, MapPin, Clock, User, Bot, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { use } from "react";

export default function ComplaintDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const complaint = complaints.find((c) => c.id === id) || complaints[0];

  const timeline = [
    { time: "08:30 AM", label: "Complaint Filed", desc: complaint.citizenName, icon: User, done: true },
    { time: "09:15 AM", label: "AI Analysis Complete", desc: complaint.aiAnalysis || "Processing...", icon: Bot, done: !!complaint.aiAnalysis },
    { time: "10:00 AM", label: "Assigned to Worker", desc: complaint.assignedWorkerName || "Pending assignment", icon: User, done: !!complaint.assignedWorkerId },
    { time: "—", label: "Resolution", desc: complaint.status === "resolved" ? "Issue resolved" : "In progress", icon: CheckCircle2, done: complaint.status === "resolved" },
  ];

  return (
    <div className="px-4 py-4 space-y-4">
      <div className="flex items-center gap-3">
        <Link href="/citizen/complaints" className="p-2 -ml-2 rounded-md hover:bg-muted transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-lg font-serif font-semibold">Complaint Detail</h1>
          <p className="text-[10px] font-mono text-muted-foreground">{complaint.id}</p>
        </div>
      </div>

      {/* Status */}
      <Card className="border-border/50">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-sm font-semibold">{complaint.title}</h2>
              <div className="flex items-center gap-1.5 mt-1.5">
                <MapPin className="h-3 w-3 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">{complaint.location}</p>
              </div>
            </div>
            <Badge variant={complaint.status === "resolved" ? "secondary" : "default"} className="text-[10px]">{complaint.status}</Badge>
          </div>
          <Separator className="my-3" />
          <p className="text-sm text-muted-foreground">{complaint.description}</p>
          <div className="flex items-center gap-3 mt-3">
            <Badge variant="outline" className="text-[10px]">{complaint.category}</Badge>
            <Badge variant="outline" className="text-[10px]">{complaint.priority} priority</Badge>
          </div>
        </CardContent>
      </Card>

      {/* AI Analysis */}
      {complaint.aiAnalysis && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Bot className="h-4 w-4 text-primary" />
              <p className="text-xs font-medium text-primary">AI Analysis</p>
            </div>
            <p className="text-xs text-muted-foreground">{complaint.aiAnalysis}</p>
          </CardContent>
        </Card>
      )}

      {/* Timeline */}
      <Card className="border-border/50">
        <CardContent className="p-4">
          <h3 className="text-xs font-semibold mb-4 uppercase tracking-wider text-muted-foreground">Timeline</h3>
          <div className="space-y-4">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`h-7 w-7 rounded-full flex items-center justify-center ${item.done ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                    <item.icon className="h-3.5 w-3.5" />
                  </div>
                  {i < timeline.length - 1 && <div className="w-px h-full bg-border mt-1" />}
                </div>
                <div className="pb-4">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{item.label}</p>
                    <span className="text-[10px] font-mono text-muted-foreground">{item.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Meta */}
      <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
        <Clock className="h-3 w-3" />
        <span>Created {new Date(complaint.createdAt).toLocaleString()}</span>
      </div>
    </div>
  );
}
