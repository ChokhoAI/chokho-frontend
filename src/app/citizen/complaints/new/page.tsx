"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Camera, MapPin } from "lucide-react";
import Link from "next/link";

export default function NewComplaint() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push("/citizen/complaints"), 1000);
  };

  return (
    <div className="px-4 py-4 space-y-4">
      <div className="flex items-center gap-3">
        <Link href="/citizen/complaints" className="p-2 -ml-2 rounded-md hover:bg-muted transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-lg font-serif font-semibold">Report Complaint</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Card className="border-border/50">
          <CardContent className="p-4 space-y-4">
            <div className="space-y-2">
              <Label className="text-xs">Title</Label>
              <Input placeholder="Brief description of the issue" className="bg-muted/50" />
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Category</Label>
              <Select>
                <SelectTrigger className="bg-muted/50"><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="overflow">Overflow</SelectItem>
                  <SelectItem value="missed">Missed Collection</SelectItem>
                  <SelectItem value="illegal">Illegal Dumping</SelectItem>
                  <SelectItem value="damaged">Damaged Bin</SelectItem>
                  <SelectItem value="odor">Odor/Sanitation</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Description</Label>
              <Textarea placeholder="Provide more details about the issue..." className="bg-muted/50 min-h-[100px] resize-none" />
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Enter location or use GPS" className="pl-9 bg-muted/50" />
              </div>
              <Button type="button" variant="outline" size="sm" className="gap-1.5 text-xs cursor-pointer">
                <MapPin className="h-3 w-3" /> Use Current Location
              </Button>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Photo (Optional)</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all">
                <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Tap to take a photo or upload</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full h-11 font-medium cursor-pointer" disabled={loading}>
          {loading ? "Submitting..." : "Submit Complaint"}
        </Button>
      </form>
    </div>
  );
}
