import { Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Home, KeyRound, MapPinned } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { realtySearchLinks } from "@/lib/realty-search-data";

const icons = [Building2, Home, KeyRound, MapPinned] as const;

export function RealtySearchLinks({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <section className={cn(compact ? "bg-gradient-ivory py-20" : "py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Property Search in Lohegaon</p>
          <h2 className="mt-3 font-display text-3xl font-medium leading-tight sm:text-4xl md:text-5xl">
            Looking for flats, rent or plots in Pune?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            Start with the property path that matches your need. Tathastu Infra Realty helps buyers,
            tenants and investors move from search to site visit with local guidance in Lohegaon.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {realtySearchLinks.map((item, index) => {
            const Icon = icons[index % icons.length];

            return (
              <Reveal key={`${item.to}-${item.title}`} delay={(index % 2) * 0.06}>
                <Link
                  to={item.to}
                  className="group flex h-full min-w-0 gap-4 rounded-3xl border border-border bg-card p-5 shadow-luxe transition duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_28px_70px_-38px_color-mix(in_oklab,var(--color-primary)_55%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:p-6"
                >
                  <span className="grid h-14 w-14 flex-none place-items-center rounded-2xl bg-gradient-gold text-ink shadow-gold">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="min-w-0">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                      {item.intent}
                    </span>
                    <span className="mt-1 block font-display text-2xl font-semibold leading-tight">
                      {item.title}
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </span>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                      Explore guidance <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
