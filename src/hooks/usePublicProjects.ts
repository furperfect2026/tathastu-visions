import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { projects as fallbackProjects } from "@/lib/site-data";

export type ProjectCategory = "realty" | "construction" | "interior";

export type PublicProject = {
  id: string;
  category: ProjectCategory;
  title: string;
  location: string;
  year: number;
  image: string;
  galleryImages?: string[];
  blurb: string;
  priceLabel?: string;
  sortOrder?: number;
};

type ProjectRow = {
  id: string;
  category: ProjectCategory;
  title: string;
  location: string | null;
  year: number | null;
  image_url: string | null;
  gallery_images?: string[] | null;
  description: string | null;
  price_label: string | null;
  sort_order: number | null;
};

const fallback = fallbackProjects.map((project) => ({
  ...project,
  sortOrder: 0,
})) satisfies PublicProject[];

function mapProject(row: ProjectRow): PublicProject | null {
  if (!row.image_url || !row.description) return null;

  return {
    id: row.id,
    category: row.category,
    title: row.title,
    location: row.location || "Pune",
    year: row.year || new Date().getFullYear(),
    image: row.image_url,
    galleryImages: Array.isArray(row.gallery_images) ? row.gallery_images : [],
    blurb: row.description,
    priceLabel: row.price_label || undefined,
    sortOrder: row.sort_order || 0,
  };
}

export function usePublicProjects(category?: ProjectCategory) {
  const [managedProjects, setManagedProjects] = useState<PublicProject[] | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchProjects() {
      try {
        let query = (supabase as any)
          .from("projects")
          .select("*")
          .eq("is_published", true)
          .order("sort_order", { ascending: true })
          .order("created_at", { ascending: false });

        if (category) {
          query = query.eq("category", category);
        }

        const { data, error } = await query;
        if (error) throw error;

        const nextProjects = ((data || []) as ProjectRow[])
          .map(mapProject)
          .filter(Boolean) as PublicProject[];

        if (isMounted) {
          setManagedProjects(nextProjects.length ? nextProjects : null);
        }
      } catch (error) {
        console.warn("[Projects] Falling back to static projects", error);
        if (isMounted) setManagedProjects(null);
      }
    }

    fetchProjects();

    return () => {
      isMounted = false;
    };
  }, [category]);

  return useMemo(() => {
    const source = managedProjects || fallback;
    const projects = category ? source.filter((project) => project.category === category) : source;

    return {
      projects,
      isManaged: Boolean(managedProjects),
    };
  }, [category, managedProjects]);
}
