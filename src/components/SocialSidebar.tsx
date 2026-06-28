import { Youtube, Instagram, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export function SocialSidebar() {
  return (
    <motion.div
      className="fixed left-2 md:left-4 top-1/2 -translate-y-1/2 z-[85] flex flex-col items-center gap-3 md:gap-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.4 }}
    >
      <div className="h-12 md:h-16 w-[1px] bg-gradient-to-b from-transparent to-border"></div>

      <a
        href="https://youtube.com/"
        target="_blank"
        rel="noreferrer"
        aria-label="YouTube"
        className="grid h-9 w-9 md:h-10 md:w-10 place-items-center rounded-full border border-border/50 bg-card/80 backdrop-blur-sm shadow-sm transition hover:scale-110 hover:border-red-500/50 hover:shadow-md"
      >
        <Youtube className="h-4 w-4 text-[#FF0000]" />
      </a>
      <a
        href="https://instagram.com/"
        target="_blank"
        rel="noreferrer"
        aria-label="Instagram"
        className="grid h-9 w-9 md:h-10 md:w-10 place-items-center rounded-full border border-border/50 bg-card/80 backdrop-blur-sm shadow-sm transition hover:scale-110 hover:border-pink-500/50 hover:shadow-md"
      >
        <Instagram className="h-4 w-4 text-[#E1306C]" />
      </a>
      <a
        href="https://linkedin.com/"
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
        className="grid h-9 w-9 md:h-10 md:w-10 place-items-center rounded-full border border-border/50 bg-card/80 backdrop-blur-sm shadow-sm transition hover:scale-110 hover:border-blue-500/50 hover:shadow-md"
      >
        <Linkedin className="h-4 w-4 text-[#0A66C2]" />
      </a>

      <div className="h-12 md:h-16 w-[1px] bg-gradient-to-t from-transparent to-border"></div>
    </motion.div>
  );
}
