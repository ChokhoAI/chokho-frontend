"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Moon, LogOut, Loader2, Phone, Calendar } from "lucide-react";
import { citizenApi } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { formatDate } from "@/lib/utils";

export default function CitizenProfile() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
    citizenApi.getProfile()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    try {
      await citizenApi.logout();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast({
        title: "Signed Out",
        description: "Your session has been securely ended.",
      });
      router.push("/login");
    } catch (error) {
      // Fallback
      localStorage.removeItem("token");
      router.push("/login");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm font-mono text-muted-foreground">Fetching profile data...</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="px-4 py-4 space-y-5">
      {/* Profile Header */}
      <Card className="border-border/50">
        <CardContent className="p-5">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary/20 text-primary text-xl font-serif">
                {(data.name || data.username || "C").split(" ").map((n: string) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-serif font-semibold">{data.name || data.username || "Citizen User"}</h1>
              <p className="text-xs text-muted-foreground font-mono">@{data.username || "citizen"}</p>
              <Badge className="mt-1.5 text-[10px] uppercase tracking-widest">Verified Citizen</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Info */}
      <Card className="border-border/50">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center gap-3">
             <Phone className="h-4 w-4 text-muted-foreground" />
             <div>
               <p className="text-[10px] text-muted-foreground uppercase font-mono">Mobile Contact</p>
               <p className="text-sm font-medium">{data.phoneNumber || data.phone || data.phoneNo || "NA"}</p>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <Calendar className="h-4 w-4 text-muted-foreground" />
             <div>
               <p className="text-[10px] text-muted-foreground uppercase font-mono">Registration Date</p>
               <p className="text-sm font-medium">{data.createdAt ? formatDate(data.createdAt) : "Recently Joined"}</p>
             </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card className="border-border/50">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3"><Moon className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-medium">Dark Mode Appearance</span></div>
            <Switch 
              checked={mounted && theme === "dark"} 
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} 
            />
          </div>
        </CardContent>
      </Card>

      <Button 
        onClick={handleLogout}
        variant="outline" 
        className="w-full gap-2 text-destructive border-destructive/30 hover:bg-destructive/10 cursor-pointer"
      >
        <LogOut className="h-4 w-4" /> Sign Out from Chokho AI
      </Button>
    </div>
  );
}
