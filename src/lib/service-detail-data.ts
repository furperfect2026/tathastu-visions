import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  BriefcaseBusiness,
  Building,
  Building2,
  CalendarCheck,
  CheckCircle2,
  CookingPot,
  Factory,
  Handshake,
  Home,
  Landmark,
  Layers3,
} from "lucide-react";
import construction1 from "@/assets/construction-1.jpg";
import construction2 from "@/assets/construction-2.jpg";
import construction3 from "@/assets/construction-3.jpg";
import construction4 from "@/assets/construction-4.jpg";
import interior1 from "@/assets/interior-1.jpg";
import interior3 from "@/assets/interior-3.jpg";
import interior4 from "@/assets/interior-4.png";
import realty3 from "@/assets/realty-3.jpg";
import realty4 from "@/assets/realty-4.jpg";
import wtgFoundationBase from "@/assets/wtg-foundation-base.png";
import wtgGovernmentHero from "@/assets/wtg-government-hero.jpg";
import wtgInstallation from "@/assets/wtg-turbine-installation.png";

export type ServiceDetailCategory = "realty" | "construction" | "interior";

export type ServiceDetail = {
  category: ServiceDetailCategory;
  slug: string;
  title: string;
  eyebrow: string;
  subtitle: string;
  intro: string;
  image: string;
  imageAlt: string;
  icon: LucideIcon;
  highlights: string[];
  suitedFor: string[];
  parentPath: "/realty" | "/construction" | "/interior";
  gallery?: {
    title: string;
    body: string;
    image: string;
    imageAlt: string;
  }[];
};

