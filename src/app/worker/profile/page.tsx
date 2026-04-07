"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Phone, MapPin, Clock, Award, Star, Bell, LogOut } from "lucide-react";

export default function WorkerProfile() {
  return (
    <div className="px-4 py-4 space-y-5">
      <Card className="border-border/50">
        <CardContent className="p-5">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16"><AvatarFallback className="bg-primary/20 text-primary text-xl font-serif">RN</AvatarFallback></Avatar>
            <div>
              <h1 className="text-lg font-serif font-semibold">Ramesh Negi</h1>
              <p className="text-xs text-muted-foreground font-mono">EMP-4521</p>
              <Badge className="mt-1.5 text-[10px]">On Shift</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-muted-foreground" /><div><p className="text-xs text-muted-foreground">Phone</p><p className="text-sm">+91 98765 43210</p></div></div>
          <Separator />
          <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-muted-foreground" /><div><p className="text-xs text-muted-foreground">Assigned Ward</p><p className="text-sm">Ward 12 — Clock Tower</p></div></div>
          <Separator />
          <div className="flex items-center gap-3"><Clock className="h-4 w-4 text-muted-foreground" /><div><p className="text-xs text-muted-foreground">Current Shift</p><p className="text-sm">06:00 AM — 02:00 PM</p></div></div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-3">
        <Card className="border-border/50"><CardContent className="p-3 text-center"><Award className="h-4 w-4 text-primary mx-auto mb-1" /><p className="text-lg font-serif font-bold">34</p><p className="text-[10px] text-muted-foreground">Today</p></CardContent></Card>
        <Card className="border-border/50"><CardContent className="p-3 text-center"><Star className="h-4 w-4 text-amber-500 mx-auto mb-1" /><p className="text-lg font-serif font-bold">4.8</p><p className="text-[10px] text-muted-foreground">Rating</p></CardContent></Card>
        <Card className="border-border/50"><CardContent className="p-3 text-center"><Clock className="h-4 w-4 text-emerald-500 mx-auto mb-1" /><p className="text-lg font-serif font-bold">247</p><p className="text-[10px] text-muted-foreground">This Month</p></CardContent></Card>
      </div>

      <Card className="border-border/50">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between"><div className="flex items-center gap-3"><Bell className="h-4 w-4 text-muted-foreground" /><span className="text-sm">Route Notifications</span></div><Switch defaultChecked /></div>
        </CardContent>
      </Card>

      <Button variant="outline" className="w-full gap-2 text-destructive border-destructive/30 hover:bg-destructive/10 cursor-pointer">
        <LogOut className="h-4 w-4" /> Sign Out
      </Button>
    </div>
  );
}
