import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Testimonial } from "@/components/Testimonial";
import { TrustCredentialsBand } from "@/components/TrustCredentialsBand";
import { business } from "@/lib/business";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Over ons",
  description: `${business.name} is een landelijk netwerk van ${business.technicianCount} technici voor autosleutelservice.`,
};

export default function OverOnsPage() {
  return (
    <>
      <Hero
        eyebrow="Een netwerk dat de telefoon opneemt"
        headline="Onze technici, uw regio."
        sub={`${business.name} verbindt ${business.technicianCount} zelfstandige technici in een landelijk netwerk, zodat er altijd iemand dichtbij is — zonder de wachttijd van één centrale werkplaats.`}
        image={images.heroCarDusk}
        compact
      />

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <Testimonial
            quote="Sleutel kwijt om 23:00 in Eindhoven. Ze belden binnen vijf minuten terug met een vaste prijs en de technicus was er zoals beloofd."
            author="R. Jansen, Eindhoven"
          />
        </div>
      </section>

      <TrustCredentialsBand locale="nl" />
    </>
  );
}
