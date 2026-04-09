"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Bot, Camera, CheckCircle2, MapPin, Shield, Sparkles, TrendingUp, Users, Moon, Sun } from "lucide-react";
import MapDynamic from "@/components/map";
import { useTheme } from "next-themes";

export default function LandingPage() {
  const [phase, setPhase] = useState(0);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // Splash screen phase
  if (phase < 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className={`w-96 h-96 rounded-full bg-primary/5 blur-[120px] transition-opacity duration-1000 ${phase >= 1 ? "opacity-100" : "opacity-0"}`} />
        </div>
        <div className={`transition-all duration-700 ease-out ${phase >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
          <Image src="/logo.png" alt="Chokho" width={120} height={120} priority />
        </div>
        <div className={`mt-6 text-center transition-all duration-700 delay-300 ease-out ${phase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <h1 className="text-3xl font-serif font-bold tracking-tight">CHOKHO</h1>
          <p className="text-sm text-muted-foreground mt-1 tracking-wider font-mono">SMART WASTE MANAGEMENT</p>
        </div>
        <div className={`mt-12 transition-all duration-500 delay-500 ${phase >= 2 ? "opacity-100" : "opacity-0"}`}>
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Main landing page
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="Chokho" width={32} height={32} className="rounded-sm" />
            <p className="text-sm font-serif font-bold">CHOKHO</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-muted transition-colors flex items-center justify-center cursor-pointer"
            >
              {mounted && theme === "dark" ? (
                <Sun className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Moon className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
            <Link href="/heatmap" className="text-xs font-medium hover:text-primary transition-colors hidden sm:block">
              Public Heatmap
            </Link>
            <Link href="/login">
              <Button size="sm" className="cursor-pointer gap-1.5 text-xs sm:text-sm">
                Login <ArrowRight className="h-3.5 w-3.5 hidden sm:block" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-primary/3 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-primary/5 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 lg:py-24 relative">
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-3 sm:mb-4 text-[9px] sm:text-[10px] font-mono gap-1.5">
              <Sparkles className="h-3 w-3 text-primary" />
              AI-POWERED CIVIC INTELLIGENCE
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold leading-tight tracking-tight">
              Cleaner Cities,<br />
              <span className="text-primary">Smarter Systems</span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mt-3 sm:mt-4 leading-relaxed max-w-lg">
              Report waste issues with a photo. Our AI analyzes severity, optimizes routes, and dispatches workers — all in real-time.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8">
              <Link href="/login">
                <Button size="lg" className="cursor-pointer gap-2 h-11 sm:h-12 w-full sm:w-auto px-6">
                  <Camera className="h-4 w-4" /> Report a Problem
                </Button>
              </Link>
              <Link href="/heatmap">
                <Button variant="outline" size="lg" className="cursor-pointer h-11 sm:h-12 w-full sm:w-auto px-6">
                  <TrendingUp className="h-4 w-4 mr-2" /> View Public Heatmap
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats floating cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-10 sm:mt-16">
            {[
              { value: "89", label: "Complaints Tracked", color: "text-primary" },
              { value: "92%", label: "Resolution Rate", color: "text-emerald-500" },
              { value: "142", label: "Active Workers", color: "text-blue-400" },
              { value: "< 2h", label: "Avg. Response", color: "text-amber-500" },
            ].map((stat) => (
              <Card key={stat.label} className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-4 sm:p-5 text-center">
                  <p className={`text-2xl sm:text-3xl font-serif font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live Heatmap */}
      <section className="border-t border-border pt-12 sm:pt-20 pb-12 sm:pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6 sm:mb-10">
            <p className="text-[10px] font-mono text-primary uppercase tracking-widest mb-2">LIVE DATA</p>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold">Real-Time Severity Map</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">Complaints colored by severity — yellow (1-4), orange (5-7), red (8-10)</p>
          </div>
          
          <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] relative rounded-2xl overflow-hidden bg-card/50">
            <MapDynamic type="heatmap" />
            {/* Severity Legend */}
            <div className="absolute bottom-3 left-3 sm:left-4 bg-card/90 backdrop-blur-sm p-2.5 rounded-lg border border-border z-50 text-card-foreground shadow-lg">
              <p className="text-[9px] font-semibold mb-1.5">Severity</p>
              <div className="flex items-center gap-1">
                <div className="h-2 w-6 rounded-full bg-amber-400" />
                <div className="h-2 w-6 rounded-full bg-orange-500" />
                <div className="h-2 w-6 rounded-full bg-red-500" />
              </div>
              <div className="flex justify-between text-[8px] text-muted-foreground mt-0.5">
                <span>Low</span><span>High</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-[10px] font-mono text-primary uppercase tracking-widest mb-2">HOW IT WORKS</p>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold">Three Steps to a Cleaner City</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
            {[
              { step: "01", icon: Camera, title: "Snap & Report", desc: "Take a photo of the waste issue. Our AI automatically detects the category and severity — no forms to fill." },
              { step: "02", icon: Bot, title: "AI Analyzes", desc: "Chokho Vision AI scores severity (1-10), classifies the waste type, and captures GPS coordinates automatically." },
              { step: "03", icon: CheckCircle2, title: "Resolved & Verified", desc: "Workers are dispatched via optimized routes. Cleanup is verified with before/after photo comparison." },
            ].map((item) => (
              <Card key={item.step} className="border-border/50 bg-card/50">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-2xl font-serif font-bold text-primary/30">{item.step}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-muted/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-[10px] font-mono text-primary uppercase tracking-widest mb-2">PLATFORM</p>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold">Built for Civic Scale</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              { icon: MapPin, title: "Live Severity Heatmap", desc: "Real-time visualization of complaint severity across Dehradun, Haridwar & Rishikesh." },
              { icon: TrendingUp, title: "Route Optimization", desc: "AI-optimized collection routes based on complaint severity and proximity." },
              { icon: Shield, title: "Before/After Verification", desc: "Workers submit cleanup proof photos. AI compares before/after images to verify resolution." },
              { icon: Users, title: "Multi-Role Dashboard", desc: "Citizens report, workers manage routes, admins oversee — all from one platform." },
            ].map((feature) => (
              <Card key={feature.title} className="border-border/50">
                <CardContent className="p-5 sm:p-6 flex gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <p className="text-[10px] font-mono text-primary uppercase tracking-widest mb-2">COVERAGE</p>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4">Active Across Uttarakhand</h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">Serving the tri-city region with AI-powered waste management. Real-time complaint tracking, severity-based dispatch, and transparent resolution.</p>
              <div className="space-y-3">
                {[
                  { city: "Dehradun", complaints: 45, status: "Active" },
                  { city: "Haridwar", complaints: 28, status: "Active" },
                  { city: "Rishikesh", complaints: 16, status: "Active" },
                ].map((city) => (
                  <div key={city.city} className="flex items-center justify-between py-2 border-b border-border/50">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-sm font-medium">{city.city}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">{city.complaints} complaints</span>
                      <Badge variant="outline" className="text-[10px]">{city.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Card className="border-border/50 bg-muted/20">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="space-y-4">
                  <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <MapPin className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                  </div>
                  <div>
                    <p className="text-3xl sm:text-4xl font-serif font-bold text-primary">89</p>
                    <p className="text-sm text-muted-foreground mt-1">Active Complaints</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4 sm:mt-6">
                    <div>
                      <p className="text-lg font-serif font-bold text-red-500">12</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Severe</p>
                    </div>
                    <div>
                      <p className="text-lg font-serif font-bold text-amber-500">77</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest">General</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-primary/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-3">See Something? Report It.</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6 sm:mb-8">Join thousands of citizens making Uttarakhand cleaner. One photo is all it takes.</p>
          <Link href="/login">
            <Button size="lg" className="cursor-pointer gap-2 h-11 sm:h-12 px-6 sm:px-8">
              <Camera className="h-4 w-4" /> Login to Report <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="Chokho" width={24} height={24} className="rounded-sm" />
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Towards a Trash-Free Uttarakhand — CHOKHO</span>
          </div>
          <a href="https://github.com/ChokhoAI" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
            <span className="text-[10px] font-mono tracking-wider">GITHUB</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
