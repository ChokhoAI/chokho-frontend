"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { workerDashboardData, workerRouteComplaints, getSeverityBorder } from "@/lib/mock-data";
import { MapPin, Navigation, Clock, TrendingUp, ChevronRight, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function WorkerDashboard() {
  const routeProgress = workerDashboardData.totalRouteComplaints > 0 
    ? (workerDashboardData.resolvedRouteComplaints / workerDashboardData.totalRouteComplaints) * 100 
    : 0;

  return (
    <div className="px-4 py-4 pb-6 space-y-6">
      <div>
        <h1 className="text-xl font-serif font-semibold">Hello, {workerDashboardData.name}</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          <span className="font-mono text-[10px]">{workerDashboardData.empId}</span>
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
              <Badge className="text-[10px]">{workerDashboardData.clusterId}</Badge>
            </div>
            <h2 className="text-lg font-serif font-bold">Current Ward Cleanout</h2>
            <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wide">Vehicle: {workerDashboardData.vehicleNumber} • Status: {workerDashboardData.routeStatus}</p>
            <Progress value={routeProgress} className="h-2 mb-2" />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>{workerDashboardData.resolvedRouteComplaints}/{workerDashboardData.totalRouteComplaints} stops completed</span>
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
            <p className="text-2xl font-serif font-bold">{workerDashboardData.totalRouteComplaints}</p>
            <p className="text-[10px] text-muted-foreground">Complaints Assigned</p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-3">
            <TrendingUp className="h-4 w-4 text-emerald-500 mb-2" />
            <p className="text-2xl font-serif font-bold">{workerDashboardData.totalRouteComplaints - workerDashboardData.resolvedRouteComplaints}</p>
            <p className="text-[10px] text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex">
        <Link href="/worker/verify" className="w-full">
          <Button variant="outline" className="w-full h-12 gap-2 cursor-pointer">
            <AlertTriangle className="h-4 w-4" /> Verify Cleanup
          </Button>
        </Link>
      </div>

      {/* Assigned Complaints */}
      <div>
        <h2 className="text-sm font-semibold mb-3">Assigned Complaints</h2>
        <div className="space-y-2">
          {workerRouteComplaints.map((c) => (
            <Card key={c.id} className={`border-l-4 ${getSeverityBorder(c.severityScore)} ${c.status === "RESOLVED" ? "bg-emerald-500/5 opacity-60" : ""}`}>
              <CardContent className="p-3 flex items-center gap-3">
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold ${c.severityScore >= 8 ? "bg-red-500/20 text-red-500" : c.severityScore >= 5 ? "bg-orange-500/20 text-orange-500" : "bg-amber-400/20 text-amber-400"}`}>
                  {c.severityScore}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{c.location}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <p className="text-[10px] text-muted-foreground font-mono">ID: {c.id}</p>
                    <Badge variant="outline" className="text-[9px] ml-1">{c.status.replace('_', ' ')}</Badge>
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
