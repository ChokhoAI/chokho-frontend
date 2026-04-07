"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { routes, complaints, getSeverityBorder } from "@/lib/mock-data";
import { ArrowLeft, Navigation, MapPin, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import MapDynamic from "@/components/map";

export default function WorkerRoute() {
  const route = routes[0];
  const routeComplaints = (route.stops || [])
    .map(s => complaints.find(c => c.id === s.complaintId))
    .filter((c): c is NonNullable<typeof c> => c !== undefined);
  const resolvedStops = routeComplaints.filter(c => c.cleaned).length;

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
      <div className="overflow-hidden rounded-xl text-black z-0 relative">
        <div className="h-[300px] sm:h-[400px] lg:h-[500px] relative z-0">
          <MapDynamic type="worker-route" routeId={route.id} />
          <Badge className="absolute top-3 right-3 text-[10px] z-10 shadow-md">LIVE</Badge>
        </div>
      </div>

      {/* Route Stats */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="border-border/50"><CardContent className="p-3 text-center"><p className="text-lg font-serif font-bold">{resolvedStops}</p><p className="text-[10px] text-muted-foreground">Done</p></CardContent></Card>
        <Card className="border-border/50"><CardContent className="p-3 text-center"><p className="text-lg font-serif font-bold">{routeComplaints.length - resolvedStops}</p><p className="text-[10px] text-muted-foreground">Remaining</p></CardContent></Card>
        <Card className="border-border/50"><CardContent className="p-3 text-center"><p className="text-lg font-serif font-bold">{route.estimatedTime}</p><p className="text-[10px] text-muted-foreground">ETA</p></CardContent></Card>
      </div>

      {/* Complaint Stops */}
      <div>
        <h2 className="text-sm font-semibold mb-3">Complaint Stops</h2>
        <div className="space-y-2">
          {routeComplaints.map((c, i) => (
            <Card key={c.id} className={`border-l-4 ${getSeverityBorder(c.severityScore)} ${c.cleaned ? "opacity-50" : ""}`}>
              <CardContent className="p-3 flex items-center gap-3">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${c.cleaned ? "bg-emerald-500/20 text-emerald-500" : "bg-muted text-muted-foreground"}`}>
                  {c.cleaned ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{c.category} — {c.location}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-mono text-muted-foreground">{c.id}</span>
                    <span className={`text-[10px] font-mono font-bold ${c.severityScore >= 8 ? "text-red-500" : c.severityScore >= 5 ? "text-orange-500" : "text-amber-400"}`}>
                      Severity: {c.severityScore}
                    </span>
                  </div>
                </div>
                {!c.cleaned && (
                  <Link href="/worker/verify">
                    <Button size="sm" variant="outline" className="text-xs h-7 cursor-pointer">
                      Verify
                    </Button>
                  </Link>
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
