"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  CONSENT_EVENT,
  CONSENT_VERSION,
  type ConsentState,
  restoreConsent,
  saveConsent,
  STORAGE_KEY,
} from "@/lib/consent";

const REOPEN_EVENT = "asn:consent-reopen";

/**
 * Sentinel returned while rendering on the server and during hydration.
 * Storage is unreadable then, and guessing "not decided" would put the notice
 * into the server HTML and flash it at every visitor who already answered it.
 * Treating "unknown" as "show nothing" keeps the notice out of the markup; the
 * real value arrives on the first client snapshot immediately after hydration.
 */
const UNKNOWN = "\u0000unknown";

function subscribe(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange);
  // Another tab answering the notice counts as an answer here too.
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/**
 * Snapshot must be a stable primitive, not a parsed object: returning a fresh
 * object on each call would make useSyncExternalStore re-render forever.
 */
function getSnapshot(): string {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

function getServerSnapshot(): string {
  return UNKNOWN;
}

function parse(raw: string): ConsentState | undefined {
  if (!raw || raw === UNKNOWN) return undefined;
  try {
    const parsed = JSON.parse(raw) as ConsentState;
    return parsed.version === CONSENT_VERSION ? parsed : undefined;
  } catch {
    return undefined;
  }
}

/** Subscribes to the stored consent decision. */
function useConsentSnapshot() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return useMemo(() => ({ known: raw !== UNKNOWN, consent: parse(raw) }), [raw]);
}

const copy = {
  nl: {
    title: "Cookies op deze site",
    body: "Noodzakelijke cookies houden de site werkend. Met uw toestemming gebruiken we ook analytische en marketingcookies, om te meten welke pagina's werken en onze advertenties te verbeteren.",
    accept: "Alles accepteren",
    reject: "Alleen noodzakelijk",
    policy: "Privacybeleid",
  },
  en: {
    title: "Cookies on this site",
    body: "Necessary cookies keep the site working. With your permission we also use analytics and marketing cookies, to measure which pages work and to improve our advertising.",
    accept: "Accept all",
    reject: "Necessary only",
    policy: "Privacy policy",
  },
} as const;

/**
 * Consent notice, shown until the visitor answers it.
 *
 * Refusing is given the same prominence as accepting, which Dutch supervisory
 * guidance requires: a notice where refusing is harder than agreeing does not
 * collect valid consent.
 */
export function ConsentBanner({ locale = "nl" }: { locale?: "nl" | "en" }) {
  const { known, consent } = useConsentSnapshot();
  const [reopened, setReopened] = useState(false);
  const t = copy[locale];

  // Re-apply an earlier decision to Google's consent state on each page load.
  // This only pushes state outward to another system, so there is no React
  // state to update here.
  useEffect(() => {
    restoreConsent();
  }, []);

  // Lets the privacy policy reopen the notice without owning this state.
  useEffect(() => {
    const reopen = () => setReopened(true);
    window.addEventListener(REOPEN_EVENT, reopen);
    return () => window.removeEventListener(REOPEN_EVENT, reopen);
  }, []);

  const choose = useCallback((analytics: boolean, marketing: boolean) => {
    saveConsent({ analytics, marketing });
    setReopened(false);
  }, []);

  // Render nothing until the stored decision is actually known.
  if (!known) return null;
  if (consent && !reopened) return null;

  return (
    <div
      role="dialog"
      aria-label={t.title}
      // Clears the mobile sticky call bar (z-40, h-16) so neither covers the other.
      className="fixed inset-x-0 bottom-16 z-[60] border-t border-line-strong bg-navy-band/98 backdrop-blur sm:bottom-0"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="lg:pr-8">
          <p className="text-label font-semibold text-frost">{t.title}</p>
          <p className="text-body-small text-mist mt-1">
            {t.body}{" "}
            <Link href="/privacybeleid" className="underline hover:text-frost">
              {t.policy}
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => choose(false, false)}
            className="rounded-sm border border-line-strong px-5 py-2.5 text-label font-semibold text-frost transition-colors hover:border-signal-orange"
          >
            {t.reject}
          </button>
          <button
            type="button"
            onClick={() => choose(true, true)}
            className="rounded-sm bg-signal-orange px-5 py-2.5 text-label font-semibold text-on-orange transition-colors hover:bg-orange-hover"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}

/** Reopens the notice so a visitor can change their mind. */
export function ConsentReopenButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(REOPEN_EVENT))}
      className="underline hover:text-frost"
    >
      {label}
    </button>
  );
}

/** True once the visitor has granted analytics consent. */
export function useAnalyticsConsent(): boolean {
  const { consent } = useConsentSnapshot();
  return consent?.analytics === true;
}
