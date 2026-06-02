import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  CookingPot,
  HardHat,
  Home,
  Lamp,
  Ruler,
  Sofa,
  WalletCards,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { constructionSearchLinks, interiorSearchLinks } from "@/lib/service-search-data";
import { cn } from "@/lib/utils";

type ServiceSearchMode = "construction" | "interior";

const serviceSearchContent: Record<
  ServiceSearchMode,
  {
    eyebrow: string;
    title: string;
    description: string;
    icons: readonly LucideIcon[];
    links: typeof constructionSearchLinks | typeof interiorSearchLinks;
  }
> = {
  construction: {
    eyebrow: "Construction in Pune",
    title: "Planning a build, budget or turnkey handover?",
    description:
      "Start with the construction question closest to your project. Tathastu Infra helps owners in Pune and Lohegaon move from scope to supervised execution.",
    icons: [HardHat, Home, WalletCards, Building2],
    links: constructionSearchLinks,
  },
  interior: {
    eyebrow: "Interiors in Pune",
    title: "Designing a home, kitchen or office interior?",
    description:
      "Choose the interior path that fits your space. Tathastu Infra balances layout, finishes, comfort and everyday function across Pune.",
    icons: [Lamp, Sofa, CookingPot, Ruler],
    links: interiorSearchLinks,
  },
};

export function ServiceSearchLinks({
  className,
  compact = false,
  mode,
}: {
  className?: string;
  compact?: boolean;
  mode: ServiceSearchMode;
}) {
  const content = serviceSearchContent[mode];

  return (
    <section className={cn(compact ? "bg-gradient-ivory py-20" : "py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-medium leading-tight sm:text-4xl md:text-5xl">
            {content.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            {content.description}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {content.links.map((item, index) => {
            const Icon = content.icons[index % content.icons.length];

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
                      Explore guidance{" "}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
