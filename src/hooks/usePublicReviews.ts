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
    id: "mahesh-pathak",
    initials: "MP",
    name: "Mahesh Pathak",
    location: "Pune",
    service: "Tathastu Infra",
    quote:
      "Great work by the team. Get proper look as I want, great effort by maan singh as well.He look every work personally.Thank you very much",
    rating: 5,
    sortOrder: 1,
  },
  {
    id: "asmita-dalve",
    initials: "AD",
    name: "Asmita Dalve",
    location: "Pune",
    service: "Interior and Realty",
    quote:
      "Interior and realty services provide creative design ideas and help in buying or selling properties easily. The team offers professional guidance and good customer support. Overall, the service helps people create beautiful spaces and find suitable properties according to their needs.",
    rating: 5,
    sortOrder: 2,
  },
  {
    id: "srushti-jadhav-1",
    initials: "SJ",
    name: "Srushti Jadhav",
    location: "Pune",
    service: "Interior",
    quote:
      "Elegant and stylish interior work. They focused on both design and functionality.",
    rating: 5,
    sortOrder: 3,
  },
  {
    id: "vaishnavi-eppar",
    initials: "VE",
    name: "Vaishnavi Eppar",
    location: "Pune",
    service: "Interior",
    quote:
      "Great service, creative designs, and smooth execution. Loved the final outcome.",
    rating: 5,
    sortOrder: 4,
  },
  {
    id: "srushti-jadhav-2",
    initials: "SJ",
    name: "Srushti Jadhav",
    location: "Pune",
    service: "Turnkey Support",
    quote:
      "Quality work delivered on time, highly recommended.",
    rating: 5,
    sortOrder: 5,
  },
  {
    id: "supriya-jadhav",
    initials: "SJ",
    name: "Supriya Jadhav",
    location: "Pune",
    service: "Interior and Realty",
    quote:
      "The owner is a dedicated and hardworking professional who focuses on customer satisfaction. With good knowledge of interior design and real estate, they guide clients in making the right decisions. Their leadership helps the business deliver quality services and creative solutions.",
    rating: 5,
    sortOrder: 6,
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
