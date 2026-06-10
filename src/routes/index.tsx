import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Eye,
  Maximize2,
  Quote,
  ShieldCheck,
  Star,
  Users,
  X,
} from "lucide-react";
import { AutoSlideshow } from "@/components/AutoSlideshow";
import { BrandSocialLink, type SocialBrand } from "@/components/BrandSocialLink";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { Button } from "@/components/ui/button";
import { ContactSection } from "@/components/ContactSection";
import { usePublicProjects } from "@/hooks/usePublicProjects";
import { usePublicReviews } from "@/hooks/usePublicReviews";
import { pillars, stats } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import realty4 from "@/assets/realty-4.jpg";
import heroBuilding from "@/assets/hero-building.jpg";
import heroRealty from "@/assets/hero-realty.jpg";
import heroInfra2 from "@/assets/hero-infra-2.jpg";
import heroInterior from "@/assets/hero-interior.jpg";
import livingInterior from "@/assets/interior-1.jpg";
import kitchenInterior from "@/assets/interior-3.jpg";
import construction2 from "@/assets/construction-2.jpg";
import trustHandshake from "@/assets/trust-handshake.jpg";
import clientRelationship from "@/assets/client-relationship.jpg";
import clearGuidance from "@/assets/clear-guidance.jpg";
import longTermValue from "@/assets/long-term-value.jpg";

