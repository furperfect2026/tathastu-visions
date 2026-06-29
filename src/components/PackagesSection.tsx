import { Fragment, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  Hammer,
  Building,
  Layers,
  Paintbrush,
  Plug,
  Droplets,
  Sparkles,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
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

type PackageMode = "construction" | "interior";

const baseCats = (extras: Partial<Record<string, string[]>> = {}): Category[] => [
  {
    key: "earth",
    label: "Earth Work",
    icon: Hammer,
    items: extras.earth ?? [
      "Excavation in hard / soft soil up to 5 ft",
      "Anti-termite treatment for foundation",
      "Soil filling & levelling with compaction",
      "Trenching for utility lines",
      "Plot clearing and grading",
    ],
  },
  {
    key: "structure",
    label: "Structure",
    icon: Building,
    items: extras.structure ?? [
      "RCC framed structure with M25 / Fe500",
      'External walls 6" / Internal walls 4"',
      "Earthquake resistant design",
      "Plinth beam and lintel beam reinforcements",
      "High-grade waterproofing in sunken areas",
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
      "Elevation and 3D conceptualization",
      "Daily progress reporting to client",
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
      "Skirting matching with floor tiles",
      "High quality tile adhesive for lasting bond",
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
      "Telephone and TV points in living & master",
      "Proper earthing and safety breakers",
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
      "Rainwater harvesting pipe provisions",
      "Kitchen sink with drainboard",
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
      "Anti-fungal treatment on exteriors",
      "Enamel paint for metal works and grills",
    ],
  },
];

const constructionPackages: Pkg[] = [
  {
    key: "structure",
    name: "Structural Package",
    price: "₹1,199",
    tagline: "Foundation to slab — built to last.",
    categories: baseCats({
      flooring: [
        "Not included — structure only",
        "Base levelling provided",
        "Screed concrete work done",
        "Tile procurement by client",
      ],
      electrical: [
        "Conduiting only in slab",
        "Wall chasing and PVC pipe insertion",
        "Wiring and switches not included",
        "Distribution box niche created",
      ],
      plumbing: [
        "Plumbing lines only",
        "CPVC concealed pipes laid",
        "Sanitary ware not included",
        "Tanks and fittings not included",
      ],
      painting: [
        "Primer coat only",
        "Internal and external plastering",
        "Putty work not included",
        "Final paint done by client",
      ],
    }),
  },
  {
    key: "basic",
    name: "Basic Package",
    price: "₹1,550",
    tagline: "Smart essentials for the value-conscious home.",
    categories: baseCats(),
  },
  {
    key: "standard",
    name: "Standard Package",
    price: "₹1,750",
    tagline: "Refined finishes for everyday luxury.",
    categories: baseCats({
      flooring: [
        "Premium vitrified 2'x4'",
        "Designer dado tiles up to 7 ft",
        "Granite kitchen platform",
        "Anti-skid balcony tiles",
        "Premium tile adhesives",
      ],
      painting: [
        "Royale luxury emulsion interiors",
        "Apex weather-shield exterior",
        "Textured wall for living room",
        "High-quality primer & double coat",
        "Enamel paint for woodwork",
      ],
    }),
  },
  {
    key: "premium",
    name: "Premium Package",
    price: "₹2,250",
    tagline: "Designer-grade material across every room.",
    categories: baseCats({
      flooring: [
        "Imported double-charge vitrified",
        "Wooden flooring in master bedroom",
        "Italian marble entry foyer",
        "Full height designer dado tiles",
        "Quartz/Granite kitchen countertop",
      ],
      electrical: [
        "Smart modular switches",
        "CCTV & video door-phone wiring",
        "Designer LED lighting points",
        "Home automation readiness",
        "EV charging point in parking",
      ],
      painting: [
        "Texture finish accent walls",
        "Royale Aspira / Asian Ultima",
        "PU polish for main door",
        "Waterproofing exterior coats",
        "Washable premium interior coats",
      ],
    }),
  },
];

const interiorCats = (extras: Partial<Record<string, string[]>> = {}): Category[] => [
  {
    key: "planning",
    label: "Space Planning",
    icon: Layers,
    items: extras.planning ?? [
      "Furniture layout and circulation planning",
      "Moodboard and material direction",
      "Basic lighting and false ceiling layout",
      "3D conceptualization of key areas",
      "Color palette selection",
    ],
  },
  {
    key: "carpentry",
    label: "Carpentry",
    icon: Hammer,
    items: extras.carpentry ?? [
      "Modular storage in standard laminate finish",
      "Kitchen, wardrobe and TV unit planning",
      "Hardware and shutter selections",
      "Shoe rack and entryway units",
      "Loft storage provisions",
    ],
  },
  {
    key: "finishes",
    label: "Finishes",
    icon: Paintbrush,
    items: extras.finishes ?? [
      "Wall paint and accent wall selection",
      "Standard laminate and veneer options",
      "Curtain, upholstery and soft furnishing guidance",
      "False ceiling finish and edge details",
      "Skirting and trim finishes",
    ],
  },
  {
    key: "lighting",
    label: "Lighting",
    icon: Plug,
    items: extras.lighting ?? [
      "Warm ambient lighting plan",
      "Task lighting for kitchen and work areas",
      "Decorative lighting points",
      "Profile lights in wardrobes and displays",
      "Switch plate alignment and planning",
    ],
  },
  {
    key: "decor",
    label: "Decor",
    icon: Sparkles,
    items: extras.decor ?? [
      "Furniture styling and decor curation",
      "Artwork, mirror and accessory guidance",
      "Final styling checklist",
      "Rugs, cushions and throw selection",
      "Indoor plant styling",
    ],
  },
];

const interiorPackages: Pkg[] = [
  {
    key: "essential",
    name: "Essential Package",
    price: "₹1,250",
    tagline: "Smart interior essentials for clean, functional homes.",
    categories: interiorCats(),
  },
  {
    key: "comfort",
    name: "Comfort Package",
    price: "₹1,650",
    tagline: "Refined finishes and practical storage for everyday luxury.",
    categories: interiorCats({
      carpentry: [
        "Premium laminate modular kitchen",
        "Wardrobes with soft-close hardware",
        "TV unit and study/storage unit",
        "Designer crockery unit",
        "Hydraulic bed storage",
      ],
      lighting: [
        "Layered warm lighting plan",
        "Cove lighting provisions",
        "Decorative pendant and profile lighting",
        "Sensor lights in bathrooms",
        "Dimmable living room lights",
      ],
    }),
  },
  {
    key: "premium",
    name: "Premium Package",
    price: "₹2,250",
    tagline: "Designer-grade interiors with richer materials and details.",
    categories: interiorCats({
      planning: [
        "Detailed room-wise concept design",
        "Material palette and 3D view support",
        "Furniture and lighting placement",
        "Custom woodwork drawings",
        "Acoustic and thermal planning",
      ],
      carpentry: [
        "Veneer / acrylic finish options",
        "Premium modular kitchen accessories",
        "Custom wardrobes and display units",
        "Fluted panels and wall panelling",
        "Walk-in closet styling",
      ],
      finishes: [
        "Texture walls and wallpaper selection",
        "Premium paint finish",
        "Designer soft furnishings",
        "PU and Duco finishes",
        "Metallic and glass accents",
      ],
      decor: [
        "Curated furniture and decor styling",
        "Artwork and accessory sourcing support",
        "Final styling supervision",
        "Custom mirrors and artifacts",
        "Handpicked rugs and planters",
      ],
    }),
  },
  {
    key: "signature",
    name: "Signature Package",
    price: "₹2,850",
    tagline: "Bespoke luxury interiors with a complete studio-led finish.",
    categories: interiorCats({
      planning: [
        "Complete design concept with 3D walkthrough",
        "Room-wise material library",
        "Personalized luxury theme",
        "Bespoke spatial engineering",
        "Dedicated design lead",
      ],
      carpentry: [
        "Custom veneer, PU and fluted details",
        "Premium kitchen and wardrobe systems",
        "Feature walls and designer partitions",
        "Concealed doors and smart storage",
        "Luxury walk-in experiences",
      ],
      lighting: [
        "Scene-based lighting plan",
        "Premium decorative fixtures",
        "Smart lighting readiness",
        "Automated mood lighting",
        "Architectural profile lighting",
      ],
      finishes: [
        "Imported wallpapers and textures",
        "Stone, veneer and metallic accents",
        "Luxury upholstery selection",
        "Italian marble polishing",
        "High-gloss luxury laminates",
      ],
      decor: [
        "Turnkey furniture and decor curation",
        "Artwork, mirrors and styling objects",
        "Final photo-ready styling",
        "Signature sculptures and pieces",
        "Bespoke soft furnishings",
      ],
    }),
  },
];

const packageCopy = {
  construction: {
    eyebrow: "Construction Packages",
    title: (
      <>
        Customised home construction <span className="text-gradient-gold italic">packages</span>
      </>
    ),
    description:
      "Transparent inclusions, premium materials and zero-surprise pricing — pick the tier that fits your dream.",
    quoteTitle: (
      <>
        Get a tailored quote for your{" "}
        <span className="italic text-gradient-gold">construction plan.</span>
      </>
    ),
    quoteDescription:
      "Share your site, built-up area and expectations in Pune or around Lohegaon. Our team will help you choose the right package, timeline and next step.",
    packages: constructionPackages,
    defaultKey: "standard",
  },
  interior: {
    eyebrow: "Interior Packages",
    title: (
      <>
        Tailored interior design <span className="text-gradient-gold italic">packages</span>
      </>
    ),
    description:
      "Flexible interior packages for kitchens, bedrooms, living spaces and offices — planned around finish, function and feel.",
    quoteTitle: (
      <>
        Get a tailored quote for your{" "}
        <span className="italic text-gradient-gold">interior scope.</span>
      </>
    ),
    quoteDescription:
      "Share your rooms, style, budget and expected timeline. Our team will guide you toward the right interior package and next step.",
    packages: interiorPackages,
    defaultKey: "comfort",
  },
} satisfies Record<
  PackageMode,
  {
    eyebrow: string;
    title: React.ReactNode;
    description: string;
    quoteTitle: React.ReactNode;
    quoteDescription: string;
    packages: Pkg[];
    defaultKey: string;
  }
>;

function PackageDetails({
  current,
  tab,
  setTab,
  className,
}: {
  current: Pkg;
  tab: string;
  setTab: (tab: string) => void;
  className?: string;
}) {
  const activeCat = current.categories.find((c) => c.key === tab) ?? current.categories[0];

  return (
    <motion.div
      key={current.key}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "mt-8 overflow-hidden rounded-3xl border border-border bg-card shadow-luxe",
        className,
      )}
    >
      <div className="grid gap-0 md:grid-cols-[260px_1fr]">
        <div className="border-b border-border bg-secondary/40 p-4 md:border-b-0 md:border-r">
          <p className="px-3 pb-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            {current.name}
          </p>
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

        <div className="p-5 sm:p-7 md:p-10">
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
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-xl bg-secondary/40 p-3 text-sm"
                >
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
  );
}

