import { createFileRoute } from "@tanstack/react-router";
import { ServiceSeoPage } from "@/components/ServiceSeoPage";

const content = {
  mode: "construction",
  eyebrow: "Turnkey Construction in Pune",
  title: "One build path",
  accent: "from plan to handover.",
  subtitle:
    "Tathastu Infra Turnkey Construction helps Pune owners coordinate planning, materials, supervision, site work and final handover with one accountable team.",
  introEyebrow: "Turnkey Delivery",
  introTitle: "Turnkey should mean fewer gaps, not less attention.",
  intro:
    "A turnkey construction route helps owners avoid fragmented responsibility across major phases of a build. Tathastu Infra keeps the site brief, structural work, material planning, coordination and handover connected so decisions stay easier to track.",
  highlights: [
    "Single construction route for multi-phase builds",
    "Clear handoff from planning into execution",
    "Supervision tied to site progress and quality",
    "Final handover focus for residential and commercial work",
  ],
  needsHeading: "Turnkey construction built around accountability.",
  needs: [
    {
      title: "One coordinated scope",
      description:
        "Keep key execution responsibilities connected instead of managing every major site follow-up separately.",
    },
    {
      title: "Decision tracking",
      description:
        "Bring materials, timing and build priorities into a clearer construction conversation.",
    },
    {
      title: "Site quality",
      description:
        "Use supervision and checkpoints to keep workmanship and progress aligned with project intent.",
    },
    {
      title: "Confident handover",
      description:
        "Finish with a review path that looks at the completed space and the promises made upfront.",
    },
  ],
  processEyebrow: "Turnkey Process",
  processTitle: "A more connected construction journey.",
  faqs: [
    {
      question: "What does turnkey construction with Tathastu Infra include?",
      answer:
        "It starts with understanding your project scope and can connect planning, materials, supervision, execution coordination and handover.",
    },
    {
      question: "Is turnkey construction suitable for a home build?",
      answer:
        "Yes. It can suit owners who want one clearer path through major construction phases for a residential project.",
    },
    {
      question: "Can commercial projects discuss turnkey execution too?",
      answer:
        "Yes. Commercial construction requirements can be discussed with scope, timing and site expectations.",
    },
  ],
} as const;

export const Route = createFileRoute("/turnkey-construction-in-pune")({
  head: () => ({
    meta: [
      { title: "Turnkey Construction in Pune | Tathastu Infra Construction" },
      {
        name: "description",
        content:
          "Explore turnkey construction in Pune with Tathastu Infra support for planning, material coordination, site supervision and final handover.",
      },
      { property: "og:title", content: "Turnkey Construction in Pune | Tathastu Infra" },
      {
        property: "og:description",
        content: "One accountable construction path for Pune projects from scope to handover.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://www.tathastuinfra.in/turnkey-construction-in-pune" },
    ],
  }),
  component: () => <ServiceSeoPage content={content} />,
});