const heroImages = [
  { src: heroBuilding, alt: "Tathastu Infra luxury residential building in Pune" },
  { src: heroInterior, alt: "Tathastu Infra premium interior design living room" },
  { src: heroInfra2, alt: "Tathastu Infra large-scale construction site at dusk" },
  { src: realty4, alt: "Tathastu Infra premium villa with pool in Pune" },
  { src: heroRealty, alt: "Tathastu Infra luxury realty apartment at golden hour" },
  { src: kitchenInterior, alt: "Tathastu Infra premium modular kitchen interior design" },
  { src: construction2, alt: "Tathastu Infra site engineer reviewing construction blueprints" },
  { src: livingInterior, alt: "Tathastu Infra elegant living room interior design" },
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

function HomePage() {
  const { projects } = usePublicProjects();
  const { reviews: clientReviews } = usePublicReviews();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const visibleReviews = Array.from(
    { length: Math.min(3, clientReviews.length) },
    (_, offset) => clientReviews[(reviewIndex + offset) % clientReviews.length],
  );

  const moveReviews = (direction: number) => {
    setReviewIndex((current) => (current + direction + clientReviews.length) % clientReviews.length);
  };

  return (
    <>
      {/* HERO — cinematic full-bleed slideshow */}
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
        {/* Cinematic dark gradient — bottom-up + side vignette */}
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-ink/80 via-ink/30 to-transparent" />
        {/* Warm gold tint */}
        <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_30%_70%,color-mix(in_oklab,var(--color-primary)_22%,transparent),transparent_55%)]" />
        <HeroSocialLinks />
        <motion.button
          type="button"
          onClick={() => setIsPreviewOpen(true)}
          className="group absolute right-8 top-[54%] z-10 hidden w-[240px] -translate-y-1/2 overflow-hidden rounded-[1.35rem] border border-ivory/25 bg-ivory/10 p-2 text-left shadow-[0_28px_80px_-35px_rgba(0,0,0,0.95)] backdrop-blur-xl transition-colors duration-300 hover:border-primary/70 hover:bg-ivory/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary xl:block 2xl:right-16 2xl:w-[280px]"
          initial={{ opacity: 0, x: 28, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 1.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          aria-label="3D apartment model preview"
        >
          <div className="relative overflow-hidden rounded-[1rem] bg-ink">
            <video
              src="/media/apartment-model-preview.mp4"
              className="aspect-[4/5] w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent" />
            <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-ivory/20 bg-ink/45 text-ivory backdrop-blur transition-colors duration-300 group-hover:border-primary/70 group-hover:text-primary-glow">
              <Maximize2 className="h-4 w-4" />
            </span>
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary-glow">
                3D Preview
              </p>
              <p className="mt-1 font-display text-lg leading-tight text-ivory">
                Apartment planning view
              </p>
            </div>
          </div>
        </motion.button>

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
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative h-full cursor-default overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-luxe transition-shadow duration-300 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.18)] sm:p-6"
                >
                  {/* Gold shimmer border on hover */}
                  <span className="pointer-events-none absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-br from-amber-400/60 via-yellow-300/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{WebkitMask:"linear-gradient(#fff 0 0) padding-box,linear-gradient(#fff 0 0)",WebkitMaskComposite:"destination-out",maskComposite:"exclude"}} />

                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <img
                      src={image}
                      alt={alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
                    {/* Icon badge — scales + glows on hover */}
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      className="absolute left-4 top-4 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-gold text-ink shadow-gold transition-shadow duration-300 group-hover:shadow-[0_0_24px_4px_rgba(212,175,55,0.55)]"
                    >
                      <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                    </motion.div>
                    {/* Overlay label on hover */}
                    <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-400 ease-out group-hover:translate-y-0">
                      <span className="inline-block rounded-full bg-gradient-gold px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-ink shadow-gold">
                        {title}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 translate-y-1 transition-transform duration-400 ease-out group-hover:translate-y-0">
                    <h3 className="font-display text-2xl font-semibold text-ink transition-colors duration-300 group-hover:text-primary">
                      {title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-ink/70">
                      {body}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary opacity-0 transition-all duration-400 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2">
                      Learn more <span className="text-base leading-none">→</span>
                    </span>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATS — dark band */}
      <section className="bg-card py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal className="max-w-3xl">
              <p className="eyebrow">Client Reviews</p>
              <h2 className="mt-3 font-display text-3xl font-medium text-ink sm:text-4xl md:text-5xl">
                People remember the way a project feels.
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Genuine feedback from clients who trusted Tathastu Infra for realty guidance,
                construction coordination and interior design conversations across Pune.
              </p>
            </Reveal>

            <div className="hidden items-center gap-3 md:flex">
              <button
                type="button"
                onClick={() => moveReviews(-1)}
                className="grid h-12 w-12 place-items-center rounded-full border border-border bg-secondary text-ink transition hover:bg-gradient-gold hover:shadow-gold"
                aria-label="Show previous client reviews"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => moveReviews(1)}
                className="grid h-12 w-12 place-items-center rounded-full border border-border bg-secondary text-ink transition hover:bg-gradient-gold hover:shadow-gold"
                aria-label="Show next client reviews"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {visibleReviews.map((review, index) => (
              <Reveal key={`${review.name}-${reviewIndex}`} delay={index * 0.06}>
                <motion.article
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative h-full overflow-hidden rounded-3xl border border-border bg-gradient-ivory p-6 text-center shadow-luxe sm:p-8"
                >
                  <Quote className="absolute right-6 top-6 h-8 w-8 text-primary/25" />
                  <div className="mx-auto grid h-24 w-24 place-items-center overflow-hidden rounded-full border border-primary/30 bg-gradient-gold font-display text-2xl font-semibold text-ink shadow-gold">
                    {review.imageUrl ? (
                      <img
                        src={review.imageUrl}
                        alt={review.name}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      review.initials
                    )}
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-ink">
                    {review.name}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.24em] text-primary">
                    {review.location} - {review.service}
                  </p>
                  <div className="mt-5 flex justify-center gap-1 text-primary">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className={cn(
                          "h-4 w-4",
                          starIndex < review.rating ? "fill-primary text-primary" : "text-primary/25",
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="mx-auto mt-6 max-w-sm text-sm leading-7 text-muted-foreground">
                    "{review.quote}"
                  </p>
                </motion.article>
              </Reveal>
            ))}
          </div>

          <div className="mt-7 flex justify-center gap-3 md:hidden">
            <button
              type="button"
              onClick={() => moveReviews(-1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-secondary text-ink"
              aria-label="Show previous client reviews"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => moveReviews(1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-secondary text-ink"
              aria-label="Show next client reviews"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

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

      {isPreviewOpen && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-ink/88 px-4 py-6 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsPreviewOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Full view 3D apartment preview"
        >
          <motion.div
            className="relative w-full max-w-5xl overflow-hidden rounded-[1.5rem] border border-primary/30 bg-ink shadow-[0_40px_120px_-45px_rgba(0,0,0,1)]"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsPreviewOpen(false)}
              className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-ivory/20 bg-ink/70 text-ivory backdrop-blur transition-colors hover:border-primary/70 hover:text-primary-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Close 3D apartment preview"
            >
              <X className="h-5 w-5" />
            </button>
            <video
              src="/media/apartment-model-preview.mp4"
              className="max-h-[82svh] w-full bg-ink object-contain"
              autoPlay
              muted
              loop
              playsInline
              controls
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/85 to-transparent p-5 text-ivory">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-glow">
                3D Apartment Preview
              </p>
              <p className="mt-1 font-display text-2xl">Apartment planning view</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
