import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, LogOut, Plus, Trash2, Edit3, Save, X, Download, Briefcase, FileText } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/careers")({
  head: () => ({
    meta: [
      { title: "Careers Admin | Tathastu Infra" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminCareersPage,
});

type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  description: string;
  requirements: string | null;
  is_active: boolean;
  created_at: string;
};

type Application = {
  id: string;
  job_id: string | null;
  name: string;
  email: string;
  phone: string | null;
  experience_years: number | null;
  message: string | null;
  resume_url: string;
  created_at: string;
  job?: { title: string }; // joined data
};

function AdminCareersPage() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"jobs" | "applications">("jobs");

  // Jobs State
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isEditingJob, setIsEditingJob] = useState(false);
  const [jobForm, setJobForm] = useState<Partial<Job>>({});

  // Applications State
  const [applications, setApplications] = useState<Application[]>([]);

  // Auth Login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (isMounted) {
        setIsAuthed(!!session);
        if (!session) setIsLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (isMounted) setIsAuthed(!!session);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isAuthed) {
      fetchJobs();
      fetchApplications();
    }
  }, [isAuthed]);

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    setIsLoggingIn(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setIsLoggingIn(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Welcome back");
    }
  }

  async function fetchJobs() {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setJobs(data as Job[]);
    } catch (err: any) {
      toast.error("Failed to fetch jobs");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchApplications() {
    try {
      const { data, error } = await supabase
        .from("job_applications")
        .select(`
          *,
          job:jobs(title)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setApplications(data as any[]);
    } catch (err: any) {
      toast.error("Failed to fetch applications");
      console.error(err);
    }
  }

  async function saveJob() {
    if (!jobForm.title || !jobForm.department || !jobForm.location || !jobForm.description) {
      toast.error("Please fill all required fields");
      return;
    }
    
    try {
      if (jobForm.id) {
        // Update
        const { error } = await supabase
          .from("jobs")
          .update(jobForm as any)
          .eq("id", jobForm.id);
        if (error) throw error;
        toast.success("Job updated");
      } else {
        // Insert
        const { error } = await supabase
          .from("jobs")
          .insert([jobForm as any]);
        if (error) throw error;
        toast.success("Job posted");
      }
      setIsEditingJob(false);
      setJobForm({});
      fetchJobs();
    } catch (err: any) {
      toast.error("Failed to save job");
      console.error(err);
    }
  }

  async function deleteJob(id: string) {
    if (!confirm("Are you sure you want to delete this job posting?")) return;
    try {
      const { error } = await supabase.from("jobs").delete().eq("id", id);
      if (error) throw error;
      toast.success("Job deleted");
      fetchJobs();
    } catch (err: any) {
      toast.error("Failed to delete job");
    }
  }

  if (isLoading) {
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
            <p className="eyebrow">Careers Admin</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-tight text-ink sm:text-6xl">
              Manage Job Postings & Applications.
            </h1>
          </div>

          <form onSubmit={signIn} className="rounded-3xl bg-card p-6 shadow-luxe ring-1 ring-border sm:p-8">
            <h2 className="font-display text-3xl font-semibold text-ink">Admin login</h2>
            <div className="mt-7 space-y-5">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 bg-background"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 bg-background"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoggingIn}>
                {isLoggingIn ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
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
            <p className="eyebrow">Careers Admin</p>
            <h1 className="mt-3 font-display text-4xl font-medium text-ink sm:text-6xl">
              Job Postings & Applications.
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/admin/projects" className="text-sm font-medium text-muted-foreground hover:text-ink underline underline-offset-4">
              Go to Projects Admin
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

        <div className="mt-12 flex gap-4 border-b border-border">
          <button 
            className={`pb-4 px-2 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'jobs' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-ink'}`}
            onClick={() => setActiveTab("jobs")}
          >
            <Briefcase className="w-4 h-4 inline-block mr-2" />
            Job Postings
          </button>
          <button 
            className={`pb-4 px-2 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'applications' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-ink'}`}
            onClick={() => setActiveTab("applications")}
          >
            <FileText className="w-4 h-4 inline-block mr-2" />
            Applications
          </button>
        </div>

        {activeTab === "jobs" && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-ink">Manage Jobs</h2>
              {!isEditingJob && (
                <Button onClick={() => { setJobForm({ is_active: true }); setIsEditingJob(true); }}>
                  <Plus className="w-4 h-4 mr-2" /> New Job
                </Button>
              )}
            </div>

            {isEditingJob ? (
              <div className="bg-card p-6 md:p-8 rounded-3xl shadow-luxe border border-border mb-8">
                <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
                  <h3 className="text-xl font-bold text-ink">{jobForm.id ? "Edit Job" : "Create Job"}</h3>
                  <button onClick={() => setIsEditingJob(false)} className="text-muted-foreground hover:text-ink"><X className="w-5 h-5"/></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <Label>Job Title *</Label>
                    <Input className="mt-2 bg-background" value={jobForm.title || ""} onChange={e => setJobForm({...jobForm, title: e.target.value})} />
                  </div>
                  <div>
                    <Label>Department *</Label>
                    <Input className="mt-2 bg-background" value={jobForm.department || ""} onChange={e => setJobForm({...jobForm, department: e.target.value})} placeholder="e.g. Engineering, Design" />
                  </div>
                  <div>
                    <Label>Location *</Label>
                    <Input className="mt-2 bg-background" value={jobForm.location || ""} onChange={e => setJobForm({...jobForm, location: e.target.value})} placeholder="e.g. Pune, Maharashtra" />
                  </div>
                  <div className="flex items-center gap-3 mt-8">
                    <input type="checkbox" id="isActive" checked={jobForm.is_active !== false} onChange={e => setJobForm({...jobForm, is_active: e.target.checked})} className="w-4 h-4" />
                    <Label htmlFor="isActive" className="text-base cursor-pointer">Active (Visible to public)</Label>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <Label>Job Description *</Label>
                    <Textarea rows={4} className="mt-2 bg-background resize-none" value={jobForm.description || ""} onChange={e => setJobForm({...jobForm, description: e.target.value})} />
                  </div>
                </div>
                <div className="mt-8 flex justify-end gap-4">
                  <Button variant="outline" onClick={() => setIsEditingJob(false)}>Cancel</Button>
                  <Button onClick={saveJob}><Save className="w-4 h-4 mr-2"/> Save Job</Button>
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                {jobs.map(job => (
                  <div key={job.id} className="bg-card p-5 rounded-2xl border border-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`w-2 h-2 rounded-full ${job.is_active ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{job.department} • {job.location}</span>
                      </div>
                      <h3 className="text-xl font-bold text-ink">{job.title}</h3>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button variant="outline" size="sm" onClick={() => { setJobForm(job); setIsEditingJob(true); }}>
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => deleteJob(job.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {jobs.length === 0 && <p className="text-muted-foreground">No jobs posted yet.</p>}
              </div>
            )}
          </div>
        )}

        {activeTab === "applications" && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-ink mb-6">Job Applications</h2>
            <div className="overflow-x-auto bg-card rounded-2xl border border-border shadow-luxe">
              <table className="w-full text-left text-sm">
                <thead className="bg-secondary/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-ink">Date</th>
                    <th className="px-6 py-4 font-semibold text-ink">Applicant</th>
                    <th className="px-6 py-4 font-semibold text-ink">Role</th>
                    <th className="px-6 py-4 font-semibold text-ink">Experience</th>
                    <th className="px-6 py-4 font-semibold text-ink">Resume</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {applications.map(app => (
                    <tr key={app.id} className="hover:bg-secondary/20 transition-colors">
                      <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                        {new Date(app.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-ink">{app.name}</div>
                        <div className="text-muted-foreground">{app.email}</div>
                        <div className="text-muted-foreground text-xs">{app.phone}</div>
                      </td>
                      <td className="px-6 py-4 font-medium text-ink">
                        {app.job?.title || "Unknown Role"}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {app.experience_years !== null ? `${app.experience_years} yrs` : '-'}
                      </td>
                      <td className="px-6 py-4">
                        <a href={app.resume_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline font-medium">
                          <Download className="w-4 h-4" /> View Resume
                        </a>
                      </td>
                    </tr>
                  ))}
                  {applications.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                        No applications received yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
