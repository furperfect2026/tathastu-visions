import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  Handshake,
  Layers3,
  MapPinned,
} from "lucide-react";
import { motion } from "framer-motion";
import { AutoSlideshow } from "@/components/AutoSlideshow";
import { Reveal } from "@/components/Reveal";
import { ServiceSearchLinks } from "@/components/ServiceSearchLinks";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/site-data";
import construction1 from "@/assets/construction-1.jpg";
import construction3 from "@/assets/construction-3.jpg";
import construction4 from "@/assets/construction-4.jpg";
import heroInfra1 from "@/assets/hero-infra-1.jpg";
import interior1 from "@/assets/interior-1.jpg";
import interior2 from "@/assets/interior-2.jpg";
import interior3 from "@/assets/interior-3.jpg";
import project5 from "@/assets/project-5.jpg";

export type ServiceSeoMode = "construction" | "interior";

export type ServiceSeoPageContent = {
  mode: ServiceSeoMode;
  eyebrow: string;
  title: string;
  accent: string;
  subtitle: string;
  introEyebrow: string;
  introTitle: string;
  intro: string;
  highlights: string[];
  needsHeading: string;
  needs: { title: string; description: string }[];
  processEyebrow: string;
  processTitle: string;
  faqs: { question: string; answer: string }[];
};

const heroImages = {
  construction: [
    { src: heroInfra1, alt: "Construction site planning by Tathastu Infra in Pune" },
    { src: construction3, alt: "Structural construction work in Pune" },
    { src: construction1, alt: "Residential construction execution in Lohegaon" },
    { src: construction4, alt: "Construction supervision and material discipline" },
  ],
  interior: [
    { src: interior1, alt: "Luxury living room interior design by Tathastu Infra" },
    { src: interior2, alt: "Bedroom interior design in Pune" },
    { src: interior3, alt: "Modular kitchen and finish planning in Pune" },
    { src: project5, alt: "Refined material palette for Tathastu Infra interiors" },
  ],
} satisfies Record<ServiceSeoMode, { src: string; alt: string }[]>;

const serviceSteps = {
  construction: [
    {
      title: "Share the site",
      description: "We understand location, build type, drawings, budget comfort and timeline.",
      icon: Handshake,
    },
    {
      title: "Shape the scope",
      description: "The construction path is planned around structure, materials and supervision.",
      icon: Layers3,
    },
    {
      title: "Track execution",
      description: "Site progress, coordination and quality checks stay visible as work advances.",
      icon: MapPinned,
    },
    {
      title: "Review handover",
      description: "The finished work is checked and handed over with the next steps clear.",
      icon: ClipboardCheck,
    },
  ],
  interior: [
    {
      title: "Read the space",
      description: "We understand room use, lifestyle, storage needs, taste and timeline.",
      icon: Handshake,
    },
    {
      title: "Design the flow",
      description: "Layouts, materials and visual direction are shaped around daily comfort.",
      icon: Layers3,
    },
    {
      title: "Coordinate details",
      description: "Finishes, furniture, lighting and execution decisions move together.",
      icon: MapPinned,
    },
    {
      title: "Refine handover",
      description: "The space is reviewed for finish quality, function and a settled feel.",
      icon: ClipboardCheck,
    },
  ],
} as const;

