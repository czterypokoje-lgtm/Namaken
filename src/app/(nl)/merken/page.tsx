import type { Metadata } from "next";
import { BrandGrid } from "@/components/BrandGrid";
import { BrandLogoGrid } from "@/components/BrandLogoGrid";

export const metadata: Metadata = {
  title: "Merken",
  description: "Autosleutel bijmaken voor vrijwel elk automerk — kies uw merk voor specifieke informatie.",
};

export default function MerkenIndexPage() {
  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-display-page text-frost mb-4">Merken.</h1>
        <p className="text-lead text-mist mb-10 max-w-2xl">
          Van Alfa Romeo tot Volkswagen — onze technici programmeren sleutels voor vrijwel elk merk en bouwjaar.
          Klik op een logo om naar de merkpagina te gaan.
        </p>
        <BrandLogoGrid />

        <div className="mt-16 border-t border-line pt-10">
          <BrandGrid />
        </div>
      </div>
    </section>
  );
}
