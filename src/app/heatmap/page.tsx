"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { complaints } from "@/lib/mock-data";
import { Flame, MapPin, Clock, Layers, ArrowLeft } from "lucide-react";
import MapDynamic from "@/components/map";
import { useRouter } from "next/navigation";

export default function HeatmapPage() {
  const router = useRouter();
  const highSeverity = complaints.filter(c => c.severityScore >= 7);

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between gap-4 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()} 
            className="p-2 rounded-full hover:bg-muted transition-colors border border-border cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">Public Health Heatmap</h1>
            <p className="text-sm text-muted-foreground mt-1">Real-time waste severity visualization across the city</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest">Live System</span>
        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-6xl mx-auto w-full">
        <div className="overflow-hidden rounded-2xl border border-border shadow-2xl relative">
          <div className="h-[500px] sm:h-[600px] lg:h-[700px] relative z-0">
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
      </div>

      {/* High Severity Complaints Section */}
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="h-5 w-5 text-red-500" />
          <h2 className="text-lg font-serif font-semibold">Critical Situations</h2>
          <Badge variant="outline" className="ml-2 text-[10px]">{highSeverity.length} reports</Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {highSeverity.map((c) => (
            <Card key={c.id} className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all hover:shadow-lg group">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-muted-foreground group-hover:text-primary transition-colors">{c.id}</span>
                  <div className={paddingClass(c.severityScore)}>
                    <span className={`text-xs font-mono font-bold ${c.severityScore >= 8 ? "text-red-500" : "text-orange-500"}`}>{c.severityScore}/10</span>
                  </div>
                </div>
                <h3 className="text-base font-medium mb-2">{c.category}</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    <span className="truncate">{c.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Reported {new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
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

const paddingClass = (s: number) => `px-2 py-0.5 rounded font-mono text-[10px] border ${s >= 8 ? "bg-red-500/10 border-red-500/20" : "bg-orange-500/10 border-orange-500/20"}`;
