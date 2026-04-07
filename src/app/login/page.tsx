"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

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

      <Card className="w-full max-w-sm border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <Image src="/logo.png" alt="Chokho" width={72} height={72} />
          </div>
          <div>
            <CardTitle className="text-2xl font-serif">Chokho</CardTitle>
            <CardDescription className="font-mono text-xs tracking-wider mt-1">
              CIVIC INTELLIGENCE SENTINEL
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Role Selection */}
            <div className="flex gap-1 p-1 bg-muted rounded-lg">
              {(["citizen", "worker", "admin"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all capitalize ${
                    role === r
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {r}
                </button>
              ))}
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs">Password</Label>
                <Link href="#" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
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

            {role === "citizen" && (
              <p className="text-center text-xs text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Register
                </Link>
              </p>
            )}

            {role !== "citizen" && (
              <p className="text-center text-[10px] text-muted-foreground font-mono">
                Use your Employee ID to login
              </p>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="absolute bottom-6 text-center">
        <p className="text-[9px] font-mono text-muted-foreground tracking-wider">
          LOC: 30.3165° N, 78.0322° E — SYS: NOMINAL
        </p>
      </div>
    </div>
  );
}
