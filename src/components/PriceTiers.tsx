import { services } from "@/data/services";

export function PriceTiers({ locale = "nl" }: { locale?: "nl" | "en" }) {
  const isEn = locale === "en";

  return (
    <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {services.map((service) => (
        <div key={service.id} className="bg-navy-surface p-6">
          <p className="text-heading-4 text-frost">{isEn ? service.en.name : service.name}</p>
          <p className="text-body-small text-mist mt-2">{isEn ? service.en.whatWeDo[0] : service.whatWeDo[0]}</p>
          <p className="text-price text-signal-orange mt-4">
            {isEn ? "from" : "vanaf"} €{service.priceFrom},-
          </p>
        </div>
      ))}
    </div>
  );
}
