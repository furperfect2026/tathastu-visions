import { Outlet, createFileRoute, useRouterState } from "@tanstack/react-router";
import { Building, Factory, Landmark, Layers3 } from "lucide-react";
import { ServicePage, type ServicePageContent } from "@/components/ServicePage";
import heroInfra1 from "@/assets/hero-infra-1.jpg";
import heroInfra2 from "@/assets/hero-infra-2.jpg";
import heroInfra3 from "@/assets/hero-infra-3.jpg";
import construction1 from "@/assets/construction-1.jpg";
import construction2 from "@/assets/construction-2.jpg";
import construction3 from "@/assets/construction-3.jpg";
import construction4 from "@/assets/construction-4.jpg";

const content: ServicePageContent = {
  eyebrow: "Tathastu Infra Construction",
  title: "If You Can Envision It,",
  accent: "Tathastu Can Build It.",
  subtitle:
    "Residential and commercial construction in Pune shaped by structure, safety, material discipline and reliable supervision.",
  heroImages: [
    { src: heroInfra2, alt: "Tathastu Infra large-scale construction site at dusk with cranes" },
    { src: construction1, alt: "Tathastu Infra premium residential construction site in Pune" },
    { src: heroInfra1, alt: "Tathastu Infra multi-storey building with scaffolding" },
    { src: construction3, alt: "Tathastu Infra dramatic construction framework at sunset" },
    { src: construction2, alt: "Tathastu Infra site engineer reviewing blueprints on site" },
    { src: heroInfra3, alt: "Tathastu Infra construction worker laying tiles" },
    { src: construction4, alt: "Tathastu Infra structural construction supervision" },
  ],
  overviewTitle: "Strong spaces begin with strong systems.",
  overview:
    "Tathastu Infra Construction handles homes and commercial projects in Lohegaon, Pune with engineering focus and site accountability. We coordinate structural work, material planning, supervision and turnkey delivery so every project moves forward with quality, clarity and control.",
  projectCategory: "construction",
  offers: [
    {
      title: "Commercial Construction",
      description:
        "Offices, shops and commercial structures planned around quality, transparency and on-time delivery.",
      icon: Factory,
      image: { src: construction3, alt: "Commercial construction structure by Tathastu Infra" },
      href: "/construction/commercial-construction",
    },
    {
      title: "Residential Construction",
      description:
        "Homes, villas and bungalows built with money safety, material clarity and reliable supervision.",
      icon: Building,
      image: { src: construction2, alt: "Residential home construction planning by Tathastu Infra" },
      href: "/construction/residential-construction",
    },
    {
      title: "Structural Work & RCC",
      description:
        "Core RCC and civil structure work with disciplined engineering, safety checks and assurance.",
      icon: Layers3,
      image: { src: construction1, alt: "Structural work and RCC construction site" },
      href: "/construction/structural-work-rcc",
    },
    {
      title: "WTG & Government Contracts",
      description:
        "Government, institutional and infrastructure-focused contracts handled with documentation and execution control.",
      icon: Landmark,
      image: { src: construction4, alt: "Infrastructure and government construction planning" },
      href: "/construction/wtg-government-contracts",
    },
  ],
};

export const Route = createFileRoute("/construction")({
  head: () => ({
    meta: [
      { title: "Construction Company in Pune & Lohegaon | Tathastu Infra Construction" },
      {
        name: "description",
        content:
          "Tathastu Infra is a construction company in Pune and Lohegaon for residential, commercial, civil, RCC, bungalow, warehouse, industrial, road, highway and turnkey construction.",
      },
      {
        name: "keywords",
        content:
          "construction company in Pune, best construction company in Pune, top construction company in Pune, leading construction company in Pune, construction company in Lohegaon, home construction company in Pune, civil construction company in Pune, building construction company in Pune, bungalow construction company in Pune, warehouse construction company in Pune, industrial construction company in Pune, road construction company in Pune, highway construction company in Pune, residential construction Pune, commercial construction Pune, RCC contractor Pune, turnkey construction Pune, house construction cost Pune",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.tathastuinfra.in/construction" }],
  }),
  component: ConstructionRoute,
});

function ConstructionRoute() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isConstructionIndex = pathname.replace(/\/$/, "") === "/construction";

  return isConstructionIndex ? <ServicePage content={content} /> : <Outlet />;
}
