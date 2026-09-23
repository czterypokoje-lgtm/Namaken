"use client";

// Conversion events for GTM. GTM container ID is a pending input (see plan) —
// this pushes to dataLayer regardless, so wiring the container up later needs
// no app code changes, only the GTM container itself.
type ConversionEvent = "lead_form_submit" | "tel_click" | "whatsapp_click";

export function trackConversion(event: ConversionEvent, detail?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...detail });
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}
