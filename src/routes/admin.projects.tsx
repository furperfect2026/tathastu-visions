import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Edit3,
  ImagePlus,
  Loader2,
  LogOut,
  Plus,
  Save,
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

type ProjectForm = {
  id?: string;
  title: string;
  description: string;
  category: ProjectCategory;
  location: string;
  year: string;
  sortOrder: string;
  imageUrl: string;
  isPublished: boolean;
};

const emptyForm: ProjectForm = {
  title: "",
  description: "",
  category: "construction",
  location: "Lohegaon, Pune",
  year: String(new Date().getFullYear()),
  sortOrder: "0",
  imageUrl: "",
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
    blurb: row.description || "",
    sortOrder: row.sort_order || 0,
    isPublished: row.is_published !== false,
  };
}

function formFromProject(project: AdminProject): ProjectForm {
  return {
    id: project.id,
    title: project.title,
    description: project.blurb,
    category: project.category,
    location: project.location,
    year: String(project.year),
    sortOrder: String(project.sortOrder),
    imageUrl: project.imageUrl,
    isPublished: project.isPublished,
  };
}

function AdminProjectsPage() {
  const [sessionReady, setSessionReady] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [form, setForm] = useState<ProjectForm>(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isEditing = Boolean(form.id);
  const previewImage = useMemo(
    () => (imageFile ? URL.createObjectURL(imageFile) : form.imageUrl),
    [form.imageUrl, imageFile],
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
    if (isAuthed) fetchProjects();
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

  async function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success("Welcome to the Tathastu Infra admin panel.");
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Check the admin email and password.");
    } finally {
      setIsSaving(false);
    }
  }

  async function uploadImage(projectTitle: string) {
    if (!imageFile) return form.imageUrl;

    const ext = imageFile.name.split(".").pop() || "jpg";
    const safeTitle = projectTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const path = `${Date.now()}-${safeTitle || "project"}.${ext}`;

    const { error } = await (supabase as any).storage
      .from("project-images")
      .upload(path, imageFile, { cacheControl: "31536000", upsert: false });

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
      const imageUrl = await uploadImage(form.title);
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        category: form.category,
        location: form.location.trim() || "Pune",
        year: Number(form.year) || new Date().getFullYear(),
        image_url: imageUrl,
        sort_order: Number(form.sortOrder) || 0,
        is_published: form.isPublished,
      };

      const query = form.id
        ? (supabase as any).from("projects").update(payload).eq("id", form.id)
        : (supabase as any).from("projects").insert(payload);

      const { error } = await query;
      if (error) throw error;

      toast.success(form.id ? "Project updated." : "Project added.");
      setForm(emptyForm);
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
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => supabase.auth.signOut()}
          >
            <LogOut className="h-4 w-4" /> Logout
          </Button>
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
                    setForm(emptyForm);
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
      </div>
    </section>
  );
}
