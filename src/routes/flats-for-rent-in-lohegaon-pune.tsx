import { createFileRoute } from "@tanstack/react-router";
import { RealtySeoPage } from "@/components/RealtySeoPage";

const content = {
  eyebrow: "Flats for Rent in Lohegaon",
  title: "Rent a flat with",
  accent: "better local guidance.",
  subtitle:
    "Tathastu Infra Realty helps tenants and owners with rental flat searches, expectations, site visits and property coordination in Lohegaon Pune.",
  introTitle: "Rental decisions still deserve a careful shortlist.",
  intro:
    "A rental search in Lohegaon can move quickly, but the right choice still depends on commute, society comfort, usable space, move-in timing and clear expectations between owner and tenant. Tathastu Infra helps make rental property conversations more organized before you spend time visiting unsuitable options.",
  highlights: [
    "Rental assistance for flats and homes in Lohegaon",
    "Support for owner and tenant requirements",
    "Location, visit and move-in expectation discussion",
    "Clearer coordination before the next step",
  ],
  needs: [
    {
      title: "Tenant brief",
      description:
        "Define budget, occupancy, preferred move-in date, furnishing needs and the location conveniences that matter most.",
    },
    {
      title: "Owner expectations",
      description:
        "Organize property details, tenant fit questions and practical discussion before visits and follow-ups.",
    },
    {
      title: "Visit planning",
      description:
        "Reduce wasted visits by checking suitability and clarifying priority questions early in the rental process.",
    },
    {
      title: "Rental next steps",
      description:
        "Move forward with clearer communication around documentation, handover expectations and property coordination.",
    },
  ],
  faqs: [
    {
      question: "Can Tathastu Infra help me find flats for rent in Lohegaon Pune?",
      answer:
        "Yes. Tathastu Infra Realty offers rental assistance for tenants exploring flats and homes in Lohegaon and nearby Pune areas.",
    },
    {
      question: "Do you work with property owners too?",
      answer:
        "Yes. Owners can share rental property details and expectations so the conversation with suitable tenants is more focused.",
    },
    {
      question: "What information helps for a rental flat search?",
      answer:
        "Share budget, move-in date, family or occupancy needs, furnishing preference and preferred access to work or daily conveniences.",
    },
  ],
};

export const Route = createFileRoute("/flats-for-rent-in-lohegaon-pune")({
  head: () => ({
    meta: [
      { title: "Flats for Rent in Lohegaon Pune | Rental Assistance | Tathastu Infra" },
      {
        name: "description",
        content:
          "Find flats for rent in Lohegaon Pune with Tathastu Infra Realty rental assistance for tenant searches, owner coordination and site visit guidance.",
      },
      { property: "og:title", content: "Flats for Rent in Lohegaon Pune | Tathastu Infra Realty" },
      {
        property: "og:description",
        content: "Rental property guidance for Lohegaon tenants and owners from Tathastu Infra Realty.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.tathastuinfra.in/flats-for-rent-in-lohegaon-pune" }],
  }),
  component: () => <RealtySeoPage content={content} />,
});