export function ServiceSeoPage({ content }: { content: ServiceSeoPageContent }) {
  const relatedProjects = projects
    .filter((project) => project.category === content.mode)
    .slice(0, 3);
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="relative flex min-h-[650px] items-end overflow-hidden bg-ink pt-28 text-ivory sm:min-h-[74svh] md:items-center">
        <AutoSlideshow
          images={heroImages[content.mode]}
          interval={4600}
          rounded="rounded-none"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/45 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 md:pb-0">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <p className="eyebrow !text-primary-glow">{content.eyebrow}</p>
            <h1 className="mt-5 break-words font-display text-[2.7rem] font-medium leading-[1.03] sm:text-5xl md:text-7xl">
              {content.title} <span className="italic text-gradient-gold">{content.accent}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ivory/80 md:text-lg">
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
                className="w-full rounded-full border-ivory/30 bg-ivory/5 px-5 text-base text-ivory backdrop-blur hover:bg-ivory/10 sm:w-auto sm:px-8"
              >
                <Link to="/projects">Explore Projects</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-gradient-ivory py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <p className="eyebrow">{content.introEyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-medium leading-tight sm:text-4xl md:text-5xl">
              {content.introTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-lg leading-relaxed text-muted-foreground">{content.intro}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {content.highlights.map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-2xl border border-border bg-card p-4 text-sm shadow-luxe"
                >
                  <BadgeCheck className="mt-0.5 h-5 w-5 flex-none text-primary" />
                  <span className="leading-relaxed text-foreground/85">{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">What We Help With</p>
            <h2 className="mt-3 font-display text-3xl font-medium leading-tight sm:text-4xl md:text-5xl">
              {content.needsHeading}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {content.needs.map((need, index) => (
              <Reveal key={need.title} delay={(index % 2) * 0.06}>
                <article className="h-full rounded-3xl border border-border bg-card p-6 shadow-luxe sm:p-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                    0{index + 1}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold">{need.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{need.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-ink py-24 text-ivory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="max-w-3xl">
            <p className="eyebrow !text-primary-glow">{content.processEyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-medium sm:text-4xl md:text-5xl">
              {content.processTitle}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {serviceSteps[content.mode].map(({ title, description, icon: Icon }, index) => (
              <Reveal key={title} delay={index * 0.06}>
                <div className="h-full rounded-3xl border border-ivory/10 bg-ivory/[0.04] p-6 backdrop-blur">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-4xl text-primary-glow/75">0{index + 1}</span>
                    <Icon className="h-5 w-5 text-primary-glow" />
                  </div>
                  <h3 className="mt-8 font-display text-2xl font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ivory/70">{description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <p className="eyebrow">
              {content.mode === "construction" ? "Construction Work" : "Interior Work"}
            </p>
            <h2 className="mt-3 font-display text-3xl font-medium sm:text-4xl md:text-5xl">
              Related Tathastu Infra projects.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {relatedProjects.map((project, index) => (
              <Reveal key={project.id} delay={index * 0.06}>
                <article className="group h-full overflow-hidden rounded-3xl border border-border bg-card shadow-luxe">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-primary">
                      {project.category}
                    </p>
                    <h3 className="mt-1 font-display text-xl font-semibold">{project.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{project.location}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {project.blurb}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-ivory py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal className="text-center">
            <p className="eyebrow">Questions</p>
            <h2 className="mt-3 font-display text-3xl font-medium sm:text-4xl md:text-5xl">
              What clients ask before starting.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4">
            {content.faqs.map((faq) => (
              <Reveal key={faq.question}>
                <article className="rounded-3xl border border-border bg-card p-6 shadow-luxe sm:p-7">
                  <h3 className="font-display text-2xl font-semibold">{faq.question}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{faq.answer}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceSearchLinks compact mode={content.mode} />

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="rounded-3xl bg-ink p-6 text-ivory shadow-luxe sm:p-8 md:p-12">
              <p className="eyebrow !text-primary-glow">
                Tathastu Infra {content.mode === "construction" ? "Construction" : "Interiors"}
              </p>
              <div className="mt-3 grid items-end gap-8 md:grid-cols-[1fr_auto]">
                <h2 className="max-w-3xl font-display text-3xl font-medium leading-tight sm:text-4xl md:text-5xl">
                  Ready to take the next{" "}
                  <span className="italic text-gradient-gold">project step?</span>
                </h2>
                <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
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
                    className="w-full rounded-full border-ivory/25 bg-ivory/5 px-5 text-base text-ivory hover:bg-ivory/10 sm:w-auto sm:px-8"
                  >
                    <Link to="/projects">Explore Projects</Link>
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
