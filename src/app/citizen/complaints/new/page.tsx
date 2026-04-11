"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { citizenApi } from "@/lib/api";
import { ArrowLeft, Camera, Bot, Loader2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

export default function NewComplaint() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<{ category: string; severity: number; confidence: number } | null>(null);
  const { toast } = useToast();

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Trigger AI analysis simulation
      setAiAnalyzing(true);
      setTimeout(() => {
        setAiResult({
          category: "Waste Overflow",
          severity: Math.floor(Math.random() * 5) + 5, // 5-10
          confidence: 90 + Math.floor(Math.random() * 9),
        });
        setAiAnalyzing(false);
      }, 2000);
    }
  };

  const handleSubmit = async () => {
    if (!imageFile || !aiResult) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      // Depending on backend expectations, we might need other fields.
      // Assuming backend extracts location from metadata or it's hardcoded for now as per controller:
      // Complaint registered successfully with latitude: 27.7172 and longitude: 85.324
      
      await citizenApi.reportComplaint(formData);
      toast({
        title: "Report Submitted",
        description: "Thank you for your contribution. Chokho AI is processing your report.",
      });
      router.push("/citizen/complaints");
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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

      <input 
        type="file" 
        accept="image/*" 
        capture="environment"
        ref={fileInputRef}
        onChange={handleImageSelect}
        className="hidden"
      />

      {/* Image Upload — Primary Action */}
      <Card className="border-border/50">
        <CardContent className="p-4 space-y-3">
          <p className="text-xs font-medium">Capture the Issue</p>
          {!imagePreview ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
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
                onClick={() => { setImagePreview(null); setImageFile(null); setAiResult(null); }}
                className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full p-1.5 text-xs hover:bg-background transition-colors"
                disabled={loading}
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
              <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-tighter">AI Processing...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {aiResult && !aiAnalyzing && (
        <Card className={`border ${severityBg(aiResult.severity)}`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Bot className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-primary uppercase tracking-widest font-mono">AI Analysis Complete</span>
              <Badge variant="outline" className="text-[9px] ml-auto">{aiResult.confidence}% Conf</Badge>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] text-muted-foreground">Category</p>
                <p className="text-sm font-medium">{aiResult.category}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">Severity</p>
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
        disabled={loading || !imageFile || !aiResult}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
        {loading ? "Submitting..." : "Submit Report"}
      </Button>
    </div>
  );
}
