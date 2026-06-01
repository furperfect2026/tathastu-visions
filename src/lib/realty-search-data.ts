export type RealtySearchLink = {
  to: string;
  title: string;
  description: string;
  intent: string;
};

export const realtySearchLinks = [
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
    to: "/realty",
    title: "Flats for Rent in Lohegaon",
    intent: "Rental help",
    description: "Get rental assistance for homes near Lohegaon, Pune and nearby work corridors.",
  },
  {
    to: "/realty",
    title: "Plots for Sale in Lohegaon",
    intent: "Plot guidance",
    description: "Explore land and plot guidance with checks, visits and documentation support.",
  },
] satisfies RealtySearchLink[];
