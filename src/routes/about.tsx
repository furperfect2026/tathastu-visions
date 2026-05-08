import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import founder from "@/assets/founder.jpg";
import { CountUp } from "@/components/CountUp";
import { stats } from "@/lib/site-data";
import { Sparkles, Shield, Gem } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Tathastu — Our Story, Vision & Leadership" },
      { name: "description", content: "Founded by Rohit, Tathastu is a multi-disciplinary firm based in Lohegaon. Discover our story, values and the team building tomorrow's homes." },
      { property: "og:title", content: "About Tathastu" },
      { property: "og:description", content: "Trust, luxury and craftsmanship — the Tathastu story." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="pt-36 pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <p className="eyebrow">About Tathastu</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-medium leading-[1.05] md:text-7xl">
            A name synonymous with <span className="text-gradient-gold italic">trust, luxury</span> and unparalleled craftsmanship.
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 md:grid-cols-2">
          <Reveal>
            <motion.div
              whileHover={{ rotate: -1, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-luxe"
            >
              <img src={founder} alt="Rohit, Founder & CEO of Tathastu" loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute -left-3 -top-3 h-full w-full rounded-3xl border border-primary/40" />
            </motion.div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">Founder & CEO</p>
            <h2 className="mt-3 font-display text-4xl font-medium">Rohit</h2>
            <p className="mt-6 text-lg text-muted-foreground">
              What began as a singular vision to redefine architectural elegance has evolved into a multi-disciplinary firm dedicated to shaping the future of modern living.
            </p>
            <p className="mt-4 text-muted-foreground">
              Headquartered in Lohegaon, Maharashtra, Tathastu transforms raw structures into elegant, functional homes and commercial spaces — where luxury, utility and timeless design intersect.
            </p>
            <blockquote className="mt-8 border-l-2 border-primary pl-5 font-display text-xl italic text-foreground">
              "Building spaces that inspire future generations."
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gradient-ivory py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">What we stand for</p>
            <h2 className="mt-3 font-display text-4xl font-medium md:text-5xl">Three values, one promise.</h2>
          </Reveal>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              { icon: Shield, title: "Trust", body: "Every relationship begins and ends with the trust our clients place in us." },
              { icon: Gem, title: "Luxury", body: "Materials, finishes and details chosen with conviction — never by default." },
              { icon: Sparkles, title: "Craftsmanship", body: "Engineering precision and design care that endures decades, not seasons." },
            ].map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="rounded-3xl bg-card p-8 shadow-luxe ring-1 ring-border">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-gold text-ink shadow-gold">
                    <v.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold">{v.title}</h3>
                  <p className="mt-2 text-muted-foreground">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="eyebrow">Leadership</p>
            <h2 className="mt-3 font-display text-4xl font-medium md:text-5xl">The people behind Tathastu.</h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { name: "Rohit", role: "Founder & CEO", photo: founder },
              { name: "Maan Singh", role: "Sales Management — Interior", photo: null as string | null },
              { name: "Tathastu Studio", role: "Design & Engineering Team", photo: null as string | null },
            ].map((m, i) => (
              <Reveal key={m.name} delay={i * 0.08}>
                <div className="overflow-hidden rounded-3xl bg-card ring-1 ring-border">
                  {m.photo ? (
                    <div className="aspect-[4/5] overflow-hidden bg-muted">
                      <img src={m.photo} alt={`${m.name}, ${m.role}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                    </div>
                  ) : (
                    <div className="flex aspect-[4/5] items-center justify-center bg-gradient-ivory">
                      <div className="grid h-24 w-24 place-items-center rounded-full bg-gradient-gold font-display text-4xl font-semibold text-primary-foreground shadow-gold">
                        {m.name[0]}
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold">{m.name}</h3>
                    <p className="text-sm text-muted-foreground">{m.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-ink py-20 text-ivory">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-5xl font-semibold text-gradient-gold">
                <CountUp value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-ivory/60">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
