"use client";

import { business } from "@/lib/business";

/**
 * Conversion events. These three are the only things worth counting on this
 * site: there is no checkout, so a job starts with a phone call, a WhatsApp
 * message or a callback request.
 */
export type ConversionEvent = "lead_form_submit" | "tel_click" | "whatsapp_click";

/** Extra context sent with every event so reports can be segmented. */
type EventDetail = Record<string, unknown>;

type GtagFn = (...args: unknown[]) => void;

function gtag(): GtagFn | undefined {
  const w = window as unknown as { gtag?: GtagFn };
  return typeof w.gtag === "function" ? w.gtag : undefined;
}

function pushDataLayer(payload: Record<string, unknown>) {
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push(payload);
}

/**
 * Google Ads conversion labels, one per event type. Each is the part after
 * the slash in a conversion's "send_to" value (AW-123456789/AbC-D_efG). Left
 * unset, the Ads conversion is skipped and only GA4 / dataLayer fire — so
 * this is safe to ship before the Ads account exists.
 */
const adsLabels: Partial<Record<ConversionEvent, string | undefined>> = {
  tel_click: process.env.NEXT_PUBLIC_ADS_LABEL_CALL,
  whatsapp_click: process.env.NEXT_PUBLIC_ADS_LABEL_WHATSAPP,
  lead_form_submit: process.env.NEXT_PUBLIC_ADS_LABEL_LEAD,
};

/**
 * Records one conversion to every destination that is configured:
 *
 *  1. `dataLayer` — so a Google Tag Manager container can pick it up with no
 *     further code change (this is what the original implementation did, and
 *     it is kept so an existing container keeps working).
 *  2. GA4 via `gtag` — so conversions are visible even with no GTM container,
 *     which is the situation this site is actually in.
 *  3. Google Ads — only when a conversion label is configured for the event.
 *
 * Every destination is optional and independently guarded, so a missing ID
 * degrades to "one fewer destination" instead of a runtime error.
 */
export function trackConversion(event: ConversionEvent, detail?: EventDetail) {
  if (typeof window === "undefined") return;

  const context: EventDetail = {
    // Which page produced the conversion — the single most useful dimension
    // for deciding which city/service pages are worth more content.
    page_path: window.location.pathname,
    ...detail,
  };

  pushDataLayer({ event, ...context });

  const g = gtag();
  if (!g) return;

  g("event", event, context);

  const label = adsLabels[event];
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  if (adsId && label) {
    g("event", "conversion", {
      send_to: `${adsId}/${label}`,
      currency: business.currencyCode,
      ...context,
    });
  }
}
