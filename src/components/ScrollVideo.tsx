import { ReactNode } from "react";
import heroBuilding from "@/assets/hero-building.jpg";

interface ScrollVideoProps {
  src?: string;
  className?: string;
  children?: ReactNode;
}

export function ScrollVideo({ className, children }: ScrollVideoProps) {
  return (
    <div className={`relative w-full h-[100svh] overflow-hidden bg-black ${className || ""}`}>
      {/* Autoplaying Hero Video (All Devices) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={heroBuilding}
        src="/hero.webm"
        className="absolute inset-0 h-full w-full object-cover"
      />
      
      {/* Mobile-specific strong darkening overlay to ensure white/gold text pops */}
      <div className="absolute inset-0 z-[1] bg-black/60 md:hidden" />

      {children && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-ivory">
           {children}
        </div>
      )}
    </div>
  );
}

