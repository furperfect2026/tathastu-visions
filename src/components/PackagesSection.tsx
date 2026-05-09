import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Hammer, Building, Layers, Paintbrush, Plug, Droplets, Sparkles } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

type Category = {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  items: string[];
};

type Pkg = {
  key: string;
  name: string;
  price: string;
  tagline: string;
  categories: Category[];
};

const baseCats = (extras: Partial<Record<string, string[]>> = {}): Category[] => [
  {
    key: "earth",
    label: "Earth Work",
    icon: Hammer,
    items: extras.earth ?? [
      "Excavation in hard / soft soil up to 5 ft",
      "Anti-termite treatment for foundation",
      "Soil filling & levelling with compaction",
    ],
  },
  {
    key: "structure",
    label: "Structure",
    icon: Building,
    items: extras.structure ?? [
      "RCC framed structure with M25 / Fe500",
      "External walls 6\" / Internal walls 4\"",
      "Earthquake resistant design",
    ],
  },
  {
    key: "misc",
    label: "Miscellaneous",
    icon: Layers,
    items: extras.misc ?? [
      "Architectural & structural drawings",
      "Site supervision & project management",
      "Municipal sanction coordination",
    ],
  },
  {
    key: "flooring",
    label: "Flooring",
    icon: Sparkles,
    items: extras.flooring ?? [
      "Vitrified tiles 2'x2' in living & bedrooms",
      "Anti-skid tiles in bathrooms & balcony",
      "Granite for kitchen platform",
    ],
  },
  {
    key: "electrical",
    label: "Electrical",
    icon: Plug,
    items: extras.electrical ?? [
      "Concealed copper wiring (ISI)",
      "Modular switches & MCB distribution",
      "Provision for AC, geyser & inverter",
    ],
  },
  {
    key: "plumbing",
    label: "Plumbing",
    icon: Droplets,
    items: extras.plumbing ?? [
      "CPVC / UPVC concealed plumbing",
      "Branded sanitary ware & CP fittings",
      "Overhead & underground water tanks",
    ],
  },
  {
    key: "painting",
    label: "Painting",
    icon: Paintbrush,
    items: extras.painting ?? [
      "Internal walls — premium emulsion",
      "External walls — weather-shield",
      "Two coats with putty & primer",
    ],
  },
];

const packages: Pkg[] = [
  {
    key: "structure",
    name: "Structure Package",
    price: "₹1,199",
    tagline: "Foundation to slab — built to last.",
    categories: baseCats({
      flooring: ["Not included — structure only"],
      electrical: ["Conduiting only"],
      plumbing: ["Plumbing lines only"],
      painting: ["Primer coat only"],
    }),
  },
  {
    key: "basic",
    name: "Basic Package",
    price: "₹1,549",
    tagline: "Smart essentials for the value-conscious home.",
    categories: baseCats(),
  },
  {
    key: "standard",
    name: "Standard Package",
    price: "₹1,699",
    tagline: "Refined finishes for everyday luxury.",
    categories: baseCats({
      flooring: ["Premium vitrified 2'x4'", "Designer dado tiles up to 7 ft", "Granite kitchen platform"],
      painting: ["Royale luxury emulsion interiors", "Apex weather-shield exterior"],
    }),
  },
  {
    key: "premium",
    name: "Premium Package",
    price: "₹1,949",
    tagline: "Designer-grade material across every room.",
    categories: baseCats({
      flooring: ["Imported double-charge vitrified", "Wooden flooring in master bedroom", "Italian marble entry foyer"],
      electrical: ["Smart modular switches", "CCTV & video door-phone wiring", "Designer LED lighting"],
      painting: ["Texture finish accent walls", "Royale Aspira / Asian Ultima"],
    }),
  },
  {
    key: "royal",
    name: "Royal Package",
    price: "₹2,099",
    tagline: "Statement craftsmanship for distinguished homes.",
    categories: baseCats({
      flooring: ["Italian marble in living areas", "Solid wood flooring in bedrooms", "Designer granite & quartz"],
      electrical: ["Full home automation ready", "Smart lighting scenes", "Premium chandeliers allowance"],
      plumbing: ["Kohler / Jaquar Royale CP fittings", "Hot & cold mixers everywhere"],
      painting: ["Designer textures & wallpapers", "Premium veneer accent walls"],
    }),
  },
  {
    key: "luxury",
    name: "Luxury Package",
    price: "₹2,499",
    tagline: "Bespoke, signature-level living.",
    categories: baseCats({
      earth: ["Geotech survey & engineered foundation", "Complete waterproofing system"],
      structure: ["Custom architectural facade", "Double-height feature walls", "Designer staircase"],
      flooring: ["Imported Italian marble throughout", "Engineered hardwood in bedrooms", "Onyx / quartz feature floors"],
      electrical: ["Full smart home automation", "Designer Italian lighting", "Home theatre wiring"],
      plumbing: ["Kohler / Grohe luxury suite", "Rain showers & body jets", "Hot water recirculation"],
      painting: ["Hand-applied lime plaster", "Imported wallcoverings", "Designer veneer & metallic finishes"],
      misc: ["Dedicated project architect", "3D walkthrough & material library", "Landscape & lighting design"],
    }),
  },
];

