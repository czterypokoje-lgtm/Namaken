import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Ticker } from "@/components/Ticker";
import { StatPhotoSection } from "@/components/StatPhotoSection";
import { StoryTimeline } from "@/components/StoryTimeline";
import { ArrivalsBoard } from "@/components/ArrivalsBoard";
import { TrustCredentialsBand } from "@/components/TrustCredentialsBand";
import { Testimonial } from "@/components/Testimonial";
import { FooterCta } from "@/components/FooterCta";
import { services } from "@/data/services";
import { business } from "@/lib/business";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Autosleutel bijmaken, kwijt of buitengesloten — 24/7 in heel Nederland",
  description:
    "Autosleutel bijmaken, verloren sleutel vervangen, buitengesloten of contactslot defect? Onze technici komen op locatie, prijs vooraf, 22 regio's, 24/7 bereikbaar.",
};

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow={`${business.hours} · landelijk technicianetwerk`}
        headline="Autosleutel kwijt? We zijn er, gemiddeld binnen 35 minuten."
        sub="Sleutel bijmaken, verloren sleutel vervangen, buitengesloten of een defect contactslot — onze technici werken op locatie, in heel Nederland. Prijs hoort u vooraf aan de telefoon."
        image={images.heroCarNight}
      />

      <Ticker locale="nl" />

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-heading-3 text-frost mb-6">Diensten.</h2>
          <ul className="divide-y divide-line">
            {services.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/diensten/${s.id}`}
                  className="flex items-center justify-between py-4 hover:bg-navy-surface transition-colors"
                >
                  <div>
                    <p className="text-heading-4 text-frost">{s.name}</p>
                    <p className="text-body-small text-mist">{s.heroSub}</p>
                  </div>
                  <p className="text-price text-signal-orange whitespace-nowrap ml-4">vanaf €{s.priceFrom}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <StatPhotoSection locale="nl" />

      <ArrivalsBoard locale="nl" />

      <StoryTimeline locale="nl" />

      <TrustCredentialsBand locale="nl" />

      <section className="border-t border-line px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <Testimonial
            quote="Sleutel kwijt op zondagavond in Rotterdam. Ze belden terug binnen 5 minuten en de technicus stond er binnen het half uur."
            author="M. de Vries, Rotterdam"
          />
        </div>
      </section>

      <FooterCta locale="nl" />
    </>
  );
}
