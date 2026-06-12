import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import founder from "@/assets/founder.jpg";
import officeFront from "@/assets/office-front.jpg";
import trustImage from "@/assets/realty-3.jpg";
import luxuryImage from "@/assets/interior-1.jpg";
import craftsmanshipImage from "@/assets/construction-1.jpg";
import { CountUp } from "@/components/CountUp";
import { stats } from "@/lib/site-data";
import { Sparkles, Shield, Gem, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Tathastu Infra — Our Story, Vision & Leadership" },
      { name: "description", content: "Founded by Rohit, Tathastu Infra is a multi-disciplinary realty, construction and interior design firm based in Lohegaon, Pune." },
      { property: "og:title", content: "About Tathastu Infra" },
      { property: "og:description", content: "Trust, luxury and craftsmanship — the Tathastu Infra story." },
    ],
    links: [{ rel: "canonical", href: "https://www.tathastuinfra.in/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="pt-36 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="eyebrow">About Tathastu Infra</p>
          <h1 className="mt-4 max-w-6xl break-words font-display text-[2.75rem] font-medium leading-[1.05] sm:text-5xl md:text-7xl xl:text-[5.4rem]">
            A name synonymous with <span className="text-gradient-gold italic">trust, luxury</span> and unparalleled craftsmanship.
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-16 md:grid-cols-2">
            {/* Founder 1: Rohit */}
            <div className="grid items-center gap-8 sm:grid-cols-[1fr_1.2fr] md:grid-cols-1 lg:grid-cols-[1fr_1.2fr]">
              <Reveal>
                <motion.div
                  whileHover={{ rotate: -1, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 120 }}
                  className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-luxe"
                >
                  <img src={founder} alt="Rohit, Founder & CEO of Tathastu Infra" loading="lazy" className="h-full w-full object-cover" />
                  <div className="absolute -left-3 -top-3 h-full w-full rounded-3xl border border-primary/40" />
                </motion.div>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="eyebrow">Founder & CEO</p>
                <h2 className="mt-3 font-display text-3xl font-medium">Rohit</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  What began as a singular vision to redefine architectural elegance has evolved into a multi-disciplinary firm dedicated to shaping the future of modern living.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Headquartered in Lohegaon, Pune, Tathastu Infra transforms raw structures into elegant, functional homes and commercial spaces across Maharashtra where luxury, utility and timeless design intersect.
                </p>
                <blockquote className="mt-6 border-l-2 border-primary pl-4 font-display text-base italic text-foreground">
                  "Building spaces that inspire future generations."
                </blockquote>
              </Reveal>
            </div>

            {/* Founder 2: Sneha */}
            <div className="grid items-center gap-8 sm:grid-cols-[1fr_1.2fr] md:grid-cols-1 lg:grid-cols-[1fr_1.2fr]">
              <Reveal>
                <motion.div
                  whileHover={{ rotate: 1, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 120 }}
                  className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-luxe bg-[#0c1a2e]/40 border border-border flex flex-col items-center justify-center text-muted-foreground"
                >
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg className="w-full h-full text-slate-800" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <pattern id="placeholder-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.2" className="text-ivory" />
                      </pattern>
                      <rect width="100" height="100" fill="url(#placeholder-grid)" />
                    </svg>
                  </div>
                  <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-gold text-ink shadow-gold">
                    <Users className="h-8 w-8" />
                  </div>
                  <p className="mt-4 font-display text-xs uppercase tracking-wider text-gradient-gold font-semibold">Tathastu Leadership</p>
                  <div className="absolute -left-3 -top-3 h-full w-full rounded-3xl border border-primary/40 pointer-events-none" />
                </motion.div>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="eyebrow">Co-Founder</p>
                <h2 className="mt-3 font-display text-3xl font-medium">Sneha</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Co-leading business operations and strategy at Tathastu Infra, guiding client relationship development, design management, and organizational growth.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Supervising client integration, financial planning, and project management workflows to ensure client budgets, material selections, and project schedules stay fully aligned.
                </p>
                <blockquote className="mt-6 border-l-2 border-primary pl-4 font-display text-base italic text-foreground">
                  "Translating design concepts and client dreams into lasting, trusted realities."
                </blockquote>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gradient-ivory py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">What we stand for</p>
            <h2 className="mt-3 font-display text-3xl font-medium sm:text-4xl md:text-5xl">Three values, one promise.</h2>
          </Reveal>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              { icon: Shield, title: "Trust", body: "Every relationship begins and ends with the trust our clients place in us.", image: trustImage, alt: "Premium Tathastu Infra real estate project representing client trust" },
              { icon: Gem, title: "Luxury", body: "Materials, finishes and details chosen with conviction � never by default.", image: luxuryImage, alt: "Luxury Tathastu Infra interior finishes and elegant living space" },
              { icon: Sparkles, title: "Craftsmanship", body: "Engineering precision and design care that endures decades, not seasons.", image: craftsmanshipImage, alt: "Tathastu Infra construction craftsmanship and site execution" },
            ].map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="group h-full overflow-hidden rounded-3xl bg-card shadow-luxe ring-1 ring-border transition-transform duration-300 hover:-translate-y-1">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={v.image}
                      alt={v.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/15 to-transparent" />
                    <div className="absolute left-6 top-6 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-gold text-ink shadow-gold">
                      <v.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="font-display text-2xl font-semibold">{v.title}</h3>
                    <p className="mt-2 text-muted-foreground">{v.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <p className="eyebrow">Leadership</p>
            <h2 className="mt-3 font-display text-3xl font-medium sm:text-4xl md:text-5xl">The people behind Tathastu Infra.</h2>
          </Reveal>
          <div className="mt-14">
            <Reveal>
              <div className="overflow-hidden rounded-3xl bg-card shadow-luxe ring-1 ring-border">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={officeFront}
                    alt="Tathastu Infra office storefront and physical studio facade in Lohegaon, Pune"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-ivory sm:p-8 md:p-12">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-gold text-ink shadow-gold sm:h-16 sm:w-16">
                      <Users className="h-6 w-6 sm:h-7 sm:w-7" />
                    </div>
                    <p className="eyebrow mt-6 !text-primary-glow">Our Team</p>
                    <h3 className="mt-3 max-w-4xl font-display text-3xl font-medium sm:text-4xl md:text-5xl">
                      One studio. Many specialists.
                    </h3>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ivory/82 sm:text-base">
                      Behind every Tathastu Infra project in Pune is a coordinated team of sales, construction, design, engineering and execution professionals working together to deliver spaces with clarity and care.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      {/* Stats */}
      <section className="bg-ink py-20 text-ivory">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-4xl font-semibold text-gradient-gold sm:text-5xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-ivory/60">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

