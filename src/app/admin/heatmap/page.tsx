"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { bins } from "@/lib/mock-data";
import { Flame, MapPin, Clock, Layers } from "lucide-react";
import MapDynamic from "@/components/map";

export default function HeatmapPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-serif font-bold">Operational Heatmap</h1><p className="text-sm text-muted-foreground mt-1">Real-time intensity visualization</p></div>
        <div className="flex gap-2">
          <Select defaultValue="today">
            <SelectTrigger className="w-32 h-9 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="complaints">
            <SelectTrigger className="w-36 h-9 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="complaints">Complaints</SelectItem>
              <SelectItem value="bins">Bin Fill Level</SelectItem>
              <SelectItem value="routes">Active Routes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Map */}
      <Card className="border-border/50 overflow-hidden text-black z-0">
        <div className="h-[500px] relative z-0">
          <MapDynamic type="heatmap" />
          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm p-3 rounded-lg border border-border z-50 text-card-foreground shadow-lg">
            <p className="text-[10px] font-semibold mb-2">Intensity</p>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-8 rounded-full bg-emerald-500" />
              <div className="h-2 w-8 rounded-full bg-amber-500" />
              <div className="h-2 w-8 rounded-full bg-destructive" />
            </div>
            <div className="flex justify-between text-[9px] text-muted-foreground mt-1">
              <span>Low</span><span>High</span>
            </div>
          </div>
          {/* Layer control */}
          <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm p-2 rounded-lg border border-border z-50 text-card-foreground shadow-lg cursor-pointer hover:bg-muted/50 transition-colors">
            <Layers className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </Card>

      {/* Hotspot Bins */}
      <div>
        <h2 className="text-sm font-semibold mb-3">Hotspot Areas</h2>
        <div className="grid grid-cols-3 gap-3">
          {bins.filter(b => b.fillLevel > 70).map((bin) => (
            <Card key={bin.id} className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-muted-foreground">{bin.id}</span>
                  <Badge variant={bin.fillLevel > 85 ? "destructive" : "default"} className="text-[10px]">{bin.fillLevel}%</Badge>
                </div>
                <p className="text-sm font-medium">{bin.location}</p>
                <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-muted-foreground">
                  <MapPin className="h-3 w-3" />{bin.ward}
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-[10px] text-muted-foreground">
                  <Clock className="h-3 w-3" />Last: {new Date(bin.lastCollected).toLocaleString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
