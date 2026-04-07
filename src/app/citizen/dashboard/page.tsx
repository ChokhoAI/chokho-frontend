"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { dashboardStats, complaints } from "@/lib/mock-data";
import { AlertTriangle, CheckCircle2, Clock, MapPin, Plus, Recycle, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function CitizenDashboard() {
  const recentComplaints = complaints.slice(0, 3);

  return (
    <div className="px-4 py-4 space-y-5">
      {/* Greeting */}
      <div>
        <h1 className="text-xl font-serif font-semibold">Good Morning, Rahul</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Ward 12 — Clock Tower Area</p>
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
            <Recycle className="h-4 w-4 text-primary mx-auto mb-1.5" />
            <p className="text-lg font-serif font-bold">{dashboardStats.totalBins}</p>
            <p className="text-[10px] text-muted-foreground">Active Bins</p>
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
            <AlertTriangle className="h-4 w-4 text-amber-500 mx-auto mb-1.5" />
            <p className="text-lg font-serif font-bold">{dashboardStats.totalComplaints - dashboardStats.resolvedComplaints}</p>
            <p className="text-[10px] text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
      </div>

      {/* Next Pickup */}
      <Card className="border-border/50 bg-primary/5">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Next Scheduled Pickup</p>
            <p className="text-xs text-muted-foreground">Tomorrow, 7:00 AM — Ward 12</p>
          </div>
        </CardContent>
      </Card>

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
              <Card className="border-border/50 hover:bg-muted/30 transition-colors cursor-pointer">
                <CardContent className="p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{c.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="h-3 w-3 text-muted-foreground shrink-0" />
                        <p className="text-xs text-muted-foreground truncate">{c.location}</p>
                      </div>
                    </div>
                    <Badge
                      variant={c.status === "resolved" ? "secondary" : c.status === "in-progress" ? "default" : "outline"}
                      className="text-[10px] shrink-0"
                    >
                      {c.status}
                    </Badge>
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
