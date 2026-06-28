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
import interior4 from "@/assets/interior-4.png";
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
  { label: "Projects Completed", value: 150, suffix: "+" },
  { label: "Happy Clients", value: 120, suffix: "+" },
  { label: "Awards Won", value: 5, suffix: "" },
];

export const projects = [
  {
    id: "p1",
    category: "realty",
    title: "Pride World City",
    location: "Charholi, Pune East",
    year: 2024,
    image: realtyProject1,
    blurb: "Premium residential community guidance for buyers exploring Lohegaon and nearby Pune growth corridors.",
    priceLabel: "₹ 69.99 L Onwards",
  },
  {
    id: "p2",
    category: "realty",
    title: "Ashiana Villa",
    location: "Wagholi, Pune",
    year: 2025,
    image: realtyProject2,
    blurb: "Modern villa with landscaped garden, glass balconies and premium finishes in a sought-after Pune neighbourhood.",
    priceLabel: "Site visit available",
  },
  {
    id: "p3",
    category: "realty",
    title: "Vishrantwadi Villa",
    location: "Vishrantwadi, Pune",
    year: 2024,
    image: realty4,
    blurb: "Ultra-luxury independent villa with private pool, stone cladding, lush tropical landscaping and premium indoor-outdoor living.",
    priceLabel: "Price on request",
  },
  {
    id: "p4",
    category: "realty",
    title: "Sai Residency",
    location: "Dhanori, Pune",
    year: 2023,
    image: realty2,
    blurb: "Well-planned residential building in Dhanori with spacious flats, comfortable balconies and easy access to Pune airport.",
    priceLabel: "Price on request",
  },
  {
    id: "p5",
    category: "construction",
    title: "Residential Complex, Lohegaon",
    location: "Lohegaon, Pune",
    year: 2025,
    image: constructionProject1,
    blurb: "Residential structure built around durability, supervision and clear project timelines.",
  },
  {
    id: "p6",
    category: "construction",
    title: "Structural Work, Kharadi",
    location: "Kharadi, Pune",
    year: 2024,
    image: constructionProject2,
    blurb: "Civil execution with site accountability, material planning and coordinated handover.",
  },
  {
    id: "p7",
    category: "construction",
    title: "EON Venture Tower",
    location: "Kharadi, Pune",
    year: 2023,
    image: constructionProject3,
    blurb: "Premium commercial glass-facade tower in Kharadi IT corridor, executed with precision and structural integrity.",
  },
  {
    id: "p8",
    category: "interior",
    title: "Modern Living Room",
    location: "Lohegaon, Pune",
    year: 2024,
    image: interiorProject1,
    blurb: "Warm, premium interiors shaped around comfort, storage and everyday usability.",
  },
  {
    id: "p9",
    category: "interior",
    title: "Luxury 2BHK Interiors",
    location: "Pune",
    year: 2024,
    image: interiorProject2,
    blurb: "Functional living spaces with calm palettes, lighting and practical furniture flow.",
  },
  {
    id: "p10",
    category: "interior",
    title: "Open Plan Dining & Kitchen",
    location: "Pune",
    year: 2023,
    image: interiorProject3,
    blurb: "Refined interior detailing with elegant finishes and a high-end residential mood.",
  },
  {
    id: "p11",
    category: "interior",
    title: "Contemporary Bedroom Suite",
    location: "Pune",
    year: 2023,
    image: interiorProject4,
    blurb: "Modern interior planning for polished rooms, decor and long-term liveability.",
  },
] as const;
