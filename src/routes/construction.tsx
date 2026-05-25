import { createFileRoute } from "@tanstack/react-router";
import { Building, Factory, Landmark, Layers3 } from "lucide-react";
import { ServicePage, type ServicePageContent } from "@/components/ServicePage";
import construction1 from "@/assets/construction-1.jpg";
import construction2 from "@/assets/construction-2.jpg";
import construction3 from "@/assets/construction-3.jpg";
import construction4 from "@/assets/construction-4.jpg";
import heroInfra1 from "@/assets/hero-infra-1.jpg";

const content: ServicePageContent = {
  eyebrow: "Tathastu Construction",
  title: "Construction",
  accent: "With Integrity",
  subtitle:
    "Residential and commercial construction in Pune shaped by structure, safety, material discipline and reliable supervision.",
  heroImages: [
    { src: heroInfra1, alt: "Tathastu infrastructure construction site in Pune" },
    { src: construction3, alt: "Tathastu construction site in Pune" },
    { src: construction1, alt: "Civil construction and scaffolding by Tathastu" },
    { src: construction2, alt: "Residential construction work in progress" },
    { src: construction4, alt: "Structural construction execution and supervision" },
  ],
  overviewTitle: "Strong spaces begin with strong systems.",
  overview:
    "Tathastu Construction handles homes and commercial projects in Lohegaon, Pune with engineering focus and site accountability. We coordinate structural work, material planning, supervision and turnkey delivery so every project moves forward with quality, clarity and control.",
  projectCategory: "construction",
  offers: [
    {
      title: "Commercial Construction",
      description:
        "Offices, shops and commercial structures planned around quality, transparency and on-time delivery.",
      icon: Factory,
      image: { src: construction3, alt: "Commercial construction structure by Tathastu" },
    },
    {
      title: "Residential Construction",
      description:
        "Homes, villas and bungalows built with money safety, material clarity and reliable supervision.",
      icon: Building,
      image: { src: construction2, alt: "Residential home construction planning by Tathastu" },
    },
    {
      title: "Structural Work & RCC",
      description:
        "Core RCC and civil structure work with disciplined engineering, safety checks and assurance.",
      icon: Layers3,
      image: { src: construction1, alt: "Structural work and RCC construction site" },
    },
    {
      title: "WTG & Government Contracts",
      description:
        "Government, institutional and infrastructure-focused contracts handled with documentation and execution control.",
      icon: Landmark,
      image: { src: construction4, alt: "Infrastructure and government construction planning" },
    },
  ],
};

export const Route = createFileRoute("/construction")({
  head: () => ({
    meta: [
      { title: "Tathastu Construction Pune | Residential & Commercial Construction" },
      {
        name: "description",
        content:
          "Residential construction, commercial construction, structural work, material planning, supervision and turnkey execution in Lohegaon, Pune.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.tathastuinfra.in/construction" }],
  }),
  component: () => <ServicePage content={content} />,
});
