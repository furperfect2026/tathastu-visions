import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import founder from "@/assets/founder.jpg";
import { CountUp } from "@/components/CountUp";
import { stats } from "@/lib/site-data";
import { Sparkles, Shield, Gem, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Tathastu â€” Our Story, Vision & Leadership" },
      { name: "description", content: "Founded by Rohit, Tathastu is a multi-disciplinary realty, construction and interior design firm based in Lohegaon, Pune." },
      { property: "og:title", content: "About Tathastu" },
      { property: "og:description", content: "Trust, luxury and craftsmanship â€” the Tathastu story." },
    ],
    links: [{ rel: "canonical", href: "https://www.tathastu.in/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="pt-36 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="eyebrow">About Tathastu</p>
          <h1 className="mt-4 max-w-3xl break-words font-display text-[2.75rem] font-medium leading-[1.05] sm:text-5xl md:text-7xl">
            A name synonymous with <span className="text-gradient-gold italic">trust, luxury</span> and unparalleled craftsmanship.
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 md:grid-cols-2">
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
              Headquartered in Lohegaon, Pune, Tathastu transforms raw structures into elegant, functional homes and commercial spaces across Maharashtra where luxury, utility and timeless design intersect.
            </p>
            <blockquote className="mt-8 border-l-2 border-primary pl-5 font-display text-xl italic text-foreground">
              "Building spaces that inspire future generations."
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gradient-ivory py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">What we stand for</p>
            <h2 className="mt-3 font-display text-3xl font-medium sm:text-4xl md:text-5xl">Three values, one promise.</h2>
          </Reveal>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              { icon: Shield, title: "Trust", body: "Every relationship begins and ends with the trust our clients place in us." },
              { icon: Gem, title: "Luxury", body: "Materials, finishes and details chosen with conviction â€” never by default." },
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <p className="eyebrow">Leadership</p>
            <h2 className="mt-3 font-display text-3xl font-medium sm:text-4xl md:text-5xl">The people behind Tathastu.</h2>
          </Reveal>
          <div className="mt-14">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl bg-card p-6 shadow-luxe ring-1 ring-border sm:p-8 md:p-12 lg:p-14">
                <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-primary/15 to-transparent lg:block" />
                <div className="relative max-w-4xl">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-gold text-ink shadow-gold">
                  <Users className="h-7 w-7" />
                </div>
                <p className="eyebrow mt-8">Our Team</p>
                <h3 className="mt-3 font-display text-3xl font-medium sm:text-4xl md:text-5xl">One studio. Many specialists.</h3>
                <p className="mt-5 max-w-2xl text-muted-foreground">
                  Behind every Tathastu project in Pune is a coordinated team of sales, construction, design, engineering and execution professionals working together to deliver spaces with clarity and care.
                </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      {/* Stats */}
      <section className="bg-ink py-20 text-ivory">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-4xl font-semibold text-gradient-gold sm:text-5xl">
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

