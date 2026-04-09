"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { adminVehicles } from "@/lib/mock-data";
import { Truck, User, Plus } from "lucide-react";
import Link from "next/link";

export default function VehiclesManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-serif font-bold">Vehicle Fleet</h1><p className="text-sm text-muted-foreground mt-1">Manage collection vehicles</p></div>
        <Link href="/admin/add?tab=vehicle">
          <Button size="sm" className="gap-2 cursor-pointer">
            <Plus className="h-4 w-4" /> Add Vehicle
          </Button>
        </Link>
      </div>

      <Card className="border-border/50">
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Vehicle No.</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Assigned Worker</th>
              </tr>
            </thead>
            <tbody>
              {adminVehicles.map((v) => (
                <tr key={v.vehicleId} className="border-b border-border/50 hover:bg-muted/30 transition-colors pointer-events-none group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center border border-primary/10">
                        <Truck className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{v.vehicleNo}</p>
                        <p className="text-[10px] font-mono text-muted-foreground">{v.vehicleId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant={v.vehicleStatus === "ACTIVE" ? "default" : "secondary"} className="text-[10px]">
                      {v.vehicleStatus}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                       <User className="h-3.5 w-3.5 text-muted-foreground" />
                       <span className="text-xs">{v.workerName}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
