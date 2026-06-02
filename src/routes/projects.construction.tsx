import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { usePublicProjects } from "@/hooks/usePublicProjects";

export const Route = createFileRoute("/projects/construction")({
  head: () => ({
    meta: [
      { title: "Construction Projects in Pune | Tathastu Infra" },
      {
        name: "description",
        content:
          "Explore construction projects by Tathastu Infra in Pune including residential, commercial and structural work execution.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.tathastuinfra.in/projects/construction" }],
  }),
  component: ConstructionProjectsPage,
});

function ConstructionProjectsPage() {
  const { projects: constructionProjects } = usePublicProjects("construction");

  return (
    <section className="pt-36 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="eyebrow">Construction Portfolio</p>
        <h1 className="mt-4 max-w-3xl break-words font-display text-[2.75rem] font-medium leading-[1.05] sm:text-5xl md:text-7xl">
          Construction <span className="text-gradient-gold italic">projects.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          Residential, commercial and structural projects executed by Tathastu Infra across Pune.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {constructionProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              whileHover={{ y: -6 }}
              className="group overflow-hidden rounded-3xl bg-card shadow-luxe ring-1 ring-border"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <p className="text-[10px] uppercase tracking-[0.22em] text-primary">construction</p>
                <h3 className="mt-1 font-display text-xl font-semibold">{project.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {project.location} - {project.year}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">{project.blurb}</p>
              </div>
            </motion.article>
          ))}
        </div>

        {constructionProjects.length === 0 && (
          <Reveal>
            <p className="mt-20 text-center text-muted-foreground">
              Construction projects will appear here shortly.
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
