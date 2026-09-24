"use client";

import Link from "next/link";
import { business } from "@/lib/business";
import { trackConversion } from "@/lib/analytics";

export function CtaBand({ locale = "nl" }: { locale?: "nl" | "en" }) {
  const isEn = locale === "en";
  const base = isEn ? "/en" : "";

  return (
    <section className="border-t border-line bg-signal-orange px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-5xl items-center justify-between text-mono text-navy-band">
        <p>{isEn ? "Still stuck?" : "Nog vastzitten?"}</p>
        <p>{isEn ? "Answered by a person, 24/7" : "Beantwoord door een persoon, 24/7"}</p>
      </div>

      <a
        href={business.phoneHref}
        onClick={() => trackConversion("tel_click")}
        style={{ fontFamily: "var(--font-big-shoulders)" }}
        className="mx-auto mt-4 block max-w-5xl font-black uppercase leading-[0.85] tracking-tight text-navy-band text-[13vw] sm:text-[9vw] lg:text-[6rem]"
      >
        {business.phone}
      </a>

      <div className="mx-auto mt-6 flex max-w-5xl flex-wrap items-center justify-between gap-4 border-t border-navy-band/20 pt-4">
        <p className="text-body-small text-navy-band max-w-xl">
          {isEn
            ? "Lockout from €150. After-hours flat +€40 between 10 PM and 7 AM. You hear the price before anyone drives."
            : "Buitengesloten vanaf €150. Vast +€40 toeslag tussen 22:00 en 07:00. U hoort de prijs voordat er iemand vertrekt."}
        </p>
        <div className="flex gap-6 text-label font-semibold text-navy-band underline">
          <Link href={`${base}/contact`}>{isEn ? "Book a daytime visit" : "Boek een overdag bezoek"}</Link>
          {!isEn && <Link href="/prijzen">Bekijk alle prijzen</Link>}
        </div>
      </div>
    </section>
  );
}
