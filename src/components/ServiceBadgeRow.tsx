export function ServiceBadgeRow({
  priceFrom,
  timeOnSite,
  averageArrival,
  locale = "nl",
}: {
  priceFrom: number;
  timeOnSite: string;
  averageArrival: string;
  locale?: "nl" | "en";
}) {
  const items =
    locale === "en"
      ? [
          { label: "Price from", value: `€${priceFrom}` },
          { label: "Time on site", value: timeOnSite },
          { label: "Average arrival", value: averageArrival },
          { label: "Licensed", value: "Insured technicians" },
        ]
      : [
          { label: "Prijs vanaf", value: `€${priceFrom}` },
          { label: "Tijd ter plekke", value: timeOnSite },
          { label: "Gemiddelde aankomst", value: averageArrival },
          { label: "Keurmerk", value: "Verzekerde technici" },
        ];

  return (
    <div className="grid grid-cols-2 gap-px border-y border-line bg-line sm:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="bg-navy-surface px-4 py-4">
          <p className="text-eyebrow text-mist">{item.label}</p>
          <p className="text-heading-4 text-frost mt-1">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
