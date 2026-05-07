export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`}>
      <svg width="34" height="34" viewBox="0 0 40 40" aria-hidden>
        <defs>
          <linearGradient id="lg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="oklch(0.72 0.12 78)" />
            <stop offset="1" stopColor="oklch(0.86 0.13 86)" />
          </linearGradient>
        </defs>
        <path d="M6 34 L20 4 L34 34 Z" fill="url(#lg)" />
        <path d="M14 34 L20 18 L26 34 Z" fill="oklch(0.18 0.012 60)" />
      </svg>
      <div className="leading-tight">
        <div className="font-display text-xl font-semibold tracking-wide">TATHASTU</div>
        <div className="text-[9px] uppercase tracking-[0.28em] text-primary">Building Spaces · Creating Futures</div>
      </div>
    </div>
  );
}
