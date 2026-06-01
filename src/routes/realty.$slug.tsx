import { createFileRoute, Link } from "@tanstack/react-router";
import { ServiceDetailPage } from "@/components/ServiceDetailPage";
import { getServiceDetail } from "@/lib/service-detail-data";

export const Route = createFileRoute("/realty/$slug")({
  head: () => ({
    meta: [
      { title: "Realty Services in Lohegaon, Pune | Tathastu Infra" },
      {
        name: "description",
        content:
          "Explore Tathastu Infra Realty services for rentals, resale properties and new residential projects in Lohegaon, Pune.",
      },
    ],
  }),
  component: RealtyDetailRoute,
});

function RealtyDetailRoute() {
  const { slug } = Route.useParams();
  const detail = getServiceDetail("realty", slug);

  if (!detail) {
    return (
      <section className="min-h-[70svh] bg-gradient-ivory px-4 py-32 text-center">
        <h1 className="font-display text-4xl font-semibold text-ink">Realty service not found.</h1>
        <Link to="/realty" className="mt-6 inline-flex text-primary underline">
          Back to realty
        </Link>
      </section>
    );
  }

  return <ServiceDetailPage detail={detail} />;
}
