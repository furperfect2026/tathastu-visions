export type RealtySearchLink = {
  to: string;
  title: string;
  description: string;
  intent: string;
};

export const realtySearchLinks = [
  {
    to: "/realty",
    title: "Real Estate Company in Lohegaon Pune",
    intent: "Local realty",
    description:
      "Get real estate guidance for flats, resale properties, rentals and plots in Lohegaon.",
  },
  {
    to: "/realty",
    title: "Flats in Lohegaon Pune",
    intent: "Buy flats",
    description: "Shortlist new projects, resale flats and residential options with local guidance.",
  },
  {
    to: "/realty",
    title: "2 BHK Flats in Lohegaon",
    intent: "2 BHK search",
    description: "Compare practical 2 BHK choices around budget, site visits and daily convenience.",
  },
  {
    to: "/realty/new-projects",
    title: "New Projects in Lohegaon Pune",
    intent: "New launches",
    description:
      "Explore new residential projects and site visits around Lohegaon and nearby Pune areas.",
  },
  {
    to: "/realty/resale-properties",
    title: "Resale Flats in Lohegaon",
    intent: "Resale homes",
    description:
      "Compare resale flats and ready homes with documentation and local property guidance.",
  },
  {
    to: "/realty",
    title: "Flats for Rent in Lohegaon",
    intent: "Rental help",
    description: "Get rental assistance for homes near Lohegaon, Pune and nearby work corridors.",
  },
  {
    to: "/realty/rental-assistance",
    title: "2 BHK Flat for Rent in Lohegaon",
    intent: "Rental search",
    description:
      "Find suitable rental homes with owner coordination, visits and clear next steps.",
  },
  {
    to: "/realty",
    title: "Plots for Sale in Lohegaon",
    intent: "Plot guidance",
    description: "Explore land and plot guidance with checks, visits and documentation support.",
  },
] satisfies RealtySearchLink[];
