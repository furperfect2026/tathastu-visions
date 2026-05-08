import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Award, Building2, Users, Calendar } from "lucide-react";
import { AutoSlideshow } from "@/components/AutoSlideshow";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { Button } from "@/components/ui/button";
import { pillars, projects, stats } from "@/lib/site-data";
import heroImg from "@/assets/hero-building.jpg";
import realty1 from "@/assets/realty-1.jpg";
import realty2 from "@/assets/realty-2.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project4 from "@/assets/project-4.jpg";
import project6 from "@/assets/project-6.jpg";

const heroImages = [
  { src: heroImg, alt: "Tathastu signature architectural elevation" },
  { src: project1, alt: "Aurelia Heights aerial masterplan" },
  { src: realty1, alt: "Modern apartment facade at golden hour" },
  { src: project2, alt: "Pool-side villa at dusk" },
  { src: realty2, alt: "High-rise residential tower" },
  { src: project4, alt: "Skyline penthouse with floor-to-ceiling glass" },
  { src: project6, alt: "Palm-lined contemporary apartments" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tathastu — Realty, Construction & Interior Design" },
      { name: "description", content: "From concept to creation, Tathastu builds spaces that inspire and stand the test of time. Realty, construction and interior design from Lohegaon, Maharashtra." },
      { property: "og:title", content: "Tathastu — Building Spaces. Creating Futures." },
      { property: "og:description", content: "Premium realty, construction and interior design." },
    ],
  }),
  component: HomePage,
});

const headline = "Realty, Construction & Interior Solutions";

function HomePage() {
  return (
    <>
      {/* HERO — full-bleed continuous slideshow */}
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
        <AutoSlideshow
          images={heroImages}
          interval={4500}
          showDots={false}
          rounded="rounded-none"
          className="absolute inset-0 h-full w-full"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/85 via-background/40 to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-20 pt-32 md:justify-center md:pb-0">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Building Dreams · Creating Reality
          </motion.p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-medium leading-[1.05] text-foreground md:text-7xl lg:text-[5.5rem]">
            {headline.split(" ").map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block pr-3"
              >
                {w === "Interior" || w === "Solutions" ? <span className="text-gradient-gold italic">{w}</span> : w}
              </motion.span>
            ))}
          </h1>
          <motion.p
            className="mt-6 max-w-xl text-base text-foreground/80 md:text-lg"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }}
          >
            From concept to creation, we build spaces that inspire and stand the test of time.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap gap-3 md:gap-4"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6 }}
          >
            <Button asChild size="lg" className="group rounded-full bg-gradient-gold px-7 text-base text-primary-foreground shadow-gold hover:opacity-90">
              <Link to="/contact">Get In Touch <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-foreground/30 bg-background/30 px-7 text-base text-foreground backdrop-blur hover:bg-background/50">
              <Link to="/projects">View Projects</Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-foreground/60"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.8 }}
        >
          scroll ↓
        </motion.div>
      </section>

      {/* PILLARS with auto-rotating slideshows */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Three Pillars</p>
            <h2 className="mt-3 font-display text-4xl font-medium md:text-5xl">A complete craft, end to end.</h2>
            <p className="mt-4 text-muted-foreground">From the land you stand on to the light that fills your living room — Tathastu is one team for every step.</p>
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.key} delay={i * 0.1}>
                  <motion.article
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 180, damping: 18 }}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl bg-card shadow-luxe ring-1 ring-border"
                  >
                    <div className="relative h-60">
                      <AutoSlideshow images={[...p.images]} startIndex={i} interval={3500 + i * 400} rounded="rounded-none" />
                      <div className="absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-gradient-gold text-ink shadow-gold">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-7">
                      <h3 className="font-display text-2xl font-semibold">{p.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.blurb}</p>
                      <Link
                        to="/services"
                        className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-4 py-2 text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:bg-gradient-gold"
                      >
                        Explore <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </motion.article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative bg-gradient-ivory py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-4">
          {stats.map((s, i) => {
            const Icon = [Calendar, Building2, Users, Award][i];
            return (
              <Reveal key={s.label} delay={i * 0.08} className="flex items-center gap-5">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-gold text-ink shadow-gold">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-display text-4xl font-semibold tabular-nums">
                    <CountUp value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.label}</div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between gap-6">
            <Reveal>
              <p className="eyebrow">Featured</p>
              <h2 className="mt-3 font-display text-4xl font-medium md:text-5xl">Recent work</h2>
            </Reveal>
            <Link to="/projects" className="hidden text-sm font-semibold text-primary hover:underline md:block">View all →</Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {projects.slice(0, 6).map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 0.08}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`group relative overflow-hidden rounded-3xl shadow-luxe ${i % 3 === 1 ? "md:translate-y-10" : ""}`}
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent p-6 text-ivory">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-primary-glow">{p.category}</p>
                    <h3 className="mt-1 font-display text-xl font-semibold">{p.title}</h3>
                    <p className="text-xs text-ivory/70">{p.location} · {p.year}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VISION QUOTE */}
      <section className="relative overflow-hidden py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <p className="eyebrow">The Vision</p>
            <p className="mt-6 font-display text-3xl font-medium leading-tight md:text-5xl">
              We don't just pour concrete. We design the <span className="text-gradient-gold italic">backdrops for people's lives</span> — every project an intersection of luxury, utility and timeless architecture.
            </p>
            <p className="mt-8 text-sm uppercase tracking-[0.28em] text-muted-foreground">— Rohit, Founder & CEO</p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grain relative overflow-hidden rounded-3xl bg-gradient-gold p-12 text-center shadow-gold md:p-20">
          <h2 className="font-display text-4xl font-semibold text-ink md:text-5xl">Let's design your next space.</h2>
          <p className="mx-auto mt-4 max-w-xl text-ink/80">A 30-minute call is all it takes to see if Tathastu is the right partner for your dream.</p>
          <Button asChild size="lg" className="mt-8 rounded-full bg-ink px-8 text-base text-ivory hover:bg-ink/90">
            <Link to="/contact">Start a conversation <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </>
  );
}
