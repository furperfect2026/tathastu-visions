import { useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitInquiry } from "@/lib/contact.functions";

type ChatStep = "name" | "phone" | "done";

export function ChatbotWidget() {
  const submit = useServerFn(submitInquiry);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<ChatStep>("name");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);

  const prompt = useMemo(() => {
    if (step === "name") return "Before we begin, may I know your full name?";
    if (step === "phone") return `Thanks ${name || "there"}! Please share your phone number so our team can call you.`;
    return "Perfect. Our experts will call you shortly with clear next steps.";
  }, [name, step]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
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
          interest: "general",
          message: "Lead captured via chatbot widget.",
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

  return (
    <>
      <Button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-4 z-[85] h-12 rounded-full bg-gradient-gold px-5 text-ink shadow-gold"
        aria-label="Open chatbot"
      >
        <MessageCircle className="mr-2 h-4 w-4" />
        Chat with us
      </Button>

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
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/12 text-primary">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-primary">Tathastu Infra</p>
                    <h3 className="font-display text-2xl font-semibold text-ink">Meet Neha</h3>
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

              <div className="space-y-4 px-5 py-5">
                <div className="flex items-start gap-3">
                  <span className="mt-1 grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary">
                    <Bot className="h-4 w-4" />
                  </span>
                  <div className="max-w-[88%] rounded-2xl bg-secondary px-4 py-3 text-base text-ink">
                    I understand you're exploring a construction requirement.
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="max-w-[82%] rounded-2xl border border-primary/25 bg-card px-4 py-3 text-base text-ink">
                    Let's get started
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-1 grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary">
                    <Bot className="h-4 w-4" />
                  </span>
                  <div className="max-w-[88%] rounded-2xl bg-secondary px-4 py-3 text-base text-ink">
                    {prompt}
                  </div>
                </div>

                {step !== "done" ? (
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
                ) : (
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
