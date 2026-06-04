import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Award, Building2, Calendar, Eye, ShieldCheck, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { AutoSlideshow } from "@/components/AutoSlideshow";
import { BrandSocialLink, type SocialBrand } from "@/components/BrandSocialLink";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { Button } from "@/components/ui/button";
import { ContactSection } from "@/components/ContactSection";
import { usePublicProjects } from "@/hooks/usePublicProjects";
import { pillars, stats } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import realtyCourtyard from "@/assets/realty-3.jpg";
import constructionSite from "@/assets/construction-1.jpg";
import livingInterior from "@/assets/interior-1.jpg";
import bedroomInterior from "@/assets/interior-2.jpg";
import trustHandshake from "@/assets/trust-handshake.jpg";
import clientRelationship from "@/assets/client-relationship.jpg";
import clearGuidance from "@/assets/clear-guidance.jpg";
import longTermValue from "@/assets/long-term-value.jpg";

const heroImages = [
  { src: realtyCourtyard, alt: "Tathastu Infra residential project and realty guidance in Pune" },
  { src: constructionSite, alt: "Tathastu Infra construction and infrastructure site in Pune" },
  { src: livingInterior, alt: "Tathastu Infra premium living room interior design" },
  { src: bedroomInterior, alt: "Tathastu Infra calm luxury bedroom interior design" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tathastu Infra Pune | Construction Company, Realty & Interior Design" },
      {
        name: "description",
        content:
          "Tathastu Infra is a Pune and Lohegaon construction company, real estate consultant and interior design studio for flats, rent, plots, home construction, commercial construction and premium interiors.",
      },
      {
        name: "keywords",
        content:
          "Tathastu Infra, construction company in Pune, best construction company in Pune, top construction company in Pune, leading construction company in Pune, construction company in Lohegaon, home construction company in Pune, civil construction company in Pune, bungalow construction company in Pune, commercial construction Pune, warehouse construction company in Pune, industrial construction company in Pune, road construction company in Pune, real estate company in Lohegaon, property consultant in Lohegaon, flats in Lohegaon Pune, flats for sale in Lohegaon Pune, 2 BHK flats in Lohegaon, 3 BHK flats in Lohegaon, flats for rent in Lohegaon, plots for sale in Lohegaon, interior designer in Pune, best interior designer in Pune, modular kitchen Pune",
      },
      { property: "og:title", content: "Tathastu Infra — Building Spaces. Creating Futures." },
      {
        property: "og:description",
        content:
          "Premium real estate, properties, construction and interior design in Lohegaon, Pune.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Tathastu Infra" },
      { property: "og:title", content: "Tathastu Infra Pune | Construction, Realty & Interior Design" },
      {
        property: "og:description",
        content:
          "Construction company, property consultant and interior design studio in Lohegaon, Pune for homes, flats, rentals, plots and commercial spaces.",
      },
      { property: "og:url", content: "https://www.tathastuinfra.in/" },
      { property: "og:image", content: "https://www.tathastuinfra.in/assets/tathastu-logo.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Tathastu Infra Pune | Construction, Realty & Interior Design" },
      {
        name: "twitter:description",
        content:
          "Pune construction, realty and interior design services from Tathastu Infra in Lohegaon.",
      },
      { name: "twitter:image", content: "https://www.tathastuinfra.in/assets/tathastu-logo.png" },
    ],
    links: [{ rel: "canonical", href: "https://www.tathastuinfra.in/" }],
  }),
  component: HomePage,
});

const headlineLine1 = "You Imagine.";
const headlineLine2 = "We Say Tathastu.";
const socialLinks = [
  { label: "YouTube", href: "https://www.youtube.com/@Tathastu_Infra", brand: "youtube" },
  { label: "Instagram", href: "https://www.instagram.com/tathastu_infra/", brand: "instagram" },
  { label: "LinkedIn", href: "https://in.linkedin.com/company/tathastu-infra?trk=public_post_feed-actor-name", brand: "linkedin" },
] satisfies { label: string; href: string; brand: SocialBrand }[];

