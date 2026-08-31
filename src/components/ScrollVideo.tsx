import { useRef, ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ScrollVideoProps {
  src?: string;
  className?: string;
  children?: ReactNode;
}

export function ScrollVideo({ className, children }: ScrollVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGSAP(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const frameCount = 240;
    const images: HTMLImageElement[] = [];
    const state = { frame: 0 };
    
    // Load first image immediately to get dimensions
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const frameNum = i.toString().padStart(4, "0");
      img.src = `/sequence/frame_${frameNum}.jpg`;
      images.push(img);
    }
    
    const render = () => {
      const img = images[state.frame];
      if (!img || !img.complete) return;
      
      // Cover the canvas maintaining aspect ratio
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;
      
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    };

    images[0].onload = render;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    let mm = gsap.matchMedia(containerRef);
    
    mm.add("(min-width: 768px)", () => {
      gsap.to(state, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=4000",
          scrub: 0.15,
          pin: true,
        },
        onUpdate: render
      });
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      mm.revert();
    };
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-screen overflow-hidden bg-black bg-cover bg-center bg-no-repeat ${className || ""}`}
      style={{ backgroundImage: "url('/sequence/frame_0240.jpg')" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full hidden md:block"
      />
      {children && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-ivory">
           {children}
        </div>
      )}
    </div>
  );
}

