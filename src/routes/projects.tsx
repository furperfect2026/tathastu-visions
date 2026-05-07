import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Tathastu Realty, Construction & Interior" },
      { name: "description", content: "Selected works by Tathastu — apartments, villas, commercial spaces and bespoke interiors across Maharashtra." },
      { property: "og:title", content: "Tathastu Projects" },
      { property: "og:description", content: "A curated portfolio of recent work." },
    ],
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
  const visible = projects.filter((p) => filter === "all" || p.category === filter);

  return (
    <section className="pt-36 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <p className="eyebrow">Portfolio</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl font-medium leading-[1.05] md:text-7xl">
          Selected <span className="text-gradient-gold italic">work.</span>
        </h1>

        <div className="mt-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-all",
                filter === f.key ? "bg-gradient-gold text-ink shadow-gold" : "bg-secondary text-ink/70 hover:bg-accent",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                whileHover={{ y: -6 }}
                className="group overflow-hidden rounded-3xl bg-card shadow-luxe ring-1 ring-border"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-6">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-primary">{p.category}</p>
                  <h3 className="mt-1 font-display text-xl font-semibold">{p.title}</h3>
                  <p className="text-xs text-muted-foreground">{p.location} · {p.year}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{p.blurb}</p>
                </div>
              </motion.article>
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
