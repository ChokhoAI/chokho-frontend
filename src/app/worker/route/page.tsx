"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { bins, routes } from "@/lib/mock-data";
import { ArrowLeft, Navigation, MapPin, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import MapDynamic from "@/components/map";

export default function WorkerRoute() {
  const route = routes[0];

  return (
    <div className="px-4 py-4 space-y-4">
      <div className="flex items-center gap-3">
        <Link href="/worker/dashboard" className="p-2 -ml-2 rounded-md hover:bg-muted transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-lg font-serif font-semibold">{route.name}</h1>
          <p className="text-[10px] font-mono text-muted-foreground">{route.id} • {route.ward}</p>
        </div>
      </div>

      {/* Map */}
      <Card className="border-border/50 overflow-hidden">
        <div className="h-48 relative">
          <MapDynamic type="worker-route" routeId={route.id} />
          <Badge className="absolute top-3 right-3 text-[10px] z-10 shadow-md">LIVE</Badge>
        </div>
      </Card>

      {/* Route Stats */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="border-border/50"><CardContent className="p-3 text-center"><p className="text-lg font-serif font-bold">{route.completedBins}</p><p className="text-[10px] text-muted-foreground">Done</p></CardContent></Card>
        <Card className="border-border/50"><CardContent className="p-3 text-center"><p className="text-lg font-serif font-bold">{route.totalBins - route.completedBins}</p><p className="text-[10px] text-muted-foreground">Remaining</p></CardContent></Card>
        <Card className="border-border/50"><CardContent className="p-3 text-center"><p className="text-lg font-serif font-bold">{route.estimatedTime}</p><p className="text-[10px] text-muted-foreground">ETA</p></CardContent></Card>
      </div>

      {/* Bin List */}
      <div>
        <h2 className="text-sm font-semibold mb-3">Bin Stops</h2>
        <div className="space-y-2">
          {bins.map((bin, i) => (
            <Card key={bin.id} className={`border-border/50 ${i < 2 ? "opacity-50" : ""}`}>
              <CardContent className="p-3 flex items-center gap-3">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${i < 2 ? "bg-emerald-500/20 text-emerald-500" : "bg-muted text-muted-foreground"}`}>
                  {i < 2 ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{bin.location}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-mono text-muted-foreground">{bin.id}</span>
                    <Badge variant="outline" className="text-[9px]">{bin.fillLevel}% full</Badge>
                  </div>
                </div>
                {i >= 2 && (
                  <Button size="sm" variant="outline" className="text-xs h-7 cursor-pointer">
                    Collect
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Button className="w-full h-11 font-medium cursor-pointer">
        <Navigation className="h-4 w-4 mr-2" /> Start Navigation
      </Button>
    </div>
  );
}
