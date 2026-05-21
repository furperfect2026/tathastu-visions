import { createFileRoute } from "@tanstack/react-router";
import { ServiceSeoPage } from "@/components/ServiceSeoPage";

const content = {
  mode: "construction",
  eyebrow: "Construction Company in Lohegaon Pune",
  title: "Build in Lohegaon",
  accent: "with disciplined execution.",
  subtitle:
    "Tathastu Construction supports residential and commercial construction in Lohegaon, Pune with structure, supervision, material planning and clear handover.",
  introEyebrow: "Local Construction Partner",
  introTitle: "A construction team should understand the site and the stakes.",
  intro:
    "Owners searching for a construction company in Lohegaon need more than labour coordination. They need design intent translated into structural decisions, quality materials, daily site discipline and communication that keeps the project moving with confidence.",
  highlights: [
    "Residential and commercial construction support in Pune",
    "Material planning and site supervision",
    "Structural work with practical quality checks",
    "Turnkey path from consultation to final handover",
  ],
  needsHeading: "Construction support that holds the project together.",
  needs: [
    {
      title: "Residential builds",
      description:
        "Plan homes around structural strength, comfort, finish quality and the practical sequence of site execution.",
    },
    {
      title: "Commercial spaces",
      description:
        "Coordinate construction work for functional business spaces with clarity around scope and progress.",
    },
    {
      title: "Site supervision",
      description:
        "Keep attention on materials, workmanship, vendor coordination and decisions that affect quality.",
    },
    {
      title: "Turnkey accountability",
      description:
        "Bring major construction steps under one guided process instead of disconnected follow-ups.",
    },
  ],
  processEyebrow: "Construction Process",
  processTitle: "From Lohegaon site brief to stronger handover.",
  faqs: [
    {
      question: "Does Tathastu handle construction projects in Lohegaon Pune?",
      answer:
        "Yes. Tathastu Construction works with residential and commercial project requirements in Lohegaon and nearby Pune areas.",
    },
    {
      question: "Can you help with both materials and supervision?",
      answer:
        "Yes. Material planning, site supervision and execution coordination are part of the construction support path.",
    },
    {
      question: "Can I discuss a turnkey construction requirement?",
      answer:
        "Yes. Share your site, scope and timeline and the team can discuss a turnkey route for your project.",
    },
  ],
} as const;

export const Route = createFileRoute("/construction-company-in-lohegaon-pune")({
  head: () => ({
    meta: [
      { title: "Construction Company in Lohegaon Pune | Tathastu Construction" },
      {
        name: "description",
        content:
          "Choose Tathastu for construction in Lohegaon Pune with residential, commercial, structural, material planning and site supervision support.",
      },
      { property: "og:title", content: "Construction Company in Lohegaon Pune | Tathastu" },
      {
        property: "og:description",
        content: "Construction guidance and supervised execution for Lohegaon and Pune projects.",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://www.tathastuinfra.in/construction-company-in-lohegaon-pune",
      },
    ],
  }),
  component: () => <ServiceSeoPage content={content} />,
});
