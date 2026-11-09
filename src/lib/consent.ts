"use client";

/**
 * Cookie consent, wired to Google Consent Mode v2.
 *
 * Dutch law (Telecommunicatiewet art. 11.7a) and the GDPR require prior
 * consent before analytics or advertising cookies are set. Consent Mode v2 is
 * how Google tags are told about that decision: the tags still load, but until
 * consent is granted they may not use storage, and they fall back to
 * cookieless pings.
 *
 * Two rules matter and are easy to get wrong:
 *  1. The *default* (denied) state must be registered BEFORE gtag.js loads,
 *     otherwise the tag has already written cookies by the time it is told not
 *     to. That default is set by an inline script in the layout, not here.
 *  2. Microsoft Clarity is not covered by Consent Mode at all, and it records
 *     sessions. It is therefore not loaded at all until consent is granted,
 *     rather than loaded in a restricted state.
 */

export type ConsentState = {
  /** GA4 and Clarity. */
  analytics: boolean;
  /** Google Ads: ad storage, ad user data and ad personalisation. */
  marketing: boolean;
  /** ISO timestamp of the decision, kept as the record of when consent was given. */
  decidedAt: string;
  /** Version of the consent notice agreed to; bump to re-ask everyone. */
  version: number;
};

export const CONSENT_VERSION = 1;
export const STORAGE_KEY = "asn_consent_v1";

/** Fired on the window whenever consent changes, so tags can react. */
export const CONSENT_EVENT = "asn:consent-change";

type GtagFn = (...args: unknown[]) => void;

function gtag(): GtagFn | undefined {
  const w = window as unknown as { gtag?: GtagFn };
  return typeof w.gtag === "function" ? w.gtag : undefined;
}

/** The stored decision, or undefined when the visitor has not chosen yet. */
export function readConsent(): ConsentState | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw) as ConsentState;
    // A newer notice invalidates an older agreement.
    if (parsed.version !== CONSENT_VERSION) return undefined;
    return parsed;
  } catch {
    // Blocked or unavailable storage. Treat as "not decided", which keeps
    // everything denied — the safe direction to fail in.
    return undefined;
  }
}

/** Pushes the decision into Google's consent state and notifies listeners. */
export function applyConsent(state: ConsentState) {
  if (typeof window === "undefined") return;

  const analytics = state.analytics ? "granted" : "denied";
  const marketing = state.marketing ? "granted" : "denied";

  gtag()?.("consent", "update", {
    analytics_storage: analytics,
    ad_storage: marketing,
    ad_user_data: marketing,
    ad_personalization: marketing,
    personalization_storage: marketing,
  });

  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: state }));
}

/** Stores a decision and applies it immediately. */
export function saveConsent(choice: { analytics: boolean; marketing: boolean }): ConsentState {
  const state: ConsentState = {
    ...choice,
    decidedAt: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Unstorable consent still applies to this page view; the visitor is
    // simply asked again next time, which is the correct failure mode.
  }
  applyConsent(state);
  return state;
}

/** Re-applies a stored decision on later page loads. */
export function restoreConsent(): ConsentState | undefined {
  const stored = readConsent();
  if (stored) applyConsent(stored);
  return stored;
}
