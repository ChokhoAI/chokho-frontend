"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { complaints } from "@/lib/mock-data";
import { Flame, MapPin, Clock, Layers } from "lucide-react";
import MapDynamic from "@/components/map";

export default function HeatmapPage() {
  const highSeverity = complaints.filter(c => c.severityScore >= 7);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-serif font-bold">Operational Heatmap</h1><p className="text-sm text-muted-foreground mt-1">Complaint severity visualization</p></div>
        <div className="flex gap-2">
          <Select defaultValue="today">
            <SelectTrigger className="w-32 h-9 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Map */}
      <div className="overflow-hidden rounded-xl text-black z-0 relative">
        <div className="h-[500px] relative z-0">
          <MapDynamic type="heatmap" />
          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm p-3 rounded-lg border border-border z-50 text-card-foreground shadow-lg">
            <p className="text-[10px] font-semibold mb-2">Severity</p>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-8 rounded-full bg-amber-400" />
              <div className="h-2 w-8 rounded-full bg-orange-500" />
              <div className="h-2 w-8 rounded-full bg-red-500" />
            </div>
            <div className="flex justify-between text-[9px] text-muted-foreground mt-1">
              <span>1-4</span><span>5-7</span><span>8-10</span>
            </div>
          </div>
          <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm p-2 rounded-lg border border-border z-50 text-card-foreground shadow-lg cursor-pointer hover:bg-muted/50 transition-colors">
            <Layers className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* High Severity Complaints */}
      <div>
        <h2 className="text-sm font-semibold mb-3">High Severity Complaints</h2>
        <div className="grid grid-cols-3 gap-3">
          {highSeverity.map((c) => (
            <Card key={c.id} className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-muted-foreground">{c.id}</span>
                  <span className={`text-xs font-mono font-bold ${c.severityScore >= 8 ? "text-red-500" : "text-orange-500"}`}>{c.severityScore}/10</span>
                </div>
                <p className="text-sm font-medium">{c.category}</p>
                <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-muted-foreground">
                  <MapPin className="h-3 w-3" />{c.location}
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-[10px] text-muted-foreground">
                  <Clock className="h-3 w-3" />{new Date(c.createdAt).toLocaleString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
