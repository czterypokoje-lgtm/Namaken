import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Diensten",
  description: "Alle autosleutelservices: bijmaken, verloren sleutel, buitengesloten en contactslot vervangen.",
  alternates: { canonical: "/diensten" },
};

export default function DienstenIndexPage() {
  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-display-page text-frost mb-4">Diensten.</h1>
        <p className="text-lead text-mist mb-10 max-w-2xl">
          Vier manieren om vast te zitten, één nummer voor allemaal. Elke prijs hier is de startprijs die u aan de
          telefoon hoort.
        </p>
        <ul className="divide-y divide-line">
          {services.map((s) => (
            <li key={s.id}>
              <Link
                href={`/diensten/${s.id}`}
                className="flex items-center justify-between py-6 hover:bg-navy-surface transition-colors"
              >
                <div>
                  <p className="text-heading-3 text-frost">{s.name}</p>
                  <p className="text-body text-mist mt-1 max-w-xl">{s.heroSub}</p>
                </div>
                <p className="text-price text-signal-orange whitespace-nowrap ml-4">vanaf €{s.priceFrom}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
