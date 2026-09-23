import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { LeadForm } from "@/components/LeadForm";
import { business } from "@/lib/business";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Contact",
  description: "Bel, app of vraag een terugbelservice aan — we reageren snel, 24/7.",
};

export default function ContactPage() {
  return (
    <>
      <Hero
        eyebrow="Bel, app of vul het formulier in"
        headline="We bellen u terug binnen 10 minuten."
        sub="Vertel wat er aan de hand is en waar u zich bevindt. Een technicus belt u terug met een prijs, voordat er iemand onderweg gaat."
        showButtons
        image={images.nightCityStreet}
        compact
      />

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-2">
          <div className="rounded-sm border border-line bg-navy-surface p-6">
            <LeadForm />
          </div>
          <div>
            <h2 className="text-heading-3 text-frost mb-4">Direct contact</h2>
            <dl className="space-y-4 text-body">
              <div>
                <dt className="text-eyebrow text-mist">Telefoon (24/7)</dt>
                <dd className="text-frost">{business.phone}</dd>
              </div>
              <div>
                <dt className="text-eyebrow text-mist">E-mail</dt>
                <dd className="text-frost">{business.email}</dd>
              </div>
              <div>
                <dt className="text-eyebrow text-mist">Bereik</dt>
                <dd className="text-frost">{business.technicianCount} technici, 22 regio&apos;s door heel Nederland</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
