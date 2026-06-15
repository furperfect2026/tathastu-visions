import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const faqs = [
  // Realty & Real Estate
  {
    question: "What realty and property consultant services does Tathastu Infra provide in Lohegaon, Pune?",
    answer:
      "Tathastu Infra acts as a trusted local property consultant, supporting clients with real estate guidance, property buying, and end-to-end documentation in Lohegaon, Pune and surrounding areas.",
  },
  {
    question: "Can Tathastu Realty help me buy flats, 2 BHK apartments, or plots in Lohegaon, Pune?",
    answer:
      "Yes. We help buyers discover the best flats for sale, new residential projects, practical 2 BHK flats, and investment plots in Lohegaon by comparing locations, budgets, and long-term value.",
  },
  {
    question: "Do you assist with finding flats for rent or resale properties in Pune?",
    answer:
      "Yes. Tathastu Realty supports both tenants and owners with 2 BHK and 3 BHK flat rentals, resale properties searches, owner coordination, and planning suitable site visits in Pune.",
  },

  // Construction
  {
    question: "What types of residential home construction do you handle in Pune & Lohegaon?",
    answer:
      "Tathastu Construction is a leading home construction company in Pune, handling complete residential projects including bungalows, villas, and farmhouses with dedicated site supervision.",
  },
  {
    question: "Are you a civil construction company for commercial, industrial, and government projects?",
    answer:
      "Yes. We handle commercial building work, warehouse and industrial construction, as well as WTG foundation base activities, roads, and government contracts with strict progress control.",
  },
  {
    question: "Why is Tathastu considered among the best construction companies in Pune?",
    answer:
      "Clients trust Tathastu Construction for our clear estimates, stage-wise site supervision, strict quality checks, transparent communication, and dedication to money safety.",
  },
  {
    question: "Do you provide turnkey construction and RCC structural work in Pune?",
    answer:
      "Yes. Our engineering team expertly handles RCC structure, foundation coordination, and full turnkey construction—managing planning, materials, and handover in one accountable process.",
  },
  {
    question: "What construction packages do you offer?",
    answer:
      "We offer transparent Basic, Standard, and Premium construction packages, allowing clients to choose exact inclusions based on their project scope and desired finish expectations.",
  },
  {
    question: "How does Tathastu Infra ensure construction quality and money safety?",
    answer:
      "We protect clients' money safety through clear budget guidance before work begins. Quality is guaranteed via strict material planning, technical supervision, and regular stage reviews.",
  },

  // Interior Design
  {
    question: "Are you a top interior designer providing services in Pune and Lohegaon?",
    answer:
      "Yes. Tathastu Interior serves clients looking for premium interior designers in Pune and Lohegaon, offering end-to-end space planning, furniture, and decor guidance.",
  },
  {
    question: "Can Tathastu Interior design full home interiors for 2 BHK and 3 BHK flats in Pune?",
    answer:
      "Yes. We plan complete full home interiors for 2 BHK and 3 BHK spaces—coordinating layouts, storage, custom furniture, lighting, and finishes room by room.",
  },
  {
    question: "Do you design modular kitchens and custom wardrobes in Pune?",
    answer:
      "Yes. Our designers create highly practical modular kitchens, wardrobes, and storage units built around your daily workflow, using durable materials and premium finishes.",
  },
  {
    question: "Does Tathastu Interior create professional office interiors?",
    answer:
      "Yes. We design and execute office interiors that are focused on workflow efficiency, ergonomic comfort, intelligent lighting, and a strong professional brand feel.",
  },

  // General 
  {
    question: "Which locations and areas do you serve around Pune?",
    answer:
      "We primarily serve Lohegaon, Pune and nearby major growth corridors including Kharadi, Wagholi, Viman Nagar, and surrounding real estate hubs.",
  },
  {
    question: "How can I contact Tathastu Infra for my project?",
    answer:
      "You can call us at +91 78208 64384, use the contact form on our website, reach out via WhatsApp, or visit the Tathastu Infra office directly in Lohegaon, Pune.",
  },
] as const;

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export function SeoFaqSection() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Questions People Ask</p>
          <h2 className="mt-3 font-display text-3xl font-medium leading-tight sm:text-4xl md:text-5xl">
            Helpful answers about Tathastu Infra.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            Realty, construction and interior guidance for Lohegaon, Pune, written in the same
            language people search for.
          </p>
        </Reveal>

        <div className="mt-10 divide-y divide-border rounded-3xl border border-border bg-card px-4 shadow-luxe sm:px-6">
          {faqs.map((faq, index) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left">
                <span className="font-display text-lg font-semibold leading-snug text-ink sm:text-xl">
                  {index + 1}. {faq.question}
                </span>
                <ChevronDown className="mt-1 h-5 w-5 flex-none text-primary transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="mt-4 max-w-4xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
