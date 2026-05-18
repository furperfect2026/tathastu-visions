import { createFileRoute } from "@tanstack/react-router";
import { Armchair, BedDouble, BriefcaseBusiness, CookingPot, Lamp, Sofa } from "lucide-react";
import { ServicePage, type ServicePageContent } from "@/components/ServicePage";
import interior1 from "@/assets/interior-1.jpg";
import interior2 from "@/assets/interior-2.jpg";
import interior3 from "@/assets/interior-3.jpg";
import interior4 from "@/assets/interior-4.jpg";
import project5 from "@/assets/project-5.jpg";

const content: ServicePageContent = {
  eyebrow: "Tathastu Interior Design",
  title: "Interiors",
  accent: "With Soul",
  subtitle: "Elegant, functional interiors in Pune shaped around how you live, work, host and feel inside a space.",
  heroImages: [
    { src: interior3, alt: "Luxury kitchen and interior design by Tathastu in Pune" },
    { src: interior1, alt: "Premium living room interior by Tathastu" },
    { src: interior2, alt: "Elegant bedroom interior design in Pune" },
    { src: interior4, alt: "Modern office interior planning by Tathastu" },
    { src: project5, alt: "Featured Tathastu interior design project" },
  ],
  overviewTitle: "Beautiful interiors should also work beautifully.",
  overview:
    "Tathastu Interior Design brings together space planning, materials, lighting, furniture and decor for homes and offices in Lohegaon, Pune. Every room is designed to feel personal, refined and practical for everyday life.",
  projectCategory: "interior",
  offers: [
    { title: "Modular Kitchen", description: "Elegant kitchens planned for workflow, storage and durability.", icon: CookingPot, image: { src: interior3, alt: "Premium modular kitchen interior by Tathastu" } },
    { title: "Living Room Design", description: "Inviting living areas with balanced furniture, lighting and textures.", icon: Sofa, image: { src: interior1, alt: "Luxury living room design by Tathastu" } },
    { title: "Bedroom Design", description: "Calm private spaces shaped around comfort and storage.", icon: BedDouble, image: { src: interior2, alt: "Elegant bedroom interior design in Pune" } },
    { title: "Office Interiors", description: "Focused workspaces with professionalism, comfort and brand character.", icon: BriefcaseBusiness, image: { src: interior4, alt: "Modern office interior design by Tathastu" } },
    { title: "Space Planning", description: "Layouts that improve movement, proportion and openness.", icon: Armchair, image: { src: project5, alt: "Interior space planning for refined homes" } },
    { title: "Furniture & Decor", description: "Curated pieces, lighting and accents that complete the design story.", icon: Lamp, image: { src: interior1, alt: "Furniture and decor selection for premium interiors" } },
  ],
};

export const Route = createFileRoute("/interior")({
  head: () => ({
    meta: [
      { title: "Interior Designer in Pune | Tathastu Interiors Lohegaon" },
      { name: "description", content: "Premium interior design in Lohegaon, Pune for modular kitchens, living rooms, bedrooms, office interiors, space planning, furniture and decor." },
    ],
    links: [{ rel: "canonical", href: "https://www.tathastuinfra.in/interior" }],
  }),
  component: () => <ServicePage content={content} />,
});
