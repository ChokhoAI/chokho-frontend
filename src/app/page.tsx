"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SplashPage() {
  const router = useRouter();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => router.push("/login"), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={`w-96 h-96 rounded-full bg-primary/5 blur-[120px] transition-opacity duration-1000 ${phase >= 1 ? "opacity-100" : "opacity-0"}`} />
      </div>

      {/* Logo */}
      <div className={`transition-all duration-700 ease-out ${phase >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
        <Image src="/logo.png" alt="Chokho" width={120} height={120} priority />
      </div>

      {/* Title */}
      <div className={`mt-6 text-center transition-all duration-700 delay-300 ease-out ${phase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <h1 className="text-3xl font-serif font-bold tracking-tight">CHOKHO</h1>
        <p className="text-sm text-muted-foreground mt-1 tracking-wider font-mono">
          SMART WASTE MANAGEMENT
        </p>
      </div>

      {/* Loading indicator */}
      <div className={`mt-12 transition-all duration-500 delay-500 ${phase >= 2 ? "opacity-100" : "opacity-0"}`}>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </div>

      {/* Bottom text */}
      <div className={`absolute bottom-8 text-center transition-all duration-500 delay-700 ${phase >= 2 ? "opacity-100" : "opacity-0"}`}>
        <p className="text-[10px] font-mono text-muted-foreground tracking-widest">
          DEHRADUN • HARIDWAR • RISHIKESH
        </p>
      </div>
    </div>
  );
}
