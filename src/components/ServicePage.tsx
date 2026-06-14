import { Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  Calculator,
  CheckCircle2,
  Clock3,
  Eye,
  IndianRupee,
  Maximize2,
  ShieldCheck,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AutoSlideshow } from "@/components/AutoSlideshow";
import { BrandSocialLink, type SocialBrand } from "@/components/BrandSocialLink";
import { PackagesSection } from "@/components/PackagesSection";
import { PartnerLogoSection } from "@/components/PartnerLogoSection";
import { ProjectCard } from "@/components/ProjectShowcase";
import { RealtySearchLinks } from "@/components/RealtySearchLinks";
import { Reveal } from "@/components/Reveal";
import { ServiceSearchLinks } from "@/components/ServiceSearchLinks";
import { RealtyPortal } from "@/components/RealtyPortal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import guaranteeAssuranceImage from "@/assets/guarantee-assurance.png";
import guaranteeMoneySafetyImage from "@/assets/guarantee-money-safety.jpg";
import guaranteeOnTimeImage from "@/assets/guarantee-on-time-delivery.png";
import guaranteeQualityImage from "@/assets/guarantee-quality-assurance.png";
import guaranteeTransparencyImage from "@/assets/guarantee-transparency.png";
import guaranteeInhouseExpertsImage from "@/assets/guarantee-inhouse-experts.png";
import { usePublicProjects } from "@/hooks/usePublicProjects";
import { usePublicPartners } from "@/hooks/usePublicPartners";

type ServiceImage = {
  src: string;
  alt: string;
};

export type ServicePageContent = {
  eyebrow: string;
  title: string;
  accent: string;
  subtitle: string;
  heroImages: ServiceImage[];
  heroVideoSrc?: string;
  heroSidePreview?: {
    videoSrc?: string;
    imageSrc?: string;
    eyebrow: string;
    title: string;
    description: string;
  };
  overviewTitle: string;
  overview: string;
  offers: {
    title: string;
    description: string;
    icon: LucideIcon;
    image: ServiceImage;
    href: string;
  }[];
  projectCategory: "realty" | "construction" | "interior";
};

const process = ["Consultation", "Planning & Design", "Execution", "Final Handover"] as const;

type PackageTier = "basic" | "standard" | "premium";

const estimateRates: Record<PackageTier, number> = {
  basic: 1550,
  standard: 1750,
  premium: 2250,
};

const floorFactors: Record<string, number> = {
  ground: 1,
  "g+1": 2,
  "g+2": 3,
  "g+3": 4,
};

const socialLinks = [
  { label: "YouTube", href: "https://www.youtube.com/@Tathastu_Infra", brand: "youtube" },
  { label: "Instagram", href: "https://www.instagram.com/tathastu_infra/", brand: "instagram" },
  { label: "LinkedIn", href: "https://in.linkedin.com/company/tathastu-infra?trk=public_post_feed-actor-name", brand: "linkedin" },
] satisfies { label: string; href: string; brand: SocialBrand }[];

