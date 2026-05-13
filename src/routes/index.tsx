import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Award, Building2, Users, Calendar, Instagram, Linkedin, Youtube } from "lucide-react";
import { AutoSlideshow } from "@/components/AutoSlideshow";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { Button } from "@/components/ui/button";
import { ContactSection } from "@/components/ContactSection";
import { pillars, projects, stats } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import heroRealty from "@/assets/hero-realty.jpg";
import heroInfra1 from "@/assets/hero-infra-1.jpg";
import heroInterior from "@/assets/hero-interior.jpg";
import heroImg from "@/assets/hero-building.jpg";

const heroImages = [
  { src: heroRealty, alt: "Tathastu premium real estate and property spaces in Pune" },
  { src: heroInfra1, alt: "Tathastu infrastructure construction site in Pune" },
  { src: heroInterior, alt: "Tathastu premium interior design and luxury living spaces" },
  { src: heroImg, alt: "Tathastu signature architectural elevation" },
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
  { label: "YouTube", href: "https://www.youtube.com/@Tathastu_Infra", Icon: Youtube, className: "border-[#ff0033]/70 bg-[#ff0033] text-white shadow-[0_0_28px_-10px_#ff0033] hover:border-[#ff0033] hover:bg-[#ff0033] hover:text-white" },
  { label: "Instagram", href: "https://www.instagram.com/tathastu_infra/", Icon: Instagram, className: "border-[#f58529]/70 bg-[linear-gradient(135deg,#f58529,#dd2a7b_45%,#8134af_72%,#515bd4)] text-white shadow-[0_0_28px_-10px_#dd2a7b] hover:border-[#f58529] hover:text-white" },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: Linkedin, className: "border-[#0a66c2]/70 bg-[#0a66c2] text-white shadow-[0_0_28px_-10px_#0a66c2] hover:border-[#0a66c2] hover:bg-[#0a66c2] hover:text-white" },
] as const;

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
        {socialLinks.map(({ label, href, Icon, className }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            whileHover={{ y: -3 }}
            className={cn(
              "grid h-10 w-10 place-items-center rounded-full border backdrop-blur-sm transition-all duration-300 md:h-9 md:w-9 lg:h-10 lg:w-10",
              className,
            )}
          >
            <Icon className="h-4.5 w-4.5 fill-current stroke-[1.8]" />
          </motion.a>
        ))}
      </div>
      {!mobile && <span className="h-16 w-px bg-gradient-to-b from-transparent via-ivory/45 to-transparent" />}
    </motion.div>
  );
}

function HomePage() {
  return (
    <>
      {/* HERO — cinematic full-bleed slideshow with luxury overlay */}
      <section id="home" className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-ink sm:min-h-[640px]">
        <AutoSlideshow
          images={heroImages}
          interval={5500}
          showDots={false}
          rounded="rounded-none"
          className="absolute inset-0 h-full w-full"
        />
        {/* Cinematic dark gradient — bottom-up + side vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/30 to-transparent" />
        {/* Warm gold tint */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,color-mix(in_oklab,var(--color-primary)_22%,transparent),transparent_55%)]" />
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

      <section className="bg-gradient-ivory py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-ink p-6 text-ivory shadow-luxe sm:p-8 md:p-12">
              <div className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl" />
              <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
                <div>
                  <p className="eyebrow !text-primary-glow">Need a clearer estimate?</p>
                  <h2 className="mt-3 max-w-2xl font-display text-3xl font-medium leading-tight sm:text-4xl md:text-5xl">
                    Get a tailored quote for your <span className="italic text-gradient-gold">dream space.</span>
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-ivory/70 md:text-base">
                    Share your site, scope and expectations in Pune or around Lohegaon. Our team will help you understand the right package, timeline and next step.
                  </p>
                </div>
                <Button asChild size="lg" className="group w-full rounded-full bg-gradient-gold px-5 text-base text-ink shadow-gold sm:w-auto sm:px-8">
                  <a href="#contact">Get Free Quote <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <ContactSection />
    </>
  );
}
