import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  interest: z.enum(["realty", "construction", "interior", "general"]).optional(),
  message: z.string().trim().min(5).max(4000),
});

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((input) => schema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("contact_inquiries").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      interest: data.interest ?? null,
      message: data.message,
    });
    if (error) {
      console.error("[contact] insert failed", error);
      return { ok: false as const, error: "Could not submit. Please try again." };
    }
    return { ok: true as const };
  });
