"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/**
 * Records first-touch attribution once per session, site-wide.
 *
 * This lives in the root layout rather than in the form, because the page a
 * visitor lands on is rarely the page they convert on: someone who arrives on
 * the homepage with a `?gclid=` and then navigates to /contact would have lost
 * that identifier by the time the form mounts, since client-side navigation
 * has already replaced the URL. Capturing on first paint of any page keeps it.
 *
 * Renders nothing and only writes to sessionStorage, so there is no React
 * state to re-render and no server/client markup to disagree about.
 */
export function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);

  return null;
}
