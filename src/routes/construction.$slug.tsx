import { createFileRoute, Link } from "@tanstack/react-router";
import { ServiceDetailPage } from "@/components/ServiceDetailPage";
import { getServiceDetail } from "@/lib/service-detail-data";

export const Route = createFileRoute("/construction/$slug")({
  head: () => ({
    meta: [
      { title: "Construction Services in Pune | Tathastu Infra" },
      {
        name: "description",
        content:
          "Explore Tathastu Infra construction services in Pune including residential, commercial, RCC structural work and government contracts.",
      },
    ],
  }),
  component: ConstructionDetailRoute,
});

function ConstructionDetailRoute() {
  const { slug } = Route.useParams();
  const detail = getServiceDetail("construction", slug);

  if (!detail) {
    return (
      <section className="min-h-[70svh] bg-gradient-ivory px-4 py-32 text-center">
        <h1 className="font-display text-4xl font-semibold text-ink">Construction service not found.</h1>
        <Link to="/construction" className="mt-6 inline-flex text-primary underline">
          Back to construction
        </Link>
      </section>
    );
  }

  return <ServiceDetailPage detail={detail} />;
}
