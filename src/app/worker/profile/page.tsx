"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { workerProfileData } from "@/lib/mock-data";
import { Phone, MapPin, Award, LogOut } from "lucide-react";

export default function WorkerProfile() {
  return (
    <div className="px-4 py-4 space-y-5">
      <Card className="border-border/50">
        <CardContent className="p-5">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16"><AvatarFallback className="bg-primary/20 text-primary text-xl font-serif">{workerProfileData.name.split(" ").map(n => n[0]).join("")}</AvatarFallback></Avatar>
            <div>
              <h1 className="text-lg font-serif font-semibold">{workerProfileData.name}</h1>
              <p className="text-xs text-muted-foreground font-mono">{workerProfileData.empId}</p>
              <Badge className="mt-1.5 text-[10px]">Active Worker</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-muted-foreground" /><div><p className="text-xs text-muted-foreground">Phone</p><p className="text-sm">{workerProfileData.phone}</p></div></div>
          <Separator />
          <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-muted-foreground" /><div><p className="text-xs text-muted-foreground">Ward</p><p className="text-sm">Ward 12, Dehradun</p></div></div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Card className="border-border/50"><CardContent className="p-3 text-center"><MapPin className="h-4 w-4 text-primary mx-auto mb-1" /><p className="text-lg font-serif font-bold">{workerProfileData.totalCompletedRoutes}</p><p className="text-[10px] text-muted-foreground">Routes Completed</p></CardContent></Card>
        <Card className="border-border/50"><CardContent className="p-3 text-center"><Award className="h-4 w-4 text-emerald-500 mx-auto mb-1" /><p className="text-lg font-serif font-bold">{workerProfileData.totalVerifications}</p><p className="text-[10px] text-muted-foreground">Verifications</p></CardContent></Card>
      </div>

      <Button variant="outline" className="w-full gap-2 text-destructive border-destructive/30 hover:bg-destructive/10 cursor-pointer">
        <LogOut className="h-4 w-4" /> Sign Out
      </Button>
    </div>
  );
}
