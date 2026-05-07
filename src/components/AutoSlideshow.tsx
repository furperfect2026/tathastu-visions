import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AutoSlideshowProps {
  images: { src: string; alt: string }[];
  interval?: number;
  startIndex?: number;
  className?: string;
  showDots?: boolean;
  rounded?: string;
}

export function AutoSlideshow({
  images,
  interval = 3800,
  startIndex = 0,
  className,
  showDots = true,
  rounded = "rounded-2xl",
}: AutoSlideshowProps) {
  const [index, setIndex] = useState(startIndex % images.length);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (paused || reduce) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [paused, reduce, interval, images.length]);

  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <div
      className={cn("relative overflow-hidden bg-muted", rounded, className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="sync">
        <motion.img
          key={index}
          src={images[index].src}
          alt={images[index].alt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{
            opacity: 1,
            scale: 1.16,
            transition: { opacity: { duration: 0.9 }, scale: { duration: interval / 1000 + 1, ease: "linear" } },
          }}
          exit={{ opacity: 0, transition: { duration: 0.9 } }}
        />
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
      {showDots && (
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-6 bg-primary" : "w-1.5 bg-ivory/70 hover:bg-ivory",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