export const serviceDetails: ServiceDetail[] = [
  {
    category: "realty",
    slug: "rental",
    title: "Rental Assistance",
    eyebrow: "Tathastu Infra Realty",
    subtitle: "Clear rental support for flats and homes in Lohegaon, Pune.",
    intro:
      "We help tenants and owners move through rental search, visits, communication and basic checks with a calmer, more transparent process.",
    image: realty4,
    imageAlt: "Rental assistance for flats and homes in Lohegaon Pune",
    icon: CalendarCheck,
    highlights: ["Shortlisted rental options", "Owner and tenant coordination", "Visit planning", "Move-in clarity"],
    suitedFor: ["Families shifting to Lohegaon", "Working professionals", "Owners looking for reliable tenants"],
    parentPath: "/realty",
  },
  {
    category: "realty",
    slug: "resale",
    title: "Resale Properties",
    eyebrow: "Tathastu Infra Realty",
    subtitle: "Practical guidance for resale flats and homes around Pune.",
    intro:
      "Tathastu Infra helps clients compare resale properties with attention to location, pricing, condition, documentation and long-term value.",
    image: realty3,
    imageAlt: "Resale property guidance in Pune by Tathastu Infra",
    icon: Handshake,
    highlights: ["Property condition review", "Price comfort guidance", "Documentation support", "Negotiation assistance"],
    suitedFor: ["Home buyers", "Investors", "Families upgrading homes"],
    parentPath: "/realty",
  },
  {
    category: "realty",
    slug: "projects",
    title: "New Projects",
    eyebrow: "Tathastu Infra Realty",
    subtitle: "New project sales and site visits with local guidance.",
    intro:
      "From first shortlist to site visit and booking discussion, we help buyers understand project options without pressure or confusion.",
    image: realty3,
    imageAlt: "New residential project sales and site visits in Pune",
    icon: Building2,
    highlights: ["Project shortlisting", "Site visits", "Flat configuration guidance", "Booking and next-step support"],
    suitedFor: ["First-time buyers", "Pune investors", "Families exploring 2 BHK and 3 BHK flats"],
    parentPath: "/realty",
  },
  {
    category: "construction",
    slug: "commercial-construction",
    title: "Commercial Construction",
    eyebrow: "Tathastu Infra Construction",
    subtitle: "Offices, shops and commercial structures built with discipline.",
    intro:
      "Our commercial construction approach balances utility, presence, structural reliability and predictable coordination for business spaces.",
    image: construction3,
    imageAlt: "Commercial construction structure by Tathastu Infra",
    icon: Factory,
    highlights: ["Commercial planning", "Vendor coordination", "Site supervision", "Quality and safety checks"],
    suitedFor: ["Offices", "Shops", "Institutes", "Commercial property owners"],
    parentPath: "/construction",
  },
  {
    category: "construction",
    slug: "residential-construction",
    title: "Residential Construction",
    eyebrow: "Tathastu Infra Construction",
    subtitle: "Homes, villas and bungalows shaped around comfort and strength.",
    intro:
      "We manage residential construction with attention to practical budgets, materials, site progress and long-term durability.",
    image: construction2,
    imageAlt: "Residential construction planning by Tathastu Infra",
    icon: Building,
    highlights: ["Home construction", "Material planning", "Site progress tracking", "Final handover support"],
    suitedFor: ["Homes", "Villas", "Bungalows", "Farm house construction"],
    parentPath: "/construction",
  },
  {
    category: "construction",
    slug: "structural-work-rcc",
    title: "Structural Work & RCC",
    eyebrow: "Tathastu Infra Construction",
    subtitle: "Core RCC and structural work with engineering accountability.",
    intro:
      "Structural work is handled with disciplined checks, clear execution sequencing and careful site supervision from foundation to frame.",
    image: construction1,
    imageAlt: "Structural work and RCC construction site",
    icon: Layers3,
    highlights: ["RCC structure", "Foundation coordination", "Safety checks", "Technical supervision"],
    suitedFor: ["Residential structures", "Commercial structures", "RCC repair or extension planning"],
    parentPath: "/construction",
  },
  {
    category: "construction",
    slug: "wtg-government-contracts",
    title: "WTG & Government Contracts",
    eyebrow: "Tathastu Infra Construction",
    subtitle: "Institutional and government-focused execution support.",
    intro:
      "We support documentation-heavy and infrastructure-oriented work with clarity, coordination and disciplined execution control, including WTG foundation base activity and civil work around wind turbine infrastructure.",
    image: wtgGovernmentHero,
    imageAlt: "Government and WTG infrastructure work by Tathastu Infra",
    icon: Landmark,
    highlights: [
      "WTG foundation base civil work",
      "Government contract documentation",
      "Infrastructure execution planning",
      "Site accountability and progress coordination",
    ],
    suitedFor: ["WTG foundation work", "Government contracts", "Institutional projects", "Infrastructure-linked construction"],
    parentPath: "/construction",
    gallery: [
      {
        title: "WTG Foundation Base",
        body:
          "Civil base work for wind turbine projects is coordinated around foundation preparation, reinforcement planning, concrete sequencing and site safety.",
        image: wtgFoundationBase,
        imageAlt: "Wind turbine foundation base civil construction work",
      },
      {
        title: "Turbine Infrastructure Support",
        body:
          "We support execution around wind turbine installation zones with documentation, coordination, access planning and government-compliant work control.",
        image: wtgInstallation,
        imageAlt: "Wind turbine installation and infrastructure execution support",
      },
    ],
  },
  {
    category: "interior",
    slug: "home-interior",
    title: "Home Interior",
    eyebrow: "Tathastu Infra Interior Design",
    subtitle: "Complete home interiors for elegant, useful everyday living.",
    intro:
      "We plan home interiors around lifestyle, storage, finishes, lighting and movement so every room feels personal and practical.",
    image: interior1,
    imageAlt: "Luxury home interior design by Tathastu Infra",
    icon: Home,
    highlights: ["Living room design", "Bedroom design", "Storage planning", "Furniture and decor"],
    suitedFor: ["New homes", "Renovations", "Families upgrading interiors"],
    parentPath: "/interior",
  },
  {
    category: "interior",
    slug: "office-interior",
    title: "Office Interior",
    eyebrow: "Tathastu Infra Interior Design",
    subtitle: "Workspaces shaped around comfort, workflow and brand presence.",
    intro:
      "Office interiors are planned to support productivity, movement, meetings and a polished first impression for visitors and teams.",
    image: interior4,
    imageAlt: "Modern office interior design by Tathastu Infra",
    icon: BriefcaseBusiness,
    highlights: ["Space planning", "Workstation layout", "Lighting and finishes", "Client-facing zones"],
    suitedFor: ["Offices", "Studios", "Consulting spaces", "Small commercial interiors"],
    parentPath: "/interior",
  },
  {
    category: "interior",
    slug: "modular-kitchen",
    title: "Modular Kitchen",
    eyebrow: "Tathastu Infra Interior Design",
    subtitle: "Elegant kitchens planned for workflow, storage and durability.",
    intro:
      "We design modular kitchens with attention to cooking flow, material finish, easy storage, lighting and daily comfort.",
    image: interior3,
    imageAlt: "Premium modular kitchen interior by Tathastu Infra",
    icon: CookingPot,
    highlights: ["Storage planning", "Counter and workflow design", "Material selection", "Lighting and hardware"],
    suitedFor: ["Apartments", "Villas", "Renovations", "New home interiors"],
    parentPath: "/interior",
  },
];

export function getServiceDetail(category: ServiceDetailCategory, slug: string) {
  return serviceDetails.find((detail) => detail.category === category && detail.slug === slug);
}
