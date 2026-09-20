import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { PublicProject } from "@/hooks/usePublicProjects";

type ProjectCardProps = {
  project: PublicProject;
  index?: number;
  label?: string;
  compact?: boolean;
};

function uniqueImages(images: string[]) {
  return Array.from(new Set(images.filter(Boolean)));
}

export function ProjectCard({ project, index = 0, label, compact = false }: ProjectCardProps) {
  const isRealty = project.category === "realty";
  const projectsPath = project.category === "construction" ? "/projects/construction" : isRealty ? `/realty?property=${project.id}` : "/projects";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      whileHover={{ y: -6 }}
      className="group h-full overflow-hidden rounded-3xl bg-card text-left shadow-luxe ring-1 ring-border focus-within:ring-2 focus-within:ring-primary"
    >
      <a href={projectsPath} className="flex h-full flex-col outline-none">
        <div className={compact ? "aspect-[16/11] overflow-hidden" : "aspect-[4/5] overflow-hidden"}>
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        <div className={compact ? "p-4" : "p-6"}>
          <p className="text-[10px] uppercase tracking-[0.22em] text-primary">
            {label || project.category}
          </p>
          <h3 className="mt-1 font-display text-xl font-semibold text-ink">{project.title}</h3>
          <p className="text-xs text-muted-foreground">
            {project.location} - {project.year}
          </p>
            {project.priceLabel && (
              <p className="mt-3 inline-flex rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                {project.priceLabel}
              </p>
            )}
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
              {(() => {
                if (project.blurb?.trim().startsWith('{')) {
                  try {
                    const parsed = JSON.parse(project.blurb);
                    if (parsed.isRealtyJson) return parsed.description || "";
                  } catch (e) {}
                }
                return project.blurb;
              })()}
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
            View details <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </a>
    </motion.article>
  );
}

