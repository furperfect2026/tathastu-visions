import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { submitInquiry } from "@/lib/contact.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Tathastu Infra — Lohegaon, Maharashtra" },
      { name: "description", content: "Contact Tathastu Infra in Lohegaon, Pune for realty, construction or interior design projects. We typically respond within one business day." },
      { property: "og:title", content: "Contact Tathastu Infra" },
      { property: "og:description", content: "Let's design your next space." },
    ],
    links: [{ rel: "canonical", href: "https://www.tathastuinfra.in/contact" }],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Invalid email").max(255).optional().or(z.literal("")),
  phone: z.string().trim().max(30).optional(),
  interest: z.enum(["realty", "construction", "interior", "general", "infra"]).optional(),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
});

function ContactPage() {
  const submit = useServerFn(submitInquiry);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [interest, setInterest] = useState<"realty" | "construction" | "interior" | "general" | "infra">("general");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const raw = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? "") || undefined,
      interest,
      message: String(fd.get("message") ?? ""),
    };
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) errs[String(issue.path[0])] = issue.message;
      setErrors(errs);
      return;
    }
    setBusy(true);
    try {
      const res = await submit({ data: parsed.data });
      if (res.ok) {
        if (res.emailSent) {
          toast.success("Thanks! We'll be in touch within one business day.");
        } else {
          toast.success("Thanks! Your inquiry was saved. We'll be in touch within one business day.");
        }
        (e.target as HTMLFormElement).reset();
        setInterest("general");
      } else {
        toast.error(res.error ?? "Could not submit.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="pt-28 md:pt-36 pb-16 md:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-4 max-w-3xl break-words font-display text-[2.75rem] font-medium leading-[1.05] sm:text-5xl md:text-7xl">
          Let's design your <span className="text-gradient-gold italic">next space in Pune.</span>
        </h1>

        <div className="mt-12 md:mt-16 grid gap-8 md:gap-12 grid-cols-1 md:grid-cols-5">
          <Reveal className="md:col-span-3">
            <form onSubmit={onSubmit} className="rounded-3xl bg-card p-5 shadow-luxe ring-1 ring-border sm:p-8 md:p-10">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" required maxLength={120} placeholder="Your full name" className="mt-2" />
                  {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" maxLength={255} placeholder="you@example.com" className="mt-2" />
                  {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" maxLength={30} placeholder="+91 ..." className="mt-2" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="interest">Enquiry Type <span className="text-muted-foreground">(optional)</span></Label>
                  <Select value={interest} onValueChange={(v) => setInterest(v as typeof interest)}>
                    <SelectTrigger id="interest" className="mt-2"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Enquiry</SelectItem>
                      <SelectItem value="realty">Realty</SelectItem>
                      <SelectItem value="construction">Construction</SelectItem>
                      <SelectItem value="interior">Interior Design</SelectItem>
                      <SelectItem value="infra">Infra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" maxLength={4000} rows={5} placeholder="Tell us about your dream project…" className="mt-2" />
                  {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                </div>
              </div>
              <Button type="submit" size="lg" disabled={busy} className="mt-8 w-full rounded-full bg-gradient-gold px-5 text-ink shadow-gold hover:opacity-90 sm:w-auto sm:px-8">
                {busy ? "Sending…" : (<>Send message <Send className="ml-2 h-4 w-4" /></>)}
              </Button>
            </form>
          </Reveal>

          <Reveal className="md:col-span-2" delay={0.1}>
            <div className="rounded-3xl bg-ink p-6 text-ivory shadow-luxe sm:p-8 md:p-10">
              <h3 className="font-display text-2xl font-semibold">Visit our studio</h3>
              <p className="mt-2 text-sm text-ivory/70">We work by appointment. Coffee is on us.</p>

              <ul className="mt-8 space-y-5 text-sm">
                <li className="flex min-w-0 gap-3"><MapPin className="h-5 w-5 flex-none text-primary-glow" /> <span>Tathastu Infra,<br /> Lohegaon, Pune 411047</span></li>
                <li className="flex min-w-0 gap-3"><Phone className="h-5 w-5 flex-none text-primary-glow" /> <span>+91 78208 64384</span></li>
                <li className="flex min-w-0 gap-3"><Mail className="h-5 w-5 flex-none text-primary-glow" /> <span className="break-words">tathastuinfra.info@gmail.com</span></li>
              </ul>

              <div className="mt-10 rounded-2xl bg-gradient-gold p-5 text-ink">
                <p className="font-display text-lg font-semibold">"Tathastu Infra — so be it."</p>
                <p className="mt-1 text-xs text-ink/70">Building dreams, creating reality.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

