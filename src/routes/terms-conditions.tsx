import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms-conditions")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | Tathastu Infra" },
    ],
  }),
  component: TermsConditionsPage,
});

function TermsConditionsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-32 sm:px-6">
      <h1 className="font-display text-4xl font-semibold sm:text-5xl">Terms & Conditions</h1>
      <p className="mt-6 text-muted-foreground">
        Our terms and conditions will be updated here shortly. We strive to provide transparent and fair services for all our clients.
      </p>
    </div>
  );
}
