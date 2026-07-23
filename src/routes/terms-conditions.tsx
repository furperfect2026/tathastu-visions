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
      <p className="mt-4 text-sm text-muted-foreground uppercase tracking-widest font-medium">Last Updated: July 2026</p>
      
      <div className="mt-12 space-y-10 text-ink/80 leading-relaxed">
        <section>
          <h2 className="font-display text-2xl font-medium text-ink mb-4">1. Agreement to Terms</h2>
          <p>
            These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Tathastu Infra ("we," "us" or "our"), concerning your access to and use of our website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-medium text-ink mb-4">2. Intellectual Property Rights</h2>
          <p>
            Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-medium text-ink mb-4">3. User Representations</h2>
          <p className="mb-3">By using the Site, you represent and warrant that:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>All registration information you submit will be true, accurate, current, and complete.</li>
            <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
            <li>You have the legal capacity and you agree to comply with these Terms and Conditions.</li>
            <li>You will not use the Site for any illegal or unauthorized purpose.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-medium text-ink mb-4">4. Services and Estimates</h2>
          <p>
            Any construction or interior design estimates, quotes, or proposals provided through the Site are for informational purposes only and do not constitute a binding contract until a formal written agreement is signed by both parties. All project scopes, timelines, and costs are subject to change based on site conditions, material availability, and final design approvals.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-medium text-ink mb-4">5. Limitations of Liability</h2>
          <p>
            In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the Site, even if we have been advised of the possibility of such damages.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-medium text-ink mb-4">6. Modifications and Interruptions</h2>
          <p>
            We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Site. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Site.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-medium text-ink mb-4">7. Contact Us</h2>
          <p>
            In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
            <br /><br />
            <strong>Tathastu Infra</strong><br />
            Lohegaon, Pune 411047<br />
            Email: tathastuinfra.info@gmail.com<br />
            Phone: +91 78208 64384
          </p>
        </section>
      </div>
    </div>
  );
}
