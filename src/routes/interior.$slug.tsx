import { createFileRoute, Link } from "@tanstack/react-router";
import { ServiceDetailPage } from "@/components/ServiceDetailPage";
import { getServiceDetail } from "@/lib/service-detail-data";

export const Route = createFileRoute("/interior/$slug")({
  head: () => ({
    meta: [
      { title: "Interior Design Services in Pune | Tathastu Infra" },
      {
        name: "description",
        content:
          "Explore Tathastu Infra interior design services in Pune including home interiors, office interiors and modular kitchens.",
      },
    ],
  }),
  component: InteriorDetailRoute,
});

function InteriorDetailRoute() {
  const { slug } = Route.useParams();
  const detail = getServiceDetail("interior", slug);

  if (!detail) {
    return (
      <section className="min-h-[70svh] bg-gradient-ivory px-4 py-32 text-center">
        <h1 className="font-display text-4xl font-semibold text-ink">Interior service not found.</h1>
        <Link to="/interior" className="mt-6 inline-flex text-primary underline">
          Back to interiors
        </Link>
      </section>
    );
  }

  return <ServiceDetailPage detail={detail} />;
}
