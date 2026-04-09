"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { adminWorkers } from "@/lib/mock-data";
import { Phone, Truck, Plus } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function WorkersManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-serif font-bold">Worker Logs</h1><p className="text-sm text-muted-foreground mt-1">Monitor and manage field workers</p></div>
        <Link href="/admin/add?tab=worker">
          <Button size="sm" className="gap-2 cursor-pointer">
            <Plus className="h-4 w-4" /> Add Worker
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {adminWorkers.map((w) => (
          <Card key={w.workerId} className="border-border/50 hover:bg-muted/20 transition-colors cursor-pointer">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10"><AvatarFallback className="bg-primary/20 text-primary text-sm font-semibold">{w.workerName.split(" ").map((n: string) => n[0]).join("")}</AvatarFallback></Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium truncate">{w.workerName}</p>
                    <Badge variant="outline" className="text-[9px] shrink-0">Active</Badge>
                  </div>
                  <p className="text-[10px] font-mono text-muted-foreground">{w.workerId}</p>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <Phone className="h-3.5 w-3.5" />
                  </div>
                  <span className="font-mono text-xs">{w.phoneNo}</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <Truck className="h-3.5 w-3.5" />
                  </div>
                  <span className="font-medium text-xs truncate">Assigned: {w.vehicleNo}</span>
                </div>
              </div>
              <div className="flex items-center justify-end mt-4 pt-4 border-t border-border/50">
                <Button variant="ghost" size="sm" className="h-8 text-[10px] uppercase tracking-wider font-bold">View History</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
