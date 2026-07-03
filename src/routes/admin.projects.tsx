import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Edit3,
  Handshake,
  ImagePlus,
  Loader2,
  LogOut,
  Plus,
  Save,
  Star,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import type { ProjectCategory, PublicProject } from "@/hooks/usePublicProjects";

type AdminProject = PublicProject & {
  imageUrl: string;
  sortOrder: number;
  isPublished: boolean;
};

type AdminPartner = {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  websiteUrl: string;
  sortOrder: number;
  isActive: boolean;
};

type AdminBankingPartner = {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
  sortOrder: number;
  isActive: boolean;
};

type AdminReview = {
  id: string;
  name: string;
  location: string;
  service: string;
  quote: string;
  rating: number;
  initials: string;
  imageUrl: string;
  sortOrder: number;
  isPublished: boolean;
};

type ProjectForm = {
  id?: string;
  title: string;
  description: string;
  category: ProjectCategory;
  location: string;
  year: string;
  priceLabel: string;
  sortOrder: string;
  imageUrl: string;
  galleryImages: string[];
  galleryFiles: File[];
  isPublished: boolean;
  
  // Realty-specific fields
  neighborhood?: string;
  beds?: string;
  area?: string;
  tagline?: string;
  highlightsText?: string;
  amenitiesText?: string;
  configsText?: string;
  realtyType?: string;
  realtyCategory?: string;
  isRecommended?: boolean;
};

type PartnerForm = {
  id?: string;
  name: string;
  description: string;
  logoUrl: string;
  websiteUrl: string;
  sortOrder: string;
  isActive: boolean;
};

type BankingPartnerForm = {
  id?: string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
  sortOrder: string;
  isActive: boolean;
};

type ReviewForm = {
  id?: string;
  name: string;
  location: string;
  service: string;
  quote: string;
  rating: string;
  initials: string;
  imageUrl: string;
  sortOrder: string;
  isPublished: boolean;
};

const emptyForm: ProjectForm = {
  title: "",
  description: "",
  category: "construction",
  location: "Lohegaon, Pune",
  year: String(new Date().getFullYear()),
  priceLabel: "",
  sortOrder: "0",
  imageUrl: "",
  galleryImages: [],
  galleryFiles: [],
  isPublished: true,
  
  // Realty defaults
  neighborhood: "Pune East",
  beds: "",
  area: "",
  tagline: "",
  highlightsText: "",
  amenitiesText: "",
  configsText: "",
  realtyType: "Under Construction",
  realtyCategory: "Residential",
  isRecommended: false,
};

function freshProjectForm(): ProjectForm {
  return { ...emptyForm, galleryImages: [], galleryFiles: [] };
}

const emptyPartnerForm: PartnerForm = {
  name: "",
  description: "",
  logoUrl: "",
  websiteUrl: "",
  sortOrder: "0",
  isActive: true,
};

const emptyBankingPartnerForm: BankingPartnerForm = {
  name: "",
  logoUrl: "",
  websiteUrl: "",
  sortOrder: "0",
  isActive: true,
};

const emptyReviewForm: ReviewForm = {
  name: "",
  location: "Lohegaon, Pune",
  service: "Construction",
  quote: "",
  rating: "5",
  initials: "",
  imageUrl: "",
  sortOrder: "0",
  isPublished: true,
};

const categories = [
  { value: "realty", label: "Realty" },
  { value: "construction", label: "Construction" },
  { value: "interior", label: "Interior" },
] as const;

