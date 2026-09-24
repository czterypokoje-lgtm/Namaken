import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/data/services";
import { priceTiers } from "@/lib/business";
import { images } from "@/lib/images";
import Hero from "@/components/ag/Hero";
import MarqueeBanner from "@/components/ag/MarqueeBanner";
import PhotoGrid from "@/components/ag/PhotoGrid";
import ServiceRow from "@/components/ag/ServiceRow";
import TimeLine from "@/components/ag/TimeLine";
import TrustSection from "@/components/ag/TrustSection";
import SplitPhoneSection from "@/components/ag/SplitPhoneSection";
import FadeIn from "@/components/ag/FadeIn";

export const metadata: Metadata = {
  title: "Autosleutel bijmaken, kwijt of buitengesloten — 24/7 in heel Nederland",
  description:
    "Autosleutel bijmaken, verloren sleutel vervangen, buitengesloten of contactslot defect? Onze technici komen op locatie, prijs vooraf, 22 regio's, 24/7 bereikbaar.",
};

export default function HomePage() {
  return (
    <main>
      <Hero city="Utrecht" heroImage={images.heroCarNight} />
      <MarqueeBanner />
      <PhotoGrid />

      <section className="px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <FadeIn className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-eyebrow text-mist">Wat we doen</p>
              <h2 className="text-heading-1 text-frost mt-2">Onze diensten</h2>
            </div>
            <Link href="/diensten" className="text-label font-semibold text-frost underline hidden sm:block">
              Alle diensten bekijken →
            </Link>
          </FadeIn>

          <div>
            {services.map((service, idx) => (
              <ServiceRow
                key={service.id}
                category="Dienst"
                title={service.shortName}
                description={service.heroSub}
                price={`${service.priceFrom} €`}
                href={`/diensten/${service.id}`}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      <TimeLine />

      <section className="border-t border-line px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <FadeIn className="mb-12">
            <p className="text-eyebrow text-signal-orange mb-2">Transparante tarieven</p>
            <h2 className="text-heading-1 text-frost">
              Geen verborgen kosten.<br />Geen verrassingen achteraf.
            </h2>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-3">
            {priceTiers.map((tier, idx) => (
              <FadeIn key={tier.id} delay={idx * 0.15} className="border border-line bg-navy-surface p-6">
                <span className="text-eyebrow text-mist block">{tier.description}</span>
                <span className="text-heading-4 text-frost mt-2 block">{tier.name}</span>
                <span style={{ fontFamily: "var(--font-big-shoulders)" }} className="mt-4 block text-3xl font-black text-signal-orange">
                  vanaf €{tier.price}
                </span>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.5}>
            <p className="text-body-small text-mist mt-8">
              Alle prijzen worden <strong className="text-frost">vooraf telefonisch bevestigd</strong> voordat de
              technicus vertrekt.{" "}
              <Link href="/prijzen" className="text-frost underline">
                Volledige prijslijst bekijken →
              </Link>
            </p>
          </FadeIn>
        </div>
      </section>

      <TrustSection />
      <SplitPhoneSection />
    </main>
  );
}
