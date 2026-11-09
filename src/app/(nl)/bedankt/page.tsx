import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/lib/business";
import { seo } from "@/lib/seo";
import { TrackedPhoneLink, TrackedWhatsAppLink } from "@/components/TrackedPhoneLink";

/**
 * Post-submission confirmation page.
 *
 * It exists for measurement as much as for the visitor: a distinct URL is the
 * sturdiest conversion signal available, usable as a GA4 key event and a
 * Google Ads conversion without depending on a click handler firing.
 *
 * `noindex` because it has no search value, would otherwise compete for brand
 * queries, and an indexed thank-you page gets found by crawlers and inflates
 * the conversion count with visits that never submitted anything.
 */
export const metadata: Metadata = seo({
  path: "/bedankt",
  title: "Bedankt voor uw aanvraag",
  description: "Uw terugbelverzoek is ontvangen. We nemen zo snel mogelijk contact met u op.",
  robots: { index: false, follow: true },
});

export default function ThankYouPage() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-eyebrow text-signal-orange mb-4">Aanvraag ontvangen</p>
        <h1 className="text-heading-1 text-frost mb-6">Bedankt — we bellen u zo snel mogelijk terug.</h1>
        <p className="text-body text-mist mb-10">
          Uw terugbelverzoek staat bij ons binnen. Een technicus neemt contact op om de prijs en de
          aankomsttijd te bevestigen voordat er iemand onderweg gaat.
        </p>

        <div className="border-t border-line pt-10">
          <p className="text-body-small text-mist mb-6">
            Staat u met spoed stil? Bellen is altijd sneller dan wachten op een terugbelverzoek.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <TrackedPhoneLink
              location="thankyou_phone"
              className="inline-flex w-full items-center justify-center rounded-sm bg-signal-orange px-6 py-3 text-on-orange text-label font-semibold hover:bg-orange-hover transition-colors sm:w-auto"
            >
              Bel {business.phone}
            </TrackedPhoneLink>
            <TrackedWhatsAppLink
              location="thankyou_whatsapp"
              className="inline-flex w-full items-center justify-center rounded-sm border border-line-strong px-6 py-3 text-frost text-label font-semibold hover:border-signal-orange transition-colors sm:w-auto"
            >
              WhatsApp direct hulp
            </TrackedWhatsAppLink>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 text-body-small">
          <Link href="/diensten" className="text-mist underline hover:text-frost">
            Onze diensten
          </Link>
          <Link href="/prijzen" className="text-mist underline hover:text-frost">
            Prijzen
          </Link>
          <Link href="/werkgebied" className="text-mist underline hover:text-frost">
            Werkgebied
          </Link>
        </div>
      </div>
    </section>
  );
}
