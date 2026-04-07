"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { routes } from "@/lib/mock-data";
import { Map, Navigation, Clock, Package, TrendingUp } from "lucide-react";
import MapDynamic from "@/components/map";

export default function RoutesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-serif font-bold">Route Optimization</h1><p className="text-sm text-muted-foreground mt-1">AI-optimized collection routes</p></div>
        <Badge variant="outline" className="gap-1.5"><TrendingUp className="h-3 w-3 text-emerald-500" /> 94% Efficient</Badge>
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
          const progress = r.totalBins > 0 ? (r.completedBins / r.totalBins) * 100 : 0;
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
                  <span className="flex items-center gap-1"><Package className="h-3 w-3" />{r.completedBins}/{r.totalBins}</span>
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
