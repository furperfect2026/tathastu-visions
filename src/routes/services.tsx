import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { AutoSlideshow } from "@/components/AutoSlideshow";
import { pillars } from "@/lib/site-data";
import { ArrowRight, Check } from "lucide-react";

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
          <h1 className="mt-4 max-w-4xl break-words font-display text-[2.75rem] font-medium leading-[1.05] sm:text-5xl md:text-7xl">
            Three pillars of <span className="text-gradient-gold italic">Tathastu</span>
          </h1>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {pillars.map((p, i) => {
              const Icon = p.icon;

              return (
                <Reveal key={p.key} delay={i * 0.06}>
                  <Link
                    to={`/${p.key}`}
                    className="group block h-full overflow-hidden rounded-3xl bg-card shadow-luxe ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_-35px_color-mix(in_oklab,var(--color-primary)_45%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                  >
                    <div className="relative h-48 overflow-hidden sm:h-56">
                      <img
                        src={p.images[0].src}
                        alt={p.images[0].alt}
                        loading={i === 0 ? "eager" : "lazy"}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent" />
                      <div className="absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-gold text-ink shadow-gold">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="eyebrow">Tathastu {p.title}</p>
                      <h2 className="mt-2 font-display text-2xl font-semibold">{p.title}</h2>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{p.blurb}</p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-primary transition-colors group-hover:text-ink">
                        Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
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
