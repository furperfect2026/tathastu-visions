import logoUrl from "@/assets/tathastu-logo.png";

export function Logo({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <div className={`flex min-w-0 items-center gap-2 sm:gap-3 ${className ?? ""}`}>
      <img
        src={logoUrl}
        alt="Tathastu"
        className="h-8 w-auto flex-none sm:h-10 md:h-11"
      />
      <div className="min-w-0 leading-tight">
        <div className={`font-display text-base font-semibold tracking-[0.14em] transition-colors duration-300 ease-out sm:text-xl sm:tracking-[0.18em] ${light ? "text-ivory drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]" : "text-ink"}`}>
          TATHASTU
        </div>
        <div className={`text-[7px] uppercase tracking-[0.14em] transition-colors duration-300 ease-out max-[360px]:hidden sm:text-[9px] sm:tracking-[0.28em] ${light ? "text-primary-glow drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]" : "text-primary"}`}>
          Building Spaces · Creating Futures
        </div>
      </div>
    </div>
  );
}
