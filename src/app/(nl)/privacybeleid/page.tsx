import type { Metadata } from "next";
import { business } from "@/lib/business";

export const metadata: Metadata = { title: "Privacybeleid" };

export default function PrivacybeleidPage() {
  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-display-page text-frost mb-2">Privacybeleid.</h1>
        <p className="text-body-small text-mist mb-10">Laatst bijgewerkt: {new Date().toLocaleDateString("nl-NL")}</p>

        <div className="space-y-8 text-body text-frost [&_h2]:text-heading-4 [&_h2]:mb-2 [&_p]:text-mist">
          <div>
            <h2>Wat we verzamelen</h2>
            <p>
              Naam, telefoonnummer, e-mailadres, locatie en de dienst waarvoor u contact opneemt via ons
              contactformulier, telefoon of WhatsApp.
            </p>
          </div>
          <div>
            <h2>Hoe we het gebruiken</h2>
            <p>
              Om u terug te bellen, een technicus in te plannen, uw factuur te versturen en onze service te
              verbeteren. We verkopen uw gegevens nooit aan derden.
            </p>
          </div>
          <div>
            <h2>Hoe lang we het bewaren</h2>
            <p>Klantgegevens bewaren we tot 3 jaar na de laatste klus, voor garantie- en belastingdoeleinden.</p>
          </div>
          <div>
            <h2>Uw rechten</h2>
            <p>
              U kunt inzage, correctie of verwijdering van uw gegevens aanvragen via {business.email}. We reageren
              binnen 30 dagen.
            </p>
          </div>
          <div>
            <h2>Contact</h2>
            <p>
              {business.name}, {business.email}, {business.phone}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
