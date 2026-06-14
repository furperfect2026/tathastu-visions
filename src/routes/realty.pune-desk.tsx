import { createFileRoute } from "@tanstack/react-router";
import { PuneDeskPortal } from "@/components/PuneDeskPortal";

export const Route = createFileRoute("/realty/pune-desk")({
  head: () => ({
    meta: [
      { title: "Pune Desk | Exclusive Real Estate Investment Opportunities" },
      {
        name: "description",
        content:
          "Discover exclusive real estate and property investment opportunities in Pune with Tathastu Infra's Pune Desk. Explore market performance, top properties, and high-yield investments.",
      },
      {
        name: "keywords",
        content:
          "Pune real estate, Pune property investment, buy flats in Pune, invest in Pune, Tathastu Infra Pune Desk, high rental yields Pune, residential projects in Pune",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.tathastuinfra.in/realty/pune-desk" }],
  }),
  component: PuneDeskRoute,
});

function PuneDeskRoute() {
  return <PuneDeskPortal />;
}
