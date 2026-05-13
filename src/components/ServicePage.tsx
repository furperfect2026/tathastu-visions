import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AutoSlideshow } from "@/components/AutoSlideshow";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/lib/site-data";

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
  overviewTitle: string;
  overview: string;
  offers: {
    title: string;
    description: string;
    icon: LucideIcon;
  }[];
  projectCategory: "realty" | "construction" | "interior";
};

const process = [
  "Consultation",
  "Planning & Design",
  "Execution",
  "Final Handover",
] as const;

export function ServicePage({ content }: { content: ServicePageContent }) {
  const relatedProjects = projects
    .filter((project) => project.category === content.projectCategory)
    .slice(0, 3);

  return (
    <>
      <section className="relative flex min-h-[680px] items-end overflow-hidden bg-ink pt-28 text-ivory sm:min-h-[76svh] md:items-center md:pt-32">
        <AutoSlideshow
          images={content.heroImages}
          interval={4400}
          rounded="rounded-none"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/45 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 md:pb-0">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <p className="eyebrow !text-primary-glow">{content.eyebrow}</p>
            <h1 className="mt-5 break-words font-display text-[2.75rem] font-medium leading-[1.02] sm:text-5xl md:text-7xl lg:text-[5.6rem]">
              {content.title} <span className="italic text-gradient-gold">{content.accent}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ivory/78 md:text-lg">
              {content.subtitle}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild size="lg" className="group w-full rounded-full bg-gradient-gold px-5 text-base text-ink shadow-gold sm:w-auto sm:px-8">
                <Link to="/" hash="contact">
                  Start Your Project <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" className="group w-full rounded-full bg-ivory px-5 text-base text-ink shadow-luxe hover:bg-primary hover:text-ink sm:w-auto sm:px-8">
                <Link to="/" hash="contact">
                  Get Free Quote <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full rounded-full border-ivory/30 bg-ivory/5 px-5 text-base text-ivory backdrop-blur hover:border-primary/60 hover:bg-ivory/10 sm:w-auto sm:px-8">
                <Link to="/" hash="contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-gradient-ivory py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="eyebrow">Overview</p>
            <h2 className="mt-3 font-display text-3xl font-medium leading-tight sm:text-4xl md:text-5xl">
              {content.overviewTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-muted-foreground">{content.overview}</p>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">What We Offer</p>
            <h2 className="mt-3 font-display text-3xl font-medium sm:text-4xl md:text-5xl">
              Thoughtful service, handled end to end.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {content.offers.map(({ title, description, icon: Icon }, index) => (
              <Reveal key={title} delay={(index % 3) * 0.06}>
                <motion.article whileHover={{ y: -6 }} className="h-full rounded-3xl bg-card p-7 shadow-luxe ring-1 ring-border">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-gold text-ink shadow-gold">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-ink py-24 text-ivory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="max-w-2xl">
            <p className="eyebrow !text-primary-glow">Process</p>
            <h2 className="mt-3 font-display text-3xl font-medium sm:text-4xl md:text-5xl">
              A calm, clear path from idea to handover.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {process.map((step, index) => (
              <Reveal key={step} delay={index * 0.08}>
                <div className="h-full rounded-3xl border border-ivory/10 bg-ivory/[0.04] p-6 backdrop-blur">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-4xl text-primary-glow/75">0{index + 1}</span>
                    <CheckCircle2 className="h-5 w-5 text-primary-glow" />
                  </div>
                  <h3 className="mt-8 font-display text-2xl font-semibold">{step}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ivory/65">
                    {index === 0 && "We understand your goals, site, budget and expectations before anything begins."}
                    {index === 1 && "We shape a practical design and execution plan with clear decisions upfront."}
                    {index === 2 && "Our team coordinates people, materials and details with disciplined site progress."}
                    {index === 3 && "Everything is reviewed, refined and handed over with confidence."}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <p className="eyebrow">Featured Projects</p>
            <h2 className="mt-3 font-display text-3xl font-medium sm:text-4xl md:text-5xl">Selected related work.</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {relatedProjects.map((project, index) => (
              <Reveal key={project.id} delay={index * 0.08}>
                <motion.article whileHover={{ y: -6 }} className="group overflow-hidden rounded-3xl bg-card shadow-luxe ring-1 ring-border">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img src={project.image} alt={project.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="p-6">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-primary">{project.category}</p>
                    <h3 className="mt-1 font-display text-xl font-semibold">{project.title}</h3>
                    <p className="text-xs text-muted-foreground">{project.location} · {project.year}</p>
                    <p className="mt-3 text-sm text-muted-foreground">{project.blurb}</p>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-ivory pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="overflow-hidden rounded-3xl bg-ink p-6 text-ivory shadow-luxe sm:p-8 md:p-12">
              <p className="eyebrow !text-primary-glow">Begin With Tathastu</p>
              <div className="mt-3 grid items-end gap-8 md:grid-cols-[1fr_auto]">
                <h2 className="max-w-2xl font-display text-3xl font-medium leading-tight sm:text-4xl md:text-5xl">
                  Ready to bring your <span className="italic text-gradient-gold">vision to life?</span>
                </h2>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap md:justify-end">
                  <Button asChild size="lg" className="w-full rounded-full bg-gradient-gold px-5 text-base text-ink shadow-gold sm:w-auto sm:px-8">
                    <Link to="/" hash="contact">Get Free Quote <ArrowRight className="h-4 w-4" /></Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="w-full rounded-full border-ivory/25 bg-ivory/5 px-5 text-base text-ivory hover:bg-ivory/10 sm:w-auto sm:px-8">
                    <Link to="/" hash="contact">Book a Consultation</Link>
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
