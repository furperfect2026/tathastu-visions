import { createFileRoute } from "@tanstack/react-router";
import { Building2, CalendarCheck, Handshake } from "lucide-react";
import { ServicePage, type ServicePageContent } from "@/components/ServicePage";
import realty3 from "@/assets/realty-3.jpg";
import realty4 from "@/assets/realty-4.jpg";

const content: ServicePageContent = {
  eyebrow: "Tathastu Infra Realty",
  title: "If You Can Dream It,",
  accent: "Tathastu Can Build It.",
  subtitle:
    "Premium real estate and property guidance in Lohegaon, Pune for clients exploring homes, flats, resale properties and rentals with a clean process.",
  heroImages: [
    { src: realty3, alt: "Modern apartment project for Tathastu Infra Realty clients" },
    { src: realty4, alt: "Residential property guidance and site visits in Pune" },
  ],
  overviewTitle: "Real estate decisions deserve calm expertise.",
  overview:
    "Tathastu Infra Realty is a local real estate and property consultant in Lohegaon, Pune, supporting buyers, sellers, investors and tenants with a trusted, end-to-end approach. From shortlisting residential properties, flats and new projects to site visits, documentation and handover, we help clients make decisions with clarity, confidence and long-term value in mind.",
  projectCategory: "realty",
  offers: [
    {
      title: "Rental",
      description:
        "Rental flats and homes in Lohegaon and nearby Pune areas with clear owner and tenant coordination.",
      icon: CalendarCheck,
      image: { src: realty4, alt: "Rental assistance for homes and flats in Pune" },
      href: "/realty/rental",
    },
    {
      title: "Resale",
      description:
        "Resale flats and properties reviewed around location, condition, price comfort and documentation readiness.",
      icon: Handshake,
      image: { src: realty3, alt: "Resale property guidance by Tathastu Infra Realty" },
      href: "/realty/resale",
    },
    {
      title: "Projects",
      description:
        "New residential projects, site visits and flat shortlisting support for buyers and investors.",
      icon: Building2,
      image: { src: realty3, alt: "New residential project sales in Lohegaon Pune" },
      href: "/realty/projects",
    },
  ],
};

export const Route = createFileRoute("/realty")({
  head: () => ({
    meta: [
      { title: "Real Estate & Properties in Lohegaon, Pune | Tathastu Infra Realty" },
      {
        name: "description",
        content:
          "Tathastu Infra Realty offers real estate consulting, property buying, flats, resale properties, rentals, site visits and documentation support in Lohegaon, Pune.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.tathastuinfra.in/realty" }],
  }),
  component: () => <ServicePage content={content} />,
});
