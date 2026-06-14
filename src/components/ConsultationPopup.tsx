import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Loader2, Phone, X } from "lucide-react";
import { toast } from "sonner";
import consultationPopupImage from "@/assets/consultation-popup.png";
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
import { submitInquiry } from "@/lib/contact.functions";

const FIRST_POPUP_DELAY = 30_000;
const REPEAT_POPUP_DELAY = 120_000;

const cityOptions = ["Pune", "Lohegaon", "Kharadi", "Wagholi", "Viman Nagar", "Other"];

export function ConsultationPopup() {
  const submit = useServerFn(submitInquiry);
  const timerRef = useRef<number | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const submittedRef = useRef(false);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [city, setCity] = useState("Pune");

  function clearPopupTimer() {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  function schedulePopup(delay: number) {
    if (submittedRef.current) return;
    clearPopupTimer();
    timerRef.current = window.setTimeout(() => {
      if (submittedRef.current) return;
      setOpen(true);
      timerRef.current = null;
    }, delay);
  }

  function closeAndReschedule() {
    setOpen(false);
    schedulePopup(REPEAT_POPUP_DELAY);
  }

  useEffect(() => {
    schedulePopup(FIRST_POPUP_DELAY);
    return clearPopupTimer;
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const phone = String(form.get("phone") || "").trim();

    if (name.length < 2) {
      toast.error("Please enter your name.");
      return;
    }
    if (!/^[+\d\s-()]{7,20}$/.test(phone)) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    setBusy(true);
    try {
      const result = await submit({
        data: {
          name,
          phone,
          interest: "construction",
          message: `Popup consultation lead. Location of plot/city: ${city}. User requested a free consultation with experts.`,
        },
      });

      if (!result.ok) {
        toast.error(result.error ?? "Could not submit. Please try again.");
        return;
      }

      toast.success("Thanks! Our team will contact you shortly.");
      submittedRef.current = true;
      clearPopupTimer();
      formRef.current?.reset();
      setCity("Pune");
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] grid items-start overflow-y-auto bg-ink/55 px-3 py-3 backdrop-blur-sm sm:place-items-center sm:px-4 sm:py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="presentation"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="consultation-popup-title"
            className="relative grid max-h-[calc(100dvh-1.5rem)] w-full max-w-5xl overflow-y-auto rounded-2xl bg-card text-foreground shadow-[0_32px_90px_-32px_rgba(7,14,35,0.7)] ring-1 ring-border sm:rounded-3xl md:grid-cols-[1.05fr_0.95fr] md:overflow-hidden"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={closeAndReschedule}
              className="fixed right-5 top-5 z-[110] grid h-10 w-10 place-items-center rounded-full bg-background/95 text-foreground shadow-luxe ring-1 ring-border transition hover:bg-background md:absolute md:right-4 md:top-4 md:z-20 md:bg-background/80 md:shadow-sm"
              aria-label="Close consultation popup"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative h-28 sm:h-36 overflow-hidden bg-ink md:h-auto md:aspect-auto md:min-h-[560px]">
              <img
                src={consultationPopupImage}
                alt="Tathastu Infra construction consultation"
                className="h-full w-full object-cover object-top md:object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
              <div className="hidden md:block absolute bottom-5 left-5 rounded-full bg-ivory/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink shadow-luxe">
                Free Site Consultation
              </div>
            </div>

            <div className="flex flex-col justify-center p-5 sm:p-8 md:p-10">
              <p className="hidden md:block eyebrow">Don't leave yet</p>
              <h2
                id="consultation-popup-title"
                className="mt-0 md:mt-2 max-w-md font-display text-2xl md:text-[2rem] font-semibold leading-[1.05] text-ink sm:mt-3 sm:text-4xl"
              >
                Resolve your queries with our{" "}
                <span className="italic text-gradient-gold">experts</span>
              </h2>
              <p className="hidden md:block mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Share your name and number. Tathastu Infra will call you back with clear next steps.
              </p>

              <form ref={formRef} onSubmit={onSubmit} className="mt-5 space-y-3 sm:mt-7 sm:space-y-4">
                <div>
                  <Label htmlFor="popup-name" className="sr-only">
                    Name
                  </Label>
                  <Input
                    id="popup-name"
                    name="name"
                    autoComplete="name"
                    required
                    placeholder="Name"
                    className="h-12 rounded-2xl border-primary/20 bg-background px-5 text-base shadow-sm focus-visible:ring-primary sm:h-14"
                  />
                </div>

                <div>
                  <Label htmlFor="popup-phone" className="sr-only">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                    <Input
                      id="popup-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      placeholder="+91  Phone Number"
                      className="h-12 rounded-2xl border-primary/20 bg-background pl-12 pr-5 text-base shadow-sm focus-visible:ring-primary sm:h-14"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="popup-city" className="sr-only">
                    Location of your plot or city
                  </Label>
                  <Select value={city} onValueChange={setCity}>
                    <SelectTrigger
                      id="popup-city"
                      className="h-12 rounded-2xl border-primary/20 bg-background px-5 text-left text-base shadow-sm focus:ring-primary sm:h-14"
                    >
                      <SelectValue placeholder="Location of your plot - City" />
                    </SelectTrigger>
                    <SelectContent>
                      {cityOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="mt-1 px-1 text-[11px] text-muted-foreground">
                    Location of your plot - City*
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={busy}
                  className="group h-12 w-full rounded-2xl bg-gradient-gold text-base font-semibold text-ink shadow-gold hover:opacity-95 sm:h-14"
                >
                  {busy ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <ArrowRight className="mr-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  )}
                  Book FREE Consultation
                </Button>
              </form>

              <p className="hidden md:block mt-4 text-xs leading-relaxed text-muted-foreground">
                By submitting, you agree that our team may contact you about your project enquiry.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
