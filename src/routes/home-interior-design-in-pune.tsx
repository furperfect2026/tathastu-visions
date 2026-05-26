import { createFileRoute } from "@tanstack/react-router";
import { ServiceSeoPage } from "@/components/ServiceSeoPage";

const content = {
  mode: "interior",
  eyebrow: "Home Interior Design in Pune",
  title: "Shape a home",
  accent: "that feels truly yours.",
  subtitle:
    "Tathastu Infra Home Interiors blends living rooms, bedrooms, kitchens, storage, finishes and decor into elegant Pune spaces.",
  introEyebrow: "Home Interiors",
  introTitle: "A home interior should carry beauty into everyday routines.",
  intro:
    "Home interior design is strongest when room-by-room decisions still feel part of one story. Tathastu Infra helps Pune homeowners connect layouts, palettes, furniture, lighting and functional details across spaces with a refined residential point of view.",
  highlights: [
    "Living room and bedroom design direction",
    "Kitchen, storage and space planning conversations",
    "Material palettes for refined residential interiors",
    "Furniture and decor choices shaped to the home",
  ],
  needsHeading: "A calmer way to make home interior decisions.",
  needs: [
    {
      title: "Room priorities",
      description:
        "Understand what each room must solve before selecting finishes, furniture and feature moments.",
    },
    {
      title: "Visual continuity",
      description:
        "Connect colors, materials and proportions so the home feels composed across spaces.",
    },
    {
      title: "Everyday comfort",
      description:
        "Protect storage, circulation, maintenance and usability while keeping the aesthetic premium.",
    },
    {
      title: "Execution follow-through",
      description: "Move from design intent toward details that can be completed with confidence.",
    },
  ],
  processEyebrow: "Home Interior Process",
  processTitle: "Design decisions that make the whole home feel settled.",
  faqs: [
    {
      question: "Does Tathastu Infra design full home interiors in Pune?",
      answer:
        "Yes. Tathastu Infra can discuss interior requirements across living rooms, bedrooms, kitchens and related residential spaces.",
    },
    {
      question: "Can the design be premium but practical?",
      answer:
        "Yes. The approach balances visual elegance with storage, circulation, materials and daily comfort.",
    },
    {
      question: "Can I start with only a few rooms?",
      answer:
        "Yes. Share the rooms and scope you want to begin with and the team can guide a suitable next step.",
    },
  ],
} as const;

export const Route = createFileRoute("/home-interior-design-in-pune")({
  head: () => ({
    meta: [
      { title: "Home Interior Design in Pune | Tathastu Infra Interiors" },
      {
        name: "description",
        content:
          "Explore home interior design in Pune with Tathastu Infra support for living rooms, bedrooms, kitchens, materials, furniture and decor.",
      },
      { property: "og:title", content: "Home Interior Design in Pune | Tathastu Infra" },
      {
        property: "og:description",
        content: "Premium home interior design guidance for elegant, functional Pune spaces.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://www.tathastuinfra.in/home-interior-design-in-pune" },
    ],
  }),
  component: () => <ServiceSeoPage content={content} />,
});
