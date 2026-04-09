"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { adminDashboardData, complaints, routes, chartData } from "@/lib/mock-data";
import { Users, AlertTriangle, TrendingUp, Truck, MapPin, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from "recharts";

const PIE_COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold">Command Center</h1>
        <p className="text-sm text-muted-foreground mt-1">Dehradun Metropolitan — Real-time Overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Complaints", value: adminDashboardData.totalComplaints.toString(), icon: AlertTriangle, color: "text-amber-500", sub: "reported" },
          { label: "Workers", value: adminDashboardData.totalWorkers.toString(), icon: Users, color: "text-emerald-500", sub: "registered" },
          { label: "Open Complaints", value: adminDashboardData.totalPendingComplaints.toString(), icon: AlertTriangle, color: "text-red-500", sub: `pending action` },
          { label: "Fleet Active", value: `${adminDashboardData.totalActiveVehicles}/${adminDashboardData.totalVehicles}`, icon: Truck, color: "text-blue-400", sub: `vehicles deployed` },
        ].map((stat) => (
          <Card key={stat.label} className="border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                <Badge variant="outline" className="text-[9px] font-mono">{stat.sub}</Badge>
              </div>
              <p className="text-2xl font-serif font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Efficiency */}
      <Card className="border-border/50">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div><p className="text-sm font-medium">System Efficiency</p><p className="text-xs text-muted-foreground">Based on resolution rate and response time</p></div>
            <div className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-emerald-500" /><span className="text-2xl font-serif font-bold">{adminDashboardData.efficiency}%</span></div>
          </div>
          <Progress value={adminDashboardData.efficiency} className="h-2" />
        </CardContent>
      </Card>


      {/* Active Routes & Recent Complaints */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-border/50">
          <CardHeader className="pb-2"><CardTitle className="text-sm">Active Routes</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {routes.filter(r => r.status === "active").map((r) => (
              <div key={r.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-[10px] font-mono text-primary font-bold">{r.stops.length}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{r.name}</p>
                  <p className="text-[10px] text-muted-foreground">{r.assignedWorker} • {r.distance}</p>
                </div>
                <Badge variant="outline" className="text-[9px]">{r.id}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-2"><CardTitle className="text-sm">Recent Complaints</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {complaints.slice(0, 4).map((c) => (
              <div key={c.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                <div className={`h-2 w-2 rounded-full shrink-0 ${c.severityScore >= 8 ? "bg-red-500" : c.severityScore >= 5 ? "bg-orange-500" : "bg-amber-400"}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{c.category} — {c.location}</p>
                  <div className="flex items-center gap-1.5 mt-0.5"><MapPin className="h-3 w-3 text-muted-foreground" /><p className="text-[10px] text-muted-foreground truncate">{c.location}</p></div>
                </div>
                <Badge variant={c.status === "resolved" ? "secondary" : c.status === "in-progress" ? "default" : "outline"} className="text-[9px] shrink-0">{c.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <p className="text-[9px] font-mono text-muted-foreground text-center">CHOKHO CIVIC INTELLIGENCE • SYS_STATUS: NOMINAL • LAST_SYNC: {new Date().toLocaleTimeString()}</p>
    </div>
  );
}
