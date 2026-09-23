import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Car key duplication, lost key replacement, lockouts and ignition lock repair.",
};

export default function EnglishServicesIndexPage() {
  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-display-page text-frost mb-4">Services.</h1>
        <ul className="divide-y divide-line">
          {services.map((s) => (
            <li key={s.id}>
              <Link
                href={`/en/diensten/${s.id}`}
                className="flex items-center justify-between py-6 hover:bg-navy-surface transition-colors"
              >
                <div>
                  <p className="text-heading-3 text-frost">{s.en.name}</p>
                  <p className="text-body text-mist mt-1 max-w-xl">{s.en.heroSub}</p>
                </div>
                <p className="text-price text-signal-orange whitespace-nowrap ml-4">from €{s.priceFrom}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
