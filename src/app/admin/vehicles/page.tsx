"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { vehicles } from "@/lib/mock-data";
import { Search, Filter, Truck } from "lucide-react";

export default function VehiclesManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-serif font-bold">Fleet Management</h1><p className="text-sm text-muted-foreground mt-1">Monitor vehicle assignments</p></div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 cursor-pointer"><Filter className="h-3.5 w-3.5" /> Filter</Button>
          <Button size="sm" className="cursor-pointer">Add Vehicle</Button>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search vehicles..." className="pl-9 h-9 bg-muted/50" />
      </div>

      <Card className="border-border/50">
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Vehicle</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Type</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Driver</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Route</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((v) => (
                <tr key={v.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{v.registrationNumber}</p>
                        <p className="text-[10px] font-mono text-muted-foreground">{v.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4"><Badge variant="outline" className="text-[10px] capitalize">{v.type}</Badge></td>
                  <td className="p-4"><Badge variant={v.status === "active" ? "default" : v.status === "maintenance" ? "destructive" : "secondary"} className="text-[10px]">{v.status}</Badge></td>
                  <td className="p-4 text-sm">{v.assignedDriver || "—"}</td>
                  <td className="p-4 text-xs font-mono text-muted-foreground">{v.assignedRoute || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
