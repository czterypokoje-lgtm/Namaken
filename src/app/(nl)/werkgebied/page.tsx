import type { Metadata } from "next";
import { ArrivalsBoard } from "@/components/ArrivalsBoard";
import { CtaBand } from "@/components/CtaBand";
import { regions } from "@/data/regions";
import { business } from "@/lib/business";
import { CityHubHero } from "@/components/ag/CityHubHero";

export const metadata: Metadata = {
  title: "Werkgebied",
  description: `Autosleutelservice in ${regions.length} regio's door heel Nederland, met gemiddelde aankomsttijden per regio.`,
  alternates: { canonical: "/werkgebied" },
};

export default function WerkgebiedIndexPage() {
  const sorted = [...regions].sort((a, b) => a.avgArrivalMin - b.avgArrivalMin);
  const fastest = sorted[0];
  const slowest = sorted[sorted.length - 1];
  const avg = Math.round(regions.reduce((sum, r) => sum + r.avgArrivalMin, 0) / regions.length);

  return (
    <>
      <CityHubHero 
        fastestName={fastest.name}
        fastestMin={fastest.avgArrivalMin}
        slowestName={slowest.name}
        slowestMin={slowest.avgArrivalMin}
        avgMin={avg}
        regionCount={regions.length}
        isEn={false}
      />

      <ArrivalsBoard locale="nl" />

      <section className="border-t border-line px-4 py-12 sm:px-6">
        <div className="mx-auto flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between max-w-5xl">
          <div>
            <h2 className="text-heading-3 text-frost mb-2">Niet in de lijst? Bel en vraag.</h2>
            <p className="text-body-small text-mist max-w-md">
              We rijden verder voor geplande klussen en zakelijke accounts. Kunnen we niet snel genoeg komen, dan
              zeggen we dat eerlijk en verwijzen we u door naar iemand die het wel kan.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-x-10 gap-y-4 text-body-small">
            <div>
              <dt className="text-eyebrow text-mist">Mobiele service</dt>
              <dd className="text-frost">24/7, elke dag</dd>
            </div>
            <div>
              <dt className="text-eyebrow text-mist">Bereik</dt>
              <dd className="text-frost">{regions.length} regio&apos;s, heel Nederland</dd>
            </div>
            <div>
              <dt className="text-eyebrow text-mist">Telefoon</dt>
              <dd className="text-frost">{business.phone}</dd>
            </div>
            <div>
              <dt className="text-eyebrow text-mist">E-mail</dt>
              <dd className="text-frost">{business.email}</dd>
            </div>
          </dl>
        </div>
      </section>

      <CtaBand locale="nl" />
    </>
  );
}
