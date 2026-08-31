import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export type RevealVariant =
  | "fade-up"
  | "fade-left"
  | "fade-right"
  | "scale-up"
  | "clip-up";

export interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: RevealVariant | string;
  direction?: "up" | "down" | "left" | "right" | string;
}

const ease = [0.22, 1, 0.36, 1] as const;

const variants: Record<string, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
  },
  "fade-left": {
    hidden: { opacity: 0, x: 40 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8, ease } },
  },
  "fade-right": {
    hidden: { opacity: 0, x: -40 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8, ease } },
  },
  "scale-up": {
    hidden: { opacity: 0, scale: 0.85 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease } },
  },
  "clip-up": {
    hidden: { clipPath: "inset(100% 0 0 0)" },
    show: { clipPath: "inset(0% 0 0 0)", transition: { duration: 0.8, ease } },
  },
};

const directionMap: Record<string, RevealVariant> = {
  up: "fade-up",
  left: "fade-left",
  right: "fade-right",
};

export function Reveal({
  children,
  delay = 0,
  className,
  variant,
  direction,
}: RevealProps) {
  const resolvedKey =
    variant ?? (direction ? directionMap[direction] : undefined) ?? "fade-up";
  const selectedVariant = variants[resolvedKey] ?? variants["fade-up"];

  return (
    <motion.div
      variants={selectedVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
