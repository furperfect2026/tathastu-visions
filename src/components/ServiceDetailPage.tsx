import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PartnerLogoSection } from "@/components/PartnerLogoSection";
import { ProjectCard } from "@/components/ProjectShowcase";
import { Reveal } from "@/components/Reveal";
import type { ServiceDetail } from "@/lib/service-detail-data";
import { usePublicProjects } from "@/hooks/usePublicProjects";
import { usePublicPartners } from "@/hooks/usePublicPartners";

export function ServiceDetailPage({ detail }: { detail: ServiceDetail }) {
  const Icon = detail.icon;
  const isConstruction = detail.category === "construction";
  const { projects: relatedConstructionProjects } = usePublicProjects("construction");
  const { partners } = usePublicPartners();

  return (
    <>
      <section className="relative overflow-hidden bg-ink pt-28 text-ivory sm:pt-32">
        <div className="absolute inset-0">
          <img src={detail.image} alt={detail.imageAlt} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/62 to-ink/24" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        </div>
        <div className="relative mx-auto grid min-h-[72svh] max-w-7xl items-end gap-10 px-4 pb-16 sm:px-6 md:grid-cols-[1.05fr_0.95fr] md:items-center md:pb-0">
          <Reveal className="max-w-3xl">
            <p className="eyebrow !text-primary-glow">{detail.eyebrow}</p>
            <h1 className="mt-5 font-display text-[clamp(2.4rem,9vw,5.8rem)] font-medium leading-[1.02]">
              {detail.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ivory/78 md:text-lg">
              {detail.subtitle}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-full bg-gradient-gold px-8 text-ink shadow-gold">
                <Link to={isConstruction ? "/projects/construction" : "/projects"}>
                  View Projects <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-ivory/30 bg-ivory/5 px-8 text-ivory hover:bg-ivory/10"
              >
                <Link to="/" hash="contact">
                  Get Free Quote
                </Link>
              </Button>
              {isConstruction && (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-ivory/30 bg-ivory/5 px-8 text-ivory hover:bg-ivory/10"
                >
                  <Link to="/construction/cost-estimator">
                    Cost Estimator <IndianRupee className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="hidden md:block">
            <div className="overflow-hidden rounded-3xl bg-ivory/8 p-3 shadow-luxe ring-1 ring-ivory/15 backdrop-blur">
              <img
                src={detail.image}
                alt={detail.imageAlt}
                className="aspect-[4/5] w-full rounded-2xl object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-gradient-ivory py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="sticky top-28 rounded-3xl bg-card p-7 shadow-luxe ring-1 ring-border">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-gold text-ink shadow-gold">
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="mt-8 font-display text-3xl font-semibold text-ink sm:text-4xl">
                Built for clarity before commitment.
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">{detail.intro}</p>
            </div>
          </Reveal>

          <div className="space-y-6">
            <Reveal>
              <div className="rounded-3xl bg-card p-7 shadow-luxe ring-1 ring-border">
                <p className="eyebrow">What this includes</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {detail.highlights.map((item) => (
                    <div key={item} className="flex gap-3 rounded-2xl bg-secondary/70 p-4">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm font-medium text-ink">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="rounded-3xl bg-ink p-7 text-ivory shadow-luxe">
                <p className="eyebrow !text-primary-glow">Best suited for</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {detail.suitedFor.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-ivory/15 bg-ivory/8 px-4 py-2 text-sm text-ivory/82"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            {detail.gallery && (
              <Reveal delay={0.08}>
                <div className="rounded-3xl bg-card p-7 shadow-luxe ring-1 ring-border">
                  <p className="eyebrow">Specialised Scope</p>
                  <h3 className="mt-3 font-display text-3xl font-semibold text-ink">
                    WTG foundation and infrastructure execution.
                  </h3>
                  <div className="mt-6 grid gap-5 md:grid-cols-2">
                    {detail.gallery.map((item) => (
                      <article key={item.title} className="overflow-hidden rounded-2xl bg-secondary/70">
                        <div className="aspect-[16/10] overflow-hidden bg-ink">
                          <img
                            src={item.image}
                            alt={item.imageAlt}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                          />
                        </div>
                        <div className="p-5">
                          <h4 className="font-display text-2xl font-semibold text-ink">{item.title}</h4>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {item.body}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            <Reveal delay={0.1}>
              <div className="rounded-3xl bg-card p-7 shadow-luxe ring-1 ring-border">
                <h3 className="font-display text-3xl font-semibold text-ink">
                  Want to see related work?
                </h3>
                <p className="mt-3 max-w-2xl text-muted-foreground">
                  Explore Tathastu Infra projects, then share your requirement with us so we can guide
                  the right next step for your site, flat, home or workspace.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Button asChild className="rounded-full bg-gradient-gold px-7 text-ink shadow-gold">
                    <Link to={isConstruction ? "/projects/construction" : "/projects"}>
                      Explore Projects <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full px-7">
                    <Link to={detail.parentPath}>Back to Service</Link>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {isConstruction && (
        <>
          <PartnerLogoSection partners={partners} compact />
          <section className="bg-gradient-ivory pb-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal delay={0.08} className="mt-8">
              <div className="rounded-3xl bg-card p-7 shadow-luxe ring-1 ring-border sm:p-8">
                <p className="eyebrow">Construction Projects</p>
                <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
                  Recent construction work by Tathastu Infra.
                </h2>
                <p className="mt-4 max-w-3xl text-muted-foreground">
                  Explore live examples of residential and commercial execution. Every construction
                  service page now includes this project showcase for quick reference.
                </p>

                <div className="mt-8 grid gap-5 md:grid-cols-3">
                  {relatedConstructionProjects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      label="construction"
                      compact
                    />
                  ))}
                </div>

                <div className="mt-7">
                  <Button asChild className="rounded-full bg-gradient-gold px-7 text-ink shadow-gold">
                    <Link to="/projects/construction">
                      View All Projects <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Reveal>
            </div>
          </section>
        </>
      )}
    </>
  );
}
