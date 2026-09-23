"use client";

import { useActionState } from "react";
import { submitLead, type LeadFormState } from "@/app/actions/submitLead";
import { services } from "@/data/services";
import { regions } from "@/data/regions";
import { trackConversion } from "@/lib/analytics";

const initialState: LeadFormState = { status: "idle" };

export function LeadForm() {
  const [state, formAction, pending] = useActionState(async (prev: LeadFormState, fd: FormData) => {
    const result = await submitLead(prev, fd);
    if (result.status === "success") trackConversion("lead_form_submit");
    return result;
  }, initialState);

  if (state.status === "success") {
    return <p className="text-heading-4 text-signal-orange">{state.message}</p>;
  }

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="name" className="text-label text-frost block mb-1">
          Naam
        </label>
        <input
          id="name"
          name="name"
          required
          className="w-full rounded-sm border border-line bg-navy-surface px-4 py-2 text-frost"
        />
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
          className="w-full rounded-sm border border-line bg-navy-surface px-4 py-2 text-frost"
        />
      </div>
      <div>
        <label htmlFor="service" className="text-label text-frost block mb-1">
          Wat is er aan de hand?
        </label>
        <select
          id="service"
          name="service"
          className="w-full rounded-sm border border-line bg-navy-surface px-4 py-2 text-frost"
        >
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
        <select
          id="region"
          name="region"
          className="w-full rounded-sm border border-line bg-navy-surface px-4 py-2 text-frost"
        >
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
        <textarea
          id="notes"
          name="notes"
          rows={3}
          className="w-full rounded-sm border border-line bg-navy-surface px-4 py-2 text-frost"
        />
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
