import logoUrl from "@/assets/tathastu-logo.png";

export function Logo({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`}>
      <img
        src={logoUrl}
        alt="Tathastu"
        className="h-10 w-auto md:h-11"
      />
      <div className="leading-tight">
        <div className={`font-display text-xl font-semibold tracking-[0.18em] transition-colors duration-300 ease-out ${light ? "text-ivory drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]" : "text-ink"}`}>
          TATHASTU
        </div>
        <div className={`text-[9px] uppercase tracking-[0.28em] transition-colors duration-300 ease-out ${light ? "text-primary-glow drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]" : "text-primary"}`}>
          Building Spaces · Creating Futures
        </div>
      </div>
    </div>
  );
}
