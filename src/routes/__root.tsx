import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useLocation,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ConsultationPopup } from "@/components/ConsultationPopup";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { SeoFaqSection } from "@/components/SeoFaqSection";
import { Toaster } from "@/components/ui/sonner";

const siteUrl = "https://www.tathastuinfra.in";

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "RealEstateAgent", "HomeAndConstructionBusiness"],
  "@id": `${siteUrl}/#localbusiness`,
  name: "Tathastu Infra",
  alternateName: "Tathastu Infra",
  description:
    "Tathastu Infra is a Lohegaon, Pune based real estate, property consulting, construction and interior design firm for premium homes, commercial spaces and luxury interiors.",
  url: siteUrl,
  telephone: "+917820864384",
  email: "tathastuinfra.info@gmail.com",
  priceRange: "$$",
  image: `${siteUrl}/assets/tathastu-logo.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Tathastu Infra, Lohegaon",
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
    "https://in.linkedin.com/company/tathastu-infra?trk=public_post_feed-actor-name",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Tathastu Infra Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Real estate and property consulting in Pune" },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Flats, resale properties and rentals in Lohegaon",
        },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "2 BHK flat search guidance in Lohegaon Pune" },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Plots and land search guidance in Lohegaon Pune",
        },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Construction services in Pune" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Best construction company in Pune" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Top construction company in Pune" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Leading construction company in Pune" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Civil construction company in Pune" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Building construction company in Pune" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Bungalow construction company in Pune" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Warehouse construction company in Pune" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Industrial construction company in Pune" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Road and highway construction company in Pune" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "WTG and government contracts construction support" },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Construction company in Lohegaon Pune for residential and commercial projects",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "House construction and home construction cost guidance in Pune",
        },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Turnkey construction execution in Pune" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Interior design services in Pune" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Best interior designer in Pune" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Top interior designer in Pune" },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Interior designer in Lohegaon Pune for homes and offices",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Home interiors, modular kitchen and office interior design in Pune",
        },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "2 BHK and 3 BHK interior design in Pune" },
      },
    ],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: "Tathastu Infra",
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
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-gradient-gold px-6 py-3 text-sm font-medium text-ink shadow-gold transition-opacity hover:opacity-90"
          >
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
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. You can try again or head home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-gradient-gold px-5 py-2 text-sm font-medium text-ink shadow-gold"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-full border border-input px-5 py-2 text-sm font-medium hover:bg-accent"
          >
            Go home
          </a>
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
      { title: "Tathastu Infra Pune | Realty, Construction & Interior Design in Lohegaon" },
      {
        name: "description",
        content:
          "Tathastu Infra is a Lohegaon, Pune based real estate, property consulting, construction company and interior design firm for flats, rent, plots, homes, commercial spaces and luxury interiors.",
      },
      {
        name: "keywords",
        content:
          "Tathastu Infra, construction company in Pune, best construction company in Pune, top construction company in Pune, leading construction company in Pune, construction company in Lohegaon, home construction company in Pune, civil construction company in Pune, building construction company in Pune, bungalow construction company in Pune, warehouse construction company in Pune, industrial construction company in Pune, road construction company in Pune, highway construction company in Pune, real estate Lohegaon Pune, property consultant in Lohegaon, flats in Lohegaon, flats for sale in Lohegaon Pune, 2 BHK flats in Lohegaon, 3 BHK flats in Lohegaon, flats for rent in Lohegaon, plots for sale in Lohegaon, interior designer in Pune, best interior designer in Pune, modular kitchen Pune",
      },
      { name: "theme-color", content: "#FBF8F1" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteUrl },
      { property: "og:site_name", content: "Tathastu Infra" },
      { property: "og:title", content: "Tathastu Infra Pune | Construction, Realty & Interior Design" },
      {
        property: "og:description",
        content: "Tathastu Infra helps clients in Pune and Lohegaon with construction, property consulting, flats, rentals, plots and premium interior design.",
      },
      { property: "og:image", content: `${siteUrl}/tathastu-logo.png` },
      { property: "og:image:secure_url", content: `${siteUrl}/tathastu-logo.png` },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Tathastu Infra Pune logo" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Tathastu Infra Pune | Construction, Realty & Interior Design" },
      {
        name: "twitter:description",
        content: "Construction company, real estate consultant and interior design studio in Lohegaon, Pune.",
      },
      { name: "twitter:image", content: `${siteUrl}/tathastu-logo.png` },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScroll />
      <SiteNav />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <SeoFaqSection />
      <SiteFooter />
      <ChatbotWidget />
      {!isAdminRoute && <ConsultationPopup />}
      <Toaster richColors position="top-center" />
    </QueryClientProvider>
  );
}

