import type { Metadata } from "next";
import { seo } from "@/lib/seo";
import { BrandGrid } from "@/components/BrandGrid";
import { BrandLogoGrid } from "@/components/BrandLogoGrid";
import Link from "next/link";
import { allBrands } from "@/data/brands";

export const metadata: Metadata = seo({
  path: "/merken",
  title: "Merken",
  description: "Autosleutel bijmaken voor vrijwel elk automerk — kies uw merk voor specifieke informatie.",
});

export default function MerkenIndexPage() {
  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-display-page text-frost mb-4">Merken.</h1>
        <p className="text-lead text-mist mb-10 max-w-2xl">
          Van Alfa Romeo tot Volvo — onze technici programmeren sleutels voor {allBrands.length} merken en
          vrijwel elk bouwjaar. Klik op een logo om naar de merkpagina te gaan.
        </p>
        <BrandLogoGrid />

        <div className="mt-16 border-t border-line pt-10">
          <BrandGrid />
        </div>

        <div className="mt-16 border-t border-line pt-10 max-w-3xl">
          <h2 className="text-heading-3 text-frost mb-4">Waarom het merk uitmaakt</h2>
          <p className="text-body text-mist mb-4">
            Een autosleutel is sinds de jaren negentig geen stuk metaal meer. In vrijwel elke sleutel zit een
            transponder die zich bij de startonderbreker moet melden, en bij nieuwere auto&rsquo;s gebeurt dat
            draadloos via een smart key. Elk merk gebruikt daarvoor een eigen protocol, en binnen één merk
            verschilt het nog per bouwjaar. Daarom staat er per merk een aparte pagina: wat voor een Golf geldt,
            geldt niet automatisch voor een Polo van hetzelfde jaar.
          </p>
          <p className="text-body text-mist mb-4">
            Wat niet per merk verschilt, is de werkwijze. Onze technicus komt naar de auto, controleert met het
            kenteken en een geldig legitimatiebewijs of die van u is, en programmeert de sleutel ter plekke.
            Bent u alle sleutels kwijt, dan is een origineel niet nodig — we lezen de auto zelf uit.
          </p>
          <p className="text-body-small text-mist">
            Staat uw merk er niet bij? Bel ons alsnog. De lijst hierboven dekt de merken die we dagelijks zien,
            maar we werken aan meer. Bekijk anders{" "}
            <Link href="/diensten" className="underline hover:text-frost">
              onze diensten
            </Link>{" "}
            of de{" "}
            <Link href="/prijzen" className="underline hover:text-frost">
              prijzen per sleuteltype
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
