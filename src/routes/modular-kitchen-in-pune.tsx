import { createFileRoute } from "@tanstack/react-router";
import { ServiceSeoPage } from "@/components/ServiceSeoPage";

const content = {
  mode: "interior",
  eyebrow: "Modular Kitchen in Pune",
  title: "Plan the kitchen",
  accent: "around daily rhythm.",
  subtitle:
    "Tathastu helps Pune homeowners design modular kitchens around workflow, storage, material finish, lighting and durability.",
  introEyebrow: "Kitchen Interiors",
  introTitle: "The best kitchen feels effortless long after the reveal.",
  intro:
    "A modular kitchen is a high-use interior, so the design must work as hard as it looks. Tathastu helps frame storage zones, circulation, finishes, appliance considerations and visual warmth for kitchens that feel refined and useful every day.",
  highlights: [
    "Workflow and storage planning for kitchens",
    "Finish direction tied to durability and care",
    "Lighting, layout and usable counter decisions",
    "Kitchen design connected to the wider home",
  ],
  needsHeading: "Kitchen choices that deserve better planning.",
  needs: [
    {
      title: "Workflow zones",
      description:
        "Arrange prep, cooking, cleaning and storage around the way the kitchen will actually be used.",
    },
    {
      title: "Storage logic",
      description:
        "Use cabinets, access and proportions to reduce clutter without making the room feel heavy.",
    },
    {
      title: "Finish durability",
      description:
        "Choose surfaces and details that support the look, maintenance comfort and long-term use.",
    },
    {
      title: "Design fit",
      description:
        "Make the kitchen feel aligned with the larger home interior instead of visually isolated.",
    },
  ],
  processEyebrow: "Kitchen Process",
  processTitle: "A refined modular kitchen starts with the right brief.",
  faqs: [
    {
      question: "Can Tathastu help with modular kitchen design in Pune?",
      answer:
        "Yes. The interiors team can discuss kitchen layouts, storage needs, finishes and related execution planning.",
    },
    {
      question: "Do you consider storage and workflow?",
      answer:
        "Yes. Daily movement, storage access, work zones and finish choices are central kitchen design questions.",
    },
    {
      question: "Can a modular kitchen match my home interior style?",
      answer:
        "Yes. The kitchen can be planned to connect with your wider home palette and practical needs.",
    },
  ],
} as const;

export const Route = createFileRoute("/modular-kitchen-in-pune")({
  head: () => ({
    meta: [
      { title: "Modular Kitchen in Pune | Kitchen Interior Design | Tathastu" },
      {
        name: "description",
        content:
          "Plan a modular kitchen in Pune with Tathastu guidance for storage, workflow, durable finishes, lighting and refined home interiors.",
      },
      { property: "og:title", content: "Modular Kitchen in Pune | Tathastu Interiors" },
      {
        property: "og:description",
        content: "Kitchen interior design guidance for workflow, storage and premium finishes.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.tathastuinfra.in/modular-kitchen-in-pune" }],
  }),
  component: () => <ServiceSeoPage content={content} />,
});
