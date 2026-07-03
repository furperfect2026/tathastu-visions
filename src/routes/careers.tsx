import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Briefcase, Building2, ChevronRight, GraduationCap, Heart, MapPin, Upload, X, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import teamBg from "@/assets/careers_team_bg.png";
import luxuryImage from "@/assets/interior-1.jpg";
import craftsmanshipImage from "@/assets/construction-1.jpg";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers | Tathastu Infra" },
      { name: "description", content: "Join the team at Tathastu Infra. We are looking for passionate individuals to build the future of real estate, construction, and interiors." },
    ],
  }),
  component: CareersPage,
});

type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  description: string;
  requirements: string | null;
  is_active: boolean;
};

function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Application Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("");
  const [message, setMessage] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    setSubmitting(true);
    setError("");

    try {
      let publicUrl = "";

      // 1. Upload Resume only if provided
      if (resume) {
        const fileExt = resume.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `resumes/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(filePath, resume);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from('resumes')
          .getPublicUrl(filePath);
          
        publicUrl = data.publicUrl;
      }

      // 2. Submit Application
      const { error: insertError } = await supabase
        .from('job_applications')
        .insert({
          job_id: selectedJob.id,
          name,
          email,
          phone,
          experience_years: experience ? parseInt(experience) : null,
          message,
          resume_url: publicUrl,
        });

      if (insertError) throw insertError;

      setSuccess(true);
    } catch (err: any) {
      console.error("Application error:", err);
      setError(err.message || "Something went wrong submitting your application.");
    } finally {
      setSubmitting(false);
    }
  };

  const closeForm = () => {
    setSelectedJob(null);
    setSuccess(false);
    setError("");
    setName("");
    setEmail("");
    setPhone("");
    setExperience("");
    setMessage("");
    setResume(null);
  };

  return (
    <div className="bg-ink min-h-screen text-ivory pb-24 selection:bg-amber-500/30">
      {/* Hero Section with Background Image */}
      <section className="relative pt-40 pb-32 mb-24 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img src={teamBg} alt="Team collaboration" className="w-full h-full object-cover opacity-70 object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink" />
        </div>
        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <Reveal>
            <div className="max-w-4xl mx-auto text-center">
              <span className="text-amber-500 font-semibold tracking-wider uppercase text-sm mb-4 inline-block">Join Tathastu Infra</span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-8 leading-[1.1]">
                Build the <span className="text-gradient-gold italic">Future</span> With Us.
              </h1>
              <p className="text-lg md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                We don't just construct buildings—we create legacies. Join a team of visionaries dedicated to elevating the standard of luxury living.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Core Values / Benefits Grid */}
      <section className="container mx-auto px-4 lg:px-8 mb-32">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Why Tathastu?</h2>
              <p className="text-white/60 max-w-xl text-lg">
                We foster a culture of excellence, empowering our team to build iconic spaces and rewarding careers.
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Building2 className="w-8 h-8 text-amber-500 mb-6" />,
                title: "Scale & Impact",
                desc: "Work on landmark projects that shape city skylines and redefine luxury."
              },
              {
                icon: <GraduationCap className="w-8 h-8 text-amber-500 mb-6" />,
                title: "Continuous Growth",
                desc: "Uncapped professional development, mentorship, and leadership roles."
              },
              {
                icon: <Heart className="w-8 h-8 text-amber-500 mb-6" />,
                title: "Health & Wellbeing",
                desc: "Comprehensive health coverage and wellness programs for your family."
              },
              {
                icon: <Briefcase className="w-8 h-8 text-amber-500 mb-6" />,
                title: "Premium Culture",
                desc: "A collaborative, high-performance environment rewarding true excellence."
              }
            ].map((benefit, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col items-start hover:border-amber-500/50 hover:bg-white/10 transition-all duration-300 group">
                <div className="p-3 bg-amber-500/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white mt-2">{benefit.title}</h3>
                <p className="text-base text-white/60 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>



      {/* Open Positions Section */}
      <section className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <Reveal>
          <div className="text-center mb-16 border-b border-white/10 pb-10">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Open Positions</h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Discover your next career move. We are always looking for exceptional talent to join our ranks.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-24 bg-white/5 rounded-[2.5rem] border border-white/10 shadow-2xl">
              <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-10 h-10 text-amber-500" />
              </div>
              <h3 className="text-3xl font-display font-bold text-white">No open positions at the moment.</h3>
              <p className="text-white/60 mt-4 text-lg">Please check back later or follow our LinkedIn page for updates.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {jobs.map((job) => (
                <div key={job.id} className="group bg-white/5 hover:bg-white/10 border border-white/10 p-8 md:p-10 rounded-[2rem] flex flex-col md:flex-row md:items-center justify-between gap-8 transition-all duration-300 hover:border-amber-500/30 hover:shadow-xl hover:shadow-amber-500/5">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-xs uppercase tracking-widest font-bold bg-amber-500 text-ink px-3 py-1 rounded-full">
                        {job.department}
                      </span>
                      <span className="text-sm text-white/60 flex items-center gap-1.5 font-medium">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                    </div>
                    <h3 className="text-3xl font-display font-bold text-white mb-3 group-hover:text-amber-500 transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-white/60 text-base line-clamp-2 max-w-3xl leading-relaxed">
                      {job.description}
                    </p>
                  </div>
                  <Button 
                    size="lg"
                    className="shrink-0 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all rounded-full px-8"
                    onClick={() => setSelectedJob(job)}
                  >
                    Apply Now
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Reveal>
      </section>

      {/* Application Modal */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={closeForm}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-ivory border border-border shadow-2xl rounded-3xl overflow-hidden flex flex-col max-h-[90vh] text-ink"
            >
              <div className="p-6 md:p-8 border-b border-border flex justify-between items-start shrink-0">
                <div>
                  <h3 className="text-3xl font-display font-bold">Apply for {selectedJob.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 font-medium">{selectedJob.location} • {selectedJob.department}</p>
                </div>
                <button onClick={closeForm} className="p-2 bg-secondary rounded-full hover:bg-secondary/80 text-muted-foreground transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                {success ? (
                  <div className="py-12 text-center flex flex-col items-center">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6 border border-green-500/30">
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4">Application Submitted!</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-8">
                      Thank you for applying to Tathastu Infra. Our talent team will review your application and get back to you shortly.
                    </p>
                    <Button onClick={closeForm} variant="outline">Back to Careers</Button>
                  </div>
                ) : (
                  <form onSubmit={handleApply} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-ink">Full Name <span className="text-red-500">*</span></label>
                        <input required value={name} onChange={e => setName(e.target.value)} type="text" className="w-full bg-white border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-ink">Email Address <span className="text-red-500">*</span></label>
                        <input required value={email} onChange={e => setEmail(e.target.value)} type="email" className="w-full bg-white border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm" placeholder="john@example.com" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-ink">Phone Number <span className="text-red-500">*</span></label>
                        <input required value={phone} onChange={e => setPhone(e.target.value)} type="tel" className="w-full bg-white border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm" placeholder="+91 98765 43210" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-ink">Years of Experience</label>
                        <input value={experience} onChange={e => setExperience(e.target.value)} type="number" min="0" step="1" className="w-full bg-white border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm" placeholder="e.g. 5" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-ink">Cover Letter / Message</label>
                      <textarea value={message} onChange={e => setMessage(e.target.value)} rows={4} className="w-full bg-white border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm resize-none" placeholder="Tell us why you are a great fit for this role..." />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-ink">Resume (PDF/DOC)</label>
                      <div className="relative border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center bg-secondary/50 hover:bg-secondary transition-colors group">
                        <input 
                          type="file" 
                          accept=".pdf,.doc,.docx"
                          onChange={e => setResume(e.target.files?.[0] || null)} 
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="w-12 h-12 bg-card rounded-full flex items-center justify-center mb-3 border border-border group-hover:border-amber-500/30 transition-colors">
                          <Upload className="w-5 h-5 text-muted-foreground group-hover:text-amber-500 transition-colors" />
                        </div>
                        <p className="text-sm font-semibold mb-1">Click to upload or drag and drop</p>
                        <p className="text-xs text-muted-foreground text-center">
                          {resume ? (
                            <span className="text-amber-500 font-medium">{resume.name}</span>
                          ) : (
                            "PDF, DOC, DOCX up to 10MB"
                          )}
                        </p>
                      </div>
                    </div>

                    {error && (
                      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-medium">
                        {error}
                      </div>
                    )}

                    <div className="pt-4 flex items-center justify-end gap-4 border-t border-border">
                      <button type="button" onClick={closeForm} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Cancel</button>
                      <Button type="submit" disabled={submitting}>
                        {submitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Submit Application"
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
