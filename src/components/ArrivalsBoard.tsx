"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { regions } from "@/data/regions";

const THRESHOLD_MIN = 45;

export function ArrivalsBoard({ locale = "nl" }: { locale?: "nl" | "en" }) {
  const isEn = locale === "en";
  const base = isEn ? "/en/werkgebied" : "/werkgebied";
  const avg = Math.round(regions.reduce((sum, r) => sum + r.avgArrivalMin, 0) / regions.length);
  const sorted = [...regions].sort((a, b) => a.avgArrivalMin - b.avgArrivalMin);

  return (
    <section className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-heading-3 text-frost mb-2">
          {isEn ? "Arrivals." : "Aankomsten."} <span className="text-body-small text-mist">({regions.length})</span>
        </h2>
        <p className="text-body-small text-mist mb-8 max-w-2xl">
          {isEn
            ? `Sorted by average arrival time. Each bar runs against our ${THRESHOLD_MIN}-minute limit; orange means under the ${avg}-minute nationwide average.`
            : `Gesorteerd op gemiddelde aankomsttijd. Elke balk loopt tegen onze limiet van ${THRESHOLD_MIN} minuten; oranje betekent sneller dan het landelijk gemiddelde van ${avg} minuten.`}
        </p>

        <div className="hidden border-b border-line pb-2 text-eyebrow text-mist sm:grid sm:grid-cols-[60px_1fr_240px_120px] sm:gap-4">
          <span>{isEn ? "MIN" : "MIN"}</span>
          <span>{isEn ? "AREA & SUB-LOCATIONS" : "REGIO EN GEBIEDEN"}</span>
          <span>{isEn ? `AGAINST ${THRESHOLD_MIN} MIN` : `TEGEN ${THRESHOLD_MIN} MIN`}</span>
          <span className="text-right">{isEn ? "STATUS" : "STATUS"}</span>
        </div>

        <ul className="divide-y divide-line">
          {sorted.map((r, i) => {
            const faster = r.avgArrivalMin < avg;
            const width = Math.min(100, (r.avgArrivalMin / THRESHOLD_MIN) * 100);
            return (
              <motion.li
                key={r.slug}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
              >
                <Link
                  href={`${base}/${r.slug}`}
                  className="grid grid-cols-[50px_1fr] items-center gap-4 py-4 hover:bg-navy-surface transition-colors sm:grid-cols-[60px_1fr_240px_120px]"
                >
                  <span className="text-heading-3 text-signal-orange">{r.avgArrivalMin}</span>
                  <div>
                    <p className="text-heading-4 text-frost">{isEn && r.enName ? r.enName : r.name}</p>
                    <p className="text-body-small text-mist">{r.areas.slice(0, 2).join(", ")}</p>
                  </div>
                  <span className="relative hidden h-2 overflow-hidden rounded-full bg-line sm:block">
                    <span
                      className={`absolute inset-y-0 left-0 rounded-full ${faster ? "bg-signal-orange" : "bg-line-strong"}`}
                      style={{ width: `${width}%` }}
                    />
                  </span>
                  <span
                    className={`hidden text-right text-mono sm:block ${faster ? "text-signal-orange" : "text-mist"}`}
                  >
                    {faster
                      ? isEn
                        ? `Under ${avg} min`
                        : `Onder ${avg} min`
                      : isEn
                        ? `${avg}–${THRESHOLD_MIN} min`
                        : `${avg}–${THRESHOLD_MIN} min`}
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </ul>

        <p className="text-body-small text-mist mt-8">
          {isEn
            ? "Outside this list? Call and ask — we handle scheduled work and business accounts beyond these areas too."
            : "Niet in dit lijstje? Bel en vraag — voor afspraken en zakelijke accounts rijden we ook buiten deze regio's."}
        </p>
      </div>
    </section>
  );
}
