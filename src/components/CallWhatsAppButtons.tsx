"use client";

import { business } from "@/lib/business";
import { trackConversion } from "@/lib/analytics";

export function CallButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={business.phoneHref}
      onClick={() => trackConversion("tel_click")}
      className={`inline-flex items-center justify-center rounded-sm bg-signal-orange px-6 py-3 text-on-orange text-label font-semibold hover:bg-orange-hover transition-colors ${className}`}
    >
      Bel {business.phone}
    </a>
  );
}

export function WhatsAppButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={business.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackConversion("whatsapp_click")}
      className={`inline-flex items-center justify-center rounded-sm border border-line-strong px-6 py-3 text-frost text-label font-semibold hover:border-signal-orange transition-colors ${className}`}
    >
      WhatsApp direct hulp
    </a>
  );
}
