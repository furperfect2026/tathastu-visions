import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { AutoSlideshow } from "@/components/AutoSlideshow";
import { pillars } from "@/lib/site-data";
import { Check } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Realty, Construction & Interior Design | Tathastu" },
      { name: "description", content: "Three pillars of expertise: Tathastu Realty, Tathastu Construction and Tathastu Interior Design. End-to-end delivery from one trusted team." },
      { property: "og:title", content: "Tathastu Services" },
      { property: "og:description", content: "Realty, construction and interior design — under one roof." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <section className="pt-36 pb-12">
        <div className="mx-auto max-w-7xl px-6">
          <p className="eyebrow">Services</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-medium leading-[1.05] md:text-7xl">
            One team. <span className="text-gradient-gold italic">Three pillars.</span> Every step of the journey.
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6">
        {pillars.map((p, i) => {
          const Icon = p.icon;
          const reverse = i % 2 === 1;
          return (
            <section key={p.key} id={p.key} className="border-t border-border py-20 first:border-t-0">
              <Link
                to={`/${p.key}`}
                aria-label={`Explore ${p.title}`}
                className={`group grid cursor-pointer items-center gap-12 rounded-3xl p-2 transition-all duration-300 hover:bg-card/55 hover:shadow-luxe focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background md:grid-cols-2 ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                <Reveal>
                  <div className="relative h-[460px] overflow-hidden rounded-3xl shadow-luxe transition-transform duration-500 group-hover:scale-[1.015]">
                    <AutoSlideshow images={[...p.images]} startIndex={i} interval={3800 + i * 300} rounded="rounded-none" />
                  </div>
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-gold text-ink shadow-gold transition-transform duration-300 group-hover:-translate-y-1">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="eyebrow mt-6">Tathastu {p.title}</p>
                  <h2 className="mt-3 font-display text-4xl font-medium transition-colors duration-300 group-hover:text-primary md:text-5xl">{p.title}</h2>
                  <p className="mt-5 text-lg text-muted-foreground">{p.blurb}</p>
                  <ul className="mt-8 space-y-3">
                    {p.capabilities.map((c) => (
                      <li key={c} className="flex items-start gap-3">
                        <span className="mt-0.5 grid h-6 w-6 place-items-center rounded-full bg-gradient-gold text-ink">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        <span className="text-foreground">{c}</span>
                      </li>
                    ))}
                  </ul>
                  <span
                    className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-gold px-5 py-3 text-sm font-semibold text-ink shadow-gold transition-all duration-300 group-hover:scale-[1.03] group-hover:opacity-95"
                  >
                    Explore {p.title} <Check className="h-4 w-4" />
                  </span>
                </Reveal>
              </Link>
            </section>
          );
        })}
      </div>
    </>
  );
}
