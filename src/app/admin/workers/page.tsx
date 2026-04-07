"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { workers } from "@/lib/mock-data";
import { Search, Filter, Phone, MapPin, Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function WorkersManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-serif font-bold">Worker Logs</h1><p className="text-sm text-muted-foreground mt-1">Monitor and manage field workers</p></div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 cursor-pointer"><Filter className="h-3.5 w-3.5" /> Filter</Button>
          <Button size="sm" className="cursor-pointer">Add Worker</Button>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search workers..." className="pl-9 h-9 bg-muted/50" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {workers.map((w) => (
          <Card key={w.id} className="border-border/50 hover:bg-muted/20 transition-colors cursor-pointer">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10"><AvatarFallback className="bg-primary/20 text-primary text-sm font-semibold">{w.name.split(" ").map(n => n[0]).join("")}</AvatarFallback></Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium truncate">{w.name}</p>
                    <Badge variant={w.status === "on-shift" ? "default" : w.status === "off-duty" ? "secondary" : "outline"} className="text-[9px] shrink-0">{w.status}</Badge>
                  </div>
                  <p className="text-[10px] font-mono text-muted-foreground">{w.employeeId}</p>
                </div>
              </div>
              <div className="mt-3 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="h-3 w-3" />{w.ward}</div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Phone className="h-3 w-3" />{w.phone}</div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                <div className="flex items-center gap-1"><Star className="h-3 w-3 text-amber-500" /><span className="text-xs font-medium">{w.rating}</span></div>
                <span className="text-[10px] text-muted-foreground">{w.binsCollected} bins today</span>
                {w.assignedRoute && <Badge variant="outline" className="text-[9px]">{w.assignedRoute}</Badge>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
