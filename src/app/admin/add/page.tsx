"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, UserPlus, Truck, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";

function AddResourceForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "worker";
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleWorkerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  const handleVehicleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in duration-300">
        <div className="h-20 w-20 rounded-full bg-emerald-500/10 flex items-center justify-center">
          <CheckCircle2 className="h-10 w-10 text-emerald-500" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-serif font-bold">Resource Registered</h2>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            The {activeTab} has been successfully added to the Chokho ecosystem and is now ready for assignment.
          </p>
        </div>
        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={() => setSuccess(false)} className="cursor-pointer">Add Another</Button>
          <Button onClick={() => router.push(activeTab === "worker" ? "/admin/workers" : "/admin/vehicles")} className="cursor-pointer">View List</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href={activeTab === "worker" ? "/admin/workers" : "/admin/vehicles"} className="p-2 -ml-2 rounded-md hover:bg-muted transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-xl font-serif font-semibold">Add New Resource</h1>
          <p className="text-xs text-muted-foreground">Onboard new personnel or fleet assets</p>
        </div>
      </div>

      <Tabs defaultValue={initialTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-12 bg-muted/50 p-1">
          <TabsTrigger value="worker" className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <UserPlus className="h-4 w-4" /> Worker
          </TabsTrigger>
          <TabsTrigger value="vehicle" className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <Truck className="h-4 w-4" /> Vehicle
          </TabsTrigger>
        </TabsList>

        <TabsContent value="worker" className="mt-6">
          <Card className="border-border/50 bg-white/40 dark:bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Worker Registration</CardTitle>
              <CardDescription>Enter field officer credentials to grant system access.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleWorkerSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="worker-name" className="text-xs uppercase tracking-wider opacity-70">Full Name</Label>
                    <Input id="worker-name" placeholder="Rahul Sharma" required className="bg-muted/30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="worker-id" className="text-xs uppercase tracking-wider opacity-70">Employee ID</Label>
                    <Input id="worker-id" placeholder="EMP-4022" required className="bg-muted/30 font-mono" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="worker-phone" className="text-xs uppercase tracking-wider opacity-70">Phone Number</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">+91</span>
                    <Input id="worker-phone" type="tel" maxLength={10} placeholder="9876543210" required className="pl-12 bg-muted/30" />
                  </div>
                </div>
                <Button type="submit" className="w-full h-11 font-medium cursor-pointer" disabled={loading}>
                  {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Registering...</> : "Add Worker to System"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vehicle" className="mt-6">
          <Card className="border-border/50 bg-white/40 dark:bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Vehicle Onboarding</CardTitle>
              <CardDescription>Register a new collection asset to the fleet.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVehicleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicle-no" className="text-xs uppercase tracking-wider opacity-70">Registration Number</Label>
                  <Input id="vehicle-no" placeholder="UK 07 AB 1234" required className="bg-muted/30 font-mono uppercase" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vehicle-type" className="text-xs uppercase tracking-wider opacity-70">Vehicle Type</Label>
                    <Select required>
                      <SelectTrigger id="vehicle-type" className="bg-muted/30">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="truck">Compactor Truck</SelectItem>
                        <SelectItem value="mini-truck">Mini Loader</SelectItem>
                        <SelectItem value="auto">Electric Tipper</SelectItem>
                        <SelectItem value="e-rickshaw">E-Rickshaw</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicle-ward" className="text-xs uppercase tracking-wider opacity-70">Primary Ward</Label>
                    <Input id="vehicle-ward" placeholder="Ward 24" required className="bg-muted/30" />
                  </div>
                </div>
                <Button type="submit" className="w-full h-11 font-medium cursor-pointer" disabled={loading}>
                  {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Registering...</> : "Register Vehicle"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function AddResource() {
  return (
    <div className="px-4 py-6 md:px-8">
      <Suspense fallback={<div className="flex items-center justify-center min-h-[400px]"><Loader2 className="h-8 w-8 animate-spin text-primary/50" /></div>}>
        <AddResourceForm />
      </Suspense>
    </div>
  );
}
