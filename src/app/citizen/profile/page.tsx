"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { MapPin, Phone, Mail, Award, Bell, Moon, Shield, ChevronRight, LogOut } from "lucide-react";
import Link from "next/link";

export default function CitizenProfile() {
  return (
    <div className="px-4 py-4 space-y-5">
      {/* Profile Header */}
      <Card className="border-border/50">
        <CardContent className="p-5">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary/20 text-primary text-xl font-serif">RS</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-serif font-semibold">Rahul Sharma</h1>
              <p className="text-xs text-muted-foreground font-mono">CIT-001</p>
              <Badge className="mt-1.5 text-[10px]">Active Citizen</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card className="border-border/50">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-muted-foreground" /><div><p className="text-xs text-muted-foreground">Phone</p><p className="text-sm">+91 98765 43210</p></div></div>
          <Separator />
          <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-muted-foreground" /><div><p className="text-xs text-muted-foreground">Email</p><p className="text-sm">rahul.sharma@email.com</p></div></div>
          <Separator />
          <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-muted-foreground" /><div><p className="text-xs text-muted-foreground">Address</p><p className="text-sm">42, Clock Tower Road, Ward 12, Dehradun</p></div></div>
        </CardContent>
      </Card>

      {/* Civic Points */}
      <Card className="border-border/50 bg-primary/5">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center"><Award className="h-6 w-6 text-primary" /></div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Civic Points</p>
            <p className="text-2xl font-serif font-bold">1,240</p>
          </div>
          <Badge variant="outline" className="text-[10px]">Gold Tier</Badge>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="border-border/50"><CardContent className="p-3 text-center"><p className="text-lg font-serif font-bold">12</p><p className="text-[10px] text-muted-foreground">Reports Filed</p></CardContent></Card>
        <Card className="border-border/50"><CardContent className="p-3 text-center"><p className="text-lg font-serif font-bold">10</p><p className="text-[10px] text-muted-foreground">Resolved</p></CardContent></Card>
        <Card className="border-border/50"><CardContent className="p-3 text-center"><p className="text-lg font-serif font-bold">4.8</p><p className="text-[10px] text-muted-foreground">Rating</p></CardContent></Card>
      </div>

      {/* Settings */}
      <Card className="border-border/50">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between"><div className="flex items-center gap-3"><Bell className="h-4 w-4 text-muted-foreground" /><span className="text-sm">Notifications</span></div><Switch defaultChecked /></div>
          <Separator />
          <div className="flex items-center justify-between"><div className="flex items-center gap-3"><Moon className="h-4 w-4 text-muted-foreground" /><span className="text-sm">Dark Mode</span></div><Switch defaultChecked /></div>
          <Separator />
          <Link href="#" className="flex items-center justify-between"><div className="flex items-center gap-3"><Shield className="h-4 w-4 text-muted-foreground" /><span className="text-sm">Privacy & Security</span></div><ChevronRight className="h-4 w-4 text-muted-foreground" /></Link>
        </CardContent>
      </Card>

      <Button variant="outline" className="w-full gap-2 text-destructive border-destructive/30 hover:bg-destructive/10 cursor-pointer">
        <LogOut className="h-4 w-4" /> Sign Out
      </Button>
    </div>
  );
}
