"use client";

import { business } from "@/lib/business";
import { trackConversion } from "@/lib/analytics";

export function CallButton({ className = "", locale = "nl" }: { className?: string; locale?: "nl" | "en" }) {
  return (
    <a
      href={business.phoneHref}
      onClick={() => trackConversion("tel_click")}
      className={`inline-flex items-center justify-center rounded-sm bg-signal-orange px-6 py-3 text-on-orange text-label font-semibold hover:bg-orange-hover transition-colors ${className}`}
    >
      {locale === "en" ? "Call" : "Bel"} {business.phone}
    </a>
  );
}

export function WhatsAppButton({ className = "", locale = "nl" }: { className?: string; locale?: "nl" | "en" }) {
  return (
    <a
      href={business.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackConversion("whatsapp_click")}
      className={`inline-flex items-center justify-center rounded-sm border border-line-strong px-6 py-3 text-frost text-label font-semibold hover:border-signal-orange transition-colors ${className}`}
    >
      {locale === "en" ? "WhatsApp us directly" : "WhatsApp direct hulp"}
    </a>
  );
}
