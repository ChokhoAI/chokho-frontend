"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push("/citizen/dashboard"), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-background relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[150px] pointer-events-none" />

      <Card className="w-full max-w-sm border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-3">
          <Link href="/login" className="absolute left-4 top-4 p-2 rounded-md hover:bg-muted transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex justify-center">
            <Image src="/logo.png" alt="Chokho" width={56} height={56} />
          </div>
          <div>
            <CardTitle className="text-xl font-serif">Create Account</CardTitle>
            <CardDescription className="text-xs">Join the Chokho civic network</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">First Name</Label>
                <Input placeholder="Rahul" className="h-9 bg-muted/50" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Last Name</Label>
                <Input placeholder="Sharma" className="h-9 bg-muted/50" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Phone Number</Label>
              <Input placeholder="+91 98765 43210" className="h-9 bg-muted/50" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Email</Label>
              <Input type="email" placeholder="you@example.com" className="h-9 bg-muted/50" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Ward / Area</Label>
              <Select>
                <SelectTrigger className="h-9 bg-muted/50">
                  <SelectValue placeholder="Select your ward" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="w1">Ward 1 — Rajpur</SelectItem>
                  <SelectItem value="w5">Ward 5 — MG Road</SelectItem>
                  <SelectItem value="w10">Ward 10 — Paltan Bazaar</SelectItem>
                  <SelectItem value="w12">Ward 12 — Clock Tower</SelectItem>
                  <SelectItem value="w15">Ward 15 — Haridwar Central</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Password</Label>
              <Input type="password" placeholder="Create a strong password" className="h-9 bg-muted/50" />
            </div>

            <Button type="submit" className="w-full h-10 mt-2 font-medium cursor-pointer" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">Sign in</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