const trustPolicies = [
  {
    icon: ShieldCheck,
    title: "Trust",
    body: "Every conversation is handled with honesty, privacy and care from the first enquiry.",
    image: trustHandshake,
    alt: "Trust-led Tathastu Infra client handshake over architectural plans",
  },
  {
    icon: Users,
    title: "Client Relationship",
    body: "We stay close to clients through decisions, visits, planning and final handover.",
    image: clientRelationship,
    alt: "Tathastu Infra team guiding clients through property and design planning",
  },
  {
    icon: Eye,
    title: "Clear Guidance",
    body: "Simple explanations, practical options and transparent next steps across every service.",
    image: clearGuidance,
    alt: "Clear Tathastu Infra planning guidance with a digital home layout",
  },
  {
    icon: Award,
    title: "Long-Term Value",
    body: "Spaces and property decisions shaped for comfort, durability and future confidence.",
    image: longTermValue,
    alt: "Family viewing a premium residential building for long-term property value",
  },
] as const;

const serviceQuickLinks = [
  { to: "/realty", label: "Realty" },
  { to: "/construction", label: "Construction" },
  { to: "/interior", label: "Interior" },
] as const;

function HeroSocialLinks({ mobile = false }: { mobile?: boolean }) {
  return (
    <motion.div
      className={cn(
        mobile
          ? "mt-6 flex items-center gap-4 md:hidden"
          : "absolute left-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-5 md:flex lg:left-8",
      )}
      initial={{ opacity: 0, y: mobile ? 12 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Tathastu Infra social links"
    >
      {!mobile && (
        <span className="h-16 w-px bg-gradient-to-b from-transparent via-ivory/45 to-transparent" />
      )}
      <div className={cn(mobile ? "flex items-center gap-4" : "flex flex-col items-center gap-4")}>
        {socialLinks.map(({ label, href, brand }) => (
          <BrandSocialLink key={label} brand={brand} href={href} label={label} />
        ))}
      </div>
      {!mobile && (
        <span className="h-16 w-px bg-gradient-to-b from-transparent via-ivory/45 to-transparent" />
      )}
    </motion.div>
  );
}

function useDesktopHeroVideo() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
    );
    const sync = () => setEnabled(mediaQuery.matches);

    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  return enabled;
}

