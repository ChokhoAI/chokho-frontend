"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { dashboardStats, complaints, getSeverityBorder } from "@/lib/mock-data";
import { AlertTriangle, CheckCircle2, MapPin, Plus, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function CitizenDashboard() {
  const recentComplaints = complaints.slice(0, 3);

  return (
    <div className="px-4 py-4 space-y-5">
      {/* Greeting */}
      <div>
        <h1 className="text-xl font-serif font-semibold">Good Morning, Rahul</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Dehradun Area</p>
      </div>

      {/* Area Cleanliness Score */}
      <Card className="border-border/50">
        <CardContent className="pt-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Area Cleanliness</p>
              <p className="text-3xl font-serif font-bold mt-1">{dashboardStats.efficiency}%</p>
            </div>
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
          </div>
          <Progress value={dashboardStats.efficiency} className="h-2" />
          <p className="text-[10px] text-muted-foreground mt-2 font-mono">↑ 2.3% from last week</p>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="border-border/50">
          <CardContent className="p-3 text-center">
            <AlertTriangle className="h-4 w-4 text-amber-500 mx-auto mb-1.5" />
            <p className="text-lg font-serif font-bold">{dashboardStats.totalComplaints}</p>
            <p className="text-[10px] text-muted-foreground">Complaints</p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-3 text-center">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto mb-1.5" />
            <p className="text-lg font-serif font-bold">{dashboardStats.resolvedComplaints}</p>
            <p className="text-[10px] text-muted-foreground">Resolved</p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-3 text-center">
            <AlertTriangle className="h-4 w-4 text-destructive mx-auto mb-1.5" />
            <p className="text-lg font-serif font-bold">{dashboardStats.totalComplaints - dashboardStats.resolvedComplaints}</p>
            <p className="text-[10px] text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Action */}
      <Link href="/citizen/complaints/new">
        <Button className="w-full h-11 gap-2 font-medium cursor-pointer">
          <Plus className="h-4 w-4" /> Report a Problem
        </Button>
      </Link>

      {/* Recent Complaints */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold">Recent Activity</h2>
          <Link href="/citizen/complaints" className="text-xs text-primary hover:underline">View all</Link>
        </div>
        <div className="space-y-2">
          {recentComplaints.map((c) => (
            <Link key={c.id} href={`/citizen/complaints/${c.id}`}>
              <Card className={`border-l-4 ${getSeverityBorder(c.severityScore)} ${c.cleaned ? "bg-emerald-500/5" : ""} hover:bg-muted/30 transition-colors cursor-pointer mb-2`}>
                <CardContent className="p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{c.category} — {c.location}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="h-3 w-3 text-muted-foreground shrink-0" />
                        <p className="text-xs text-muted-foreground truncate">{c.location}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge
                        variant={c.status === "resolved" ? "secondary" : c.status === "in-progress" ? "default" : "outline"}
                        className="text-[10px] shrink-0"
                      >
                        {c.status}
                      </Badge>
                      <span className={`text-[10px] font-mono font-bold ${c.severityScore >= 8 ? "text-red-500" : c.severityScore >= 5 ? "text-orange-500" : "text-amber-400"}`}>
                        {c.severityScore}/10
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-2 font-mono">{c.id}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
