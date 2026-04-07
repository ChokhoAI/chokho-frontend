"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Camera, CheckCircle2, ImageIcon } from "lucide-react";
import Link from "next/link";
import { routes, complaints } from "@/lib/mock-data";

export default function VerifyCleanup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedComplaintId, setSelectedComplaintId] = useState<string>("");
  const [afterImage, setAfterImage] = useState<string | null>(null);

  // Get assigned (uncleaned) complaints from active route
  const activeRoute = routes[0];
  const assignedComplaints = (activeRoute.stops || [])
    .map(s => complaints.find(c => c.id === s.complaintId))
    .filter((c): c is NonNullable<typeof c> => c !== undefined && !c.cleaned);

  const selectedComplaint = complaints.find(c => c.id === selectedComplaintId);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => { setStep(3); setLoading(false); }, 1500);
  };

  if (step === 3) {
    return (
      <div className="px-4 py-4 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="h-16 w-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
          <CheckCircle2 className="h-8 w-8 text-emerald-500" />
        </div>
        <h1 className="text-xl font-serif font-bold">Verification Submitted</h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-xs">Your cleanup verification has been recorded and is awaiting AI review.</p>
        <Button onClick={() => router.push("/worker/dashboard")} className="mt-6 cursor-pointer">Back to Dashboard</Button>
      </div>
    );
  }

  return (
    <div className="px-4 py-4 space-y-4">
      <div className="flex items-center gap-3">
        <Link href="/worker/dashboard" className="p-2 -ml-2 rounded-md hover:bg-muted transition-colors"><ArrowLeft className="h-4 w-4" /></Link>
        <h1 className="text-lg font-serif font-semibold">Verify Cleanup</h1>
      </div>

      {/* Complaint Selector */}
      <Card className="border-border/50">
        <CardContent className="p-4 space-y-3">
          <Label className="text-xs">Select Complaint</Label>
          <Select value={selectedComplaintId} onValueChange={setSelectedComplaintId}>
            <SelectTrigger className="bg-muted/50">
              <SelectValue placeholder="Choose a complaint to verify..." />
            </SelectTrigger>
            <SelectContent>
              {assignedComplaints.map(c => (
                <SelectItem key={c.id} value={c.id}>
                  {c.id} — {c.category}, {c.location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Before Image (auto-fetched) */}
      {selectedComplaint && (
        <Card className="border-border/50">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-1.5">
              <ImageIcon className="h-3.5 w-3.5 text-muted-foreground" />
              <Label className="text-xs">Before Photo (from complaint)</Label>
            </div>
            {selectedComplaint.imageUrl ? (
              <img src={selectedComplaint.imageUrl} alt="Before" className="w-full h-40 object-cover rounded-lg" />
            ) : (
              <div className="h-40 bg-muted/30 rounded-lg flex items-center justify-center">
                <p className="text-xs text-muted-foreground">No image available</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* After Photo Upload */}
      {selectedComplaint && (
        <Card className="border-border/50">
          <CardContent className="p-4 space-y-3">
            <Label className="text-xs">After Photo (upload cleanup proof)</Label>
            {!afterImage ? (
              <div 
                onClick={() => setAfterImage("https://images.unsplash.com/photo-1621255869389-9b97b0aae90f?q=80&w=600&auto=format&fit=crop")}
                className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all"
              >
                <Camera className="h-6 w-6 text-muted-foreground mx-auto mb-1" />
                <p className="text-[10px] text-muted-foreground">Tap to capture after cleanup</p>
              </div>
            ) : (
              <div className="relative">
                <img src={afterImage} alt="After" className="w-full h-40 object-cover rounded-lg" />
                <button 
                  onClick={() => setAfterImage(null)}
                  className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full p-1.5 text-xs hover:bg-background transition-colors"
                >
                  ✕
                </button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Notes */}
      {selectedComplaint && (
        <Card className="border-border/50">
          <CardContent className="p-4 space-y-3">
            <Label className="text-xs">Notes (Optional)</Label>
            <Textarea placeholder="Any additional observations..." className="bg-muted/50 min-h-[80px] resize-none" />
          </CardContent>
        </Card>
      )}

      <Button 
        className="w-full h-11 font-medium cursor-pointer" 
        onClick={handleSubmit} 
        disabled={loading || !selectedComplaintId || !afterImage}
      >
        {loading ? "Submitting verification..." : "Submit Verification"}
      </Button>
    </div>
  );
}
