import type { Metadata } from "next";
import { seo } from "@/lib/seo";
import { Hero } from "@/components/Hero";
import { Faq } from "@/components/Faq";
import { services } from "@/data/services";
import { images } from "@/lib/images";

export const metadata: Metadata = seo({
  path: "/veelgestelde-vragen",
  title: "Veelgestelde vragen",
  description: "Antwoorden op de meest gestelde vragen over autosleutel bijmaken, verloren sleutels en meer.",
});

const generalFaq = [
  {
    // Captures the "autosleutel namaken" query, which is the brand name and a
    // real search term, while answering the question a visitor actually has.
    // "Namaken" can read as unauthorised copying where a key is certified, so
    // the answer states plainly that ownership is verified first.
    q: "Autosleutel namaken of bijmaken — is dat hetzelfde?",
    a: "In het dagelijks taalgebruik bedoelen mensen er hetzelfde mee: een extra of vervangende sleutel voor uw auto. Vakmensen zeggen meestal 'bijmaken'. Wat de woorden niet veranderen, is de procedure: wij maken alleen een sleutel nadat we met het kenteken en een geldig legitimatiebewijs hebben vastgesteld dat de auto van u is. Zonder dat begint onze technicus niet.",
  },
  {
    q: "Hoe snel kunnen jullie ter plekke zijn?",
    a: "Landelijk gemiddeld binnen 35 minuten, afhankelijk van uw regio. Op de werkgebied-pagina staat de gemiddelde aankomsttijd per regio.",
  },
  {
    q: "Werken jullie 's nachts en in het weekend?",
    a: "Ja, 24/7. Voor spoedservice buiten kantooruren geldt een toeslag die u vooraf hoort.",
  },
  {
    q: "Moet ik vooraf betalen?",
    a: "Nee, u betaalt pas als de klus is afgerond en u akkoord bent met de prijs die vooraf is bevestigd.",
  },
];

export default function FaqPage() {
  const allFaq = [...generalFaq, ...services.flatMap((s) => s.faq)];

  return (
    <>
      <Hero
        eyebrow="Vragen? De meeste zijn al eens gesteld"
        headline="Veelgestelde vragen."
        sub="Staat uw vraag er niet bij? Bel of app ons, we reageren direct."
        image={images.keyCutting}
        compact
      />
      <Faq items={allFaq} title="Alle vragen" />
    </>
  );
}
