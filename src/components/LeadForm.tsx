"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { submitLead, type LeadFormState } from "@/app/actions/submitLead";
import { services } from "@/data/services";
import { regions } from "@/data/regions";
import { trackConversion } from "@/lib/analytics";
import { getAttribution } from "@/lib/attribution";

const initialState: LeadFormState = { status: "idle" };

const inputClass =
  "w-full rounded-sm border border-line bg-navy-surface px-4 py-2 text-frost";

export function LeadForm() {
  const router = useRouter();

  const [state, formAction, pending] = useActionState(async (prev: LeadFormState, fd: FormData) => {
    // Attach attribution at submit time, read from the session store that
    // <AttributionCapture /> populated on the visitor's first page view.
    // Doing it here rather than through rendered hidden inputs keeps the
    // values out of React state entirely: nothing to re-render, and no
    // server/client markup mismatch.
    for (const [key, value] of Object.entries(getAttribution())) {
      if (value) fd.set(key, String(value));
    }
    fd.set("form_page", window.location.pathname);

    const result = await submitLead(prev, fd);
    if (result.status === "success") {
      trackConversion("lead_form_submit", {
        service: String(fd.get("service") ?? ""),
        region: String(fd.get("region") ?? ""),
      });
      // Send the visitor to a dedicated confirmation URL. A distinct page is
      // the most reliable conversion trigger available: it can be used as a
      // GA4 destination conversion and a Google Ads conversion page even if
      // the click-level event is blocked, and it gives a stable place to put
      // follow-up guidance.
      router.push("/bedankt");
    }
    return result;
  }, initialState);

  if (state.status === "success") {
    return <p className="text-heading-4 text-signal-orange">{state.message}</p>;
  }

  return (
    <form action={formAction} className="space-y-4">
      {/* Honeypot. Hidden from people and from screen readers; bots fill it. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Bedrijf</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="text-label text-frost block mb-1">
          Naam
        </label>
        <input id="name" name="name" required autoComplete="name" className={inputClass} />
      </div>
      <div>
        <label htmlFor="phone" className="text-label text-frost block mb-1">
          Telefoonnummer
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="service" className="text-label text-frost block mb-1">
          Wat is er aan de hand?
        </label>
        <select id="service" name="service" className={inputClass}>
          {services.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="region" className="text-label text-frost block mb-1">
          Regio
        </label>
        <select id="region" name="region" className={inputClass}>
          {regions.map((r) => (
            <option key={r.slug} value={r.name}>
              {r.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="notes" className="text-label text-frost block mb-1">
          Opmerkingen (optioneel)
        </label>
        <textarea id="notes" name="notes" rows={3} className={inputClass} />
      </div>
      {state.status === "error" && <p className="text-body-small text-signal-orange">{state.message}</p>}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-sm bg-signal-orange px-6 py-3 text-on-orange text-label font-semibold hover:bg-orange-hover transition-colors disabled:opacity-50"
      >
        {pending ? "Versturen…" : "Vraag terugbelservice aan"}
      </button>
    </form>
  );
}
