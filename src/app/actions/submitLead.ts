"use server";

import { Resend } from "resend";
import { business } from "@/lib/business";

export type LeadFormState = { status: "idle" | "success" | "error"; message?: string };

export async function submitLead(_prev: LeadFormState, formData: FormData): Promise<LeadFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const service = String(formData.get("service") ?? "").trim();
  const region = String(formData.get("region") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();

  if (!name || !phone) {
    return { status: "error", message: "Naam en telefoonnummer zijn verplicht." };
  }

  // MVP delivery: email via Resend. Swap/extend this block for the real CRM
  // webhook once the user provides API details — don't build that
  // speculatively before those details exist.
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFICATION_EMAIL ?? business.email;

  if (!apiKey) {
    console.error("submitLead: RESEND_API_KEY not set, lead not delivered:", { name, phone, service, region, notes });
    return { status: "error", message: "Formulier is nog niet actief. Bel of app ons direct." };
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: `${business.name} <leads@${business.domain}>`,
      to,
      subject: `Nieuwe lead: ${name} (${service || "onbekende dienst"})`,
      text: `Naam: ${name}\nTelefoon: ${phone}\nDienst: ${service}\nRegio: ${region}\nOpmerkingen: ${notes}`,
    });
    return { status: "success", message: "We bellen u zo snel mogelijk terug." };
  } catch (err) {
    console.error("submitLead: failed to send", err);
    return { status: "error", message: "Versturen mislukt. Bel of app ons direct." };
  }
}
