import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/ProjectShowcase";
import { Reveal } from "@/components/Reveal";
import { usePublicProjects } from "@/hooks/usePublicProjects";
import { cn } from "@/lib/utils";
import pisoliHero from "@/assets/pisoli-villas/villa-1.png";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects in Pune | Tathastu Infra Realty, Construction & Interior" },
      {
        name: "description",
        content:
          "Selected works by Tathastu Infra in Pune and Maharashtra, including apartments, villas, commercial spaces and bespoke interiors.",
      },
      { property: "og:title", content: "Tathastu Infra Projects" },
      { property: "og:description", content: "A curated portfolio of recent work in Pune and Maharashtra." },
    ],
    links: [{ rel: "canonical", href: "https://www.tathastuinfra.in/projects" }],
  }),
  component: ProjectsPage,
});

const filters = [
  { key: "all", label: "All" },
  { key: "realty", label: "Realty" },
  { key: "construction", label: "Construction" },
  { key: "interior", label: "Interior" },
] as const;

function ProjectsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]["key"]>("all");
  const { projects } = usePublicProjects();
  const visible = projects.filter((project) => filter === "all" || project.category === filter);

  return (
    <section className="pt-36 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="eyebrow">Portfolio</p>
        <h1 className="mt-4 max-w-3xl break-words font-display text-[2.75rem] font-medium leading-[1.05] sm:text-5xl md:text-7xl">
          Selected <span className="text-gradient-gold italic">work.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          A curated look at Tathastu Infra projects across Lohegaon, Pune and nearby Maharashtra locations.
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setFilter(item.key)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all sm:px-5",
                filter === item.key
                  ? "bg-gradient-gold text-ink shadow-gold"
                  : "bg-secondary text-foreground/70 hover:bg-accent",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {(filter === "all" || filter === "realty") && (
              <motion.article
                layout
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.45 }}
                whileHover={{ y: -6 }}
                className="group h-full cursor-pointer overflow-hidden rounded-3xl bg-card text-left shadow-luxe ring-1 ring-border focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Link to="/pisoli-villas" className="block h-full w-full">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={pisoliHero}
                      alt="Pisoli Luxury Villas"
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-primary">
                      Realty
                    </p>
                    <h3 className="mt-1 font-display text-xl font-semibold text-ink">Pisoli Luxury Villas</h3>
                    <p className="text-xs text-muted-foreground">Pisoli, Pune</p>
                    <p className="mt-3 inline-flex rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                      1000 - 2000 sq ft Plots
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      A refined contemporary residential community focused on elegance, simplicity, and premium living experiences.
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      Explore Project <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            )}
            {visible.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index + 1} />
            ))}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 && (
          <Reveal>
            <p className="mt-20 text-center text-muted-foreground">No projects in this category yet.</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
