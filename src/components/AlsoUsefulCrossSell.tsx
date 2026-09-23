import Link from "next/link";
import { services, type ServiceId } from "@/data/services";

export function AlsoUsefulCrossSell({
  excludeId,
  locale = "nl",
}: {
  excludeId: ServiceId;
  locale?: "nl" | "en";
}) {
  const isEn = locale === "en";
  const others = services.filter((s) => s.id !== excludeId);
  const base = isEn ? "/en/diensten" : "/diensten";

  return (
    <section className="border-t border-line px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-heading-3 text-frost mb-6">{isEn ? "Also useful." : "Ook handig."}</h2>
        <ul className="divide-y divide-line">
          {others.map((s) => (
            <li key={s.id}>
              <Link
                href={`${base}/${s.id}`}
                className="flex items-center justify-between py-4 hover:bg-navy-surface transition-colors"
              >
                <div>
                  <p className="text-heading-4 text-frost">{isEn ? s.en.name : s.name}</p>
                  <p className="text-body-small text-mist">{isEn ? s.en.heroSub : s.heroSub}</p>
                </div>
                <p className="text-price text-signal-orange whitespace-nowrap ml-4">
                  {isEn ? "from" : "vanaf"} €{s.priceFrom}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