export const Route = createFileRoute("/admin/projects")({
  head: () => ({
    meta: [
      { title: "Project Admin | Tathastu Infra" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminProjectsPage,
});

function mapRow(row: any): AdminProject {
  return {
    id: row.id,
    category: row.category,
    title: row.title,
    location: row.location || "Pune",
    year: row.year || new Date().getFullYear(),
    image: row.image_url,
    imageUrl: row.image_url,
    galleryImages: Array.isArray(row.gallery_images) ? row.gallery_images : [],
    blurb: row.description || "",
    priceLabel: row.price_label || undefined,
    sortOrder: row.sort_order || 0,
    isPublished: row.is_published !== false,
  };
}

function mapPartnerRow(row: any): AdminPartner {
  return {
    id: row.id,
    name: row.name,
    description: row.description || "",
    logoUrl: row.logo_url || "",
    websiteUrl: row.website_url || "",
    sortOrder: row.sort_order || 0,
    isActive: row.is_active !== false,
  };
}

function mapBankingPartnerRow(row: any): AdminBankingPartner {
  return {
    id: row.id,
    name: row.name,
    logoUrl: row.logo_url || "",
    websiteUrl: row.website_url || "",
    sortOrder: row.sort_order || 0,
    isActive: row.is_active !== false,
  };
}

function mapReviewRow(row: any): AdminReview {
  return {
    id: row.id,
    name: row.name,
    location: row.location || "Pune",
    service: row.service || "Tathastu Infra",
    quote: row.quote || "",
    rating: Number(row.rating) || 5,
    initials: row.initials || "",
    imageUrl: row.image_url || "",
    sortOrder: row.sort_order || 0,
    isPublished: row.is_published !== false,
  };
}

function formFromProject(project: AdminProject): ProjectForm {
  let description = project.blurb;
  let neighborhood = "Pune East";
  let beds = "";
  let area = "";
  let tagline = "";
  let highlightsText = "";
  let amenitiesText = "";
  let configsText = "";
  let realtyType = "Under Construction";
  let realtyCategory = "Residential";

  if (project.category === "realty" && project.blurb && project.blurb.trim().startsWith("{")) {
    try {
      const parsed = JSON.parse(project.blurb);
      if (parsed.isRealtyJson) {
        description = parsed.description || "";
        neighborhood = parsed.neighborhood || "Pune East";
        beds = parsed.beds || "";
        area = parsed.area || "";
        tagline = parsed.tagline || "";
        highlightsText = Array.isArray(parsed.highlights) ? parsed.highlights.join("\n") : "";
        amenitiesText = Array.isArray(parsed.amenities) ? parsed.amenities.join(", ") : "";
        configsText = Array.isArray(parsed.configs)
          ? parsed.configs.map((c: any) => `${c.bhk} | ${c.size} | ${c.price}`).join("\n")
          : "";
        realtyType = parsed.realtyType || "Under Construction";
        realtyCategory = parsed.realtyCategory || "Residential";
        isRecommended = parsed.isRecommended || false;
      }
    } catch (e) {
      console.error("Error parsing JSON description for realty project", e);
    }
  }

  return {
    id: project.id,
    title: project.title,
    description,
    category: project.category,
    location: project.location,
    year: String(project.year),
    priceLabel: project.priceLabel || "",
    sortOrder: String(project.sortOrder),
    imageUrl: project.imageUrl,
    galleryImages: project.galleryImages || [],
    galleryFiles: [],
    isPublished: project.isPublished,
    
    // Realty fields
    neighborhood,
    beds,
    area,
    tagline,
    highlightsText,
    amenitiesText,
    configsText,
    realtyType,
    realtyCategory
  };
}

function formFromPartner(partner: AdminPartner): PartnerForm {
  return {
    id: partner.id,
    name: partner.name,
    description: partner.description,
    logoUrl: partner.logoUrl,
    websiteUrl: partner.websiteUrl,
    sortOrder: String(partner.sortOrder),
    isActive: partner.isActive,
  };
}

function formFromBankingPartner(partner: AdminBankingPartner): BankingPartnerForm {
  return {
    id: partner.id,
    name: partner.name,
    logoUrl: partner.logoUrl,
    websiteUrl: partner.websiteUrl,
    sortOrder: String(partner.sortOrder),
    isActive: partner.isActive,
  };
}

function formFromReview(review: AdminReview): ReviewForm {
  return {
    id: review.id,
    name: review.name,
    location: review.location,
    service: review.service,
    quote: review.quote,
    rating: String(review.rating),
    initials: review.initials,
    imageUrl: review.imageUrl,
    sortOrder: String(review.sortOrder),
    isPublished: review.isPublished,
  };
}

function AdminProjectsPage() {
  const [sessionReady, setSessionReady] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [partners, setPartners] = useState<AdminPartner[]>([]);
  const [bankingPartners, setBankingPartners] = useState<AdminBankingPartner[]>([]);
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [form, setForm] = useState<ProjectForm>(freshProjectForm);
  const [partnerForm, setPartnerForm] = useState<PartnerForm>(emptyPartnerForm);
  const [bankingPartnerForm, setBankingPartnerForm] =
    useState<BankingPartnerForm>(emptyBankingPartnerForm);
  const [reviewForm, setReviewForm] = useState<ReviewForm>(emptyReviewForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [partnerLogoFile, setPartnerLogoFile] = useState<File | null>(null);
  const [bankingLogoFile, setBankingLogoFile] = useState<File | null>(null);
  const [reviewPhotoFile, setReviewPhotoFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isEditing = Boolean(form.id);
  const previewImage = useMemo(
    () => (imageFile ? URL.createObjectURL(imageFile) : form.imageUrl),
    [form.imageUrl, imageFile],
  );
  const partnerPreviewImage = useMemo(
    () => (partnerLogoFile ? URL.createObjectURL(partnerLogoFile) : partnerForm.logoUrl),
    [partnerForm.logoUrl, partnerLogoFile],
  );
  const bankingPreviewImage = useMemo(
    () =>
      bankingLogoFile ? URL.createObjectURL(bankingLogoFile) : bankingPartnerForm.logoUrl,
    [bankingLogoFile, bankingPartnerForm.logoUrl],
  );
  const reviewPreviewImage = useMemo(
    () => (reviewPhotoFile ? URL.createObjectURL(reviewPhotoFile) : reviewForm.imageUrl),
    [reviewForm.imageUrl, reviewPhotoFile],
  );

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!isMounted) return;
      setIsAuthed(Boolean(data.session));
      setSessionReady(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthed(Boolean(session));
      setSessionReady(true);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isAuthed) {
      fetchProjects();
      fetchPartners();
      fetchBankingPartners();
      fetchReviews();
    }
  }, [isAuthed]);

  async function fetchProjects() {
    setIsLoading(true);
    try {
      const { data, error } = await (supabase as any)
        .from("projects")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProjects((data || []).map(mapRow));
    } catch (error) {
      console.error(error);
      toast.error("Could not load projects. Please apply the Supabase setup SQL first.");
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchPartners() {
    try {
      const { data, error } = await (supabase as any)
        .from("partners")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPartners((data || []).map(mapPartnerRow));
    } catch (error) {
      console.warn("[Admin] Partners table is not ready yet.", error);
      setPartners([]);
    }
  }

  async function fetchBankingPartners() {
    try {
      const { data, error } = await (supabase as any)
        .from("banking_partners")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBankingPartners((data || []).map(mapBankingPartnerRow));
    } catch (error) {
      console.warn("[Admin] Banking partners table is not ready yet.", error);
      setBankingPartners([]);
    }
  }

  async function fetchReviews() {
    try {
      const { data, error } = await (supabase as any)
        .from("client_reviews")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (error) throw error;
      setReviews((data || []).map(mapReviewRow));
    } catch (error) {
      console.warn("[Admin] Client reviews table is not ready yet.", error);
      setReviews([]);
    }
  }

  async function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success("Welcome to the Tathastu Infra admin panel.");
    } catch (error) {
      console.error(error);
      const message =
        error && typeof error === "object" && "message" in error
          ? String((error as { message?: unknown }).message)
          : "Login failed. Check the admin email and password.";
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  }

  async function uploadImage(file: File | null, title: string, fallbackUrl: string) {
    if (!file) return fallbackUrl;

    const ext = file.name.split(".").pop() || "jpg";
    const safeTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const path = `${Date.now()}-${safeTitle || "project"}.${ext}`;

    const { error } = await (supabase as any).storage
      .from("project-images")
      .upload(path, file, { cacheControl: "31536000", upsert: false });

    if (error) throw error;

    const { data } = (supabase as any).storage.from("project-images").getPublicUrl(path);
    return data.publicUrl as string;
  }

  async function saveProject(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      toast.error("Project name and description are required.");
      return;
    }
    if (!form.imageUrl && !imageFile) {
      toast.error("Please upload a project photo.");
      return;
    }

    setIsSaving(true);
    try {
      const imageUrl = await uploadImage(imageFile, form.title, form.imageUrl);
      const uploadedGalleryImages = await Promise.all(
        form.galleryFiles.map((file) => uploadImage(file, `${form.title}-gallery`, "")),
      );
      const galleryImages = Array.from(
        new Set([...form.galleryImages, ...uploadedGalleryImages].filter(Boolean)),
      );
      const isRealty = form.category === "realty";
      const descriptionToSave = isRealty ? JSON.stringify({
        isRealtyJson: true,
        description: form.description.trim(),
        neighborhood: form.neighborhood?.trim() || "Pune East",
        beds: form.beds?.trim() || "",
        area: form.area?.trim() || "",
        tagline: form.tagline?.trim() || "",
        highlights: (form.highlightsText || "").split("\n").map(h => h.trim()).filter(Boolean),
        amenities: (form.amenitiesText || "").split(",").map(a => a.trim()).filter(Boolean),
        configs: (form.configsText || "").split("\n").map(line => {
          const parts = line.split("|").map(p => p.trim());
          return {
            bhk: parts[0] || "",
            size: parts[1] || "",
            price: parts[2] || ""
          };
        }).filter(cfg => cfg.bhk),
        realtyType: form.realtyType || "Under Construction",
        realtyCategory: form.realtyCategory || "Residential",
        isRecommended: form.isRecommended || false
      }) : form.description.trim();

      const payload = {
        title: form.title.trim(),
        description: descriptionToSave,
        category: form.category,
        location: form.location.trim() || "Pune",
        year: Number(form.year) || new Date().getFullYear(),
        price_label: form.category === "realty" ? form.priceLabel.trim() || null : null,
        image_url: imageUrl,
        gallery_images: galleryImages,
        sort_order: Number(form.sortOrder) || 0,
        is_published: form.isPublished,
      };

      const query = form.id
        ? (supabase as any).from("projects").update(payload).eq("id", form.id)
        : (supabase as any).from("projects").insert(payload);

      const { error } = await query;
      if (error) throw error;

      toast.success(form.id ? "Project updated." : "Project added.");
      setForm(freshProjectForm());
      setImageFile(null);
      await fetchProjects();
    } catch (error) {
      console.error(error);
      toast.error("Could not save project.");
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteProject(project: AdminProject) {
    if (!window.confirm(`Delete "${project.title}" from the website?`)) return;

    setIsSaving(true);
    try {
      const { error } = await (supabase as any).from("projects").delete().eq("id", project.id);
      if (error) throw error;
      toast.success("Project deleted.");
      await fetchProjects();
    } catch (error) {
      console.error(error);
      toast.error("Could not delete project.");
    } finally {
      setIsSaving(false);
    }
  }

  async function savePartner(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!partnerForm.name.trim()) {
      toast.error("Partner name is required.");
      return;
    }

    setIsSaving(true);
    try {
      const logoUrl = await uploadImage(partnerLogoFile, partnerForm.name, partnerForm.logoUrl);
      const payload = {
        name: partnerForm.name.trim(),
        description: partnerForm.description.trim(),
        logo_url: logoUrl,
        website_url: partnerForm.websiteUrl.trim() || null,
        sort_order: Number(partnerForm.sortOrder) || 0,
        is_active: partnerForm.isActive,
      };

      const query = partnerForm.id
        ? (supabase as any).from("partners").update(payload).eq("id", partnerForm.id)
        : (supabase as any).from("partners").insert(payload);

      const { error } = await query;
      if (error) throw error;

      toast.success(partnerForm.id ? "Partner updated." : "Partner added.");
      setPartnerForm(emptyPartnerForm);
      setPartnerLogoFile(null);
      await fetchPartners();
    } catch (error) {
      console.error(error);
      toast.error("Could not save partner. Apply the updated Supabase SQL if this is the first time.");
    } finally {
      setIsSaving(false);
    }
  }

  async function deletePartner(partner: AdminPartner) {
    if (!window.confirm(`Delete "${partner.name}" from partner management?`)) return;

    setIsSaving(true);
    try {
      const { error } = await (supabase as any).from("partners").delete().eq("id", partner.id);
      if (error) throw error;
      toast.success("Partner deleted.");
      await fetchPartners();
    } catch (error) {
      console.error(error);
      toast.error("Could not delete partner.");
    } finally {
      setIsSaving(false);
    }
  }

  async function saveBankingPartner(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!bankingPartnerForm.name.trim()) {
      toast.error("Bank name is required.");
      return;
    }

    setIsSaving(true);
    try {
      const logoUrl = await uploadImage(
        bankingLogoFile,
        `${bankingPartnerForm.name}-bank-logo`,
        bankingPartnerForm.logoUrl,
      );
      const payload = {
        name: bankingPartnerForm.name.trim(),
        logo_url: logoUrl,
        website_url: bankingPartnerForm.websiteUrl.trim() || null,
        sort_order: Number(bankingPartnerForm.sortOrder) || 0,
        is_active: bankingPartnerForm.isActive,
      };

      const query = bankingPartnerForm.id
        ? (supabase as any).from("banking_partners").update(payload).eq("id", bankingPartnerForm.id)
        : (supabase as any).from("banking_partners").insert(payload);

      const { error } = await query;
      if (error) throw error;

      toast.success(bankingPartnerForm.id ? "Banking partner updated." : "Banking partner added.");
      setBankingPartnerForm(emptyBankingPartnerForm);
      setBankingLogoFile(null);
      await fetchBankingPartners();
    } catch (error) {
      console.error(error);
      toast.error(
        "Could not save banking partner. Apply the updated Supabase SQL if this is the first time.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteBankingPartner(partner: AdminBankingPartner) {
    if (!window.confirm(`Delete "${partner.name}" from banking partners?`)) return;

    setIsSaving(true);
    try {
      const { error } = await (supabase as any).from("banking_partners").delete().eq("id", partner.id);
      if (error) throw error;
      toast.success("Banking partner deleted.");
      await fetchBankingPartners();
    } catch (error) {
      console.error(error);
      toast.error("Could not delete banking partner.");
    } finally {
      setIsSaving(false);
    }
  }

  async function saveReview(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!reviewForm.name.trim() || !reviewForm.quote.trim()) {
      toast.error("Client name and review text are required.");
      return;
    }

    setIsSaving(true);
    try {
      const imageUrl = await uploadImage(reviewPhotoFile, `${reviewForm.name}-review`, reviewForm.imageUrl);
      const fallbackInitials = reviewForm.name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("");
      const payload = {
        name: reviewForm.name.trim(),
        location: reviewForm.location.trim() || "Pune",
        service: reviewForm.service.trim() || "Tathastu Infra",
        quote: reviewForm.quote.trim(),
        rating: Math.min(5, Math.max(1, Number(reviewForm.rating) || 5)),
        initials: reviewForm.initials.trim() || fallbackInitials || "TI",
        image_url: imageUrl || null,
        sort_order: Number(reviewForm.sortOrder) || 0,
        is_published: reviewForm.isPublished,
      };

      const query = reviewForm.id
        ? (supabase as any).from("client_reviews").update(payload).eq("id", reviewForm.id)
        : (supabase as any).from("client_reviews").insert(payload);

      const { error } = await query;
      if (error) throw error;

      toast.success(reviewForm.id ? "Review updated." : "Review added.");
      setReviewForm(emptyReviewForm);
      setReviewPhotoFile(null);
      await fetchReviews();
    } catch (error) {
      console.error(error);
      toast.error("Could not save review. Apply the updated Supabase SQL if this is the first time.");
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteReview(review: AdminReview) {
    if (!window.confirm(`Delete review from "${review.name}"?`)) return;

    setIsSaving(true);
    try {
      const { error } = await (supabase as any).from("client_reviews").delete().eq("id", review.id);
      if (error) throw error;
      toast.success("Review deleted.");
      await fetchReviews();
    } catch (error) {
      console.error(error);
      toast.error("Could not delete review.");
    } finally {
      setIsSaving(false);
    }
  }

  if (!sessionReady) {
    return (
      <section className="grid min-h-screen place-items-center bg-gradient-ivory px-4 pt-28">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </section>
    );
  }

  if (!isAuthed) {
    return (
      <section className="min-h-screen bg-gradient-ivory px-4 pt-32 pb-20 sm:px-6">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="eyebrow">Client Admin</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-tight text-ink sm:text-6xl">
              Manage project photos without touching the website code.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              Add or update project names, descriptions and images. Published projects appear on the
              portfolio sections after saving.
            </p>
          </div>

          <form onSubmit={signIn} className="rounded-3xl bg-card p-6 shadow-luxe ring-1 ring-border sm:p-8">
            <h2 className="font-display text-3xl font-semibold text-ink">Admin login</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Use the admin user created in Supabase Auth.
            </p>
            <div className="mt-7 space-y-5">
              <div>
                <Label htmlFor="admin-email">Email</Label>
                <Input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="mt-2"
                  placeholder="admin@tathastuinfra.in"
                />
              </div>
              <div>
                <Label htmlFor="admin-password">Password</Label>
                <Input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="mt-2"
                  placeholder="••••••••"
                />
              </div>
              <Button disabled={isSaving} className="w-full rounded-full bg-gradient-gold text-ink shadow-gold">
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Login"}
              </Button>
            </div>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-ivory px-4 pt-32 pb-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Tathastu Infra Admin</p>
            <h1 className="mt-3 font-display text-4xl font-medium text-ink sm:text-6xl">
              Project manager.
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Control only the project photo, name, category and description shown across the site.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/admin/careers" className="text-sm font-medium text-muted-foreground hover:text-ink underline underline-offset-4">
              Go to Careers Admin
            </Link>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => supabase.auth.signOut()}
            >
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <form onSubmit={saveProject} className="rounded-3xl bg-card p-6 shadow-luxe ring-1 ring-border sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-display text-3xl font-semibold text-ink">
                {isEditing ? "Edit project" : "Add project"}
              </h2>
              {isEditing && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => {
                    setForm(freshProjectForm());
                    setImageFile(null);
                  }}
                >
                  <Plus className="h-4 w-4" /> New
                </Button>
              )}
            </div>

            <div className="mt-7 space-y-5">
              <div>
                <Label htmlFor="project-title">Project name</Label>
                <Input
                  id="project-title"
                  value={form.title}
                  onChange={(event) => setForm((value) => ({ ...value, title: event.target.value }))}
                  className="mt-2"
                  placeholder="Pride World City"
                  required
                />
              </div>

              <div>
                <Label htmlFor="project-category">Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(value) => setForm((current) => ({ ...current, category: value as ProjectCategory }))}
                >
                  <SelectTrigger id="project-category" className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {form.category === "realty" && (
                <>
                  <div>
                    <Label htmlFor="project-price">Realty price / starting from</Label>
                    <Input
                      id="project-price"
                      value={form.priceLabel}
                      onChange={(event) => setForm((value) => ({ ...value, priceLabel: event.target.value }))}
                      className="mt-2"
                      placeholder="Starting ₹45L / Rent ₹22k per month / Price on request"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      Optional. This appears as a price badge on Realty project cards (e.g. ₹ 69.99 L - 2.65 Cr).
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="realty-category">Property Type</Label>
                      <Select
                        value={form.realtyCategory}
                        onValueChange={(val) => setForm((current) => ({ ...current, realtyCategory: val }))}
                      >
                        <SelectTrigger id="realty-category" className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Residential">Residential</SelectItem>
                          <SelectItem value="Commercial">Commercial</SelectItem>
                          <SelectItem value="Resale">Resale</SelectItem>
                          <SelectItem value="Rental">Rental</SelectItem>
                          <SelectItem value="Plots / Land">Plots / Land</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="realty-type">Construction Status</Label>
                      <Select
                        value={form.realtyType}
                        onValueChange={(val) => setForm((current) => ({ ...current, realtyType: val }))}
                      >
                        <SelectTrigger id="realty-type" className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Under Construction">Under Construction</SelectItem>
                          <SelectItem value="Ready to Move">Ready to Move</SelectItem>
                          <SelectItem value="Upcoming New Launches">Upcoming New Launches</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-2 mb-4">
                    <input
                      type="checkbox"
                      id="project-recommended"
                      checked={form.isRecommended}
                      onChange={(e) => setForm((val) => ({ ...val, isRecommended: e.target.checked }))}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="project-recommended" className="font-semibold text-primary">
                      Highlight as Recommended (Shows first in listings)
                    </Label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <Label htmlFor="realty-neighborhood">Neighborhood Area</Label>
                      <Select
                        value={form.neighborhood}
                        onValueChange={(val) => setForm((current) => ({ ...current, neighborhood: val }))}
                      >
                        <SelectTrigger id="realty-neighborhood" className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pune East">Pune East (Charholi, Manjri, Lohegaon etc.)</SelectItem>
                          <SelectItem value="Pune West">Pune West (Baner, Pashan, Hinjewadi etc.)</SelectItem>
                          <SelectItem value="Pune North">Pune North (Dhanori etc.)</SelectItem>
                          <SelectItem value="Pune South">Pune South (Undri, Kondhwa etc.)</SelectItem>
                          <SelectItem value="Pune Central">Pune Central (Kothrud etc.)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="realty-beds">BHK Overview</Label>
                      <Input
                        id="realty-beds"
                        value={form.beds}
                        onChange={(event) => setForm((value) => ({ ...value, beds: event.target.value }))}
                        className="mt-2"
                        placeholder="e.g. 2, 3 BHK / Shops / Offices"
                      />
                    </div>
                    <div>
                      <Label htmlFor="realty-area">Carpet Area</Label>
                      <Input
                        id="realty-area"
                        value={form.area}
                        onChange={(event) => setForm((value) => ({ ...value, area: event.target.value }))}
                        className="mt-2"
                        placeholder="e.g. 673 to 1,260 Sq.ft"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="realty-tagline">Realty Tagline</Label>
                    <Input
                      id="realty-tagline"
                      value={form.tagline}
                      onChange={(event) => setForm((value) => ({ ...value, tagline: event.target.value }))}
                      className="mt-2"
                      placeholder="e.g. Premium Township Living in Charholi"
                    />
                  </div>

                  <div>
                    <Label htmlFor="realty-highlights">Location Highlights (One per line)</Label>
                    <Textarea
                      id="realty-highlights"
                      value={form.highlightsText}
                      onChange={(event) => setForm((value) => ({ ...value, highlightsText: event.target.value }))}
                      className="mt-2 min-h-20"
                      placeholder="e.g. Pune International Airport (Located 20 minutes away)&#10;Viman Nagar (Connected in 8 mins)"
                    />
                  </div>

                  <div>
                    <Label htmlFor="realty-amenities">Amenities (Comma separated)</Label>
                    <Input
                      id="realty-amenities"
                      value={form.amenitiesText}
                      onChange={(event) => setForm((value) => ({ ...value, amenitiesText: event.target.value }))}
                      className="mt-2"
                      placeholder="e.g. Clubhouse, Swimming Pool, Gym, 24/7 Security"
                    />
                  </div>

                  <div>
                    <Label htmlFor="realty-configs">Unit Configurations Table (One per line, Format: BHK | Size | Price)</Label>
                    <Textarea
                      id="realty-configs"
                      value={form.configsText}
                      onChange={(event) => setForm((value) => ({ ...value, configsText: event.target.value }))}
                      className="mt-2 min-h-24"
                      placeholder="e.g. 2 BHK | 673 Sq.ft | ₹ 69.99 L&#10;3 BHK | 1050 Sq.ft | ₹ 1.25 Cr"
                    />
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="project-description">Description</Label>
                <Textarea
                  id="project-description"
                  value={form.description}
                  onChange={(event) => setForm((value) => ({ ...value, description: event.target.value }))}
                  className="mt-2 min-h-28"
                  placeholder="Short premium description for this project..."
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <Label htmlFor="project-location">Location</Label>
                  <Input
                    id="project-location"
                    value={form.location}
                    onChange={(event) => setForm((value) => ({ ...value, location: event.target.value }))}
                    className="mt-2"
                    placeholder="Lohegaon, Pune"
                  />
                </div>
                <div>
                  <Label htmlFor="project-year">Year</Label>
                  <Input
                    id="project-year"
                    type="number"
                    value={form.year}
                    onChange={(event) => setForm((value) => ({ ...value, year: event.target.value }))}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="project-order">Order</Label>
                  <Input
                    id="project-order"
                    type="number"
                    value={form.sortOrder}
                    onChange={(event) => setForm((value) => ({ ...value, sortOrder: event.target.value }))}
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="project-image">Project photo</Label>
                <label
                  htmlFor="project-image"
                  className="mt-2 flex min-h-44 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed border-primary/40 bg-secondary/60 text-center transition-colors hover:bg-secondary"
                >
                  {previewImage ? (
                    <img src={previewImage} alt="Project preview" className="h-56 w-full object-cover" />
                  ) : (
                    <span className="flex flex-col items-center gap-2 p-8 text-sm text-muted-foreground">
                      <ImagePlus className="h-8 w-8 text-primary" />
                      Upload a photo
                    </span>
                  )}
                </label>
                <Input
                  id="project-image"
                  type="file"
                  accept="image/*"
                  onChange={(event) => setImageFile(event.target.files?.[0] || null)}
                  className="sr-only"
                />
              </div>

              <div>
                <Label htmlFor="project-gallery">Popup gallery photos</Label>
                <Input
                  id="project-gallery"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(event) =>
                    setForm((value) => ({
                      ...value,
                      galleryFiles: Array.from(event.target.files || []),
                    }))
                  }
                  className="mt-2"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Optional. These appear inside the project popup when visitors open the project.
                </p>

                {(form.galleryImages.length > 0 || form.galleryFiles.length > 0) && (
                  <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {form.galleryImages.map((image, index) => (
                      <div key={image} className="relative overflow-hidden rounded-2xl ring-1 ring-border">
                        <img src={image} alt={`Gallery ${index + 1}`} className="h-24 w-full object-cover" />
                        <button
                          type="button"
                          className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-ink/80 text-ivory"
                          onClick={() =>
                            setForm((value) => ({
                              ...value,
                              galleryImages: value.galleryImages.filter((item) => item !== image),
                            }))
                          }
                          aria-label="Remove gallery image"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    {form.galleryFiles.map((file, index) => (
                      <div key={`${file.name}-${index}`} className="overflow-hidden rounded-2xl ring-1 ring-border">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`New gallery ${index + 1}`}
                          className="h-24 w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <label className="flex items-center justify-between rounded-2xl bg-secondary/70 px-4 py-3 text-sm font-medium text-ink">
                Show on website
                <input
                  type="checkbox"
                  checked={form.isPublished}
                  onChange={(event) => setForm((value) => ({ ...value, isPublished: event.target.checked }))}
                  className="h-4 w-4 accent-primary"
                />
              </label>

              <Button disabled={isSaving} className="w-full rounded-full bg-gradient-gold text-ink shadow-gold">
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {isEditing ? "Save changes" : "Add project"}
              </Button>
            </div>
          </form>

          <div className="rounded-3xl bg-card p-6 shadow-luxe ring-1 ring-border sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl font-semibold text-ink">Website projects</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {projects.length} managed project{projects.length === 1 ? "" : "s"}
                </p>
              </div>
              <Button variant="outline" className="rounded-full" onClick={fetchProjects}>
                Refresh
              </Button>
            </div>

            {isLoading ? (
              <div className="grid min-h-72 place-items-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="mt-6 grid gap-4">
                <AnimatePresence>
                  {projects.map((project) => (
                    <motion.article
                      key={project.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="grid overflow-hidden rounded-3xl bg-secondary/60 ring-1 ring-border sm:grid-cols-[180px_1fr]"
                    >
                      <img src={project.imageUrl} alt={project.title} className="h-48 w-full object-cover sm:h-full" />
                      <div className="p-5">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.22em] text-primary">
                              {project.category} {project.isPublished ? "" : "- hidden"}
                            </p>
                            <h3 className="mt-1 font-display text-2xl font-semibold text-ink">
                              {project.title}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {project.location} - {project.year}
                            </p>
                            {project.priceLabel && (
                              <p className="mt-2 inline-flex rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                                {project.priceLabel}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="icon"
                              variant="outline"
                              className="rounded-full"
                              onClick={() => {
                                setForm(formFromProject(project));
                                setImageFile(null);
                              }}
                              aria-label={`Edit ${project.title}`}
                            >
                              <Edit3 className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="outline"
                              className="rounded-full text-destructive hover:text-destructive"
                              onClick={() => deleteProject(project)}
                              aria-label={`Delete ${project.title}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{project.blurb}</p>
                        {project.galleryImages?.length ? (
                          <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-primary">
                            {project.galleryImages.length} popup gallery photo
                            {project.galleryImages.length === 1 ? "" : "s"}
                          </p>
                        ) : null}
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>

                {projects.length === 0 && (
                  <div className="rounded-3xl border border-dashed border-primary/30 p-10 text-center">
                    <h3 className="font-display text-2xl font-semibold text-ink">No projects yet</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Add the first project and it will appear across the website.
                    </p>
                    <ArrowRight className="mx-auto mt-4 h-5 w-5 text-primary" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <form onSubmit={savePartner} className="rounded-3xl bg-card p-6 shadow-luxe ring-1 ring-border sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="eyebrow">Future Section</p>
                <h2 className="mt-2 font-display text-3xl font-semibold text-ink">
                  {partnerForm.id ? "Edit partner" : "Add partner"}
                </h2>
              </div>
              {partnerForm.id && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => {
                    setPartnerForm(emptyPartnerForm);
                    setPartnerLogoFile(null);
                  }}
                >
                  <Plus className="h-4 w-4" /> New
                </Button>
              )}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Prepare trusted partners for the construction page. Add logos, descriptions and optional
              links now; we can display them publicly whenever the client is ready.
            </p>

            <div className="mt-7 space-y-5">
              <div>
                <Label htmlFor="partner-name">Partner name</Label>
                <Input
                  id="partner-name"
                  value={partnerForm.name}
                  onChange={(event) => setPartnerForm((value) => ({ ...value, name: event.target.value }))}
                  className="mt-2"
                  placeholder="Civil & RCC Partner"
                  required
                />
              </div>

              <div>
                <Label htmlFor="partner-description">Description</Label>
                <Textarea
                  id="partner-description"
                  value={partnerForm.description}
                  onChange={(event) => setPartnerForm((value) => ({ ...value, description: event.target.value }))}
                  className="mt-2 min-h-24"
                  placeholder="Short description of this partner's role..."
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="partner-url">Website / profile link</Label>
                  <Input
                    id="partner-url"
                    value={partnerForm.websiteUrl}
                    onChange={(event) => setPartnerForm((value) => ({ ...value, websiteUrl: event.target.value }))}
                    className="mt-2"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <Label htmlFor="partner-order">Order</Label>
                  <Input
                    id="partner-order"
                    type="number"
                    value={partnerForm.sortOrder}
                    onChange={(event) => setPartnerForm((value) => ({ ...value, sortOrder: event.target.value }))}
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="partner-logo">Partner logo / image</Label>
                <label
                  htmlFor="partner-logo"
                  className="mt-2 flex min-h-36 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed border-primary/40 bg-secondary/60 text-center transition-colors hover:bg-secondary"
                >
                  {partnerPreviewImage ? (
                    <img src={partnerPreviewImage} alt="Partner preview" className="h-44 w-full object-cover" />
                  ) : (
                    <span className="flex flex-col items-center gap-2 p-8 text-sm text-muted-foreground">
                      <Handshake className="h-8 w-8 text-primary" />
                      Upload a logo or partner image
                    </span>
                  )}
                </label>
                <Input
                  id="partner-logo"
                  type="file"
                  accept="image/*"
                  onChange={(event) => setPartnerLogoFile(event.target.files?.[0] || null)}
                  className="sr-only"
                />
              </div>

              <label className="flex items-center justify-between rounded-2xl bg-secondary/70 px-4 py-3 text-sm font-medium text-ink">
                Active partner
                <input
                  type="checkbox"
                  checked={partnerForm.isActive}
                  onChange={(event) => setPartnerForm((value) => ({ ...value, isActive: event.target.checked }))}
                  className="h-4 w-4 accent-primary"
                />
              </label>

              <Button disabled={isSaving} className="w-full rounded-full bg-gradient-gold text-ink shadow-gold">
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {partnerForm.id ? "Save partner" : "Add partner"}
              </Button>
            </div>
          </form>

          <div className="rounded-3xl bg-card p-6 shadow-luxe ring-1 ring-border sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl font-semibold text-ink">Partners</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {partners.length} partner{partners.length === 1 ? "" : "s"} prepared
                </p>
              </div>
              <Button variant="outline" className="rounded-full" onClick={fetchPartners}>
                Refresh
              </Button>
            </div>

            <div className="mt-6 grid gap-4">
              <AnimatePresence>
                {partners.map((partner) => (
                  <motion.article
                    key={partner.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid overflow-hidden rounded-3xl bg-secondary/60 ring-1 ring-border sm:grid-cols-[150px_1fr]"
                  >
                    <div className="grid min-h-36 place-items-center bg-card">
                      {partner.logoUrl ? (
                        <img src={partner.logoUrl} alt={partner.name} className="h-full w-full object-cover" />
                      ) : (
                        <Handshake className="h-8 w-8 text-primary" />
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.22em] text-primary">
                            {partner.isActive ? "active" : "hidden"}
                          </p>
                          <h3 className="mt-1 font-display text-2xl font-semibold text-ink">
                            {partner.name}
                          </h3>
                          {partner.websiteUrl && (
                            <a
                              href={partner.websiteUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-primary underline-offset-4 hover:underline"
                            >
                              {partner.websiteUrl}
                            </a>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="rounded-full"
                            onClick={() => {
                              setPartnerForm(formFromPartner(partner));
                              setPartnerLogoFile(null);
                            }}
                            aria-label={`Edit ${partner.name}`}
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="outline"
                            className="rounded-full text-destructive hover:text-destructive"
                            onClick={() => deletePartner(partner)}
                            aria-label={`Delete ${partner.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                        {partner.description || "No description yet."}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>

              {partners.length === 0 && (
                <div className="rounded-3xl border border-dashed border-primary/30 p-10 text-center">
                  <Handshake className="mx-auto h-8 w-8 text-primary" />
                  <h3 className="mt-4 font-display text-2xl font-semibold text-ink">
                    No partners added yet
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Add partner details here after running the updated Supabase SQL.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <form
            onSubmit={saveBankingPartner}
            className="rounded-3xl bg-card p-6 shadow-luxe ring-1 ring-border sm:p-8"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="eyebrow">Loan Support</p>
                <h2 className="mt-2 font-display text-3xl font-semibold text-ink">
                  {bankingPartnerForm.id ? "Edit bank" : "Add bank"}
                </h2>
              </div>
              {bankingPartnerForm.id && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => {
                    setBankingPartnerForm(emptyBankingPartnerForm);
                    setBankingLogoFile(null);
                  }}
                >
                  <Plus className="h-4 w-4" /> New
                </Button>
              )}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Manage the banking partners shown below construction partners. Use this for HDFC,
              SBI, Axis, ICICI, IDBI and other finance support logos.
            </p>

            <div className="mt-7 space-y-5">
              <div>
                <Label htmlFor="bank-name">Bank name</Label>
                <Input
                  id="bank-name"
                  value={bankingPartnerForm.name}
                  onChange={(event) =>
                    setBankingPartnerForm((value) => ({ ...value, name: event.target.value }))
                  }
                  className="mt-2"
                  placeholder="HDFC Bank"
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="bank-url">Website / loan page link</Label>
                  <Input
                    id="bank-url"
                    value={bankingPartnerForm.websiteUrl}
                    onChange={(event) =>
                      setBankingPartnerForm((value) => ({ ...value, websiteUrl: event.target.value }))
                    }
                    className="mt-2"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <Label htmlFor="bank-order">Order</Label>
                  <Input
                    id="bank-order"
                    type="number"
                    value={bankingPartnerForm.sortOrder}
                    onChange={(event) =>
                      setBankingPartnerForm((value) => ({ ...value, sortOrder: event.target.value }))
                    }
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bank-logo">Bank logo</Label>
                <label
                  htmlFor="bank-logo"
                  className="mt-2 flex min-h-36 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed border-primary/40 bg-secondary/60 text-center transition-colors hover:bg-secondary"
                >
                  {bankingPreviewImage ? (
                    <img src={bankingPreviewImage} alt="Bank logo preview" className="h-44 w-full object-contain p-6" />
                  ) : (
                    <span className="flex flex-col items-center gap-2 p-8 text-sm text-muted-foreground">
                      <Handshake className="h-8 w-8 text-primary" />
                      Upload bank logo
                    </span>
                  )}
                </label>
                <Input
                  id="bank-logo"
                  type="file"
                  accept="image/*"
                  onChange={(event) => setBankingLogoFile(event.target.files?.[0] || null)}
                  className="sr-only"
                />
              </div>

              <label className="flex items-center justify-between rounded-2xl bg-secondary/70 px-4 py-3 text-sm font-medium text-ink">
                Show on website
                <input
                  type="checkbox"
                  checked={bankingPartnerForm.isActive}
                  onChange={(event) =>
                    setBankingPartnerForm((value) => ({ ...value, isActive: event.target.checked }))
                  }
                  className="h-4 w-4 accent-primary"
                />
              </label>

              <Button disabled={isSaving} className="w-full rounded-full bg-gradient-gold text-ink shadow-gold">
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {bankingPartnerForm.id ? "Save bank" : "Add bank"}
              </Button>
            </div>
          </form>

          <div className="rounded-3xl bg-card p-6 shadow-luxe ring-1 ring-border sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl font-semibold text-ink">Banking Partners</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {bankingPartners.length} bank{bankingPartners.length === 1 ? "" : "s"} managed
                </p>
              </div>
              <Button variant="outline" className="rounded-full" onClick={fetchBankingPartners}>
                Refresh
              </Button>
            </div>

            <div className="mt-6 grid gap-4">
              <AnimatePresence>
                {bankingPartners.map((partner) => (
                  <motion.article
                    key={partner.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid overflow-hidden rounded-3xl bg-secondary/60 ring-1 ring-border sm:grid-cols-[150px_1fr]"
                  >
                    <div className="grid min-h-36 place-items-center bg-card p-4">
                      {partner.logoUrl ? (
                        <img src={partner.logoUrl} alt={partner.name} className="max-h-24 max-w-full object-contain" />
                      ) : (
                        <span className="font-display text-2xl font-semibold text-primary">
                          {partner.name}
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.22em] text-primary">
                            {partner.isActive ? "active" : "hidden"}
                          </p>
                          <h3 className="mt-1 font-display text-2xl font-semibold text-ink">
                            {partner.name}
                          </h3>
                          {partner.websiteUrl && (
                            <a
                              href={partner.websiteUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-primary underline-offset-4 hover:underline"
                            >
                              {partner.websiteUrl}
                            </a>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="rounded-full"
                            onClick={() => {
                              setBankingPartnerForm(formFromBankingPartner(partner));
                              setBankingLogoFile(null);
                            }}
                            aria-label={`Edit ${partner.name}`}
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="outline"
                            className="rounded-full text-destructive hover:text-destructive"
                            onClick={() => deleteBankingPartner(partner)}
                            aria-label={`Delete ${partner.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>

              {bankingPartners.length === 0 && (
                <div className="rounded-3xl border border-dashed border-primary/30 p-10 text-center">
                  <Handshake className="mx-auto h-8 w-8 text-primary" />
                  <h3 className="mt-4 font-display text-2xl font-semibold text-ink">
                    No banking partners added yet
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Add bank logos here after running the updated Supabase SQL.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <form onSubmit={saveReview} className="rounded-3xl bg-card p-6 shadow-luxe ring-1 ring-border sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="eyebrow">Client Proof</p>
                <h2 className="mt-2 font-display text-3xl font-semibold text-ink">
                  {reviewForm.id ? "Edit review" : "Add review"}
                </h2>
              </div>
              {reviewForm.id && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => {
                    setReviewForm(emptyReviewForm);
                    setReviewPhotoFile(null);
                  }}
                >
                  <Plus className="h-4 w-4" /> New
                </Button>
              )}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Add genuine client reviews with optional photos. Published reviews appear on the home
              page testimonial section.
            </p>

            <div className="mt-7 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="review-name">Client name</Label>
                  <Input
                    id="review-name"
                    value={reviewForm.name}
                    onChange={(event) => setReviewForm((value) => ({ ...value, name: event.target.value }))}
                    className="mt-2"
                    placeholder="Mr. Pawar"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="review-service">Service</Label>
                  <Input
                    id="review-service"
                    value={reviewForm.service}
                    onChange={(event) => setReviewForm((value) => ({ ...value, service: event.target.value }))}
                    className="mt-2"
                    placeholder="Construction / Realty / Interior"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <Label htmlFor="review-location">Location</Label>
                  <Input
                    id="review-location"
                    value={reviewForm.location}
                    onChange={(event) => setReviewForm((value) => ({ ...value, location: event.target.value }))}
                    className="mt-2"
                    placeholder="Lohegaon, Pune"
                  />
                </div>
                <div>
                  <Label htmlFor="review-rating">Rating</Label>
                  <Select
                    value={reviewForm.rating}
                    onValueChange={(value) => setReviewForm((current) => ({ ...current, rating: value }))}
                  >
                    <SelectTrigger id="review-rating" className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <SelectItem key={rating} value={String(rating)}>
                          {rating} star{rating === 1 ? "" : "s"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="review-order">Order</Label>
                  <Input
                    id="review-order"
                    type="number"
                    value={reviewForm.sortOrder}
                    onChange={(event) => setReviewForm((value) => ({ ...value, sortOrder: event.target.value }))}
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="review-quote">Review text</Label>
                <Textarea
                  id="review-quote"
                  value={reviewForm.quote}
                  onChange={(event) => setReviewForm((value) => ({ ...value, quote: event.target.value }))}
                  className="mt-2 min-h-28"
                  placeholder="Client review shown on the homepage..."
                  required
                />
              </div>

              <div>
                <Label htmlFor="review-initials">Initials fallback</Label>
                <Input
                  id="review-initials"
                  value={reviewForm.initials}
                  onChange={(event) => setReviewForm((value) => ({ ...value, initials: event.target.value }))}
                  className="mt-2"
                  placeholder="MP"
                  maxLength={4}
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Used only when no review photo is uploaded.
                </p>
              </div>

              <div>
                <Label htmlFor="review-photo">Client photo</Label>
                <label
                  htmlFor="review-photo"
                  className="mt-2 flex min-h-36 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed border-primary/40 bg-secondary/60 text-center transition-colors hover:bg-secondary"
                >
                  {reviewPreviewImage ? (
                    <img src={reviewPreviewImage} alt="Review preview" className="h-48 w-full object-cover" />
                  ) : (
                    <span className="flex flex-col items-center gap-2 p-8 text-sm text-muted-foreground">
                      <ImagePlus className="h-8 w-8 text-primary" />
                      Upload review photo
                    </span>
                  )}
                </label>
                <Input
                  id="review-photo"
                  type="file"
                  accept="image/*"
                  onChange={(event) => setReviewPhotoFile(event.target.files?.[0] || null)}
                  className="sr-only"
                />
              </div>

              <label className="flex items-center justify-between rounded-2xl bg-secondary/70 px-4 py-3 text-sm font-medium text-ink">
                Show on website
                <input
                  type="checkbox"
                  checked={reviewForm.isPublished}
                  onChange={(event) => setReviewForm((value) => ({ ...value, isPublished: event.target.checked }))}
                  className="h-4 w-4 accent-primary"
                />
              </label>

              <Button disabled={isSaving} className="w-full rounded-full bg-gradient-gold text-ink shadow-gold">
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {reviewForm.id ? "Save review" : "Add review"}
              </Button>
            </div>
          </form>

          <div className="rounded-3xl bg-card p-6 shadow-luxe ring-1 ring-border sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl font-semibold text-ink">Reviews</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {reviews.length} review{reviews.length === 1 ? "" : "s"} managed
                </p>
              </div>
              <Button variant="outline" className="rounded-full" onClick={fetchReviews}>
                Refresh
              </Button>
            </div>

            <div className="mt-6 grid gap-4">
              <AnimatePresence>
                {reviews.map((review) => (
                  <motion.article
                    key={review.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid overflow-hidden rounded-3xl bg-secondary/60 ring-1 ring-border sm:grid-cols-[150px_1fr]"
                  >
                    <div className="grid min-h-36 place-items-center bg-card">
                      {review.imageUrl ? (
                        <img src={review.imageUrl} alt={review.name} className="h-full w-full object-cover" />
                      ) : (
                        <span className="grid h-20 w-20 place-items-center rounded-full bg-gradient-gold font-display text-xl font-semibold text-ink">
                          {review.initials || "TI"}
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.22em] text-primary">
                            {review.isPublished ? "published" : "hidden"} - {review.service}
                          </p>
                          <h3 className="mt-1 font-display text-2xl font-semibold text-ink">
                            {review.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">{review.location}</p>
                          <div className="mt-2 flex gap-1 text-primary">
                            {Array.from({ length: 5 }).map((_, starIndex) => (
                              <Star
                                key={starIndex}
                                className={`h-4 w-4 ${starIndex < review.rating ? "fill-primary" : "text-primary/25"}`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="rounded-full"
                            onClick={() => {
                              setReviewForm(formFromReview(review));
                              setReviewPhotoFile(null);
                            }}
                            aria-label={`Edit review from ${review.name}`}
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="outline"
                            className="rounded-full text-destructive hover:text-destructive"
                            onClick={() => deleteReview(review)}
                            aria-label={`Delete review from ${review.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                        "{review.quote}"
                      </p>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>

              {reviews.length === 0 && (
                <div className="rounded-3xl border border-dashed border-primary/30 p-10 text-center">
                  <Star className="mx-auto h-8 w-8 text-primary" />
                  <h3 className="mt-4 font-display text-2xl font-semibold text-ink">
                    No reviews added yet
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Add review details here after running the updated Supabase SQL.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
