import { createFileRoute } from "@tanstack/react-router";
import { RealtySeoPage } from "@/components/RealtySeoPage";

const content = {
  eyebrow: "2 BHK Flats in Lohegaon",
  title: "Search for a",
  accent: "2 BHK that fits.",
  subtitle:
    "Explore 2 BHK flats in Lohegaon Pune with Tathastu Infra Realty support for shortlisting, visits, project comparisons and confident next steps.",
  introTitle: "A 2 BHK search needs more than a floor-plan label.",
  intro:
    "For many homebuyers, a 2 BHK is the balance point between budget, usable space and long-term comfort. Tathastu Infra helps you compare Lohegaon options around layout practicality, daily travel, project stage, site visit observations and the questions that matter before a serious property decision.",
  highlights: [
    "2 BHK search guidance for end users and investors",
    "Comparisons across flat layout, timing and locality fit",
    "New project and resale property discussion",
    "Site visit and follow-up coordination in Lohegaon",
  ],
  needs: [
    {
      title: "Layout comfort",
      description:
        "Look beyond the BHK count to understand room proportions, circulation, storage potential and how the home may feel every day.",
    },
    {
      title: "Project comparison",
      description:
        "Discuss location, stage, building environment and decision factors across relevant 2 BHK flat options.",
    },
    {
      title: "Buyer timeline",
      description:
        "Keep the search aligned with your move-in plan, investment horizon or family decision window.",
    },
    {
      title: "Checks before commitment",
      description:
        "Bring the right questions to the site visit and get help navigating next-step documentation and coordination.",
    },
  ],
  faqs: [
    {
      question: "Does Tathastu Infra help with 2 BHK flats in Lohegaon Pune?",
      answer:
        "Yes. Tathastu Infra Realty helps buyers explore 2 BHK flat options, project comparisons, site visits and next-step coordination in Lohegaon.",
    },
    {
      question: "Can you help compare a new project and a resale 2 BHK?",
      answer:
        "Yes. We can discuss differences in timing, condition, location fit and buyer expectations before you shortlist a property path.",
    },
    {
      question: "What should I share before asking for 2 BHK options?",
      answer:
        "Share your budget comfort, preferred move-in timeline, purpose, locality preference and any non-negotiables such as parking or travel needs.",
    },
  ],
};

export const Route = createFileRoute("/2-bhk-flats-in-lohegaon-pune")({
  head: () => ({
    meta: [
      { title: "2 BHK Flats in Lohegaon Pune | Tathastu Infra Realty" },
      {
        name: "description",
        content:
          "Search 2 BHK flats in Lohegaon Pune with Tathastu Infra Realty guidance for shortlisting, site visits, project comparisons and documentation support.",
      },
      { property: "og:title", content: "2 BHK Flats in Lohegaon Pune | Tathastu Infra Realty" },
      {
        property: "og:description",
        content: "Local guidance for buyers exploring 2 BHK flat options in Lohegaon and Pune.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.tathastuinfra.in/2-bhk-flats-in-lohegaon-pune" }],
  }),
  component: () => <RealtySeoPage content={content} />,
});
