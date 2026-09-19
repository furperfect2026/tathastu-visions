import { ReactNode } from "react";

interface ScrollVideoProps {
  src?: string;
  className?: string;
  children?: ReactNode;
}

export function ScrollVideo({ className, children }: ScrollVideoProps) {
  return (
    <div className={`relative w-full h-[100svh] overflow-hidden bg-black ${className || ""}`}>
      {/* Mobile-optimized static fallback image */}
      <img
        src="/sequence/frame_0240.jpg"
        alt="Tathastu Infra Building"
        className="absolute inset-0 h-full w-full object-cover md:hidden"
      />
      
      {/* Autoplaying Hero Video (Desktop/Tablet) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/sequence/frame_0240.jpg"
        src="/hero.webm"
        className="absolute inset-0 hidden h-full w-full object-cover md:block"
      />
      {children && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-ivory">
           {children}
        </div>
      )}
    </div>
  );
}

