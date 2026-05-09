import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle, Instagram, Linkedin, Send, Loader2, Youtube } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/Reveal";
import { toast } from "sonner";
import { submitInquiry } from "@/lib/contact.functions";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone")
    .max(20)
    .regex(/^[+\d\s-()]+$/, "Digits only"),
  email: z.string().trim().email("Enter a valid email").max(160),
  message: z.string().trim().min(10, "Tell us a little more").max(1000),
});

const PHONE = "+91 78208 64384";
const PHONE_TEL = "+917820864384";
const WHATSAPP_TEL = "+917820864384";
const EMAIL = "tathastu.infra.info@gmail.com";
const ADDRESS = "Shop No. 2, Tathastu, DY Patil University Road, opposite Golden Winds Society, Lohegaon, Pune, Maharashtra 411047";
const MAPS_EMBED =
  "https://www.google.com/maps?q=TATHASTU%20Real%20Estate%20Builders%20%26%20Construction%20Company%2C%20Shop%20No.2%2C%20DY%20Patil%20University%20Road%2C%20Lohegaon%2C%20Pune&ll=18.6159241,73.9093115&z=18&output=embed";

export function ContactSection() {
  const submit = useServerFn(submitInquiry);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: form.get("name"),
      phone: form.get("phone"),
      email: form.get("email"),
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
        data: {
          ...parsed.data,
          interest: "general",
        },
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
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-gradient-ink py-24 text-ivory">
      <div className="pointer-events-none absolute -left-32 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="max-w-2xl">
          <p className="eyebrow !text-primary-glow">Get In Touch</p>
          <h2 className="mt-3 font-display text-4xl font-medium md:text-5xl">
            Let's design <span className="text-gradient-gold italic">your space</span>.
          </h2>
          <p className="mt-4 text-ivory/70">Tell us about your project — site, scope or just an idea — and our team will respond within 24 hours.</p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          {/* Form */}
          <Reveal>
            <form
              onSubmit={onSubmit}
              className="rounded-3xl border border-ivory/10 bg-ivory/[0.04] p-7 backdrop-blur md:p-10"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name" className="text-ivory/80">Name</Label>
                  <Input id="name" name="name" required className="mt-2 border-ivory/20 bg-ivory/5 text-ivory placeholder:text-ivory/40 focus-visible:ring-primary" placeholder="Your full name" />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-ivory/80">Phone</Label>
                  <Input id="phone" name="phone" type="tel" required className="mt-2 border-ivory/20 bg-ivory/5 text-ivory placeholder:text-ivory/40 focus-visible:ring-primary" placeholder="+91 ..." />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="email" className="text-ivory/80">Email</Label>
                  <Input id="email" name="email" type="email" required className="mt-2 border-ivory/20 bg-ivory/5 text-ivory placeholder:text-ivory/40 focus-visible:ring-primary" placeholder="you@email.com" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="message" className="text-ivory/80">Message</Label>
                  <Textarea id="message" name="message" required rows={5} className="mt-2 border-ivory/20 bg-ivory/5 text-ivory placeholder:text-ivory/40 focus-visible:ring-primary" placeholder="Tell us about your project..." />
                </div>
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="group mt-6 rounded-full bg-gradient-gold px-8 text-primary-foreground shadow-gold hover:opacity-90"
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
                <a href={`tel:${PHONE_TEL}`} className="group flex items-center gap-4 rounded-2xl border border-ivory/10 bg-ivory/[0.04] p-4 transition hover:border-primary/40">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-gold text-primary-foreground"><Phone className="h-4 w-4" /></span>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-ivory/50">Phone</p>
                    <p className="font-medium text-ivory">{PHONE}</p>
                  </div>
                </a>
                <a href={`mailto:${EMAIL}`} className="group flex items-center gap-4 rounded-2xl border border-ivory/10 bg-ivory/[0.04] p-4 transition hover:border-primary/40">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-gold text-primary-foreground"><Mail className="h-4 w-4" /></span>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-ivory/50">Email</p>
                    <p className="font-medium text-ivory">{EMAIL}</p>
                  </div>
                </a>
                <div className="flex items-start gap-4 rounded-2xl border border-ivory/10 bg-ivory/[0.04] p-4">
                  <span className="grid h-11 w-11 flex-none place-items-center rounded-full bg-gradient-gold text-primary-foreground"><MapPin className="h-4 w-4" /></span>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-ivory/50">Office</p>
                    <p className="font-medium text-ivory">{ADDRESS}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`https://wa.me/${WHATSAPP_TEL.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.03]"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
                <div className="flex items-center gap-2">
                  {[
                    { label: "Instagram", Icon: Instagram, href: "https://www.instagram.com/tathastu_infra/" },
                    { label: "YouTube", Icon: Youtube, href: "https://www.youtube.com/@Tathastu_Infra" },
                    { label: "LinkedIn", Icon: Linkedin, href: "https://linkedin.com" },
                  ].map(({ label, Icon, href }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      whileHover={{ y: -3 }}
                      className="grid h-10 w-10 place-items-center rounded-full border border-ivory/15 bg-ivory/5 text-ivory transition hover:border-primary/50 hover:text-primary"
                    >
                      <Icon className="h-4 w-4" />
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-ivory/10 shadow-luxe">
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