function ServiceSocialLinks({ mobile = false }: { mobile?: boolean }) {
  return (
    <motion.div
      className={
        mobile
          ? "mt-6 flex items-center gap-4 md:hidden"
          : "absolute left-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-5 md:flex lg:left-8"
      }
      initial={{ opacity: 0, y: mobile ? 12 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Tathastu Infra social links"
    >
      {!mobile && (
        <span className="h-16 w-px bg-gradient-to-b from-transparent via-ivory/45 to-transparent" />
      )}
      <div className={mobile ? "flex items-center gap-4" : "flex flex-col items-center gap-4"}>
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

const constructionGuarantees = [
  {
    title: "Money Safety",
    body: "Detailed scope and package conversations before work begins, so budgets stay practical and visible.",
    icon: IndianRupee,
    image: { src: guaranteeMoneySafetyImage, alt: "Money safety and protected construction budget with Tathastu Infra" },
    tone: "from-[#0f172a] to-[#0f172a]",
  },
  {
    title: "Quality Assurance",
    body: "Material choices, technical checks and finish reviews are handled with one accountable Tathastu Infra team.",
    icon: ShieldCheck,
    image: { src: guaranteeQualityImage, alt: "Quality assurance checklist for Tathastu Infra construction work" },
    tone: "from-[#ea580c] to-[#ea580c]",
  },
  {
    title: "On-Time Delivery",
    body: "Planning, vendor coordination and execution tracking are shaped around predictable delivery.",
    icon: Clock3,
    image: { src: guaranteeOnTimeImage, alt: "On-time construction delivery and site supervision by Tathastu Infra" },
    tone: "from-[#0369a1] to-[#0369a1]",
  },
  {
    title: "Transparency",
    body: "Simple communication from first visit to handover, so clients know what is happening and why.",
    icon: Eye,
    image: { src: guaranteeTransparencyImage, alt: "Transparent construction communication and handshake with Tathastu Infra" },
    tone: "from-[#0f172a] to-[#0f172a]",
  },
  {
    title: "Assurance",
    body: "Every step is backed by clear guidance, practical decisions and a team that stays close after handover.",
    icon: BadgeCheck,
    image: { src: guaranteeAssuranceImage, alt: "Assurance inspection and verified construction steps by Tathastu Infra" },
    tone: "from-[#0369a1] to-[#0369a1]",
  },
  {
    title: "In-House Experts",
    body: "Architect, site coordination, technical guidance and client relationship support stay close to your project.",
    icon: ShieldCheck,
    image: { src: guaranteeInhouseExpertsImage, alt: "In-house Tathastu Infra architect and design experts at work" },
    tone: "from-[#ea580c] to-[#ea580c]",
  },
] as const;

function useMotionSafeVideo(enabled: boolean) {
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setCanPlay(false);
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const sync = () => setCanPlay(mediaQuery.matches);

    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, [enabled]);

  return canPlay;
}

export function ServicePage({ content }: { content: ServicePageContent }) {
  const navigate = useNavigate();
  const guaranteeTrackRef = useRef<HTMLDivElement>(null);
  const { projects } = usePublicProjects(content.projectCategory);
  const { partners, bankingPartners } = usePublicPartners();
  const [estimateArea, setEstimateArea] = useState("1000");
  const [estimateTier, setEstimateTier] = useState<PackageTier>("standard");
  const [estimateFloors, setEstimateFloors] = useState("ground");
  const [heroVideoDone, setHeroVideoDone] = useState(false);
  const [isHeroPreviewOpen, setIsHeroPreviewOpen] = useState(false);
  const showHeroVideo = useMotionSafeVideo(Boolean(content.heroVideoSrc)) && !heroVideoDone;

  const quickEstimate = useMemo(() => {
    const area = Number(estimateArea);
    if (!Number.isFinite(area) || area <= 0) return null;
    return Math.round(area * floorFactors[estimateFloors] * estimateRates[estimateTier]);
  }, [estimateArea, estimateFloors, estimateTier]);

  const quickTotalArea = useMemo(() => {
    const area = Number(estimateArea);
    if (!Number.isFinite(area) || area <= 0) return null;
    return Math.round(area * floorFactors[estimateFloors]);
  }, [estimateArea, estimateFloors]);

  const relatedProjects = projects.slice(0, 3);

  const scrollGuarantees = (direction: "left" | "right") => {
    const track = guaranteeTrackRef.current;
    if (!track) return;

    const card = track.querySelector<HTMLElement>("[data-guarantee-card]");
    const distance = card ? card.offsetWidth + 20 : track.clientWidth * 0.65;

    track.scrollBy({
      left: direction === "right" ? distance : -distance,
      behavior: "smooth",
    });
  };

  return (
    <>
      <section className="relative flex h-[85svh] md:h-[100svh] min-h-[600px] md:min-h-[640px] items-end overflow-hidden bg-ink pt-28 text-ivory md:items-center md:pt-32">
        <AutoSlideshow
          images={content.heroImages}
          interval={4400}
          rounded="rounded-none"
          className="absolute inset-0 h-full w-full"
        />
        {content.heroVideoSrc && showHeroVideo && (
          <video
            className={`absolute inset-0 z-[1] h-full w-full object-cover transition-opacity duration-1000 ease-out ${
              content.projectCategory === "construction" ? "hidden md:block" : ""
            }`}
            src={content.heroVideoSrc}
            poster={content.heroImages[0]?.src}
            autoPlay
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            onEnded={() => setHeroVideoDone(true)}
            onError={() => setHeroVideoDone(true)}
          />
        )}
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-ink/90 via-ink/65 to-ink/30" />
        <div className="absolute inset-0 z-[2] bg-gradient-to-r from-ink/85 via-ink/35 to-transparent" />
        <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_30%_70%,color-mix(in_oklab,var(--color-primary)_18%,transparent),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-32 bg-gradient-to-t from-ink/90 to-transparent" />
        <ServiceSocialLinks />

        <div className="relative z-[5] mx-auto flex h-full w-full max-w-7xl flex-col justify-end px-4 pb-16 pt-24 sm:px-6 md:justify-center md:pb-0 md:pl-20 lg:pl-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <p className="eyebrow !text-primary-glow drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">{content.eyebrow}</p>
            <h1 className="mt-5 break-words font-display text-[clamp(2rem,8.5vw,2.75rem)] font-medium leading-[1.04] sm:text-5xl md:text-7xl md:leading-[1.02] lg:text-[5.6rem] drop-shadow-[0_4px_16px_rgba(0,0,0,0.55)]">
              {content.title} <span className="italic text-gradient-gold">{content.accent}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ivory/85 md:text-lg drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
              {content.subtitle}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                asChild
                size="lg"
                className="group w-full rounded-full bg-gradient-gold px-5 text-base text-ink shadow-gold sm:w-auto sm:px-8"
              >
                <Link to="/" hash="contact">
                  Get Free Quote{" "}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full rounded-full border-ivory/30 bg-ivory/5 px-5 text-base text-ivory backdrop-blur hover:border-primary/60 hover:bg-ivory/10 sm:w-auto sm:px-8"
              >
                <Link to={content.projectCategory === "construction" ? "/projects/construction" : "/projects"}>
                  Explore Projects
                </Link>
              </Button>
              {content.projectCategory === "construction" && (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full rounded-full border-ivory/30 bg-ivory/5 px-5 text-base text-ivory backdrop-blur hover:border-primary/60 hover:bg-ivory/10 sm:w-auto sm:px-8"
                >
                  <Link to="/construction/cost-estimator">
                    Cost Estimator <IndianRupee className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
            <ServiceSocialLinks mobile />
          </motion.div>
        </div>

        {content.heroSidePreview && (
          <motion.button
            type="button"
            onClick={() => setIsHeroPreviewOpen(true)}
            className="group absolute right-8 top-[54%] z-10 hidden w-[240px] -translate-y-1/2 overflow-hidden rounded-[1.35rem] border border-ivory/25 bg-ivory/10 p-2 text-left shadow-[0_28px_80px_-35px_rgba(0,0,0,0.95)] backdrop-blur-xl transition-colors duration-300 hover:border-primary/70 hover:bg-ivory/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary xl:block 2xl:right-16 2xl:w-[280px]"
            initial={{ opacity: 0, x: 28, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 1.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            aria-label={`Open ${content.heroSidePreview.title} preview`}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1rem] bg-ink">
              {content.heroSidePreview.imageSrc ? (
                <img
                  src={content.heroSidePreview.imageSrc}
                  alt={content.heroSidePreview.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <>
                  {content.heroSidePreview.videoSrc && (
                    <video
                      src={content.heroSidePreview.videoSrc}
                      className="h-full w-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-hidden="true"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/78 via-ink/8 to-transparent" />
                  <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-ivory/14 text-ivory backdrop-blur transition-colors duration-300 group-hover:bg-primary group-hover:text-ink">
                    <Maximize2 className="h-4 w-4" />
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-primary-glow">
                      {content.heroSidePreview.eyebrow}
                    </p>
                    <p className="mt-1 font-display text-xl font-semibold text-ivory">
                      {content.heroSidePreview.title}
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.button>
        )}

        <motion.div
          className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.35em] text-ivory/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.45, duration: 0.8 }}
        >
          scroll down
        </motion.div>
      </section>

      {content.heroSidePreview && isHeroPreviewOpen && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/82 p-4 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label={`${content.heroSidePreview.title} preview`}
          onClick={() => setIsHeroPreviewOpen(false)}
        >
          <motion.div
            className="relative w-full max-w-5xl overflow-hidden rounded-[1.5rem] bg-ink shadow-[0_32px_100px_-45px_rgba(0,0,0,1)] ring-1 ring-ivory/15"
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 18 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsHeroPreviewOpen(false)}
              className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-ink/60 text-ivory backdrop-blur transition-colors duration-300 hover:bg-primary hover:text-ink"
              aria-label="Close preview"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="grid bg-ivory lg:grid-cols-[1.35fr_0.65fr]">
              <div className="aspect-video bg-ink lg:aspect-auto lg:min-h-[560px] flex items-center justify-center">
                {content.heroSidePreview.videoSrc ? (
                  <video
                    src={content.heroSidePreview.videoSrc}
                    className="h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                  />
                ) : (
                  content.heroSidePreview.imageSrc && (
                    <img
                      src={content.heroSidePreview.imageSrc}
                      alt={content.heroSidePreview.title}
                      className="h-full w-full object-contain bg-ink"
                    />
                  )
                )}
              </div>
              <div className="flex flex-col justify-center p-6 text-ink sm:p-8">
                <p className="eyebrow">{content.heroSidePreview.eyebrow}</p>
                <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                  {content.heroSidePreview.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {content.heroSidePreview.description}
                </p>
                <Button
                  asChild
                  className="mt-7 w-fit rounded-full bg-gradient-gold px-6 text-ink shadow-gold"
                >
                  <Link to="/" hash="contact">
                    Discuss This Project <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {content.projectCategory === "realty" && (
        <RealtyPortal />
      )}

      {content.projectCategory !== "realty" && (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal className="max-w-2xl">
              <p className="eyebrow">What We Offer</p>
              <h2 className="mt-3 font-display text-3xl font-medium sm:text-4xl md:text-5xl">
                Thoughtful service, handled end to end.
              </h2>
            </Reveal>

            <div className="mt-10 md:mt-12 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {content.offers.map(({ title, description, icon: Icon, image, href }, index) => (
                <Reveal key={title} delay={(index % 3) * 0.06}>
                  <motion.article
                    whileHover={{ y: -6 }}
                    className="group h-full cursor-pointer overflow-hidden rounded-3xl bg-card shadow-luxe ring-1 ring-border focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    role="link"
                    tabIndex={0}
                    onClick={() => navigate({ to: href })}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        navigate({ to: href });
                      }
                    }}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/10 to-transparent" />
                      <div className="absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-gold text-ink shadow-gold">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="p-6 sm:p-7">
                      <h3 className="font-display text-2xl font-semibold">{title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                        Learn more{" "}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </motion.article>
                </Reveal>
              ))}
            </div>

            {content.projectCategory === "construction" && (
              <Reveal className="mt-12">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="eyebrow">Every Construction Category Includes</p>
                    <h3 className="mt-2 font-display text-3xl font-medium text-ink sm:text-4xl">
                    Guarantees every homeowner deserves.
                  </h3>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    aria-label="Previous guarantee"
                    onClick={() => scrollGuarantees("left")}
                    className="grid h-11 w-11 place-items-center rounded-full bg-primary/15 text-primary transition duration-300 hover:-translate-x-0.5 hover:bg-primary/25 sm:h-12 sm:w-12"
                  >
                    <ArrowRight className="h-5 w-5 rotate-180" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next guarantee"
                    onClick={() => scrollGuarantees("right")}
                    className="grid h-11 w-11 place-items-center rounded-full bg-primary/15 text-primary transition duration-300 hover:translate-x-0.5 hover:bg-primary/25 sm:h-12 sm:w-12"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div
                ref={guaranteeTrackRef}
                className="mt-8 -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 scroll-smooth [scrollbar-width:none] sm:mx-0 sm:gap-6 sm:px-0 [&::-webkit-scrollbar]:hidden"
              >
                {constructionGuarantees.map(({ title, body, icon: Icon, image, tone }) => (
                  <motion.article
                    key={title}
                    data-guarantee-card
                    whileHover={{ y: -6 }}
                    className={`group relative flex min-h-[470px] w-[76vw] shrink-0 snap-start flex-col overflow-hidden rounded-3xl bg-gradient-to-b ${tone} text-ivory shadow-luxe ring-1 ring-ivory/10 sm:w-[300px] lg:w-[340px]`}
                  >
                    <div className="relative z-10 p-7 pb-4">
                      <h4 className="font-display text-[1.8rem] font-semibold leading-tight text-white md:text-[2.1rem]">
                        {title}
                      </h4>
                      <p className="mt-4 text-[0.95rem] leading-relaxed text-white/90">{body}</p>
                    </div>
                    <div className="relative mt-auto min-h-[240px] overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <span className="absolute bottom-5 right-5 grid h-11 w-11 place-items-center rounded-full bg-[#fceee6] text-[#ea580c] shadow-md transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowRight className="h-5 w-5" />
                      </span>
                    </div>
                  </motion.article>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>
      )}

      {content.projectCategory === "construction" && <PackagesSection mode="construction" />}
      {content.projectCategory === "interior" && <PackagesSection mode="interior" />}

      {content.projectCategory === "construction" && (
        <section className="bg-gradient-ivory pb-16 md:pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal>
              <div className="rounded-3xl bg-card p-7 shadow-luxe ring-1 ring-border sm:p-8">
                <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                  <div>
                    <p className="eyebrow">Cost Estimator</p>
                    <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
                      Plan your construction budget before you commit.
                    </h2>
                    <p className="mt-4 max-w-2xl text-muted-foreground">
                      Use this quick calculator card to estimate budget by area, package and floors.
                      Then open the full estimator for detailed costing.
                    </p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="quick-estimate-area">Per-floor built-up area (sq ft)</Label>
                        <Input
                          id="quick-estimate-area"
                          type="number"
                          min={100}
                          value={estimateArea}
                          onChange={(event) => setEstimateArea(event.target.value)}
                          className="mt-2 h-12 rounded-xl"
                        />
                      </div>

                      <div>
                        <Label htmlFor="quick-estimate-tier">Package</Label>
                        <Select
                          value={estimateTier}
                          onValueChange={(value: PackageTier) => setEstimateTier(value)}
                        >
                          <SelectTrigger id="quick-estimate-tier" className="mt-2 h-12 rounded-xl">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="basic">Basic - ₹1550 / sq ft</SelectItem>
                            <SelectItem value="standard">Standard - ₹1750 / sq ft</SelectItem>
                            <SelectItem value="premium">Premium - ₹2250 / sq ft</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="sm:col-span-2">
                        <Label htmlFor="quick-estimate-floors">Floors</Label>
                        <Select value={estimateFloors} onValueChange={setEstimateFloors}>
                          <SelectTrigger id="quick-estimate-floors" className="mt-2 h-12 rounded-xl">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ground">Ground floor</SelectItem>
                            <SelectItem value="g+1">G+1</SelectItem>
                            <SelectItem value="g+2">G+2</SelectItem>
                            <SelectItem value="g+3">G+3</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-gradient-ink p-6 text-ivory shadow-luxe">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/20 text-primary-glow ring-1 ring-primary/25">
                      <Calculator className="h-6 w-6" />
                    </span>
                    <p className="mt-5 text-sm uppercase tracking-[0.18em] text-primary-glow/80">
                      Estimated Budget
                    </p>
                    <p className="mt-3 font-display text-5xl font-semibold">
                      {quickEstimate ? `₹${quickEstimate.toLocaleString("en-IN")}` : "—"}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-ivory/70">
                      This is a quick estimate. Final cost depends on site conditions, structure
                      complexity and finish scope.
                    </p>
                    <div className="mt-5 rounded-2xl bg-ivory/6 p-4">
                      <p className="text-xs uppercase tracking-[0.16em] text-primary-glow/75">
                        Total built-up area
                      </p>
                      <p className="mt-1 font-display text-2xl font-semibold">
                        {quickTotalArea ? `${quickTotalArea.toLocaleString("en-IN")} sq ft` : "Enter area"}
                      </p>
                      <p className="mt-1 text-xs text-ivory/55">
                        {Number(estimateArea) > 0
                          ? `${Number(estimateArea).toLocaleString("en-IN")} sq ft x ${floorFactors[estimateFloors]} floor${floorFactors[estimateFloors] === 1 ? "" : "s"}`
                          : "Area multiplies automatically by selected floors."}
                      </p>
                    </div>
                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                      <Button
                        asChild
                        className="rounded-full bg-gradient-gold px-6 text-ink shadow-gold"
                      >
                        <Link to="/construction/cost-estimator">
                          Open Full Calculator <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="rounded-full border-ivory/25 bg-ivory/5 px-6 text-ivory hover:bg-ivory/10"
                      >
                        <Link to="/" hash="contact">
                          Get Exact Quote
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <p className="eyebrow">Featured Projects</p>
            <h2 className="mt-3 font-display text-3xl font-medium sm:text-4xl md:text-5xl">
              Selected related work.
            </h2>
          </Reveal>
          <div className="mt-10 md:mt-12 grid gap-6 grid-cols-1 md:grid-cols-3">
            {relatedProjects.map((project, index) => (
              <Reveal key={project.id} delay={index * 0.08}>
                <ProjectCard project={project} index={index} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {content.projectCategory === "construction" && (
        <PartnerLogoSection partners={partners} bankingPartners={bankingPartners} />
      )}

      {content.projectCategory === "realty" && <RealtySearchLinks compact />}
      {content.projectCategory === "construction" && (
        <ServiceSearchLinks compact mode="construction" />
      )}
      {content.projectCategory === "interior" && <ServiceSearchLinks compact mode="interior" />}

      <section className="bg-gradient-ink py-16 md:py-24 text-ivory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="max-w-2xl">
            <p className="eyebrow !text-primary-glow">Process</p>
            <h2 className="mt-3 font-display text-3xl font-medium sm:text-4xl md:text-5xl">
              A calm, clear path from idea to handover.
            </h2>
          </Reveal>
          <div className="mt-10 md:mt-12 grid gap-5 grid-cols-1 md:grid-cols-4">
            {process.map((step, index) => (
              <Reveal key={step} delay={index * 0.08}>
                <div className="h-full rounded-3xl border border-ivory/10 bg-ivory/[0.04] p-6 backdrop-blur">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-4xl text-primary-glow/75">0{index + 1}</span>
                    <CheckCircle2 className="h-5 w-5 text-primary-glow" />
                  </div>
                  <h3 className="mt-8 font-display text-2xl font-semibold">{step}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ivory/65">
                    {index === 0 &&
                      "We understand your goals, site, budget and expectations before anything begins."}
                    {index === 1 &&
                      "We shape a practical design and execution plan with clear decisions upfront."}
                    {index === 2 &&
                      "Our team coordinates people, materials and details with disciplined site progress."}
                    {index === 3 &&
                      "Everything is reviewed, refined and handed over with confidence."}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      <section className="bg-gradient-ivory pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="overflow-hidden rounded-3xl bg-ink p-6 text-ivory shadow-luxe sm:p-8 md:p-12">
              <p className="eyebrow !text-primary-glow">Begin With Tathastu Infra</p>
              <div className="mt-3 grid items-end gap-8 md:grid-cols-[1fr_auto]">
                <h2 className="max-w-2xl font-display text-3xl font-medium leading-tight sm:text-4xl md:text-5xl">
                  Ready to bring your{" "}
                  <span className="italic text-gradient-gold">vision to life?</span>
                </h2>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap md:justify-end">
                  <Button
                    asChild
                    size="lg"
                    className="w-full rounded-full bg-gradient-gold px-5 text-base text-ink shadow-gold sm:w-auto sm:px-8"
                  >
                    <Link to="/" hash="contact">
                      Get Free Quote <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="w-full rounded-full border-ivory/25 bg-ivory/5 px-5 text-base text-ivory hover:bg-ivory/10 sm:w-auto sm:px-8"
                  >
                    <Link to={content.projectCategory === "construction" ? "/projects/construction" : "/projects"}>
                      Explore Projects
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

