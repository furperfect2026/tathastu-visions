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
import constructionProject1 from "@/assets/project-construction-1.jpg";
import constructionProject2 from "@/assets/project-construction-2.jpg";
import constructionProject3 from "@/assets/project-construction-3.jpg";
import interiorProject1 from "@/assets/project-interior-1.jpg";
import interiorProject2 from "@/assets/project-interior-2.jpg";
import interiorProject3 from "@/assets/project-interior-3.jpg";
import interiorProject4 from "@/assets/project-interior-4.jpg";
import realtyProject1 from "@/assets/project-realty-pride-world-city.jpg";
import realtyProject2 from "@/assets/project-realty-utsava-regency.jpg";
import { Building2, HardHat, Sofa } from "lucide-react";

export const pillars = [
  {
    key: "realty",
    title: "Realty",
    icon: Building2,
    blurb:
      "Premium real estate and property solutions in Pune designed to offer comfort, convenience and long-term value.",
    capabilities: [
      "Modern apartments, flats & 2BHK launches in Pune",
      "Luxury residential properties in Lohegaon",
      "Land, plot & property advisory",
      "Long-term client trust",
    ],
    images: [
      { src: realty3, alt: "Landscaped Tathastu Infra residential courtyard in Pune" },
      { src: realty4, alt: "Elegant Tathastu Infra residence in Pune at dusk" },
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
      "Timely project delivery across Pune",
    ],
    images: [
      { src: construction1, alt: "Tathastu Infra modern construction site in Pune" },
      { src: construction2, alt: "Tathastu Infra engineer with blueprints" },
      { src: construction3, alt: "Tathastu Infra structural framework in Lohegaon at sunset" },
      { src: construction4, alt: "Tathastu Infra concrete craftsmanship" },
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
      "Turn-key interior delivery in Pune",
    ],
    images: [
      { src: interior1, alt: "Warm modern living room interior in Pune" },
      { src: interior2, alt: "Calm bedroom interior with wood accents in Pune" },
      { src: interior3, alt: "Designer kitchen with marble island in Lohegaon" },
      { src: interior4, alt: "Elegant dining room with chandelier" },
    ],
  },
] as const;

export const stats = [
  { label: "Years of Experience", value: 8, suffix: "+" },
  { label: "Projects Completed", value: 50, suffix: "+" },
  { label: "Happy Clients", value: 30, suffix: "+" },
  { label: "Awards Won", value: 5, suffix: "" },
];

export const projects = [
  {
    id: "p1",
    category: "realty",
    title: "Pride World City",
    location: "Lohegaon, Pune",
    year: 2024,
    image: realtyProject2,
    blurb: "Premium residential community guidance for buyers exploring Lohegaon and nearby Pune growth corridors.",
  },
  {
    id: "p2",
    category: "realty",
    title: "Utsava Regency",
    location: "Wagholi, Pune",
    year: 2025,
    image: realtyProject1,
    blurb: "Modern apartment options with practical site-visit, documentation and buying support.",
  },
  {
    id: "p3",
    category: "construction",
    title: "Construction 1",
    location: "Lohegaon, Pune",
    year: 2025,
    image: constructionProject1,
    blurb: "Residential structure planned around durability, supervision and clear project timelines.",
  },
  {
    id: "p4",
    category: "construction",
    title: "Construction 2",
    location: "Pune",
    year: 2024,
    image: constructionProject2,
    blurb: "Civil execution with site accountability, material planning and coordinated handover.",
  },
  {
    id: "p5",
    category: "construction",
    title: "Construction 3",
    location: "Pune",
    year: 2023,
    image: constructionProject3,
    blurb: "Structural work for multi-storey development with engineering-first execution discipline.",
  },
  {
    id: "p6",
    category: "interior",
    title: "Interior 1",
    location: "Lohegaon, Pune",
    year: 2024,
    image: interiorProject1,
    blurb: "Warm, premium interiors shaped around comfort, storage and everyday usability.",
  },
  {
    id: "p7",
    category: "interior",
    title: "Interior 2",
    location: "Pune",
    year: 2024,
    image: interiorProject2,
    blurb: "Functional living spaces with calm palettes, lighting and practical furniture flow.",
  },
  {
    id: "p8",
    category: "interior",
    title: "Interior 3",
    location: "Pune",
    year: 2023,
    image: interiorProject3,
    blurb: "Refined interior detailing with elegant finishes and a high-end residential mood.",
  },
  {
    id: "p9",
    category: "interior",
    title: "Interior 4",
    location: "Pune",
    year: 2023,
    image: interiorProject4,
    blurb: "Modern interior planning for polished rooms, decor and long-term liveability.",
  },
] as const;
