import { createFileRoute } from "@tanstack/react-router";
import { ServiceSeoPage } from "@/components/ServiceSeoPage";

const content = {
  mode: "interior",
  eyebrow: "Interior Designer in Lohegaon Pune",
  title: "Design in Lohegaon",
  accent: "with refined function.",
  subtitle:
    "Tathastu Infra Interiors helps Lohegaon and Pune clients shape homes and workspaces with space planning, material care, furniture and decor.",
  introEyebrow: "Local Interior Design",
  introTitle: "Luxury feels better when the room works beautifully.",
  intro:
    "An interior designer in Lohegaon should understand how Pune homes and workspaces are actually used. Tathastu Infra brings visual direction together with storage, circulation, finishes, lighting and comfort so interiors feel composed and livable.",
  highlights: [
    "Home and office interior design in Pune",
    "Living room, bedroom and kitchen planning",
    "Material, furniture and decor coordination",
    "Space planning shaped around daily use",
  ],
  needsHeading: "Interior guidance for the rooms people live in.",
  needs: [
    {
      title: "Space planning",
      description:
        "Build the layout around movement, storage, natural light and the habits your space needs to support.",
    },
    {
      title: "Material direction",
      description:
        "Choose finishes and textures that balance luxury, maintenance comfort and visual calm.",
    },
    {
      title: "Furniture and decor",
      description:
        "Coordinate pieces, proportions and details so the space feels intentional rather than crowded.",
    },
    {
      title: "Execution clarity",
      description:
        "Keep the design language connected to practical interior decisions through completion.",
    },
  ],
  processEyebrow: "Interior Process",
  processTitle: "From room brief to a more finished life inside it.",
  faqs: [
    {
      question: "Does Tathastu Infra provide interior design in Lohegaon Pune?",
      answer:
        "Yes. Tathastu Infra supports interior design requirements for homes and offices in Lohegaon and nearby Pune areas.",
    },
    {
      question: "Can you help with both layout and decor?",
      answer:
        "Yes. Interior support can include space planning, finishes, furniture direction and decor coordination.",
    },
    {
      question: "Can I ask for a site discussion before starting interiors?",
      answer:
        "Yes. Share your space type, location and timeline so the team can guide the next step.",
    },
  ],
} as const;

export const Route = createFileRoute("/interior-designer-in-lohegaon-pune")({
  head: () => ({
    meta: [
      { title: "Interior Designer in Lohegaon Pune | Tathastu Infra Interiors" },
      {
        name: "description",
        content:
          "Choose Tathastu Infra for interior design in Lohegaon Pune with home interiors, office interiors, space planning, furniture and decor support.",
      },
      { property: "og:title", content: "Interior Designer in Lohegaon Pune | Tathastu Infra" },
      {
        property: "og:description",
        content: "Refined home and office interior design for Lohegaon and Pune clients.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://www.tathastuinfra.in/interior-designer-in-lohegaon-pune" },
    ],
  }),
  component: () => <ServiceSeoPage content={content} />,
});
