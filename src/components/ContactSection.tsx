import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Mail, Phone, MapPin, MessageCircle, Send, Loader2 } from "lucide-react";
import { z } from "zod";
import { BrandSocialLink, type SocialBrand } from "@/components/BrandSocialLink";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Reveal } from "@/components/Reveal";
import { toast } from "sonner";
import { submitInquiry } from "@/lib/contact.functions";

type Interest = "general" | "realty" | "construction" | "interior" | "infra";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone")
    .max(20)
    .regex(/^[+\d\s-()]+$/, "Digits only"),
  email: z.string().trim().email("Enter a valid email").max(160),
  interest: z.enum(["general", "realty", "construction", "interior", "infra"]),
  message: z.string().trim().min(10, "Tell us a little more").max(1000),
});

const PHONE = "+91 78208 64384";
const PHONE_TEL = "+917820864384";
const WHATSAPP_TEL = "+917820864384";
const EMAIL = "tathastu.infra.info@gmail.com";
const ADDRESS = "Tathastu, Lohegaon, Pune 411047";
const MAPS_EMBED =
  "https://www.google.com/maps?q=TATHASTU%20Real%20Estate%20Builders%20%26%20Construction%20Company%2C%20Shop%20No.2%2C%20DY%20Patil%20University%20Road%2C%20Lohegaon%2C%20Pune&ll=18.6159241,73.9093115&z=18&output=embed";

const socialLinks = [
  { label: "Instagram", brand: "instagram", href: "https://www.instagram.com/tathastu_infra/" },
  { label: "YouTube", brand: "youtube", href: "https://www.youtube.com/@Tathastu_Infra" },
  { label: "LinkedIn", brand: "linkedin", href: "https://linkedin.com" },
] satisfies { label: string; href: string; brand: SocialBrand }[];

export function ContactSection() {
  const submit = useServerFn(submitInquiry);
  const [loading, setLoading] = useState(false);
  const [interest, setInterest] = useState<Interest>("general");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: form.get("name"),
      phone: form.get("phone"),
      email: form.get("email"),
      interest,
      message: form.get("message"),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setLoading(true);
    try {
      // Lightweight client-side handoff — opens user's mail client with prefilled content.
      const res = await submit({
        data: parsed.data,
      });
      if (!res.ok) {
        toast.error(res.error ?? "Could not submit. Please try again.");
        return;
      }
      if (res.emailSent) {
        toast.success("Thanks! We'll get back to you within 24 hours.");
      } else {
        toast.success("Thanks! Your inquiry was saved. We'll get back to you within 24 hours.");
      }
      (e.target as HTMLFormElement).reset();
      setInterest("general");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-gradient-ivory py-24 text-foreground">
      <div className="pointer-events-none absolute -left-32 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Get In Touch</p>
          <h2 className="mt-3 font-display text-3xl font-medium sm:text-4xl md:text-5xl">
            Take the first step toward <span className="text-gradient-gold italic">your dream project</span>.
          </h2>
          <p className="mt-4 text-muted-foreground">Tell us about your project in Pune, Lohegaon or nearby areas - site, scope or just an idea - and our team will respond within 24 hours.</p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          {/* Form */}
          <Reveal>
            <form
              onSubmit={onSubmit}
              className="rounded-3xl border border-primary/20 bg-card p-5 shadow-luxe backdrop-blur sm:p-7 md:p-10"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name" className="font-medium text-foreground">Name</Label>
                  <Input id="name" name="name" required className="mt-2 border-primary/20 bg-background text-foreground shadow-sm placeholder:text-muted-foreground focus-visible:ring-primary" placeholder="Your full name" />
                </div>
                <div>
                  <Label htmlFor="phone" className="font-medium text-foreground">Phone</Label>
                  <Input id="phone" name="phone" type="tel" required className="mt-2 border-primary/20 bg-background text-foreground shadow-sm placeholder:text-muted-foreground focus-visible:ring-primary" placeholder="+91 ..." />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="email" className="font-medium text-foreground">Email</Label>
                  <Input id="email" name="email" type="email" required className="mt-2 border-primary/20 bg-background text-foreground shadow-sm placeholder:text-muted-foreground focus-visible:ring-primary" placeholder="you@email.com" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="interest" className="font-medium text-foreground">Enquiry Type</Label>
                  <Select value={interest} onValueChange={(value) => setInterest(value as Interest)}>
                    <SelectTrigger id="interest" className="mt-2 border-primary/20 bg-background text-foreground shadow-sm focus:ring-primary">
                      <SelectValue placeholder="Select enquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Enquiry</SelectItem>
                      <SelectItem value="realty">Realty</SelectItem>
                      <SelectItem value="construction">Construction</SelectItem>
                      <SelectItem value="interior">Interior Design</SelectItem>
                      <SelectItem value="infra">Infra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="message" className="font-medium text-foreground">Message</Label>
                  <Textarea id="message" name="message" required rows={5} className="mt-2 border-primary/20 bg-background text-foreground shadow-sm placeholder:text-muted-foreground focus-visible:ring-primary" placeholder="Tell us about your project..." />
                </div>
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="group mt-6 w-full rounded-full bg-gradient-gold px-5 text-primary-foreground shadow-gold hover:opacity-90 sm:w-auto sm:px-8"
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
                Send Message
              </Button>
            </form>
          </Reveal>

          {/* Info + map */}
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col gap-5">
              <div className="grid gap-3">
                <a href={`tel:${PHONE_TEL}`} className="group flex min-w-0 items-center gap-4 rounded-2xl border border-primary/20 bg-card p-4 shadow-luxe transition hover:border-primary/50">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-gold text-primary-foreground"><Phone className="h-4 w-4" /></span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/60">Phone</p>
                    <p className="font-medium text-foreground">{PHONE}</p>
                  </div>
                </a>
                <a href={`mailto:${EMAIL}`} className="group flex min-w-0 items-center gap-4 rounded-2xl border border-primary/20 bg-card p-4 shadow-luxe transition hover:border-primary/50">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-gold text-primary-foreground"><Mail className="h-4 w-4" /></span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/60">Email</p>
                    <p className="break-words font-medium text-foreground">{EMAIL}</p>
                  </div>
                </a>
                <div className="flex min-w-0 items-start gap-4 rounded-2xl border border-primary/20 bg-card p-4 shadow-luxe">
                  <span className="grid h-11 w-11 flex-none place-items-center rounded-full bg-gradient-gold text-primary-foreground"><MapPin className="h-4 w-4" /></span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/60">Office</p>
                    <p className="break-words font-medium text-foreground">{ADDRESS}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`https://wa.me/${WHATSAPP_TEL.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.03] sm:w-auto"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
                <div className="flex items-center gap-2">
                  {socialLinks.map(({ label, brand, href }) => (
                    <BrandSocialLink
                      key={label}
                      brand={brand}
                      href={href}
                      label={label}
                      className="border-border bg-card shadow-luxe hover:border-primary/60 hover:bg-card"
                    />
                  ))}
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-border shadow-luxe">
                <iframe
                  title="Tathastu office location"
                  src={MAPS_EMBED}
                  width="100%"
                  height="260"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
