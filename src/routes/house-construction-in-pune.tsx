import { createFileRoute } from "@tanstack/react-router";
import { ServiceSeoPage } from "@/components/ServiceSeoPage";

const content = {
  mode: "construction",
  eyebrow: "House Construction in Pune",
  title: "Build your home",
  accent: "with a stronger plan.",
  subtitle:
    "For house construction in Pune, Tathastu brings planning, structural execution, material discipline and site coordination into one clear build journey.",
  introEyebrow: "Home Construction",
  introTitle: "A dream home needs engineering calm behind the beauty.",
  intro:
    "House construction carries emotional decisions and technical ones at the same time. Tathastu helps owners align layout intent, structure, materials, workmanship and site progress so a Pune home build feels considered from foundation to finish.",
  highlights: [
    "Residential construction for homes and villas",
    "Scope clarity before site execution",
    "Material and finish decisions linked to durability",
    "Regular supervision for build quality and progress",
  ],
  needsHeading: "The home build questions worth solving early.",
  needs: [
    {
      title: "Structure before styling",
      description:
        "Translate drawings and expectations into the build decisions that protect strength and long-term comfort.",
    },
    {
      title: "Material choices",
      description:
        "Balance availability, finish, performance and budget before choices begin to slow the site.",
    },
    {
      title: "Execution sequence",
      description:
        "Coordinate phases and dependencies so the home takes shape with fewer avoidable surprises.",
    },
    {
      title: "Handover readiness",
      description: "Review the project as a finished home, not only as completed site activity.",
    },
  ],
  processEyebrow: "Home Build Process",
  processTitle: "A home construction path with fewer loose ends.",
  faqs: [
    {
      question: "Does Tathastu take house construction projects in Pune?",
      answer:
        "Yes. Tathastu supports residential construction requirements in Pune including planning, execution and supervision conversations.",
    },
    {
      question: "Can you help if I already have drawings?",
      answer:
        "Yes. Existing drawings can be reviewed with the site scope, material planning and execution route in mind.",
    },
    {
      question: "Can I ask for a construction package discussion?",
      answer:
        "Yes. Share your project details through the contact form so the team can guide the right package and next step.",
    },
  ],
} as const;

export const Route = createFileRoute("/house-construction-in-pune")({
  head: () => ({
    meta: [
      { title: "House Construction in Pune | Home Building | Tathastu" },
      {
        name: "description",
        content:
          "Plan house construction in Pune with Tathastu support for structural work, material planning, site supervision and turnkey execution.",
      },
      { property: "og:title", content: "House Construction in Pune | Tathastu Construction" },
      {
        property: "og:description",
        content:
          "Residential construction guidance for homes built with clarity and quality in Pune.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.tathastuinfra.in/house-construction-in-pune" }],
  }),
  component: () => <ServiceSeoPage content={content} />,
});
