import { createFileRoute } from "@tanstack/react-router";
import { Armchair, BedDouble, BriefcaseBusiness, CookingPot, Lamp, Sofa } from "lucide-react";
import { ServicePage, type ServicePageContent } from "@/components/ServicePage";
import interior3 from "@/assets/interior-3.jpg";

const content: ServicePageContent = {
  eyebrow: "Tathastu Interior Design",
  title: "Interiors",
  accent: "With Soul",
  subtitle: "Elegant, functional interiors in Pune shaped around how you live, work, host and feel inside a space.",
  heroImage: { src: interior3, alt: "Luxury kitchen and interior design by Tathastu in Pune" },
  overviewTitle: "Beautiful interiors should also work beautifully.",
  overview:
    "Tathastu Interior Design brings together space planning, materials, lighting, furniture and decor for homes and offices in Lohegaon, Pune. Every room is designed to feel personal, refined and practical for everyday life.",
  projectCategory: "interior",
  offers: [
    { title: "Modular Kitchen", description: "Elegant kitchens planned for workflow, storage and durability.", icon: CookingPot },
    { title: "Living Room Design", description: "Inviting living areas with balanced furniture, lighting and textures.", icon: Sofa },
    { title: "Bedroom Design", description: "Calm private spaces shaped around comfort and storage.", icon: BedDouble },
    { title: "Office Interiors", description: "Focused workspaces with professionalism, comfort and brand character.", icon: BriefcaseBusiness },
    { title: "Space Planning", description: "Layouts that improve movement, proportion and openness.", icon: Armchair },
    { title: "Furniture & Decor", description: "Curated pieces, lighting and accents that complete the design story.", icon: Lamp },
  ],
};

export const Route = createFileRoute("/interior")({
  head: () => ({
    meta: [
      { title: "Interior Designer in Pune | Tathastu Interiors Lohegaon" },
      { name: "description", content: "Premium interior design in Lohegaon, Pune for modular kitchens, living rooms, bedrooms, office interiors, space planning, furniture and decor." },
    ],
    links: [{ rel: "canonical", href: "https://www.tathastu.in/interior" }],
  }),
  component: () => <ServicePage content={content} />,
});
