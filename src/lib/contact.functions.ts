import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  interest: z.enum(["realty", "construction", "interior", "general", "infra"]).optional(),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
});

type Inquiry = z.infer<typeof schema>;

function createContactSupabaseClient() {
  const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const SUPABASE_KEY =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    const missing = [
      ...(!SUPABASE_URL ? ["SUPABASE_URL"] : []),
      ...(!SUPABASE_KEY ? ["SUPABASE_SERVICE_ROLE_KEY or SUPABASE_PUBLISHABLE_KEY"] : []),
    ];
    console.warn(`[contact] Missing Supabase environment variable(s): ${missing.join(", ")}. Inquiry will not be stored.`);
    return null;
  }

  return createClient<Database>(SUPABASE_URL, SUPABASE_KEY, {
    auth: {
      storage: undefined,
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function titleCaseInterest(interest: Inquiry["interest"]) {
  if (!interest || interest === "general") return "General enquiry";
  if (interest === "infra") return "Infra";
  return interest.charAt(0).toUpperCase() + interest.slice(1);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function sendInquiryEmail(data: Inquiry) {
  const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "tathastuinfra.info@gmail.com";
  const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "Tathastu Infra Website <onboarding@resend.dev>";
  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    console.warn("[contact] RESEND_API_KEY is not configured; inquiry stored without email notification.");
    return { sent: false as const, reason: "Email notification is not configured." };
  }

  const interest = titleCaseInterest(data.interest);
  const subject = `New ${interest} inquiry from ${data.name}`;
  const phone = data.phone || "Not provided";
  const email = data.email || "Not provided";
  const message = data.message || "No message provided.";
  const plainText = [
    `New inquiry from Tathastu Infra website`,
    ``,
    `Name: ${data.name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Interest: ${interest}`,
    ``,
    `Message:`,
    message,
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
      <h2 style="margin: 0 0 16px; color: #0b1736;">New Tathastu Infra Website Inquiry</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
        <tr><td style="padding: 8px 0; font-weight: 700;">Name</td><td>${escapeHtml(data.name)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 700;">Email</td><td>${escapeHtml(email)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 700;">Phone</td><td>${escapeHtml(phone)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 700;">Interest</td><td>${escapeHtml(interest)}</td></tr>
      </table>
      <div style="margin-top: 20px; padding: 18px; border-left: 4px solid #d6b57c; background: #fbf7ef;">
        ${escapeHtml(message).replace(/\n/g, "<br />")}
      </div>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: [CONTACT_TO_EMAIL],
      ...(data.email ? { reply_to: data.email } : {}),
      subject,
      text: plainText,
      html,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[contact] email failed", response.status, errorText);
    return { sent: false as const, reason: "Inquiry saved, but email notification failed." };
  }

  return { sent: true as const };
}

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((input) => schema.parse(input))
  .handler(async ({ data }) => {
    const storedEmail = data.email || "popup-lead@tathastuinfra.in";
    const supabase = createContactSupabaseClient();
    if (supabase) {
      const { error } = await supabase.from("contact_inquiries").insert({
        name: data.name,
        email: storedEmail,
        phone: data.phone || null,
        interest: data.interest ?? null,
        message: data.message || "No message provided.",
      });
      if (error) {
        console.error("[contact] insert failed", error);
      }
    }

    const email = await sendInquiryEmail(data);
    if (!email.sent) {
      return { ok: false as const, error: email.reason ?? "Contact notifications are not configured yet." };
    }

    return { ok: true as const, emailSent: email.sent, emailReason: email.sent ? undefined : email.reason };
  });
