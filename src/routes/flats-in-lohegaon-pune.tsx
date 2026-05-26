import { createFileRoute } from "@tanstack/react-router";
import { RealtySeoPage } from "@/components/RealtySeoPage";

const content = {
  eyebrow: "Flats in Lohegaon Pune",
  title: "Find flats in",
  accent: "Lohegaon with clarity.",
  subtitle:
    "Tathastu Infra Realty helps buyers explore residential flats, new projects and resale options in Lohegaon, Pune with local site visit and documentation guidance.",
  introTitle: "A flat search should match life after the booking.",
  intro:
    "Lohegaon attracts property seekers who want access to Pune growth corridors while keeping an eye on budget, connectivity, project quality and day-to-day comfort. Tathastu Infra helps clients compare flat options with context, not just photographs, so the shortlist is easier to trust before the next visit.",
  highlights: [
    "Support for new project and resale flat searches",
    "1 BHK, 2 BHK and larger home requirements",
    "Site visits around Lohegaon and nearby Pune pockets",
    "Guidance for practical questions before documentation",
  ],
  needs: [
    {
      title: "New projects and resale flats",
      description:
        "Compare the tradeoffs between upcoming residential inventory and ready or resale property options based on timing, finish and comfort.",
    },
    {
      title: "Budget and locality fit",
      description:
        "Shape the search around price comfort, travel patterns, nearby conveniences and the kind of residential environment you want.",
    },
    {
      title: "Site visit readiness",
      description:
        "Know what to notice during a visit, from usable space and surroundings to questions about handover and society expectations.",
    },
    {
      title: "Decision support",
      description:
        "Move ahead with a clearer shortlist, coordinated follow-ups and documentation support for the property path you choose.",
    },
  ],
  faqs: [
    {
      question: "Can Tathastu Infra help me search for flats in Lohegaon Pune?",
      answer:
        "Yes. Tathastu Infra Realty supports buyers looking for flats, residential projects and resale property options in Lohegaon and nearby Pune areas.",
    },
    {
      question: "Do you help with flat site visits?",
      answer:
        "Yes. We help coordinate site visits so buyers can compare spaces, surroundings and practical questions before deciding.",
    },
    {
      question: "Can I ask about 1 BHK, 2 BHK or larger homes?",
      answer:
        "Yes. Share your preferred layout, budget and timeline and the Realty team can guide the search toward suitable flat options.",
    },
  ],
};

export const Route = createFileRoute("/flats-in-lohegaon-pune")({
  head: () => ({
    meta: [
      { title: "Flats in Lohegaon Pune | Property Guidance | Tathastu Infra Realty" },
      {
        name: "description",
        content:
          "Explore flats in Lohegaon Pune with Tathastu Infra Realty support for new projects, resale properties, site visits and documentation guidance.",
      },
      { property: "og:title", content: "Flats in Lohegaon Pune | Tathastu Infra Realty" },
      {
        property: "og:description",
        content: "Local property guidance for flat buyers exploring Lohegaon and nearby Pune areas.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.tathastuinfra.in/flats-in-lohegaon-pune" }],
  }),
  component: () => <RealtySeoPage content={content} />,
});
