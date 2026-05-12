import { createFileRoute } from "@tanstack/react-router";
import { Building, ClipboardList, Factory, HardHat, Layers3, Ruler } from "lucide-react";
import { ServicePage, type ServicePageContent } from "@/components/ServicePage";
import construction3 from "@/assets/construction-3.jpg";

const content: ServicePageContent = {
  eyebrow: "Tathastu Construction",
  title: "Construction",
  accent: "With Integrity",
  subtitle: "Residential and commercial construction in Pune shaped by structure, safety, material discipline and reliable supervision.",
  heroImage: { src: construction3, alt: "Tathastu construction site in Pune" },
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
