import { createFileRoute } from "@tanstack/react-router";
import { RealtySeoPage } from "@/components/RealtySeoPage";

const content = {
  eyebrow: "Plots for Sale in Lohegaon",
  title: "Explore plots with",
  accent: "grounded checks.",
  subtitle:
    "Tathastu Realty supports plot and land seekers in Lohegaon Pune with local guidance, site visits, comparisons and documentation conversations.",
  introTitle: "Plot choices need site context, not only a pin drop.",
  intro:
    "People searching for plots in Lohegaon often need help understanding suitability, access, surrounding development, future use and the paperwork questions to raise early. Tathastu brings property guidance and construction awareness together so plot discussions stay practical from the first visit.",
  highlights: [
    "Plot and land search guidance around Lohegaon",
    "Site context and intended-use conversations",
    "Visits and comparison support for property seekers",
    "Documentation questions before a serious decision",
  ],
  needs: [
    {
      title: "Purpose and size",
      description:
        "Shape the search around whether the plot is for a home, investment conversation or a future construction plan.",
    },
    {
      title: "Access and surroundings",
      description:
        "Discuss roads, nearby development, location comfort and practical site observations during the visit.",
    },
    {
      title: "Land questions early",
      description:
        "Bring clarity to the checks and documentation conversations that matter before you move ahead.",
    },
    {
      title: "Construction readiness",
      description:
        "Connect realty guidance with the next planning questions if the land is intended for a future built space.",
    },
  ],
  faqs: [
    {
      question: "Does Tathastu help with plots for sale in Lohegaon Pune?",
      answer:
        "Yes. Tathastu Realty supports plot and land seekers with local guidance, site visits, comparison questions and next-step coordination.",
    },
    {
      question: "Can I discuss a plot for future home construction?",
      answer:
        "Yes. Tathastu can help connect the property conversation with practical construction planning questions for your intended use.",
    },
    {
      question: "Why is a site visit important for a plot?",
      answer:
        "A visit helps you understand access, surroundings, suitability and the questions to raise before taking the plot discussion further.",
    },
  ],
};

export const Route = createFileRoute("/plots-for-sale-in-lohegaon-pune")({
  head: () => ({
    meta: [
      { title: "Plots for Sale in Lohegaon Pune | Land Guidance | Tathastu Realty" },
      {
        name: "description",
        content:
          "Explore plots for sale in Lohegaon Pune with Tathastu Realty guidance for land searches, site visits, comparisons and documentation questions.",
      },
      { property: "og:title", content: "Plots for Sale in Lohegaon Pune | Tathastu Realty" },
      {
        property: "og:description",
        content: "Land and plot guidance for Lohegaon property seekers from Tathastu Realty.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.tathastuinfra.in/plots-for-sale-in-lohegaon-pune" }],
  }),
  component: () => <RealtySeoPage content={content} />,
});
