import { createFileRoute } from "@tanstack/react-router";
import { BriefcaseBusiness, CookingPot, Home, Sofa } from "lucide-react";
import { ServicePage, type ServicePageContent } from "@/components/ServicePage";
import interior1 from "@/assets/interior-1.jpg";
import interior2 from "@/assets/interior-2.jpg";
import interior3 from "@/assets/interior-3.jpg";
import interior4 from "@/assets/interior-4.jpg";
import project5 from "@/assets/project-5.jpg";

const content: ServicePageContent = {
  eyebrow: "Tathastu Infra Interior Design",
  title: "Interiors",
  accent: "With Soul",
  subtitle:
    "Elegant, functional interiors in Pune shaped around how you live, work, host and feel inside a space.",
  heroImages: [
    { src: interior3, alt: "Luxury kitchen and interior design by Tathastu Infra in Pune" },
    { src: interior1, alt: "Premium living room interior by Tathastu Infra" },
    { src: interior2, alt: "Elegant bedroom interior design in Pune" },
    { src: interior4, alt: "Modern office interior planning by Tathastu Infra" },
    { src: project5, alt: "Featured Tathastu Infra interior design project" },
  ],
  overviewTitle: "Beautiful interiors should also work beautifully.",
  overview:
    "Tathastu Infra Interior Design brings together space planning, materials, lighting, furniture and decor for homes and offices in Lohegaon, Pune. Every room is designed to feel personal, refined and practical for everyday life.",
  projectCategory: "interior",
  offers: [
    {
      title: "Home Interior",
      description:
        "Complete home interiors for living rooms, bedrooms, storage, finishes and decor.",
      icon: Home,
      image: { src: interior1, alt: "Luxury home interior design by Tathastu Infra" },
    },
    {
      title: "Office Interior",
      description:
        "Professional office interiors shaped around workflow, comfort and brand presence.",
      icon: BriefcaseBusiness,
      image: { src: interior4, alt: "Modern office interior design by Tathastu Infra" },
    },
    {
      title: "Modular Kitchen",
      description: "Elegant kitchens planned for workflow, storage, finish quality and durability.",
      icon: CookingPot,
      image: { src: interior3, alt: "Premium modular kitchen interior by Tathastu Infra" },
    },
    {
      title: "Living & Bedroom",
      description: "Calm, useful rooms with balanced furniture, lighting, textures and storage.",
      icon: Sofa,
      image: { src: interior2, alt: "Elegant bedroom and living interior design in Pune" },
    },
  ],
};

export const Route = createFileRoute("/interior")({
  head: () => ({
    meta: [
      { title: "Interior Designer in Pune | Tathastu Infra Interiors Lohegaon" },
      {
        name: "description",
        content:
          "Premium interior design in Lohegaon, Pune for modular kitchens, living rooms, bedrooms, office interiors, space planning, furniture and decor.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.tathastuinfra.in/interior" }],
  }),
  component: () => <ServicePage content={content} />,
});
