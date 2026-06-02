import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const faqs = [
  {
    question: "What does Tathastu Infra do in Lohegaon, Pune?",
    answer:
      "Tathastu Infra supports clients with real estate guidance, construction services and interior design in Lohegaon, Pune and nearby areas.",
  },
  {
    question: "Can Tathastu Infra help me find flats in Lohegaon Pune?",
    answer:
      "Yes. Our realty team helps buyers shortlist flats, resale properties and new residential projects around Lohegaon and nearby Pune locations.",
  },
  {
    question: "Do you assist with 2 BHK flats in Lohegaon?",
    answer:
      "Yes. We help clients compare practical 2 BHK options based on location, budget, site visits, documentation and long-term value.",
  },
  {
    question: "Can you help with flats for rent in Lohegaon?",
    answer:
      "Yes. We support tenants and owners with rental assistance, property expectations, owner coordination and suitable site visits.",
  },
  {
    question: "Does Tathastu Infra guide clients for plots in Lohegaon?",
    answer:
      "Yes. We help clients discuss plot suitability, access, surrounding development, documentation questions and future construction possibilities.",
  },
  {
    question: "Do you handle residential construction in Pune?",
    answer:
      "Yes. Tathastu Infra Construction handles home construction, villas, bungalows and residential projects with supervision, material planning and quality checks.",
  },
  {
    question: "Is Tathastu Infra a construction company in Pune?",
    answer:
      "Yes. Tathastu Infra is a construction company in Pune serving Lohegaon and nearby areas for residential construction, commercial construction, RCC structural work and turnkey execution.",
  },
  {
    question: "Do you provide construction services in Lohegaon?",
    answer:
      "Yes. We provide construction services in Lohegaon for homes, villas, shops, offices and structural work with planning, supervision, material clarity and transparent communication.",
  },
  {
    question: "Do you work on commercial construction projects?",
    answer:
      "Yes. We support commercial construction for offices, shops and business spaces with planning, structural execution and site coordination.",
  },
  {
    question: "Can Tathastu Infra help with RCC work in Pune?",
    answer:
      "Yes. Our construction team supports RCC and structural work in Pune with engineering coordination, safety checks, material planning and stage-wise execution.",
  },
  {
    question: "What construction packages are available?",
    answer:
      "Our construction packages include Basic, Standard and Premium options, with transparent inclusions so clients can choose according to scope and finish expectations.",
  },
  {
    question: "How does Tathastu Infra maintain money safety?",
    answer:
      "We focus on clear scope, transparent package conversations and practical budget guidance before work begins, so clients understand the next step.",
  },
  {
    question: "How do you ensure construction quality?",
    answer:
      "Quality is supported through material planning, site checks, supervision, technical guidance and review of important stages before handover.",
  },
  {
    question: "Can Tathastu Infra help with turnkey construction?",
    answer:
      "Yes. We can coordinate planning, materials, site supervision, execution and final handover through one accountable project path.",
  },
  {
    question: "Do you provide interior design in Pune?",
    answer:
      "Yes. Tathastu Infra Interior Design works on home interiors, office interiors, modular kitchens, bedrooms, living rooms and space planning.",
  },
  {
    question: "Is Tathastu Infra an interior designer in Lohegaon?",
    answer:
      "Yes. Tathastu Infra provides interior design in Lohegaon and Pune for home interiors, office interiors, modular kitchens, bedrooms, living rooms, furniture and decor.",
  },
  {
    question: "Can you design full home interiors in Pune?",
    answer:
      "Yes. We plan full home interiors in Pune including layout, storage, lighting, finishes, furniture, modular kitchens and room-by-room execution guidance.",
  },
  {
    question: "Can you design modular kitchens in Pune?",
    answer:
      "Yes. We plan modular kitchens around workflow, storage, materials, finishes and long-term daily use.",
  },
  {
    question: "Do you design office interiors?",
    answer:
      "Yes. We create office interiors focused on workflow, comfort, storage, lighting and a professional brand feel.",
  },
  {
    question: "Which areas do you serve near Pune?",
    answer:
      "We primarily serve Lohegaon, Pune and nearby growth areas including Kharadi, Wagholi, Viman Nagar and surrounding corridors.",
  },
  {
    question: "How can I contact Tathastu Infra?",
    answer:
      "You can call +91 78208 64384, use the website contact form, WhatsApp us or visit Tathastu Infra in Lohegaon, Pune.",
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
