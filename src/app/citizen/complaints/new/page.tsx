"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { citizenApi } from "@/lib/api";
import { ArrowLeft, Camera, Loader2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

export default function NewComplaint() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
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
    }
  };

  const handleSubmit = async () => {
    if (!imageFile) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      
      const response = await citizenApi.reportComplaint(formData);
      
      toast({
        title: "Report Submitted",
        description: response || "Thank you for your contribution. Chokho AI is processing your report.",
      });
      
      router.push("/citizen/complaints");
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
            </div>
          ) : (
            <div className="relative rounded-lg overflow-hidden">
              <img src={imagePreview} alt="Captured" className="w-full h-48 object-cover rounded-lg" />
              <button 
                onClick={() => { setImagePreview(null); setImageFile(null); }}
                className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full p-1.5 text-xs hover:bg-background transition-colors"
                disabled={loading}
              >
                ✕
              </button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Submit */}
      <Button 
        className="w-full h-11 font-medium cursor-pointer" 
        onClick={handleSubmit} 
        disabled={loading || !imageFile}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
        {loading ? "Submitting..." : "Submit Report"}
      </Button>
    </div>
  );
}

