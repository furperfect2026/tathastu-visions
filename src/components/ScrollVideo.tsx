import { useRef, ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ScrollVideoProps {
  src: string;
  className?: string;
  children?: ReactNode;
}

export function ScrollVideo({ src, className, children }: ScrollVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    const video = videoRef.current;
    if (!video) return;

    const initScrollTrigger = () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3000",
          scrub: 1,
          pin: true,
        }
      });

      tl.to(video, {
        currentTime: video.duration || 1,
        ease: "none"
      });
    };

    if (video.readyState >= 1) {
      initScrollTrigger();
    } else {
      video.addEventListener("loadedmetadata", initScrollTrigger);
      return () => video.removeEventListener("loadedmetadata", initScrollTrigger);
    }
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-screen overflow-hidden bg-black ${className || ""}`}
    >
      <video
        ref={videoRef}
        src={src}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        playsInline
        preload="auto"
      />
      {/* Optional content overlay */}
      {children && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-ivory">
           {children}
        </div>
      )}
    </div>
  );
}

