import { createFileRoute } from "@tanstack/react-router";
import { Building2, CalendarCheck, FileCheck2, Handshake, Home, MapPinned } from "lucide-react";
import { ServicePage, type ServicePageContent } from "@/components/ServicePage";
import realty1 from "@/assets/realty-1.jpg";

const content: ServicePageContent = {
  eyebrow: "Tathastu Realty",
  title: "Realty",
  accent: "With Clarity",
  subtitle: "Premium real estate and property guidance in Lohegaon, Pune for clients exploring homes, flats, resale properties and rentals with a clean process.",
  heroImage: { src: realty1, alt: "Premium residential property by Tathastu in Pune" },
  overviewTitle: "Real estate decisions deserve calm expertise.",
  overview:
    "Tathastu Realty is a local real estate and property consultant in Lohegaon, Pune, supporting buyers, sellers, investors and tenants with a trusted, end-to-end approach. From shortlisting residential properties, flats and new projects to site visits, documentation and handover, we help clients make decisions with clarity, confidence and long-term value in mind.",
  projectCategory: "realty",
  offers: [
    { title: "Property Buying Assistance", description: "Curated property shortlists for flats, homes and residential real estate based on lifestyle, budget, location and future value.", icon: Home },
    { title: "New Project Sales", description: "Launch and inventory support for premium residential developments and new properties in Pune.", icon: Building2 },
    { title: "Resale Properties", description: "Practical resale property guidance around condition, pricing, location and suitability.", icon: Handshake },
    { title: "Rental Assistance", description: "Smooth rental property and leasing support for owners and tenants with clear expectations.", icon: CalendarCheck },
    { title: "Site Visits", description: "Coordinated visits that help clients compare spaces with confidence.", icon: MapPinned },
    { title: "Documentation Support", description: "Guidance through paperwork, checks and handover requirements.", icon: FileCheck2 },
  ],
};

export const Route = createFileRoute("/realty")({
  head: () => ({
    meta: [
      { title: "Real Estate & Properties in Lohegaon, Pune | Tathastu Realty" },
      { name: "description", content: "Tathastu Realty offers real estate consulting, property buying, flats, resale properties, rentals, site visits and documentation support in Lohegaon, Pune." },
    ],
    links: [{ rel: "canonical", href: "https://www.tathastu.in/realty" }],
  }),
  component: () => <ServicePage content={content} />,
});
