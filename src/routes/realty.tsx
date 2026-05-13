import { createFileRoute } from "@tanstack/react-router";
import { Building2, CalendarCheck, FileCheck2, Handshake, Home, MapPinned } from "lucide-react";
import { ServicePage, type ServicePageContent } from "@/components/ServicePage";
import realty1 from "@/assets/realty-1.jpg";
import realty2 from "@/assets/realty-2.jpg";
import realty3 from "@/assets/realty-3.jpg";
import realty4 from "@/assets/realty-4.jpg";
import project1 from "@/assets/project-1.jpg";

const content: ServicePageContent = {
  eyebrow: "Tathastu Realty",
  title: "Realty",
  accent: "With Clarity",
  subtitle: "Premium real estate and property guidance in Lohegaon, Pune for clients exploring homes, flats, resale properties and rentals with a clean process.",
  heroImages: [
    { src: realty1, alt: "Premium residential property by Tathastu in Pune" },
    { src: realty2, alt: "Luxury real estate elevation in Lohegaon Pune" },
    { src: realty3, alt: "Modern apartment project for Tathastu Realty clients" },
    { src: realty4, alt: "Residential property guidance and site visits in Pune" },
    { src: project1, alt: "Featured Tathastu Realty project in Pune" },
  ],
  overviewTitle: "Real estate decisions deserve calm expertise.",
  overview:
    "Tathastu Realty is a local real estate and property consultant in Lohegaon, Pune, supporting buyers, sellers, investors and tenants with a trusted, end-to-end approach. From shortlisting residential properties, flats and new projects to site visits, documentation and handover, we help clients make decisions with clarity, confidence and long-term value in mind.",
  projectCategory: "realty",
  offers: [
    { title: "Property Buying Assistance", description: "Curated property shortlists for flats, homes and residential real estate based on lifestyle, budget, location and future value.", icon: Home, image: { src: realty1, alt: "Premium property buying assistance in Pune" } },
    { title: "New Project Sales", description: "Launch and inventory support for premium residential developments and new properties in Pune.", icon: Building2, image: { src: realty2, alt: "New residential project sales in Lohegaon Pune" } },
    { title: "Resale Properties", description: "Practical resale property guidance around condition, pricing, location and suitability.", icon: Handshake, image: { src: realty3, alt: "Resale property guidance by Tathastu Realty" } },
    { title: "Rental Assistance", description: "Smooth rental property and leasing support for owners and tenants with clear expectations.", icon: CalendarCheck, image: { src: realty4, alt: "Rental assistance for homes and flats in Pune" } },
    { title: "Site Visits", description: "Coordinated visits that help clients compare spaces with confidence.", icon: MapPinned, image: { src: project1, alt: "Real estate site visit with Tathastu Realty" } },
    { title: "Documentation Support", description: "Guidance through paperwork, checks and handover requirements.", icon: FileCheck2, image: { src: realty2, alt: "Real estate documentation support in Pune" } },
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