function HomePage() {
  const [heroVideoDone, setHeroVideoDone] = useState(false);
  const showHeroVideo = useDesktopHeroVideo();
  const { projects } = usePublicProjects();

  return (
    <>
      {/* HERO — cinematic full-bleed video with image fallback */}
      <section
        id="home"
        className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-ink sm:min-h-[640px]"
      >
        <AutoSlideshow
          images={heroImages}
          interval={5500}
          showDots={false}
          rounded="rounded-none"
          className="absolute inset-0 h-full w-full"
        />
        {showHeroVideo && (
          <video
            className={cn(
              "absolute inset-0 z-[1] h-full w-full object-cover transition-opacity duration-1000 ease-out",
              heroVideoDone ? "opacity-0" : "opacity-100",
            )}
            src="/media/hero-section.mp4"
            poster={realtyCourtyard}
            autoPlay
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            onEnded={() => setHeroVideoDone(true)}
            onError={() => setHeroVideoDone(true)}
          />
        )}
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
            <p className="eyebrow !text-primary-glow">Tathastu Infra</p>
            <p className="max-w-4xl font-display text-xl font-medium leading-tight text-ivory drop-shadow-[0_3px_18px_rgba(0,0,0,0.4)] sm:text-2xl md:text-3xl lg:text-[2.1rem]">
              Building Dreams <span className="italic text-gradient-gold">Since 2018</span>
            </p>
          </motion.div>
          <h1 className="mt-4 max-w-4xl font-display text-[clamp(2rem,8.5vw,2.85rem)] font-medium leading-[1.02] text-ivory sm:text-5xl md:text-7xl lg:text-[5.75rem]">
            <span className="block whitespace-nowrap">
              <motion.span
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                {headlineLine1}
              </motion.span>
            </span>
            <span className="mt-2 block whitespace-nowrap italic text-gradient-gold">
              <motion.span
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                {headlineLine2}
              </motion.span>
            </span>
          </h1>
          <motion.p
            className="mt-5 max-w-xl text-base leading-relaxed text-ivory/80 md:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95, duration: 0.9 }}
          >
            Crafting timeless homes, properties and spaces across Pune through real estate,
            construction and interior design from our Lohegaon studio.
          </motion.p>
          <motion.div
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:gap-4"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.7 }}
          >
            <Button
              asChild
              size="lg"
              className="group w-full rounded-full bg-gradient-gold px-5 text-base text-primary-foreground shadow-gold transition-all hover:scale-[1.03] hover:shadow-[0_25px_60px_-15px_color-mix(in_oklab,var(--color-primary)_55%,transparent)] sm:w-auto sm:px-8"
            >
              <a href="#contact">
                Get Free Quote{" "}
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full rounded-full border-ivory/30 bg-ivory/5 px-5 text-base text-ivory backdrop-blur transition-all hover:border-primary/60 hover:bg-ivory/10 sm:w-auto sm:px-8"
            >
              <Link to="/projects">Explore Projects</Link>
            </Button>
          </motion.div>
          <HeroSocialLinks mobile />
        </div>

        <motion.div
          className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.35em] text-ivory/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          scroll ↓
        </motion.div>
      </section>

      {/* PILLARS with auto-rotating slideshows */}
      <section id="services" className="relative py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Our Services</p>
            <h2 className="mt-3 font-display text-3xl font-medium sm:text-4xl md:text-5xl">
              Three pillars of Tathastu Infra.
            </h2>
            <p className="mt-4 text-muted-foreground">
              From Lohegaon property search and land advisory to Pune homes, construction and
              interiors, Tathastu Infra is one team for every step.
            </p>
          </Reveal>

          <Reveal className="mt-8">
            <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-luxe sm:flex-row">
              {serviceQuickLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="group flex flex-1 items-center justify-between border-b border-border px-5 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-secondary sm:border-b-0 sm:border-r sm:last:border-r-0"
                >
                  {item.label}
                  <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
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
                        <AutoSlideshow
                          images={[...p.images]}
                          startIndex={i}
                          interval={3500 + i * 400}
                          rounded="rounded-none"
                        />
                        <div className="absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-gradient-gold text-ink shadow-gold">
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col p-7">
                        <h3 className="font-display text-2xl font-semibold">{p.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {p.blurb}
                        </p>
                        <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-4 py-2 text-xs font-semibold uppercase tracking-wider text-foreground transition-all duration-300 group-hover:bg-gradient-gold group-hover:shadow-gold">
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
                <h3 className="mt-2 font-display text-2xl font-medium sm:text-3xl">
                  Get a free quote from Tathastu Infra Pune.
                </h3>
              </div>
              <Button
                asChild
                size="lg"
                className="group w-full rounded-full bg-gradient-gold px-5 text-ink shadow-gold sm:w-auto sm:px-7"
              >
                <a href="#contact">
                  Get Free Quote{" "}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-gradient-ivory py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Our Promise</p>
            <h2 className="mt-3 font-display text-3xl font-medium sm:text-4xl md:text-5xl">
              Built around trust and lasting client relationships.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trustPolicies.map(({ icon: Icon, title, body, image, alt }, index) => (
              <Reveal key={title} delay={index * 0.05}>
                <div className="h-full overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-luxe sm:p-6">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <img
                      src={image}
                      alt={alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
                    <div className="absolute left-4 top-4 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-gold text-ink shadow-gold">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="mt-7 font-display text-2xl font-semibold text-ink">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATS — dark band */}
      <section className="relative bg-gradient-ink py-24 text-ivory">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 0%, var(--color-primary), transparent 40%)",
          }}
        />
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
              <p className="eyebrow">Our Projects</p>
              <h2 className="mt-3 font-display text-3xl font-medium sm:text-4xl md:text-5xl">
                Recent work across Pune
              </h2>
            </Reveal>
            <Link
              to="/projects"
              className="hidden text-sm font-semibold text-primary hover:underline md:block"
            >
              View all →
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {projects.slice(0, 6).map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 0.08}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`group relative overflow-hidden rounded-3xl shadow-luxe ${i % 3 === 1 ? "md:translate-y-10" : ""}`}
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent p-6 text-ivory">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-primary-glow">
                      {p.category}
                    </p>
                    <h3 className="mt-1 font-display text-xl font-semibold">{p.title}</h3>
                    <p className="text-xs text-ivory/70">
                      {p.location} · {p.year}
                    </p>
                    {p.priceLabel && (
                      <p className="mt-2 inline-flex rounded-full bg-primary-glow/90 px-3 py-1 text-[11px] font-semibold text-ink">
                        {p.priceLabel}
                      </p>
                    )}
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
              We don't just pour concrete. We design the{" "}
              <span className="text-gradient-gold italic">backdrops for people's lives</span> across
              Pune, with every project shaped by luxury, utility and timeless architecture.
            </p>
            <p className="mt-8 text-sm uppercase tracking-[0.28em] text-ivory/60">
              — Rohit, Founder & CEO
            </p>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <ContactSection />
    </>
  );
}
