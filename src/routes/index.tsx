import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Award, Building2, Users, Calendar } from "lucide-react";
import { useState } from "react";
import { AutoSlideshow } from "@/components/AutoSlideshow";
import { BrandSocialLink, type SocialBrand } from "@/components/BrandSocialLink";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { Button } from "@/components/ui/button";
import { ContactSection } from "@/components/ContactSection";
import { pillars, projects, stats } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import realtyVilla from "@/assets/realty-1.jpg";
import realtyTower from "@/assets/realty-2.jpg";
import constructionSite from "@/assets/construction-1.jpg";
import livingInterior from "@/assets/interior-1.jpg";
import bedroomInterior from "@/assets/interior-2.jpg";

const heroImages = [
  { src: realtyVilla, alt: "Tathastu premium villa-style real estate in Pune" },
  { src: realtyTower, alt: "Tathastu modern residential tower in Lohegaon Pune" },
  { src: constructionSite, alt: "Tathastu construction and infrastructure site in Pune" },
  { src: livingInterior, alt: "Tathastu premium living room interior design" },
  { src: bedroomInterior, alt: "Tathastu calm luxury bedroom interior design" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tathastu Pune | Realty, Construction & Interior Design in Lohegaon" },
      { name: "description", content: "Tathastu offers real estate, properties, construction and interior design in Lohegaon, Pune, including flats, homes, residential projects and luxury interiors." },
      { property: "og:title", content: "Tathastu — Building Spaces. Creating Futures." },
      { property: "og:description", content: "Premium real estate, properties, construction and interior design in Lohegaon, Pune." },
    ],
    links: [{ rel: "canonical", href: "https://www.tathastu.in/" }],
  }),
  component: HomePage,
});

const headlineLine1 = "Where Vision";
const headlineLine2 = "Becomes Reality";
const socialLinks = [
  { label: "YouTube", href: "https://www.youtube.com/@Tathastu_Infra", brand: "youtube" },
  { label: "Instagram", href: "https://www.instagram.com/tathastu_infra/", brand: "instagram" },
  { label: "LinkedIn", href: "https://linkedin.com", brand: "linkedin" },
] satisfies { label: string; href: string; brand: SocialBrand }[];

