import type { Metadata } from "next";
import Image from "next/image";
import { ArrivalsBoard } from "@/components/ArrivalsBoard";
import { CtaBand } from "@/components/CtaBand";
import { regions } from "@/data/regions";
import { images } from "@/lib/images";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Werkgebied",
  description: `Autosleutelservice in ${regions.length} regio's door heel Nederland, met gemiddelde aankomsttijden per regio.`,
};

export default function WerkgebiedIndexPage() {
  const sorted = [...regions].sort((a, b) => a.avgArrivalMin - b.avgArrivalMin);
  const fastest = sorted[0];
  const slowest = sorted[sorted.length - 1];
  const avg = Math.round(regions.reduce((sum, r) => sum + r.avgArrivalMin, 0) / regions.length);

  return (
    <>
      <section className="relative min-h-[85vh] overflow-hidden border-b border-line flex flex-col justify-end">
        <Image src={images.nightCityStreet} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-night-navy via-night-navy/70 to-night-navy/30" />

        <div className="relative flex items-start justify-between px-4 pt-10 sm:px-6">
          <p className="text-mono text-frost">Werkgebied door heel Nederland</p>
          <p className="text-mono text-mist text-right hidden sm:block">
            Technici gestationeerd in {fastest.name}, {sorted[1]?.name} en {sorted[2]?.name}
          </p>
        </div>

        <div className="relative grid gap-6 px-4 pb-8 pt-16 sm:px-6 lg:grid-cols-[1fr_320px] lg:items-end lg:gap-12">
          <h1 className="text-hero-line text-frost">
            {regions.length} regio&apos;s.
            <br />
            {fastest.avgArrivalMin} tot {slowest.avgArrivalMin} minuten.
          </h1>
          <p className="text-body text-mist">
            Technici zitten verspreid door het hele land, zodat de dichtstbijzijnde altijd uw oproep aanneemt. De
            tijden hieronder zijn het gemiddelde over de afgelopen 30 dagen.
            <br />
            <a href="/contact" className="text-frost underline">
              Bel en vraag naar uw straat
            </a>
          </p>
        </div>

        <div className="relative grid grid-cols-2 gap-4 border-t border-line/50 bg-night-navy/80 px-4 py-6 text-mono text-mist sm:grid-cols-4 sm:px-6">
          <p>
            SNELSTE: {fastest.name.toUpperCase()}, {fastest.avgArrivalMin} MIN
          </p>
          <p>ALLE OPROEPEN: GEM. {avg} MIN</p>
          <p>
            VERST: {slowest.name.toUpperCase()}, {slowest.avgArrivalMin} MIN
          </p>
          <p>GEPLAND WERK: OOK VERDER WEG</p>
        </div>
      </section>

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
