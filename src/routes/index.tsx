import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);
import {
  ArrowRight,
  Award,
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Eye,
  Handshake,
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
import { ParallaxImage } from "@/components/ParallaxImage";


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
          : "fixed left-6 top-1/2 z-[85] hidden -translate-y-1/2 flex-col items-center gap-5 md:flex lg:left-8",
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
  const [reviewIndex, setReviewIndex] = useState(0);

  // Hero parallax
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroBgY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
  const heroFogY = useTransform(heroProgress, [0, 1], ["0%", "-20%"]);

  const projectsContainerRef = useRef<HTMLDivElement>(null);
  
  // GSAP Cinematic Layered Scrub for Featured Projects
  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>('.gsap-parallax-img').forEach((img) => {
      // Start the image shifted up, and as we scroll down, it moves down (yPercent goes from negative to positive relative)
      gsap.to(img, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: img.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
  }, { scope: projectsContainerRef });

  const visibleReviews = Array.from(
    { length: Math.min(3, clientReviews.length) },
    (_, offset) => clientReviews[(reviewIndex + offset) % clientReviews.length],
  );

  const moveReviews = (direction: number) => {
    setReviewIndex((current) => (current + direction + clientReviews.length) % clientReviews.length);
  };

  return (
    <>
      {/* HERO — Cinematic Layered Parallax */}
      <section
        id="home"
        ref={heroRef}
        className="relative h-[85svh] md:h-[100svh] min-h-[600px] md:min-h-[640px] w-full overflow-hidden bg-ink"
      >
        {/* Background layer — parallax (moves slower) */}
        <motion.div
          className="absolute inset-0 z-[1]"
          style={{ y: heroBgY, scale: 1.15 }}
        >
          <AutoSlideshow
            images={heroImages}
            interval={5500}
            showDots={false}
            rounded="rounded-none"
            className="absolute inset-0 h-full w-full"
          />
        </motion.div>

        {/* Cinematic dark gradient — bottom-up + side vignette */}
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-ink/80 via-ink/30 to-transparent" />
        {/* Warm gold tint */}
        <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_30%_70%,color-mix(in_oklab,var(--color-primary)_22%,transparent),transparent_55%)]" />

        <div className="hidden md:block">
          <HeroSocialLinks />
        </div>

        {/* Content — centered, cinematic */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center sm:px-6">
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow !text-primary-glow">Tathastu Infra</p>
            <p className="max-w-4xl font-display text-lg font-medium leading-tight text-ivory drop-shadow-[0_3px_18px_rgba(0,0,0,0.4)] sm:text-2xl md:text-3xl lg:text-[2.1rem]">
              Building Dreams <span className="italic text-gradient-gold">Since 2018</span>
            </p>
          </motion.div>

          {/* Large headline — simpler reveal for better DOM performance */}
          <motion.h1 
            initial={{ opacity: 0, y: 40, clipPath: "inset(100% 0 0 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-5xl font-display text-4xl sm:text-5xl md:text-7xl lg:text-[5.75rem] font-medium leading-[1.05] text-ivory"
          >
            <span className="block">{headlineLine1}</span>
            <span className="mt-1 sm:mt-2 block italic text-gradient-gold">
              {headlineLine2}
            </span>
          </motion.h1>

          <motion.p
            className="mt-5 max-w-xl text-sm sm:text-base leading-relaxed text-ivory/80 md:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.9 }}
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
        </div>

        {/* Scroll indicator — bouncing */}
        <motion.div
          className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.35em] text-ivory/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ opacity: { delay: 1.6, duration: 0.8 }, y: { delay: 2, duration: 1.6, repeat: Infinity, ease: "easeInOut" } }}
        >
          scroll ↓
        </motion.div>
      </section>

      {/* PILLARS with auto-rotating slideshows */}
      <section id="services" className="relative py-16 md:py-24">
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

          <div className="mt-10 md:mt-14 grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-3">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.key} delay={i * 0.12} variant="scale-up">
                  <motion.div
                    whileHover={{ y: -12, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="h-full"
                  >
                    <Link
                      to={`/${p.key}`}
                      aria-label={`Explore ${p.title}`}
                      className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl bg-card ring-1 ring-border transition-all duration-500 hover:ring-amber-400/60 hover:shadow-[0_32px_80px_-20px_rgba(0,0,0,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                    >
                      {/* Image area with zoom + darkening overlay */}
                      <div className="relative h-60 overflow-hidden">
                        <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110">
                          <AutoSlideshow
                            images={[...p.images]}
                            startIndex={i}
                            interval={3500 + i * 400}
                            rounded="rounded-none"
                          />
                        </div>
                        {/* Darkening overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                        {/* Icon badge — glows on hover */}
                        <motion.div
                          whileHover={{ scale: 1.15 }}
                          className="absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-gradient-gold text-ink shadow-gold transition-shadow duration-300 group-hover:shadow-[0_0_28px_6px_rgba(212,175,55,0.6)]"
                        >
                          <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                        </motion.div>

                        {/* Category label slides up from bottom on hover */}
                        <div className="absolute inset-x-0 bottom-0 translate-y-full p-5 transition-transform duration-500 ease-out group-hover:translate-y-0">
                          <p className="text-xs font-semibold uppercase tracking-widest text-white/90 drop-shadow">
                            {p.title} →
                          </p>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col p-7">
                        <div className="relative">
                          <h3 className="font-display text-2xl font-semibold transition-colors duration-300 group-hover:text-primary">
                            {p.title}
                          </h3>
                          {/* Gold underline sweeps in on hover */}
                          <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 transition-all duration-500 group-hover:w-full" />
                        </div>
                        <p className="mt-4 text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-ink/70">
                          {p.blurb}
                        </p>

                        {/* Explore button — slides right + gold shimmer */}
                        <div className="mt-6 flex items-center gap-2">
                          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-4 py-2 text-xs font-semibold uppercase tracking-wider text-foreground transition-all duration-400 group-hover:bg-gradient-gold group-hover:shadow-gold group-hover:pr-5">
                            Explore
                            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>

                      {/* Bottom gold accent border sweeps in */}
                      <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 transition-transform duration-600 ease-out group-hover:scale-x-100" />
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

      <section className="bg-gradient-ivory py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Our Promise</p>
            <h2 className="mt-3 font-display text-3xl font-medium sm:text-4xl md:text-5xl">
              Built around trust and lasting client relationships.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trustPolicies.map(({ icon: Icon, title, body, image, alt }, index) => (
              <Reveal key={title} delay={index * 0.08} variant={index % 2 === 0 ? "fade-right" : "fade-left"}>
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
      <section className="bg-card py-16 md:py-20">
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

          <div className="mt-8 md:mt-10 grid gap-5 grid-cols-1 md:grid-cols-3">
            {visibleReviews.map((review, index) => (
              <Reveal key={`${review.name}-${reviewIndex}`} delay={index * 0.06}>
                <motion.article
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="group relative h-full overflow-hidden rounded-3xl border border-border bg-gradient-ivory p-6 text-center shadow-luxe transition-shadow duration-300 hover:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.16)] sm:p-8"
                >
                  {/* Gold bottom accent bar slides in on hover */}
                  <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 rounded-b-3xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 transition-transform duration-500 ease-out group-hover:scale-x-100" />

                  {/* Quote icon — scales + brightens */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute right-6 top-6"
                  >
                    <Quote className="h-8 w-8 text-primary/25 transition-colors duration-300 group-hover:text-primary/60" />
                  </motion.div>

                  {/* Avatar — glow ring on hover */}
                  <div className="mx-auto grid h-24 w-24 place-items-center overflow-hidden rounded-full border-2 border-primary/30 bg-gradient-gold font-display text-2xl font-semibold text-ink shadow-gold transition-all duration-300 group-hover:border-amber-400 group-hover:shadow-[0_0_24px_6px_rgba(212,175,55,0.45)]">
                    {review.imageUrl ? (
                      <img
                        src={review.imageUrl}
                        alt={review.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      review.initials
                    )}
                  </div>

                  <h3 className="mt-6 font-display text-2xl font-semibold text-ink transition-colors duration-300 group-hover:text-primary">
                    {review.name}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.24em] text-primary">
                    {review.location} - {review.service}
                  </p>

                  {/* Stars — individually hoverable */}
                  <div className="mt-5 flex justify-center gap-1 text-primary">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <motion.span
                        key={starIndex}
                        whileHover={{ scale: 1.4, y: -2 }}
                        transition={{ delay: starIndex * 0.05, duration: 0.2 }}
                      >
                        <Star
                          className={cn(
                            "h-4 w-4 transition-all duration-300",
                            starIndex < review.rating
                              ? "fill-primary text-primary group-hover:fill-amber-400 group-hover:text-amber-400"
                              : "text-primary/25",
                          )}
                          aria-hidden="true"
                        />
                      </motion.span>
                    ))}
                  </div>

                  <p className="mx-auto mt-6 max-w-sm text-sm leading-7 text-muted-foreground transition-colors duration-300 group-hover:text-ink/75">
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

      <section className="relative bg-gradient-ink py-16 md:py-24 text-ivory">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 0%, var(--color-primary), transparent 40%)",
          }}
        />
        <div className="relative mx-auto grid max-w-7xl gap-x-6 gap-y-10 px-4 sm:px-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => {
            const statsIcons = [Calendar, Building2, Handshake, Award];
            const StatIcon = statsIcons[i];
            return (
              <Reveal key={s.label} delay={i * 0.1} variant="scale-up" className="flex items-center gap-5">
                <StatIcon
                  className="h-12 w-12 sm:h-14 sm:w-14 text-primary-glow drop-shadow-[0_0_8px_rgba(229,193,88,0.4)] shrink-0"
                  strokeWidth={1.5}
                />
                <div>
                  <div className="font-display text-4xl sm:text-5xl lg:text-4xl xl:text-5xl font-bold tabular-nums text-gradient-gold">
                    <CountUp value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-xs uppercase tracking-[0.25em] text-ivory/60">{s.label}</div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section id="projects" className="relative py-16 md:py-24">
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
          <div className="mt-10 md:mt-12 grid gap-6 grid-cols-1 md:grid-cols-3" ref={projectsContainerRef}>
            {projects.slice(0, 6).map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 0.1} variant="scale-up">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`group relative overflow-hidden rounded-3xl shadow-luxe ${i % 3 === 1 ? "md:translate-y-10" : ""}`}
                >
                  <div className="aspect-[4/5] overflow-hidden relative">
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="gsap-parallax-img absolute -top-[15%] h-[130%] w-full object-cover transition-transform duration-700 group-hover:scale-110"
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
      <section className="relative overflow-hidden bg-gradient-ink py-20 md:py-28 text-ivory">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <Reveal variant="clip-up">
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