function HeroSocialLinks({ mobile = false }: { mobile?: boolean }) {
  return (
    <motion.div
      className={cn(
        mobile ? "mt-6 flex items-center gap-4 md:hidden" : "absolute left-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-5 md:flex lg:left-8",
      )}
      initial={{ opacity: 0, y: mobile ? 12 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Tathastu social links"
    >
      {!mobile && <span className="h-16 w-px bg-gradient-to-b from-transparent via-ivory/45 to-transparent" />}
      <div className={cn(mobile ? "flex items-center gap-4" : "flex flex-col items-center gap-4")}>
        {socialLinks.map(({ label, href, brand }) => (
          <BrandSocialLink
            key={label}
            brand={brand}
            href={href}
            label={label}
          />
        ))}
      </div>
      {!mobile && <span className="h-16 w-px bg-gradient-to-b from-transparent via-ivory/45 to-transparent" />}
    </motion.div>
  );
}

function HomePage() {
  const [heroVideoDone, setHeroVideoDone] = useState(false);

  return (
    <>
      {/* HERO — cinematic full-bleed video with image fallback */}
      <section id="home" className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-ink sm:min-h-[640px]">
        <AutoSlideshow
          images={heroImages}
          interval={5500}
          showDots={false}
          rounded="rounded-none"
          className="absolute inset-0 h-full w-full"
        />
        <video
          className={cn(
            "absolute inset-0 z-[1] h-full w-full object-cover transition-opacity duration-1000 ease-out",
            heroVideoDone ? "opacity-0" : "opacity-100",
          )}
          src="/media/hero-section.mp4"
          poster={realtyVilla}
          autoPlay
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          onEnded={() => setHeroVideoDone(true)}
          onError={() => setHeroVideoDone(true)}
        />
        {/* Cinematic dark gradient — bottom-up + side vignette */}
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-ink/80 via-ink/30 to-transparent" />
        {/* Warm gold tint */}
        <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_30%_70%,color-mix(in_oklab,var(--color-primary)_22%,transparent),transparent_55%)]" />
        <HeroSocialLinks />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-20 pt-28 sm:px-6 sm:pb-24 md:justify-center md:pb-0 md:pl-20 lg:pl-20">
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow !text-primary-glow">Tathastu</p>
            <p className="max-w-4xl font-display text-xl font-medium leading-tight text-ivory drop-shadow-[0_3px_18px_rgba(0,0,0,0.4)] sm:text-2xl md:text-3xl lg:text-[2.1rem]">
              Building Dreams <span className="italic text-gradient-gold">Since 2014</span>
            </p>
          </motion.div>
          <h1 className="mt-4 max-w-4xl break-words font-display text-[2.85rem] font-medium leading-[1.02] text-ivory sm:text-5xl md:text-7xl lg:text-[5.75rem]">
            <span className="block">
              {headlineLine1.split(" ").map((w, i) => (
                <motion.span
                  key={`l1-${i}`}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block pr-3"
                >
                  {w}
                </motion.span>
              ))}
            </span>
            <span className="mt-2 block italic text-gradient-gold">
              {headlineLine2.split(" ").map((w, i) => (
                <motion.span
                  key={`l2-${i}`}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block pr-3"
                >
                  {w}
                </motion.span>
              ))}
            </span>
          </h1>
          <motion.p
            className="mt-5 max-w-xl text-base leading-relaxed text-ivory/80 md:text-lg"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95, duration: 0.9 }}
          >
            Crafting timeless homes, properties and spaces across Pune through real estate, construction and interior design from our Lohegaon studio.
          </motion.p>
          <motion.div
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:gap-4"
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15, duration: 0.7 }}
          >
            <Button asChild size="lg" className="group w-full rounded-full bg-gradient-gold px-5 text-base text-primary-foreground shadow-gold transition-all hover:scale-[1.03] hover:shadow-[0_25px_60px_-15px_color-mix(in_oklab,var(--color-primary)_55%,transparent)] sm:w-auto sm:px-8">
              <a href="#contact">Begin Your Project <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" /></a>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full rounded-full border-primary/50 bg-ink/25 px-5 text-base text-primary-glow backdrop-blur transition-all hover:border-primary hover:bg-primary/10 sm:w-auto sm:px-8">
              <a href="#contact">Get Free Quote</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full rounded-full border-ivory/30 bg-ivory/5 px-5 text-base text-ivory backdrop-blur transition-all hover:border-primary/60 hover:bg-ivory/10 sm:w-auto sm:px-8">
              <Link to="/projects">Explore Projects</Link>
            </Button>
          </motion.div>
          <HeroSocialLinks mobile />
        </div>

        <motion.div
          className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.35em] text-ivory/60"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.8 }}
        >
          scroll ↓
        </motion.div>
      </section>

      {/* PILLARS with auto-rotating slideshows */}
      <section id="services" className="relative py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Three Pillars</p>
            <h2 className="mt-3 font-display text-3xl font-medium sm:text-4xl md:text-5xl">A complete craft, end to end.</h2>
            <p className="mt-4 text-muted-foreground">From Lohegaon property search and land advisory to Pune homes, construction and interiors, Tathastu is one team for every step.</p>
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.key} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 180, damping: 18 }}
                    className="h-full"
                  >
                    <Link
                      to={`/${p.key}`}
                      aria-label={`Explore ${p.title}`}
                      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl bg-card shadow-luxe ring-1 ring-border transition-shadow duration-300 hover:shadow-[0_28px_80px_-35px_color-mix(in_oklab,var(--color-primary)_45%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
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
                      <span
                        className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-4 py-2 text-xs font-semibold uppercase tracking-wider text-foreground transition-all duration-300 group-hover:bg-gradient-gold group-hover:shadow-gold"
                      >
                        Explore <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                    </Link>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-14">
            <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-5 rounded-3xl border border-primary/20 bg-card px-5 py-6 text-center shadow-luxe sm:px-7 md:flex-row md:px-9 md:text-left">
              <div>
                <p className="eyebrow">Planning Something?</p>
                <h3 className="mt-2 font-display text-2xl font-medium sm:text-3xl">Get a free quote from Tathastu Pune.</h3>
              </div>
              <Button asChild size="lg" className="group w-full rounded-full bg-gradient-gold px-5 text-ink shadow-gold sm:w-auto sm:px-7">
                <a href="#contact">Get Free Quote <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS — dark band */}
      <section className="relative bg-gradient-ink py-24 text-ivory">
        <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 0%, var(--color-primary), transparent 40%)" }} />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-4">
          {stats.map((s, i) => {
            const Icon = [Calendar, Building2, Users, Award][i];
            return (
              <Reveal key={s.label} delay={i * 0.08} className="flex items-center gap-5">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-gold text-primary-foreground shadow-gold">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-display text-4xl font-semibold tabular-nums text-gradient-gold">
                    <CountUp value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-xs uppercase tracking-[0.2em] text-ivory/60">{s.label}</div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section id="projects" className="relative py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-end justify-between gap-6">
            <Reveal>
              <p className="eyebrow">Featured</p>
              <h2 className="mt-3 font-display text-3xl font-medium sm:text-4xl md:text-5xl">Recent work</h2>
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

      {/* VISION QUOTE — dark band */}
      <section className="relative overflow-hidden bg-gradient-ink py-28 text-ivory">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <Reveal>
            <p className="eyebrow !text-primary-glow">The Vision</p>
            <p className="mt-6 font-display text-2xl font-medium leading-tight sm:text-3xl md:text-5xl">
              We don't just pour concrete. We design the <span className="text-gradient-gold italic">backdrops for people's lives</span> across Pune, with every project shaped by luxury, utility and timeless architecture.
            </p>
            <p className="mt-8 text-sm uppercase tracking-[0.28em] text-ivory/60">— Rohit, Founder & CEO</p>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <ContactSection />
    </>
  );
}
