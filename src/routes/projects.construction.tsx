import { createFileRoute } from "@tanstack/react-router";
import { ProjectCard } from "@/components/ProjectShowcase";
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
            <ProjectCard key={project.id} project={project} index={index} label="construction" />
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
