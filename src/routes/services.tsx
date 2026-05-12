import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { AutoSlideshow } from "@/components/AutoSlideshow";
import { pillars } from "@/lib/site-data";
import { Check } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services in Pune | Realty, Construction & Interior Design | Tathastu" },
      { name: "description", content: "Tathastu offers real estate, property consulting, construction and interior design services in Lohegaon, Pune with end-to-end delivery from one trusted team." },
      { property: "og:title", content: "Tathastu Services" },
      { property: "og:description", content: "Real estate, properties, construction and interior design in Pune under one roof." },
    ],
    links: [{ rel: "canonical", href: "https://www.tathastu.in/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <section className="pt-36 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="eyebrow">Services</p>
          <h1 className="mt-4 max-w-3xl break-words font-display text-[2.75rem] font-medium leading-[1.05] sm:text-5xl md:text-7xl">
            One team. <span className="text-gradient-gold italic">Three pillars.</span> Every step of the journey.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Premium real estate guidance, property consulting, civil construction and interiors for homes and commercial spaces in Lohegaon, Pune and nearby growth corridors.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
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
                  <div className="relative h-72 overflow-hidden rounded-3xl shadow-luxe transition-transform duration-500 group-hover:scale-[1.015] sm:h-96 md:h-[460px]">
                    <AutoSlideshow images={[...p.images]} startIndex={i} interval={3800 + i * 300} rounded="rounded-none" />
                  </div>
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-gold text-ink shadow-gold transition-transform duration-300 group-hover:-translate-y-1">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="eyebrow mt-6">Tathastu {p.title}</p>
                  <h2 className="mt-3 font-display text-3xl font-medium transition-colors duration-300 group-hover:text-primary sm:text-4xl md:text-5xl">{p.title}</h2>
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
                    className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold px-5 py-3 text-sm font-semibold text-ink shadow-gold transition-all duration-300 group-hover:scale-[1.03] group-hover:opacity-95 sm:w-fit"
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
