import { createFileRoute } from "@tanstack/react-router";
import { ServiceSeoPage } from "@/components/ServiceSeoPage";

const content = {
  mode: "interior",
  eyebrow: "Office Interior Design in Pune",
  title: "Design an office",
  accent: "with presence and flow.",
  subtitle:
    "Tathastu Office Interiors helps Pune workspaces balance layout, function, materials, furniture and a polished client-facing feel.",
  introEyebrow: "Office Interiors",
  introTitle: "A workspace should support work before it tries to impress.",
  intro:
    "Office interior design needs a clear view of movement, teams, storage, client moments and brand tone. Tathastu helps Pune businesses shape workspaces that feel organized, refined and appropriate for how the office operates.",
  highlights: [
    "Office space planning and furniture direction",
    "Material palettes suited to business use",
    "Client-facing presence with practical circulation",
    "Functional interior decisions for Pune workspaces",
  ],
  needsHeading: "Office interiors that balance clarity and character.",
  needs: [
    {
      title: "Workplace flow",
      description:
        "Plan movement, work zones and interaction points so the office is easier to use every day.",
    },
    {
      title: "Furniture fit",
      description:
        "Choose proportions and layouts that support teams without crowding the workspace.",
    },
    {
      title: "Material presence",
      description:
        "Use finishes and details that feel professional, durable and aligned with the business tone.",
    },
    {
      title: "Visitor impression",
      description: "Treat reception and client-facing areas as part of the operational experience.",
    },
  ],
  processEyebrow: "Office Interior Process",
  processTitle: "A workspace design path with function at the center.",
  faqs: [
    {
      question: "Does Tathastu provide office interior design in Pune?",
      answer:
        "Yes. Tathastu can discuss office interior needs including layout, furniture direction, materials and functional design priorities.",
    },
    {
      question: "Can office interiors still look premium?",
      answer:
        "Yes. A refined office can balance visual presence with workflow, durability and daily use.",
    },
    {
      question: "Can I discuss a small office space?",
      answer:
        "Yes. Share the office size, business needs and timeline so the team can understand the right scope.",
    },
  ],
} as const;

export const Route = createFileRoute("/office-interior-design-in-pune")({
  head: () => ({
    meta: [
      { title: "Office Interior Design in Pune | Tathastu Interiors" },
      {
        name: "description",
        content:
          "Explore office interior design in Pune with Tathastu support for workspace layout, furniture, materials and polished functional interiors.",
      },
      { property: "og:title", content: "Office Interior Design in Pune | Tathastu" },
      {
        property: "og:description",
        content: "Refined office interior guidance for functional Pune workspaces.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://www.tathastuinfra.in/office-interior-design-in-pune" },
    ],
  }),
  component: () => <ServiceSeoPage content={content} />,
});
