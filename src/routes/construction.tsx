import { createFileRoute } from "@tanstack/react-router";
import { Building, ClipboardList, Factory, HardHat, Layers3, Ruler } from "lucide-react";
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
  subtitle: "Residential and commercial construction in Pune shaped by structure, safety, material discipline and reliable supervision.",
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
    { title: "Residential Construction", description: "Homes planned and built around durability, comfort and refined living.", icon: Building },
    { title: "Commercial Construction", description: "Functional commercial spaces built for performance and presence.", icon: Factory },
    { title: "Structural Work", description: "Core civil and structural execution with technical discipline.", icon: Layers3 },
    { title: "Material Planning", description: "Material choices balanced around strength, finish, cost and availability.", icon: ClipboardList },
    { title: "Site Supervision", description: "Progress tracking, vendor coordination and regular quality checks.", icon: HardHat },
    { title: "Turnkey Execution", description: "One accountable team from planning through final completion.", icon: Ruler },
  ],
};

export const Route = createFileRoute("/construction")({
  head: () => ({
    meta: [
      { title: "Tathastu Construction Pune | Residential & Commercial Construction" },
      { name: "description", content: "Residential construction, commercial construction, structural work, material planning, supervision and turnkey execution in Lohegaon, Pune." },
    ],
    links: [{ rel: "canonical", href: "https://www.tathastu.in/construction" }],
  }),
  component: () => <ServicePage content={content} />,
});
