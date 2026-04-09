"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Camera, MapPin, Bot, Loader2 } from "lucide-react";
import Link from "next/link";

export default function NewComplaint() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<{ category: string; severity: number; confidence: number } | null>(null);

  const handleImageUpload = () => {
    // Simulate image capture
    setImagePreview("https://images.unsplash.com/photo-1605600659908-0ef719419d41?q=80&w=600&auto=format&fit=crop");
    
    // Trigger AI analysis
    setAiAnalyzing(true);
    setTimeout(() => {
      setAiResult({
        category: "Overflow",
        severity: 8,
        confidence: 94,
      });
      setAiAnalyzing(false);
    }, 2000);
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => router.push("/citizen/complaints"), 1000);
  };

  const severityColor = (s: number) => s >= 8 ? "text-red-500" : s >= 5 ? "text-orange-500" : "text-amber-400";
  const severityBg = (s: number) => s >= 8 ? "bg-red-500/10 border-red-500/30" : s >= 5 ? "bg-orange-500/10 border-orange-500/30" : "bg-amber-400/10 border-amber-400/30";

  return (
    <div className="px-4 py-4 space-y-4">
      <div className="flex items-center gap-3">
        <Link href="/citizen/complaints" className="p-2 -ml-2 rounded-md hover:bg-muted transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-lg font-serif font-semibold">Report Complaint</h1>
      </div>

      {/* Image Upload — Primary Action */}
      <Card className="border-border/50">
        <CardContent className="p-4 space-y-3">
          <p className="text-xs font-medium">Capture the Issue</p>
          {!imagePreview ? (
            <div 
              onClick={handleImageUpload}
              className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <Camera className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Tap to take a photo</p>
              <p className="text-[10px] text-muted-foreground mt-1">AI will automatically analyze the image</p>
            </div>
          ) : (
            <div className="relative rounded-lg overflow-hidden">
              <img src={imagePreview} alt="Captured" className="w-full h-48 object-cover rounded-lg" />
              <button 
                onClick={() => { setImagePreview(null); setAiResult(null); }}
                className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full p-1.5 text-xs hover:bg-background transition-colors"
              >
                ✕
              </button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Analysis Card */}
      {aiAnalyzing && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-primary">Analyzing image...</span>
              <Loader2 className="h-3 w-3 animate-spin text-primary ml-auto" />
            </div>
            <div className="mt-3 space-y-2">
              <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: "70%" }} />
              </div>
              <p className="text-[10px] text-muted-foreground">Processing with Chokho Vision AI...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {aiResult && !aiAnalyzing && (
        <Card className={`border ${severityBg(aiResult.severity)}`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Bot className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-primary">AI Analysis Complete</span>
              <Badge variant="outline" className="text-[9px] ml-auto">{aiResult.confidence}% Confidence</Badge>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] text-muted-foreground">Category</p>
                <p className="text-sm font-medium">{aiResult.category}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">Severity Score</p>
                <p className={`text-sm font-bold font-mono ${severityColor(aiResult.severity)}`}>{aiResult.severity}/10</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Submit */}
      <Button 
        className="w-full h-11 font-medium cursor-pointer" 
        onClick={handleSubmit} 
        disabled={loading || !imagePreview || !aiResult}
      >
        {loading ? "Submitting..." : "Submit Complaint"}
      </Button>
    </div>
  );
}
