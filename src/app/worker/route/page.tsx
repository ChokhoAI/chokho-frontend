"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { workerDashboardData, workerRouteComplaints, getSeverityBorder } from "@/lib/mock-data";
import { ArrowLeft, Navigation, MapPin, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import MapDynamic from "@/components/map";

export default function WorkerRoute() {
  const clusterId = workerDashboardData.clusterId;
  const stops = workerRouteComplaints;
  const resolvedStops = stops.filter(s => s.status === "RESOLVED").length;

  return (
    <div className="px-4 py-4 space-y-4">
      <div className="flex items-center gap-3">
        <Link href="/worker/dashboard" className="p-2 -ml-2 rounded-md hover:bg-muted transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-lg font-serif font-semibold">Active Route Assignment</h1>
          <p className="text-[10px] font-mono text-muted-foreground">{clusterId}</p>
        </div>
      </div>

      {/* Map */}
      <div className="overflow-hidden rounded-xl text-black z-0 relative">
        <div className="h-[300px] sm:h-[400px] lg:h-[500px] relative z-0">
          <MapDynamic type="worker-route" />
          <Badge className="absolute top-3 right-3 text-[10px] z-10 shadow-md">LIVE</Badge>
        </div>
      </div>

      {/* Complaint Stops */}
      <div>
        <h2 className="text-sm font-semibold mb-3">Stops in Sequence</h2>
        <div className="space-y-2">
          {stops.map((s) => (
            <Card key={s.id} className={`border-l-4 ${getSeverityBorder(s.severityScore)} ${s.status === "RESOLVED" ? "opacity-50" : ""}`}>
              <CardContent className="p-3 flex items-center gap-3">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${s.status === "RESOLVED" ? "bg-emerald-500/20 text-emerald-500" : "bg-muted text-muted-foreground"}`}>
                  {s.status === "RESOLVED" ? <CheckCircle2 className="h-4 w-4" /> : s.sequenceNo}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{s.location}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-mono text-muted-foreground">ID: {s.id}</span>
                    <span className={`text-[10px] font-mono font-bold ${s.severityScore >= 8 ? "text-red-500" : s.severityScore >= 5 ? "text-orange-500" : "text-amber-400"}`}>
                      Severity: {s.severityScore}
                    </span>
                  </div>
                </div>
                {s.status !== "RESOLVED" && (
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

      <Button variant="destructive" className="w-full h-11 font-medium cursor-pointer">
        <CheckCircle2 className="h-4 w-4 mr-2" /> End Route
      </Button>
    </div>
  );
}
