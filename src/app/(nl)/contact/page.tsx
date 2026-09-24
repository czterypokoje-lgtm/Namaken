import type { Metadata } from "next";
import Image from "next/image";
import { LeadForm } from "@/components/LeadForm";
import { business } from "@/lib/business";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Contact",
  description: `Neem contact op met ${business.name}. 24/7 pechhulp en autosleutelservice via ${business.phone}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="relative flex min-h-[80vh] flex-col overflow-hidden border-b border-line pt-24">
        <Image
          src={images.nightCityStreet}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.6]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night-navy/40 to-night-navy/90" />

        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-4 sm:px-6">
          <h1 className="text-display-page text-white mb-8 max-w-3xl">
            Bel, schrijf<br />of kom langs.
          </h1>
          <p className="text-body text-mist max-w-md md:ml-auto">
            Voor noodsituaties en spoedgevallen, bel. Een medewerker neemt dag en nacht op. Voor offertes en
            gepland werk, e-mail of vul het formulier hieronder in.
          </p>
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 border-t border-white/15 px-4 py-6 sm:grid-cols-2 sm:px-6">
          <div>
            <p className="text-eyebrow text-signal-orange">Contact: 24/7 lijn</p>
            <p style={{ fontFamily: "var(--font-big-shoulders)" }} className="text-white font-extrabold uppercase tracking-wide">
              {business.phone}
            </p>
          </div>
          <div>
            <p className="text-eyebrow text-signal-orange">E-mail: reactie binnen 1 werkdag</p>
            <p style={{ fontFamily: "var(--font-big-shoulders)" }} className="text-white font-extrabold uppercase tracking-wide">
              {business.email}
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto grid max-w-5xl gap-16 lg:grid-cols-2">
          <div className="space-y-12">
            <div>
              <p className="text-eyebrow text-signal-orange mb-4">Bellen, nu opgenomen</p>
              <a
                href={business.phoneHref}
                style={{ fontFamily: "var(--font-big-shoulders)" }}
                className="mb-6 block text-4xl font-black text-white sm:text-5xl"
              >
                {business.phone}
              </a>
              <p className="text-body-small text-mist max-w-sm">
                Sleutel kwijt of auto op slot? Een specialist neemt direct op, geen callcenter. Gemiddelde
                aankomst is 35 minuten in de regio.
              </p>
            </div>

            <div>
              <p className="text-eyebrow text-signal-orange mb-4">Schrijven voor offertes en gepland werk</p>
              <a
                href={`mailto:${business.email}`}
                style={{ fontFamily: "var(--font-big-shoulders)" }}
                className="mb-6 block text-3xl font-extrabold text-signal-orange sm:text-4xl"
              >
                {business.email}
              </a>
              <p className="text-body-small text-mist max-w-sm">
                Gepland werk voor uw bedrijfswagen, of meerdere sleutels nodig? Stuur ons een bericht en wij
                antwoorden binnen een werkdag.
              </p>
              <a
                href={business.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-label mt-6 inline-block border-b border-white font-semibold text-white hover:border-signal-orange hover:text-signal-orange"
              >
                Of stuur een WhatsApp
              </a>
            </div>
          </div>

          <div className="rounded-sm border border-line bg-navy-surface p-6">
            <h2 className="text-heading-3 text-frost mb-2">Liever teruggebeld worden?</h2>
            <p className="text-body-small text-mist mb-6">
              Vertel wat er aan de hand is en waar u zich bevindt. Een technicus belt u terug met een prijs,
              voordat er iemand onderweg gaat.
            </p>
            <LeadForm />
          </div>
        </div>
      </section>
    </>
  );
}
