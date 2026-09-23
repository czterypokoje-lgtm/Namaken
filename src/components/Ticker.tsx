import { regions } from "@/data/regions";

export function Ticker({ locale = "nl" }: { locale?: "nl" | "en" }) {
  const isEn = locale === "en";
  const items = [...regions].sort((a, b) => a.avgArrivalMin - b.avgArrivalMin).slice(0, 10);
  const label = (min: number) => (isEn ? `${min} min` : `${min} min`);
  const row = items.map((r) => (
    <span key={r.slug} className="inline-flex items-center gap-2 px-6">
      <span className="text-heading-4 text-on-orange">{isEn && r.enName ? r.enName : r.name}</span>
      <span className="text-heading-4 text-on-orange font-mono">{label(r.avgArrivalMin)}</span>
      <span aria-hidden className="text-on-orange">🔑</span>
    </span>
  ));

  return (
    <div className="overflow-hidden border-y border-line bg-signal-orange py-3">
      <div className="flex w-max animate-[marquee_30s_linear_infinite]">
        <div className="flex">{row}</div>
        <div className="flex" aria-hidden>
          {row}
        </div>
      </div>
    </div>
  );
}
