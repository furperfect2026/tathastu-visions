import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ProjectCard } from "@/components/ProjectShowcase";
import { Reveal } from "@/components/Reveal";
import { usePublicProjects } from "@/hooks/usePublicProjects";
import { cn } from "@/lib/utils";

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
            {visible.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
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
