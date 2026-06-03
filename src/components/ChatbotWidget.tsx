import { useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, X } from "lucide-react";
import { toast } from "sonner";
import chatbotAvatar from "@/assets/chatbot-ronal.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitInquiry } from "@/lib/contact.functions";

type ChatStep = "service" | "requirement" | "location" | "timeline" | "name" | "phone" | "done";

const serviceOptions = ["Construction", "Realty", "Interior", "WTG / Govt. Contracts"] as const;
const requirementOptions = {
  Construction: ["Residential construction", "Commercial construction", "Structural / RCC work", "Renovation"],
  Realty: ["Buy flat", "Rent flat", "Resale property", "Plot guidance"],
  Interior: ["Home interior", "Office interior", "Modular kitchen", "Full turnkey interior"],
  "WTG / Govt. Contracts": ["WTG foundation", "Government contract", "Infrastructure work", "Site execution"],
} as const;
const locationOptions = ["Lohegaon", "Pune", "Wagholi", "Kharadi", "Viman Nagar", "Other"] as const;
const timelineOptions = ["Immediately", "Within 1 month", "1-3 months", "Just exploring"] as const;

export function ChatbotWidget() {
  const submit = useServerFn(submitInquiry);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<ChatStep>("service");
  const [service, setService] = useState<(typeof serviceOptions)[number] | "">("");
  const [requirement, setRequirement] = useState("");
  const [location, setLocation] = useState("");
  const [timeline, setTimeline] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);

  const prompt = useMemo(() => {
    if (step === "service") return "What are you looking for today?";
    if (step === "requirement") return "Great. Which requirement matches your project best?";
    if (step === "location") return "Where is the site or property located?";
    if (step === "timeline") return "When are you planning to start?";
    if (step === "name") return "Before we begin, may I know your full name?";
    if (step === "phone") return `Thanks ${name || "there"}! Please share your phone number so our team can call you.`;
    return "Perfect. Our experts will call you shortly with clear next steps.";
  }, [name, step]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (step === "service" || step === "requirement" || step === "location" || step === "timeline") return;

    if (step === "name") {
      if (name.trim().length < 2) {
        toast.error("Please enter your full name.");
        return;
      }
      setStep("phone");
      return;
    }

    if (!/^[+\d\s-()]{7,20}$/.test(phone.trim())) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    setBusy(true);
    try {
      const result = await submit({
        data: {
          name: name.trim(),
          phone: phone.trim(),
          interest: service ? service.toLowerCase().replace(/\s+/g, "-") : "general",
          message: [
            "Lead captured via chatbot widget.",
            `Service: ${service || "Not selected"}.`,
            `Requirement: ${requirement || "Not selected"}.`,
            `Location: ${location || "Not selected"}.`,
            `Timeline: ${timeline || "Not selected"}.`,
          ].join(" "),
        },
      });

      if (!result.ok) {
        toast.error(result.error ?? "Could not submit right now.");
        return;
      }

      setStep("done");
      toast.success("Thanks! Our experts will contact you soon.");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  function chooseOption(value: string) {
    if (step === "service") {
      setService(value as (typeof serviceOptions)[number]);
      setRequirement("");
      setStep("requirement");
      return;
    }
    if (step === "requirement") {
      setRequirement(value);
      setStep("location");
      return;
    }
    if (step === "location") {
      setLocation(value);
      setStep("timeline");
      return;
    }
    if (step === "timeline") {
      setTimeline(value);
      setStep("name");
    }
  }

  const currentOptions = useMemo(() => {
    if (step === "service") return [...serviceOptions];
    if (step === "requirement" && service) return [...requirementOptions[service]];
    if (step === "location") return [...locationOptions];
    if (step === "timeline") return [...timelineOptions];
    return [];
  }, [service, step]);

  return (
    <>
      {!open && (
        <motion.div
          className="fixed bottom-5 right-4 z-[85] flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.35, ease: "easeOut" }}
        >
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-full border border-primary/25 bg-card/95 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-ink shadow-gold backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-primary hover:text-ink"
            aria-label="Open chatbot"
          >
            Need help?
          </button>
          <Button
            type="button"
            onClick={() => setOpen(true)}
            className="h-16 w-16 overflow-hidden rounded-full border border-primary/30 bg-card p-0 shadow-gold transition hover:-translate-y-1 hover:shadow-[0_18px_42px_-18px_rgba(212,174,118,0.95)]"
            aria-label="Open chatbot"
          >
            <img
              src={chatbotAvatar}
              alt="Chat with Ronal"
              className="h-full w-full object-cover object-top"
            />
          </Button>
        </motion.div>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-end justify-end bg-ink/45 p-3 backdrop-blur-sm sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.section
              role="dialog"
              aria-modal="true"
              className="w-full max-w-md overflow-hidden rounded-3xl bg-card shadow-[0_28px_70px_-28px_rgba(7,14,35,0.78)] ring-1 ring-border"
              initial={{ y: 24, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 14, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 overflow-hidden rounded-full border border-primary/25 bg-card shadow-sm">
                    <img
                      src={chatbotAvatar}
                      alt="Ronal chatbot"
                      className="h-full w-full object-cover object-top"
                    />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-primary">Tathastu Infra</p>
                    <h3 className="font-display text-2xl font-semibold text-ink">Meet Ronal</h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground hover:text-foreground"
                  aria-label="Close chatbot"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-[calc(100dvh-7rem)] space-y-4 overflow-y-auto px-5 py-5">
                <div className="flex items-start gap-3">
                  <span className="mt-1 grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary">
                    <Bot className="h-4 w-4" />
                  </span>
                  <div className="max-w-[88%] rounded-2xl bg-secondary px-4 py-3 text-base text-ink">
                    I can help with realty, construction, interiors and WTG/government contract enquiries.
                  </div>
                </div>

                {service && (
                  <div className="flex justify-end">
                    <div className="max-w-[82%] rounded-2xl border border-primary/25 bg-card px-4 py-3 text-base text-ink">
                      {service}
                      {requirement ? ` / ${requirement}` : ""}
                      {location ? ` / ${location}` : ""}
                      {timeline ? ` / ${timeline}` : ""}
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <span className="mt-1 grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary">
                    <Bot className="h-4 w-4" />
                  </span>
                  <div className="max-w-[88%] rounded-2xl bg-secondary px-4 py-3 text-base text-ink">
                    {prompt}
                  </div>
                </div>

                {currentOptions.length > 0 && (
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {currentOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => chooseOption(option)}
                        className="rounded-2xl border border-primary/20 bg-background px-4 py-3 text-left text-sm font-medium text-ink transition hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/10"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {step !== "done" && currentOptions.length === 0 && (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <Input
                      value={step === "name" ? name : phone}
                      onChange={(event) =>
                        step === "name" ? setName(event.target.value) : setPhone(event.target.value)
                      }
                      placeholder={step === "name" ? "Enter your full name" : "Enter phone number"}
                      className="h-12 rounded-2xl border-primary/20 bg-background text-base"
                    />
                    <Button
                      type="submit"
                      disabled={busy}
                      className="h-11 w-full rounded-xl bg-gradient-gold text-ink shadow-gold"
                    >
                      {busy ? "Submitting..." : "Submit"}
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                )}

                {step === "done" && (
                  <div className="rounded-2xl bg-primary/10 px-4 py-3 text-sm text-primary-foreground">
                    Your request is submitted. Our team will call you back shortly.
                  </div>
                )}
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
