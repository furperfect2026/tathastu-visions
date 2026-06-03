import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type PublicPartner = {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
  websiteUrl?: string;
  sortOrder?: number;
};

const fallbackPartners: PublicPartner[] = [
  {
    id: "civil-rcc",
    name: "Civil & RCC Teams",
    description: "Execution crews aligned with structural discipline and practical site accountability.",
    sortOrder: 1,
  },
  {
    id: "architecture",
    name: "Architecture Collaborators",
    description: "Partner architects supporting build-ready planning and site-aware detailing.",
    sortOrder: 2,
  },
  {
    id: "mep-finishing",
    name: "MEP & Finishing Specialists",
    description: "Electrical, plumbing and finish teams coordinated for cleaner handover quality.",
    sortOrder: 3,
  },
  {
    id: "material-network",
    name: "Material Supply Network",
    description: "Trusted vendors for cement, steel, blocks and finishing materials across Pune.",
    sortOrder: 4,
  },
];

type PartnerRow = {
  id: string;
  name: string;
  description: string | null;
  logo_url: string | null;
  website_url: string | null;
  sort_order: number | null;
};

function mapPartner(row: PartnerRow): PublicPartner {
  return {
    id: row.id,
    name: row.name,
    description: row.description || "Trusted delivery partner for Tathastu Infra projects.",
    logoUrl: row.logo_url || undefined,
    websiteUrl: row.website_url || undefined,
    sortOrder: row.sort_order || 0,
  };
}

export function usePublicPartners() {
  const [managedPartners, setManagedPartners] = useState<PublicPartner[] | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchPartners() {
      try {
        const { data, error } = await (supabase as any)
          .from("partners")
          .select("id,name,description,logo_url,website_url,sort_order")
          .eq("is_active", true)
          .order("sort_order", { ascending: true })
          .order("created_at", { ascending: false });

        if (error) throw error;

        const nextPartners = ((data || []) as PartnerRow[]).map(mapPartner);
        if (isMounted) setManagedPartners(nextPartners.length ? nextPartners : null);
      } catch (error) {
        console.warn("[Partners] Falling back to static partners", error);
        if (isMounted) setManagedPartners(null);
      }
    }

    fetchPartners();

    return () => {
      isMounted = false;
    };
  }, []);

  return useMemo(
    () => ({
      partners: managedPartners || fallbackPartners,
      isManaged: Boolean(managedPartners),
    }),
    [managedPartners],
  );
}
