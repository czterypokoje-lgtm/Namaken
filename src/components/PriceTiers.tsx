import { priceTiers } from "@/lib/business";

export function PriceTiers({ locale = "nl" }: { locale?: "nl" | "en" }) {
  const isEn = locale === "en";

  return (
    <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-3">
      {priceTiers.map((tier) => (
        <div key={tier.id} className="bg-navy-surface p-6">
          <p className="text-heading-4 text-frost">{tier.name}</p>
          <p className="text-body-small text-mist mt-2">{tier.description}</p>
          <p className="text-price text-signal-orange mt-4">€{tier.price},-</p>
          {isEn && <p className="text-mono text-faint mt-1">excl. call-out outside area</p>}
        </div>
      ))}
    </div>
  );
}
