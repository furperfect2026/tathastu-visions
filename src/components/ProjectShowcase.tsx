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
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.article
        layout
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        transition={{ duration: 0.45, delay: index * 0.04 }}
        whileHover={{ y: -6 }}
        role="button"
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setOpen(true);
          }
        }}
        className="group h-full cursor-pointer overflow-hidden rounded-3xl bg-card text-left shadow-luxe ring-1 ring-border focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
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
      </motion.article>

      <AnimatePresence>
        {open && <ProjectModal project={project} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

function ProjectModal({ project, onClose }: { project: PublicProject; onClose: () => void }) {
  const gallery = useMemo(
    () => uniqueImages([project.image, ...(project.galleryImages || [])]),
    [project.galleryImages, project.image],
  );
  const [activeImage, setActiveImage] = useState(gallery[0] || project.image);
  const projectsPath = project.category === "construction" ? "/projects/construction" : project.category === "realty" ? "/realty" : "/projects";

  return (
    <motion.div
      className="fixed inset-0 z-[95] flex items-center justify-center bg-ink/78 p-4 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} project details`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-h-[92svh] w-full max-w-6xl overflow-y-auto rounded-[1.5rem] bg-background shadow-[0_32px_100px_-45px_rgba(0,0,0,1)] ring-1 ring-border"
        initial={{ opacity: 0, scale: 0.96, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 18 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-ink/70 text-ivory backdrop-blur transition-colors duration-300 hover:bg-primary hover:text-ink"
          aria-label="Close project details"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
          <div className="bg-ink">
            <div className="aspect-[16/11] overflow-hidden lg:min-h-[620px] lg:aspect-auto">
              <img src={activeImage} alt={project.title} className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <p className="eyebrow">{project.category} Project</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-5xl">
              {project.title}
            </h2>
            <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-primary">
              {project.location} - {project.year}
            </p>
            {project.priceLabel && (
              <p className="mt-5 inline-flex rounded-full bg-primary/15 px-4 py-2 text-sm font-semibold text-primary">
                {project.priceLabel}
              </p>
            )}
            <div className="mt-6 text-base leading-relaxed text-muted-foreground">
              {(() => {
                if (project.blurb?.trim().startsWith('{')) {
                  try {
                    const parsed = JSON.parse(project.blurb);
                    if (parsed.isRealtyJson) {
                      return (
                        <div className="space-y-4">
                          <p>{parsed.description || ""}</p>
                          {parsed.tagline && <p className="font-semibold text-primary">{parsed.tagline}</p>}
                          
                          {(parsed.beds || parsed.area) && (
                            <div className="flex flex-wrap gap-3">
                              {parsed.beds && <span className="inline-flex items-center rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">BHK: {parsed.beds}</span>}
                              {parsed.area && <span className="inline-flex items-center rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">Area: {parsed.area}</span>}
                            </div>
                          )}

                          {parsed.highlights?.length > 0 && (
                            <div className="pt-2">
                              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-ink mb-2">Highlights</p>
                              <ul className="grid grid-cols-2 gap-2 text-sm">
                                {parsed.highlights.map((h: string, i: number) => (
                                  <li key={i} className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> {h}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      );
                    }
                  } catch (e) {}
                }
                return <p>{project.blurb}</p>;
              })()}
            </div>

            {gallery.length > 1 && (
              <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  More Photos
                </p>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {gallery.map((image) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setActiveImage(image)}
                      className="aspect-square overflow-hidden rounded-2xl ring-1 ring-border transition-all duration-300 hover:-translate-y-0.5 hover:ring-primary data-[active=true]:ring-2 data-[active=true]:ring-primary"
                      data-active={activeImage === image}
                    >
                      <img src={image} alt={`${project.title} gallery`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              {project.category === "realty" ? (
                <Button asChild className="rounded-full bg-gradient-gold px-7 text-ink shadow-gold">
                  <a href={`/realty?property=${project.id}`} onClick={onClose}>
                    View Property Details <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              ) : (
                <Button asChild className="rounded-full bg-gradient-gold px-7 text-ink shadow-gold">
                  <Link to="/" hash="contact" onClick={onClose}>
                    Enquire About This <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              )}
              <Button asChild variant="outline" className="rounded-full px-7">
                <Link to={projectsPath} onClick={onClose}>
                  View All Projects
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
