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
      <Card className="border-border/50 overflow-hidden text-black z-0">
        <div className="h-72 relative z-0">
          <MapDynamic type="admin-routes" />
        </div>
      </Card>

      {/* Route Cards */}
      <div className="grid grid-cols-2 gap-4">
        {routes.map((r) => {
          const routeComplaints = (r.stops || [])
            .map(s => complaints.find(c => c.id === s.complaintId))
            .filter((c): c is NonNullable<typeof c> => c !== undefined);
          const resolvedStops = routeComplaints.filter(c => c.cleaned).length;
          const progress = routeComplaints.length > 0 ? (resolvedStops / routeComplaints.length) * 100 : 0;

          return (
            <Card key={r.id} className="border-border/50 hover:bg-muted/20 transition-colors cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant={r.status === "active" ? "default" : r.status === "completed" ? "secondary" : "outline"} className="text-[10px]">{r.status}</Badge>
                  <span className="text-[10px] font-mono text-muted-foreground">{r.id}</span>
                </div>
                <h3 className="text-sm font-semibold">{r.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{r.ward}</p>
                <Progress value={progress} className="h-1.5 mt-3 mb-2" />
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1"><AlertTriangle className="h-3 w-3" />{resolvedStops}/{routeComplaints.length} stops</span>
                  <span className="flex items-center gap-1"><Navigation className="h-3 w-3" />{r.distance}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{r.estimatedTime}</span>
                </div>
                {r.assignedWorker && <p className="text-[10px] text-primary mt-2">{r.assignedWorker} • {r.assignedVehicle}</p>}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
