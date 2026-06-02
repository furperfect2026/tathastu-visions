export type ServiceSearchLink = {
  to: string;
  title: string;
  description: string;
  intent: string;
};

export const constructionSearchLinks = [
  {
    to: "/construction",
    title: "Construction Company in Pune",
    intent: "Pune builders",
    description:
      "Work with Tathastu Infra for residential, commercial and turnkey construction in Pune.",
  },
  {
    to: "/construction",
    title: "Construction Company in Lohegaon",
    intent: "Local construction",
    description: "Explore residential and commercial construction support near Lohegaon, Pune.",
  },
  {
    to: "/construction",
    title: "House Construction in Pune",
    intent: "Home building",
    description: "Plan a home build around structure, materials, supervision and finish quality.",
  },
  {
    to: "/construction/residential-construction",
    title: "Residential Construction in Lohegaon",
    intent: "Homes & villas",
    description:
      "Build homes, villas and bungalows near Lohegaon with material clarity and site supervision.",
  },
  {
    to: "/construction/commercial-construction",
    title: "Commercial Construction in Pune",
    intent: "Business spaces",
    description:
      "Plan offices, shops and commercial spaces with disciplined execution and timelines.",
  },
  {
    to: "/construction",
    title: "Home Construction Cost in Pune",
    intent: "Cost planning",
    description: "Understand the decisions that shape budget, package fit and project scope.",
  },
  {
    to: "/construction",
    title: "Turnkey Construction in Pune",
    intent: "Turnkey delivery",
    description: "Move from consultation to handover with one accountable construction path.",
  },
  {
    to: "/construction/structural-work-rcc",
    title: "RCC Contractor in Pune",
    intent: "Structural work",
    description:
      "Coordinate RCC, civil structure work and site checks with Tathastu Infra Construction.",
  },
] satisfies ServiceSearchLink[];

export const interiorSearchLinks = [
  {
    to: "/interior",
    title: "Interior Designer in Pune",
    intent: "Pune interiors",
    description:
      "Design home interiors, office interiors and modular kitchens with a premium Pune studio.",
  },
  {
    to: "/interior",
    title: "Interior Designer in Lohegaon",
    intent: "Local interiors",
    description: "Design homes and workspaces in Lohegaon with practical luxury and clarity.",
  },
  {
    to: "/interior",
    title: "Home Interior Design in Pune",
    intent: "Home interiors",
    description: "Shape living rooms, bedrooms, storage and materials around everyday life.",
  },
  {
    to: "/interior/home-interior",
    title: "Home Interior Designer in Lohegaon",
    intent: "Local homes",
    description:
      "Plan full home interiors around layouts, storage, finishes, lighting and decor.",
  },
  {
    to: "/interior",
    title: "Modular Kitchen in Pune",
    intent: "Kitchen planning",
    description: "Plan workflow, storage, finishes and durability for a refined kitchen.",
  },
  {
    to: "/interior/modular-kitchen",
    title: "Modular Kitchen in Lohegaon",
    intent: "Kitchen interiors",
    description:
      "Create practical, elegant kitchen designs for apartments, villas and renovations.",
  },
  {
    to: "/interior",
    title: "Office Interior Design in Pune",
    intent: "Office interiors",
    description: "Create functional office interiors that support focus, flow and presence.",
  },
] satisfies ServiceSearchLink[];
