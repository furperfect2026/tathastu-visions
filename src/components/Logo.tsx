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
        <div className={`font-display text-xl font-semibold tracking-[0.18em] ${light ? "text-ivory" : "text-ink"}`}>
          TATHASTU
        </div>
        <div className="text-[9px] uppercase tracking-[0.28em] text-primary">
          Building Spaces · Creating Futures
        </div>
      </div>
    </div>
  );
}
