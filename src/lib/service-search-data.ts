export type ServiceSearchLink = {
  to: string;
  title: string;
  description: string;
  intent: string;
};

export const constructionSearchLinks = [
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
] satisfies ServiceSearchLink[];

export const interiorSearchLinks = [
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
    to: "/interior",
    title: "Modular Kitchen in Pune",
    intent: "Kitchen planning",
    description: "Plan workflow, storage, finishes and durability for a refined kitchen.",
  },
  {
    to: "/interior",
    title: "Office Interior Design in Pune",
    intent: "Office interiors",
    description: "Create functional office interiors that support focus, flow and presence.",
  },
] satisfies ServiceSearchLink[];
