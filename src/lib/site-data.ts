import realty1 from "@/assets/realty-1.jpg";
import realty2 from "@/assets/realty-2.jpg";
import realty3 from "@/assets/realty-3.jpg";
import realty4 from "@/assets/realty-4.jpg";
import construction1 from "@/assets/construction-1.jpg";
import construction2 from "@/assets/construction-2.jpg";
import construction3 from "@/assets/construction-3.jpg";
import construction4 from "@/assets/construction-4.jpg";
import interior1 from "@/assets/interior-1.jpg";
import interior2 from "@/assets/interior-2.jpg";
import interior3 from "@/assets/interior-3.jpg";
import interior4 from "@/assets/interior-4.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";
import { Building2, HardHat, Sofa } from "lucide-react";

export const pillars = [
  {
    key: "realty",
    title: "Realty",
    icon: Building2,
    blurb:
      "Premium real estate solutions designed to offer comfort, convenience and long-term value.",
    capabilities: [
      "Modern apartments & 2BHK launches",
      "Luxury residential projects",
      "Land aggregation & advisory",
      "Long-term client trust",
    ],
    images: [
      { src: realty1, alt: "Tathastu apartment facade at golden hour" },
      { src: realty2, alt: "Tathastu high-rise residential tower" },
      { src: realty3, alt: "Landscaped Tathastu residential courtyard" },
      { src: realty4, alt: "Elegant Tathastu residence at dusk" },
    ],
  },
  {
    key: "construction",
    title: "Construction",
    icon: HardHat,
    blurb: "High-fidelity engineering and structural integrity, on schedule and on safety.",
    capabilities: [
      "Structural engineering",
      "Strict safety protocols",
      "Quality material sourcing",
      "Timely project delivery",
    ],
    images: [
      { src: construction1, alt: "Tathastu modern construction site" },
      { src: construction2, alt: "Tathastu engineer with blueprints" },
      { src: construction3, alt: "Tathastu structural framework at sunset" },
      { src: construction4, alt: "Tathastu concrete craftsmanship" },
    ],
  },
  {
    key: "interior",
    title: "Interior Design",
    icon: Sofa,
    blurb: "Creative, functional spaces crafted to reflect each client's lifestyle.",
    capabilities: [
      "Bespoke spatial planning",
      "Furniture & lighting curation",
      "Material & finish palettes",
      "Turn-key interior delivery",
    ],
    images: [
      { src: interior1, alt: "Warm modern living room interior" },
      { src: interior2, alt: "Calm bedroom interior with wood accents" },
      { src: interior3, alt: "Designer kitchen with marble island" },
      { src: interior4, alt: "Elegant dining room with chandelier" },
    ],
  },
] as const;

export const stats = [
  { label: "Years of Experience", value: 10, suffix: "+" },
  { label: "Projects Completed", value: 50, suffix: "+" },
  { label: "Happy Clients", value: 30, suffix: "+" },
  { label: "Awards Won", value: 5, suffix: "" },
];

export const projects = [
  { id: "p1", category: "realty", title: "Aurelia Heights", location: "Lohegaon", year: 2024, image: project1, blurb: "An aerial-view masterplan blending greenery and modern apartments." },
  { id: "p2", category: "interior", title: "Villa Solène", location: "Pune Outskirts", year: 2024, image: project2, blurb: "Pool-side villa with infinity edge and palm-lined dusk lighting." },
  { id: "p3", category: "construction", title: "The Pavilion", location: "Kharadi", year: 2023, image: project3, blurb: "Boutique commercial corner with classic stone facade." },
  { id: "p4", category: "interior", title: "Skyline Penthouse", location: "Magarpatta", year: 2024, image: project4, blurb: "Floor-to-ceiling glass and editorial furniture." },
  { id: "p5", category: "interior", title: "Marble Sanctuary", location: "Koregaon Park", year: 2023, image: project5, blurb: "Spa-grade bath retreat with copper fixtures." },
  { id: "p6", category: "realty", title: "Coral Residences", location: "Wagholi", year: 2025, image: project6, blurb: "Palm-lined contemporary apartments." },
] as const;
