"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"citizen" | "worker" | "admin">("citizen");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push(`/${role}/dashboard`);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background relative">
      {/* Ambient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[150px] pointer-events-none" />

      <Card className="w-full max-w-sm border-border/50 bg-white/35 dark:bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <Image src="/logo.png" alt="Chokho" width={72} height={72} />
          </div>
          <div>
            <CardTitle className="text-2xl font-serif">Chokho</CardTitle>
            <CardDescription className="font-mono text-xs tracking-wider mt-1">
              SMART WASTE MANAGEMENT
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Role Selection — Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="role" className="text-xs">Sign in as</Label>
              <Select value={role} onValueChange={(v) => setRole(v as typeof role)}>
                <SelectTrigger id="role" className="bg-muted/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="citizen">Citizen</SelectItem>
                  <SelectItem value="worker">Worker</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs">
                {role === "citizen" ? "Email or Phone" : "Employee ID"}
              </Label>
              <Input
                id="email"
                placeholder={role === "citizen" ? "you@example.com" : "EMP-XXXX"}
                className="h-10 bg-muted/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="h-10 bg-muted/50"
              />
            </div>

            <Button type="submit" className="w-full h-10 font-medium cursor-pointer" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </Button>

            {role === "citizen" ? (
              <p className="text-center text-[11px] text-muted-foreground pt-1">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-primary font-bold hover:underline underline-offset-4">
                  Sign up
                </Link>
              </p>
            ) : (
              <p className="text-center text-[10px] text-muted-foreground font-mono">
                Use your Employee ID to login
              </p>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="absolute bottom-6 text-center">
        <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest opacity-80">
          Towards a Trash-Free Uttarakhand — CHOKHO
        </p>
      </div>
    </div>
  );
}
