"use server";

import { Resend } from "resend";
import { business } from "@/lib/business";

export type LeadFormState = { status: "idle" | "success" | "error"; message?: string };

/** Attribution fields the form submits as hidden inputs. */
const ATTRIBUTION_FIELDS = [
  "landing_page",
  "referrer",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "msclkid",
  "fbclid",
  "first_seen",
  "form_page",
] as const;

/** Trim, cap length, and drop anything empty. */
function field(formData: FormData, name: string, max = 500): string {
  return String(formData.get(name) ?? "")
    .trim()
    .slice(0, max);
}

/**
 * Posts the lead to an external endpoint (CRM, Zapier/Make, Google Sheet,
 * WhatsApp relay — whatever is wired up) when LEAD_WEBHOOK_URL is set.
 *
 * This runs independently of the e-mail so that a Resend outage, a bounced
 * sender domain or a hit send-quota cannot silently swallow a lead. Returns
 * whether it succeeded so the caller can decide what to tell the visitor.
 */
async function postToWebhook(payload: Record<string, string>): Promise<boolean> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return false;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.LEAD_WEBHOOK_SECRET
          ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_SECRET}` }
          : {}),
      },
      body: JSON.stringify(payload),
      // A lead must not hang the form if the endpoint is slow.
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.error("submitLead: webhook returned", res.status);
      return false;
    }
    return true;
  } catch (err) {
    console.error("submitLead: webhook failed", err);
    return false;
  }
}

export async function submitLead(_prev: LeadFormState, formData: FormData): Promise<LeadFormState> {
  const name = field(formData, "name", 120);
  const phone = field(formData, "phone", 40);
  const service = field(formData, "service", 120);
  const region = field(formData, "region", 120);
  const notes = field(formData, "notes", 2000);

  if (!name || !phone) {
    return { status: "error", message: "Naam en telefoonnummer zijn verplicht." };
  }

  // Honeypot: a hidden field real people never see and never fill. Bots fill
  // every input they find. Accept the submission silently so the bot does not
  // learn it was caught, but deliver nothing.
  if (field(formData, "company", 100)) {
    return { status: "success", message: "We bellen u zo snel mogelijk terug." };
  }

  const attribution: Record<string, string> = {};
  for (const key of ATTRIBUTION_FIELDS) {
    const value = field(formData, key);
    if (value) attribution[key] = value;
  }

  const payload: Record<string, string> = {
    name,
    phone,
    service,
    region,
    notes,
    submitted_at: new Date().toISOString(),
    ...attribution,
  };

  // Deliver to both destinations; a lead counts as captured if either works.
  const webhookOk = await postToWebhook(payload);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFICATION_EMAIL ?? business.email;
  let emailOk = false;

  if (apiKey) {
    const attributionLines = Object.keys(attribution).length
      ? Object.entries(attribution)
          .map(([k, v]) => `${k}: ${v}`)
          .join("\n")
      : "(geen herkomstgegevens beschikbaar)";

    try {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        // Bare registrable domain on purpose: the canonical host is www, but
        // the sending domain verified with Resend is the domain itself.
        from: `${business.name} <leads@${business.domain}>`,
        to,
        replyTo: business.email,
        subject: `Nieuwe lead: ${name} (${service || "onbekende dienst"})`,
        text: [
          `Naam: ${name}`,
          `Telefoon: ${phone}`,
          `Dienst: ${service}`,
          `Regio: ${region}`,
          `Opmerkingen: ${notes}`,
          "",
          "--- Herkomst ---",
          attributionLines,
        ].join("\n"),
      });
      emailOk = true;
    } catch (err) {
      console.error("submitLead: failed to send", err);
    }
  }

  if (!emailOk && !webhookOk) {
    // Log the full lead so it is recoverable from server logs even when every
    // delivery channel is down or unconfigured.
    console.error("submitLead: NO DELIVERY CHANNEL SUCCEEDED, lead was:", payload);
    return { status: "error", message: "Versturen mislukt. Bel of app ons direct." };
  }

  return { status: "success", message: "We bellen u zo snel mogelijk terug." };
}
