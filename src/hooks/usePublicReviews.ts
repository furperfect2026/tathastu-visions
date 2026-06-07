import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type PublicReview = {
  id: string;
  initials: string;
  name: string;
  location: string;
  service: string;
  quote: string;
  rating: number;
  imageUrl?: string;
  sortOrder?: number;
};

const fallbackReviews: PublicReview[] = [
  {
    id: "vaibhav-construction",
    initials: "VP",
    name: "Vaibhav P.",
    location: "Lohegaon, Pune",
    service: "Construction",
    quote:
      "Great service, clear planning and smooth execution. The Tathastu Infra team kept us updated and handled every step with care.",
    rating: 5,
    sortOrder: 1,
  },
  {
    id: "anmol-interior",
    initials: "AK",
    name: "Anmol K.",
    location: "Pune",
    service: "Interior",
    quote:
      "Elegant and stylish interior work. The design felt premium, practical and very comfortable for daily living.",
    rating: 5,
    sortOrder: 2,
  },
  {
    id: "rohit-realty",
    initials: "RP",
    name: "Rohit P.",
    location: "Lohegaon",
    service: "Realty",
    quote:
      "They guided us patiently through property options, site visits and documentation. The process felt transparent from the first call.",
    rating: 5,
    sortOrder: 3,
  },
  {
    id: "manasi-turnkey",
    initials: "MS",
    name: "Manasi S.",
    location: "Pune",
    service: "Turnkey Support",
    quote:
      "The team understood our budget and explained the next steps clearly. We liked the honest communication and quick responses.",
    rating: 5,
    sortOrder: 4,
  },
];

type ReviewRow = {
  id: string;
  initials: string | null;
  name: string;
  location: string | null;
  service: string | null;
  quote: string;
  rating: number | null;
  image_url: string | null;
  sort_order: number | null;
};

function initialsFromName(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function mapReview(row: ReviewRow): PublicReview {
  return {
    id: row.id,
    initials: row.initials || initialsFromName(row.name) || "TI",
    name: row.name,
    location: row.location || "Pune",
    service: row.service || "Tathastu Infra",
    quote: row.quote,
    rating: Math.min(5, Math.max(1, Number(row.rating) || 5)),
    imageUrl: row.image_url || undefined,
    sortOrder: row.sort_order || 0,
  };
}

export function usePublicReviews() {
  const [managedReviews, setManagedReviews] = useState<PublicReview[] | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchReviews() {
      try {
        const { data, error } = await (supabase as any)
          .from("client_reviews")
          .select("id,initials,name,location,service,quote,rating,image_url,sort_order")
          .eq("is_published", true)
          .order("sort_order", { ascending: true })
          .order("created_at", { ascending: false });

        if (error) throw error;

        const nextReviews = ((data || []) as ReviewRow[]).map(mapReview);
        if (isMounted) setManagedReviews(nextReviews.length ? nextReviews : null);
      } catch (error) {
        console.warn("[Reviews] Falling back to static reviews", error);
        if (isMounted) setManagedReviews(null);
      }
    }

    fetchReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  return useMemo(
    () => ({
      reviews: managedReviews || fallbackReviews,
      isManaged: Boolean(managedReviews),
    }),
    [managedReviews],
  );
}
