"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { routes, complaints, getSeverityBorder } from "@/lib/mock-data";
import { MapPin, Navigation, Clock, TrendingUp, ChevronRight, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function WorkerDashboard() {
  const activeRoute = routes[0];
  const routeComplaints = (activeRoute.stops || [])
    .map(s => complaints.find(c => c.id === s.complaintId))
    .filter((c): c is NonNullable<typeof c> => c !== undefined);
  const resolvedStops = routeComplaints.filter(c => c.cleaned).length;
  const routeProgress = routeComplaints.length > 0 ? (resolvedStops / routeComplaints.length) * 100 : 0;

  return (
    <div className="px-4 py-4 pb-6 space-y-6">
      <div>
        <h1 className="text-xl font-serif font-semibold">Hello, Ramesh</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          <span className="font-mono text-[10px]">EMP-4521</span> — Shift: 06:00 – 14:00
        </p>
      </div>

      {/* Active Route Card */}
      <Link href="/worker/route" className="block w-full">
        <Card className="border-primary/30 bg-primary/5 cursor-pointer hover:bg-primary/10 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Navigation className="h-4 w-4 text-primary" />
                <p className="text-sm font-medium">Active Route</p>
              </div>
              <Badge className="text-[10px]">{activeRoute.id}</Badge>
            </div>
            <h2 className="text-lg font-serif font-bold">{activeRoute.name}</h2>
            <p className="text-xs text-muted-foreground mb-3">{activeRoute.ward} • {activeRoute.distance}</p>
            <Progress value={routeProgress} className="h-2 mb-2" />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>{resolvedStops}/{routeComplaints.length} stops completed</span>
              <span>ETA: {activeRoute.estimatedTime}</span>
            </div>
            <div className="flex items-center justify-end mt-2 text-xs text-primary gap-1">
              <span>View Route</span><ChevronRight className="h-3 w-3" />
            </div>
          </CardContent>
        </Card>
      </Link>

      {/* Today Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="border-border/50">
          <CardContent className="p-3">
            <AlertTriangle className="h-4 w-4 text-primary mb-2" />
            <p className="text-2xl font-serif font-bold">{routeComplaints.length}</p>
            <p className="text-[10px] text-muted-foreground">Complaints Assigned</p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-3">
            <TrendingUp className="h-4 w-4 text-emerald-500 mb-2" />
            <p className="text-2xl font-serif font-bold">{routeComplaints.length - resolvedStops}</p>
            <p className="text-[10px] text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Link href="/worker/verify">
          <Button variant="outline" className="w-full h-12 gap-2 cursor-pointer">
            <AlertTriangle className="h-4 w-4" /> Verify Cleanup
          </Button>
        </Link>
        <Link href="/worker/history">
          <Button variant="outline" className="w-full h-12 gap-2 cursor-pointer">
            <Clock className="h-4 w-4" /> View History
          </Button>
        </Link>
      </div>

      {/* Assigned Complaints */}
      <div>
        <h2 className="text-sm font-semibold mb-3">Assigned Complaints</h2>
        <div className="space-y-2">
          {routeComplaints.map((c) => (
            <Card key={c.id} className={`border-l-4 ${getSeverityBorder(c.severityScore)} ${c.cleaned ? "bg-emerald-500/5 opacity-60" : ""}`}>
              <CardContent className="p-3 flex items-center gap-3">
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold ${c.severityScore >= 8 ? "bg-red-500/20 text-red-500" : c.severityScore >= 5 ? "bg-orange-500/20 text-orange-500" : "bg-amber-400/20 text-amber-400"}`}>
                  {c.severityScore}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{c.category} — {c.location}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <p className="text-[10px] text-muted-foreground font-mono">{c.id}</p>
                    <Badge variant="outline" className="text-[9px] ml-1">{c.priority}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
