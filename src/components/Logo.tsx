import logoUrl from "@/assets/tathastu-mark-new-cropped.png";

export function Logo({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <div className={`flex min-w-0 items-center gap-2 ${className ?? ""}`}>
      <img
        src={logoUrl}
        alt="Tathastu premium gold emblem"
        className="h-14 w-auto flex-none object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.24)] transition-all duration-300 ease-out sm:h-16 lg:h-[4.5rem]"
      />
      <div className="min-w-0 leading-tight">
        <div
          className={`font-display text-xl font-semibold tracking-[0.14em] transition-all duration-300 ease-out sm:text-2xl sm:tracking-[0.18em] lg:text-[1.85rem] ${light ? "text-ivory drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] [text-shadow:0_1px_0_rgba(255,255,255,0.2),0_12px_26px_rgba(0,0,0,0.45)]" : "text-ink [text-shadow:0_1px_0_rgba(255,255,255,0.55),0_12px_28px_rgba(12,23,45,0.12)]"}`}
        >
          TATHASTU
        </div>
        <div
          className={`text-[7px] uppercase tracking-[0.14em] transition-all duration-300 ease-out max-[380px]:hidden sm:text-[9px] sm:tracking-[0.24em] lg:text-[10px] ${light ? "text-primary-glow drop-shadow-[0_1px_10px_rgba(0,0,0,0.5)]" : "font-semibold text-ink/70"}`}
        >
          Building Spaces · Creating Futures
        </div>
      </div>
    </div>
  );
}