export function PackagesSection({ mode = "construction" }: { mode?: PackageMode }) {
  const copy = packageCopy[mode];
  const packages = copy.packages;
  const [active, setActive] = useState(copy.defaultKey);
  const current = packages.find((p) => p.key === active)!;
  const [tab, setTab] = useState(current.categories[0].key);
  const activeCat = current.categories.find((c) => c.key === tab) ?? current.categories[0];

  return (
    <section id="packages" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-medium sm:text-4xl md:text-5xl">
            {copy.title}
          </h2>
          <p className="mt-4 text-muted-foreground">{copy.description}</p>
        </Reveal>

        {/* Package cards */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {packages.map((p) => {
            const isActive = p.key === active;
            return (
              <Fragment key={p.key}>
                <motion.button
                  type="button"
                  onClick={() => {
                    setActive(p.key);
                    setTab(p.categories[0].key);
                  }}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  className={cn(
                    "group relative flex min-w-0 flex-col items-center justify-center rounded-2xl border px-3 py-6 text-center transition-all sm:px-4",
                    isActive
                      ? "border-transparent bg-gradient-gold text-primary-foreground shadow-gold"
                      : "border-border bg-card text-foreground hover:border-primary/40 hover:shadow-luxe",
                  )}
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] opacity-80 sm:tracking-[0.18em]">
                    {p.name.replace(" Package", "")}
                  </span>
                  <span className="mt-2 font-display text-2xl font-semibold leading-none">
                    {p.price}
                  </span>
                  <span className="mt-1 text-[11px] uppercase tracking-wider opacity-75">
                    / sqft · Incl. GST
                  </span>
                  {isActive && (
                    <span
                      className="absolute -bottom-2 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-gradient-gold"
                      aria-hidden
                    />
                  )}
                </motion.button>
                {isActive && (
                  <div className="sm:col-span-2 lg:hidden">
                    <AnimatePresence mode="wait">
                      <PackageDetails
                        current={current}
                        tab={tab}
                        setTab={setTab}
                        className="mt-4"
                      />
                    </AnimatePresence>
                  </div>
                )}
              </Fragment>
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
            className="mt-8 hidden overflow-hidden rounded-3xl border border-border bg-card shadow-luxe lg:block"
          >
            <div className="grid gap-0 md:grid-cols-[260px_1fr]">
              {/* Sidebar tabs */}
              <div className="border-b border-border bg-secondary/40 p-4 md:border-b-0 md:border-r">
                <p className="px-3 pb-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  {current.name}
                </p>
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
              <div className="p-5 sm:p-7 md:p-10">
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
                      <li
                        key={i}
                        className="flex items-start gap-3 rounded-xl bg-secondary/40 p-3 text-sm"
                      >
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

        <Reveal className="mt-10">
          <div className="relative overflow-hidden rounded-3xl bg-ink p-6 text-ivory shadow-luxe sm:p-8 md:p-10">
            <div className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl" />
            <div className="relative grid items-center gap-7 md:grid-cols-[1fr_auto]">
              <div>
                <p className="eyebrow !text-primary-glow">Need a clearer estimate?</p>
                <h3 className="mt-3 max-w-2xl font-display text-3xl font-medium leading-tight sm:text-4xl">
                  {copy.quoteTitle}
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-ivory/70 md:text-base">
                  {copy.quoteDescription}
                </p>
              </div>
              <Button
                asChild
                size="lg"
                className="group w-full rounded-full bg-gradient-gold px-5 text-base text-ink shadow-gold sm:w-auto sm:px-8"
              >
                <Link to="/" hash="contact">
                  Get Free Quote{" "}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
