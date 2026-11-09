"use client";

/**
 * First-touch attribution capture.
 *
 * A lead that arrives as "name + phone number" cannot be connected to the
 * campaign, keyword or page that produced it, which makes it impossible to
 * tell which pages earn their keep. This records where the visitor originally
 * came from, keeps it for the whole session, and submits it alongside the
 * form so every lead e-mail answers "where did this come from?".
 *
 * First touch, not last: the search or ad that first brought someone to the
 * site is the thing that deserves the credit, and a visitor who leaves and
 * comes back directly should not have that overwritten by "direct".
 */

const STORAGE_KEY = "asn_attribution_v1";

export type Attribution = {
  /** First page the visitor landed on. */
  landing_page?: string;
  /** External page that sent them, if any. */
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  /** Google Ads click identifier — the key to matching a lead to a keyword. */
  gclid?: string;
  /** Microsoft Ads equivalent. */
  msclkid?: string;
  /** Meta ads click identifier. */
  fbclid?: string;
  /** When the visitor first arrived (ISO 8601). */
  first_seen?: string;
};

const PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "msclkid",
  "fbclid",
] as const;

function read(): Attribution | undefined {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : undefined;
  } catch {
    // Private mode, blocked storage, or malformed JSON. Attribution is a
    // nice-to-have; never let it break a form the business depends on.
    return undefined;
  }
}

function write(value: Attribution) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    /* ignore — see read() */
  }
}

/**
 * Captures attribution on first page view and returns it. Safe to call on
 * every page: once stored, the original values are kept and not overwritten.
 */
export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return {};

  const existing = read();
  if (existing) return existing;

  const params = new URLSearchParams(window.location.search);
  const captured: Attribution = {
    landing_page: window.location.pathname + window.location.search,
    first_seen: new Date().toISOString(),
  };

  for (const key of PARAM_KEYS) {
    const value = params.get(key);
    if (value) captured[key] = value.slice(0, 200);
  }

  // Only an external referrer is informative; an internal one just means the
  // visitor clicked a link on this site.
  const ref = document.referrer;
  if (ref && !ref.includes(window.location.host)) {
    captured.referrer = ref.slice(0, 300);
  }

  write(captured);
  return captured;
}

/** Attribution recorded for this session, if any. */
export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  return read() ?? {};
}
