"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { routes, complaints } from "@/lib/mock-data";
import { Map, Navigation, Clock, AlertTriangle, TrendingUp } from "lucide-react";
import MapDynamic from "@/components/map";

export default function RoutesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-serif font-bold">Route Optimization</h1><p className="text-sm text-muted-foreground mt-1">AI-optimized collection routes</p></div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 cursor-pointer"><TrendingUp className="h-3.5 w-3.5 text-emerald-500" /> Optimize Routes</Button>
          <Badge variant="outline" className="gap-1.5"><TrendingUp className="h-3 w-3 text-emerald-500" /> 94% Efficient</Badge>
        </div>
      </div>

      {/* Map */}
      <div className="overflow-hidden rounded-xl text-black z-0 relative">
        <div className="h-[500px] relative z-0">
          <MapDynamic type="admin-routes" />
        </div>
      </div>

      {/* Route Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {routes.map((r) => {
          // In a real scenario, we would map these to clusters and their complaint IDs
          // For now, we align the UI to show the Cluster ID and basic completion status
          return (
            <Card key={r.id} className="border-border/50 hover:bg-muted/20 transition-colors cursor-pointer group">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant={r.status === "active" ? "default" : r.status === "completed" ? "secondary" : "outline"} className="text-[10px]">
                    {r.status === "active" ? "OPTIMIZED" : r.status.toUpperCase()}
                  </Badge>
                  <span className="text-[10px] font-mono text-muted-foreground group-hover:text-primary transition-colors">{r.id}</span>
                </div>
                <h3 className="text-sm font-semibold mb-2">Automated Cluster Analysis</h3>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground mt-4">
                  <span className="flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> {r.stops.length} Points of Interest</span>
                  <span className="flex items-center gap-1"><Navigation className="h-3 w-3 text-emerald-500" /> AI Sequenced</span>
                </div>
                {r.assignedWorker && (
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <p className="text-[10px] font-medium text-primary uppercase tracking-wider">Assigned Dispatch</p>
                    <p className="text-xs mt-1">{r.assignedWorker} • {r.assignedVehicle}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
