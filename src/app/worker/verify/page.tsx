"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Camera, CheckCircle2, QrCode } from "lucide-react";
import Link from "next/link";

export default function VerifyCleanup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

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

      {/* Bin Scanner */}
      <Card className="border-border/50">
        <CardContent className="p-4 space-y-3">
          <Label className="text-xs">Bin ID</Label>
          <div className="flex gap-2">
            <Input placeholder="BIN-XXXX" className="bg-muted/50" />
            <Button variant="outline" size="icon" className="shrink-0 cursor-pointer"><QrCode className="h-4 w-4" /></Button>
          </div>
        </CardContent>
      </Card>

      {/* Photos */}
      <Card className="border-border/50">
        <CardContent className="p-4 space-y-3">
          <Label className="text-xs">Before & After Photos</Label>
          <div className="grid grid-cols-2 gap-3">
            {["Before", "After"].map((label) => (
              <div key={label} className="border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-primary/50 transition-colors">
                <Camera className="h-6 w-6 text-muted-foreground mx-auto mb-1" />
                <p className="text-[10px] text-muted-foreground">{label} photo</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card className="border-border/50">
        <CardContent className="p-4 space-y-3">
          <Label className="text-xs">Notes (Optional)</Label>
          <Textarea placeholder="Any additional observations..." className="bg-muted/50 min-h-[80px] resize-none" />
        </CardContent>
      </Card>

      <Button className="w-full h-11 font-medium cursor-pointer" onClick={handleSubmit} disabled={loading}>
        {loading ? "Submitting verification..." : "Submit Verification"}
      </Button>
    </div>
  );
}