export function PackagesSection() {
  const [active, setActive] = useState(packages[2].key);
  const current = packages.find((p) => p.key === active)!;
  const [tab, setTab] = useState(current.categories[0].key);
  const activeCat = current.categories.find((c) => c.key === tab) ?? current.categories[0];

  return (
    <section id="packages" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Our Packages</p>
          <h2 className="mt-3 font-display text-4xl font-medium md:text-5xl">
            Customised home construction <span className="text-gradient-gold italic">packages</span>
          </h2>
          <p className="mt-4 text-muted-foreground">Transparent inclusions, premium materials and zero-surprise pricing — pick the tier that fits your dream.</p>
        </Reveal>

        {/* Package cards */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {packages.map((p) => {
            const isActive = p.key === active;
            return (
              <motion.button
                key={p.key}
                type="button"
                onClick={() => {
                  setActive(p.key);
                  setTab(p.categories[0].key);
                }}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className={cn(
                  "group relative flex flex-col items-center justify-center rounded-2xl border px-4 py-6 text-center transition-all",
                  isActive
                    ? "border-transparent bg-gradient-gold text-primary-foreground shadow-gold"
                    : "border-border bg-card text-foreground hover:border-primary/40 hover:shadow-luxe",
                )}
              >
                <span className="text-xs font-semibold uppercase tracking-[0.18em] opacity-80">{p.name.replace(" Package", "")}</span>
                <span className="mt-2 font-display text-2xl font-semibold leading-none">{p.price}</span>
                <span className="mt-1 text-[11px] uppercase tracking-wider opacity-75">/ sqft · Incl. GST</span>
                {isActive && (
                  <span className="absolute -bottom-2 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-gradient-gold" aria-hidden />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="mt-8 overflow-hidden rounded-3xl border border-border bg-card shadow-luxe"
          >
            <div className="grid gap-0 md:grid-cols-[260px_1fr]">
              {/* Sidebar tabs */}
              <div className="border-b border-border bg-secondary/40 p-4 md:border-b-0 md:border-r">
                <p className="px-3 pb-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">{current.name}</p>
                <div className="flex flex-wrap gap-2 md:flex-col">
                  {current.categories.map((c) => {
                    const Icon = c.icon;
                    const on = c.key === tab;
                    return (
                      <button
                        key={c.key}
                        type="button"
                        onClick={() => setTab(c.key)}
                        className={cn(
                          "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all",
                          on
                            ? "bg-gradient-gold text-primary-foreground shadow-gold"
                            : "text-foreground/80 hover:bg-background hover:text-foreground",
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {c.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Content */}
              <div className="p-7 md:p-10">
                <p className="eyebrow">{current.name}</p>
                <h3 className="mt-2 font-display text-3xl font-semibold">{activeCat.label}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{current.tagline}</p>
                <AnimatePresence mode="wait">
                  <motion.ul
                    key={activeCat.key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-6 grid gap-3 sm:grid-cols-2"
                  >
                    {activeCat.items.map((it, i) => (
                      <li key={i} className="flex items-start gap-3 rounded-xl bg-secondary/40 p-3 text-sm">
                        <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-gradient-gold text-primary-foreground">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        <span className="text-foreground/90">{it}</span>
                      </li>
                    ))}
                  </motion.ul>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
