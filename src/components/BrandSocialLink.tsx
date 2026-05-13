import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type SocialBrand = "youtube" | "instagram" | "linkedin";

type BrandSocialLinkProps = {
  brand: SocialBrand;
  href: string;
  label: string;
  className?: string;
};

function BrandMark({ brand }: { brand: SocialBrand }) {
  if (brand === "youtube") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4.5 w-4.5">
        <path
          fill="#ff0033"
          d="M21.54 6.42a2.62 2.62 0 0 0-1.85-1.85C18.06 4.13 12 4.13 12 4.13s-6.06 0-7.69.44a2.62 2.62 0 0 0-1.85 1.85C2.02 8.05 2.02 12 2.02 12s0 3.95.44 5.58a2.62 2.62 0 0 0 1.85 1.85c1.63.44 7.69.44 7.69.44s6.06 0 7.69-.44a2.62 2.62 0 0 0 1.85-1.85c.44-1.63.44-5.58.44-5.58s0-3.95-.44-5.58Z"
        />
        <path fill="#fff" d="m10.02 15.38 5.18-3.38-5.18-3.38v6.76Z" />
      </svg>
    );
  }

  if (brand === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4.5 w-4.5">
        <defs>
          <linearGradient id="instagram-mark" x1="4" y1="20" x2="20" y2="4" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f58529" />
            <stop offset="0.38" stopColor="#dd2a7b" />
            <stop offset="0.72" stopColor="#8134af" />
            <stop offset="1" stopColor="#515bd4" />
          </linearGradient>
        </defs>
        <rect x="4" y="4" width="16" height="16" rx="5" fill="none" stroke="url(#instagram-mark)" strokeWidth="2.3" />
        <circle cx="12" cy="12" r="3.35" fill="none" stroke="url(#instagram-mark)" strokeWidth="2.1" />
        <circle cx="16.9" cy="7.25" r="1.25" fill="#dd2a7b" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4.5 w-4.5">
      <path
        fill="#0a66c2"
        d="M19.25 3.5H4.75A1.25 1.25 0 0 0 3.5 4.75v14.5c0 .69.56 1.25 1.25 1.25h14.5c.69 0 1.25-.56 1.25-1.25V4.75c0-.69-.56-1.25-1.25-1.25Z"
      />
      <path fill="#fff" d="M7.11 9.73h2.08v6.7H7.11v-6.7Zm1.04-3.33a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Zm2.35 3.33h1.99v.92h.03c.28-.53.96-1.09 1.98-1.09 2.12 0 2.51 1.4 2.51 3.21v3.66h-2.08v-3.25c0-.78-.01-1.78-1.08-1.78-1.09 0-1.25.85-1.25 1.72v3.31h-2.1v-6.7Z" />
    </svg>
  );
}

export function BrandSocialLink({ brand, href, label, className }: BrandSocialLinkProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      whileHover={{ y: -3 }}
      className={cn(
        "grid h-10 w-10 place-items-center rounded-full border border-primary/30 bg-ivory/8 text-ivory shadow-[0_16px_42px_-26px_rgba(224,190,142,0.75)] backdrop-blur-md transition-all duration-300 hover:border-primary/70 hover:bg-ivory/15 hover:shadow-gold md:h-9 md:w-9 lg:h-10 lg:w-10",
        className,
      )}
    >
      <BrandMark brand={brand} />
    </motion.a>
  );
}
