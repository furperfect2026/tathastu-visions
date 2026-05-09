import { createFileRoute } from "@tanstack/react-router";
import { Building2, CalendarCheck, FileCheck2, Handshake, Home, MapPinned } from "lucide-react";
import { ServicePage, type ServicePageContent } from "@/components/ServicePage";
import realty1 from "@/assets/realty-1.jpg";

const content: ServicePageContent = {
  eyebrow: "Tathastu Realty",
  title: "Realty",
  accent: "With Clarity",
  subtitle: "Premium property guidance for clients who want the right space, the right value and a clean process.",
  heroImage: { src: realty1, alt: "Premium residential property by Tathastu" },
  overviewTitle: "Real estate decisions deserve calm expertise.",
  overview:
    "Tathastu Realty supports buyers, sellers, investors and tenants with a trusted, end-to-end approach. From shortlisting and site visits to documentation and handover, we help clients make decisions with clarity, confidence and long-term value in mind.",
  projectCategory: "realty",
  offers: [
    { title: "Property Buying Assistance", description: "Curated property shortlists based on lifestyle, budget, location and future value.", icon: Home },
    { title: "New Project Sales", description: "Launch and inventory support for premium residential developments.", icon: Building2 },
    { title: "Resale Properties", description: "Practical resale guidance around condition, pricing and suitability.", icon: Handshake },
    { title: "Rental Assistance", description: "Smooth leasing support for owners and tenants with clear expectations.", icon: CalendarCheck },
    { title: "Site Visits", description: "Coordinated visits that help clients compare spaces with confidence.", icon: MapPinned },
    { title: "Documentation Support", description: "Guidance through paperwork, checks and handover requirements.", icon: FileCheck2 },
  ],
};

export const Route = createFileRoute("/realty")({
  head: () => ({
    meta: [
      { title: "Tathastu Realty — Property Buying, Sales & Rentals" },
      { name: "description", content: "Premium property buying, sales, resale, rental, site visit and documentation support from Tathastu Realty." },
    ],
  }),
  component: () => <ServicePage content={content} />,
});
