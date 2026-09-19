import { ReactNode } from "react";

interface ScrollVideoProps {
  src?: string;
  className?: string;
  children?: ReactNode;
}

export function ScrollVideo({ className, children }: ScrollVideoProps) {
  return (
    <div className={`relative w-full h-[100svh] overflow-hidden bg-black ${className || ""}`}>
      {/* Autoplaying Hero Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        src="/hero.webm"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {children && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-ivory">
           {children}
        </div>
      )}
    </div>
  );
}

