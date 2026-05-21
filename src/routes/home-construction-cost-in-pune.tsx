import { createFileRoute } from "@tanstack/react-router";
import { ServiceSeoPage } from "@/components/ServiceSeoPage";

const content = {
  mode: "construction",
  eyebrow: "Home Construction Cost in Pune",
  title: "Estimate the build",
  accent: "before it drifts.",
  subtitle:
    "Tathastu helps Pune homeowners understand the scope, materials, package choices and execution decisions that shape home construction cost.",
  introEyebrow: "Cost Planning",
  introTitle: "A useful estimate begins with the right project questions.",
  intro:
    "Construction cost is shaped by more than square footage. Site conditions, structural scope, material grade, finish expectations, supervision and delivery model all matter. Tathastu helps owners frame those decisions early before discussing the next construction step.",
  highlights: [
    "Package conversations tied to project scope",
    "Material and finish expectations made visible",
    "Residential build decisions reviewed early",
    "Quote path connected to site and timeline context",
  ],
  needsHeading: "Understand what changes a construction estimate.",
  needs: [
    {
      title: "Project scope",
      description:
        "Clarify home type, area, site readiness and whether the requirement is structural, finishing or turnkey.",
    },
    {
      title: "Material level",
      description:
        "Compare choices that affect strength, finish quality, maintenance comfort and budget confidence.",
    },
    {
      title: "Execution support",
      description:
        "Account for supervision, coordination and handover expectations instead of seeing price alone.",
    },
    {
      title: "Next-step quote",
      description:
        "Move from broad estimate questions into a project-specific consultation with better inputs.",
    },
  ],
  processEyebrow: "Estimate Process",
  processTitle: "A clearer cost conversation before construction begins.",
  faqs: [
    {
      question: "Can Tathastu help estimate home construction cost in Pune?",
      answer:
        "Yes. The team can discuss your site, scope, material expectations and package fit before guiding a project-specific quote path.",
    },
    {
      question: "Is construction cost the same for every home size?",
      answer:
        "No. Cost varies with scope, structure, materials, finishes, site conditions and the level of execution support needed.",
    },
    {
      question: "Where do I share details for a quote?",
      answer:
        "Use the contact form with your construction enquiry and share site, area, timeline and expectations.",
    },
  ],
} as const;

export const Route = createFileRoute("/home-construction-cost-in-pune")({
  head: () => ({
    meta: [
      { title: "Home Construction Cost in Pune | Quote Guidance | Tathastu" },
      {
        name: "description",
        content:
          "Understand home construction cost in Pune with Tathastu guidance on scope, material choices, packages and project-specific quote planning.",
      },
      { property: "og:title", content: "Home Construction Cost in Pune | Tathastu" },
      {
        property: "og:description",
        content: "Construction estimate guidance shaped by scope, materials and execution choices.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://www.tathastuinfra.in/home-construction-cost-in-pune" },
    ],
  }),
  component: () => <ServiceSeoPage content={content} />,
});
