import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Toaster } from "@/components/ui/sonner";

const siteUrl = "https://www.tathastuinfra.in";

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "RealEstateAgent", "HomeAndConstructionBusiness"],
  "@id": `${siteUrl}/#localbusiness`,
  name: "Tathastu",
  alternateName: "Tathastu Infra",
  description:
    "Tathastu is a Lohegaon, Pune based real estate, property consulting, construction and interior design firm for premium homes, commercial spaces and luxury interiors.",
  url: siteUrl,
  telephone: "+917820864384",
  email: "tathastu.infra.info@gmail.com",
  priceRange: "$$",
  image: `${siteUrl}/assets/tathastu-logo.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Tathastu, Lohegaon",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    postalCode: "411047",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 18.6159241,
    longitude: 73.9093115,
  },
  areaServed: [
    { "@type": "City", name: "Pune" },
    { "@type": "Place", name: "Lohegaon" },
    { "@type": "Place", name: "Kharadi" },
    { "@type": "Place", name: "Wagholi" },
    { "@type": "Place", name: "Viman Nagar" },
  ],
  sameAs: [
    "https://www.instagram.com/tathastu_infra/",
    "https://www.youtube.com/@Tathastu_Infra",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Tathastu Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Real estate and property consulting in Pune" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Flats, resale properties and rentals in Lohegaon" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Construction services in Pune" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Interior design services in Pune" } },
    ],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: "Tathastu",
  url: siteUrl,
  publisher: { "@id": `${siteUrl}/#localbusiness` },
  inLanguage: "en-IN",
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl font-semibold text-gradient-gold">404</h1>
        <h2 className="mt-4 font-display text-2xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-full bg-gradient-gold px-6 py-3 text-sm font-medium text-ink shadow-gold transition-opacity hover:opacity-90">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong. You can try again or head home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-full bg-gradient-gold px-5 py-2 text-sm font-medium text-ink shadow-gold">Try again</button>
          <a href="/" className="rounded-full border border-input px-5 py-2 text-sm font-medium hover:bg-accent">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Tathastu Pune | Realty, Construction & Interior Design in Lohegaon" },
      { name: "description", content: "Tathastu is a Lohegaon, Pune based real estate, property consulting, construction and interior design firm building premium homes, commercial spaces and luxury interiors across Pune." },
      { name: "theme-color", content: "#FBF8F1" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Tathastu — Building Spaces. Creating Futures." },
      { property: "og:description", content: "Premium real estate, properties, construction and interior design from Tathastu in Lohegaon, Pune." },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: siteUrl },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Manrope:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      </head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScroll />
      <SiteNav />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <SiteFooter />
      <Toaster richColors position="top-center" />
    </QueryClientProvider>
  );
}
