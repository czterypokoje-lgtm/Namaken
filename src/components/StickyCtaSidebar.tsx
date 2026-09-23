import { CallButton, WhatsAppButton } from "@/components/CallWhatsAppButtons";

export function StickyCtaSidebar({
  priceFrom,
  locale = "nl",
}: {
  priceFrom: number;
  locale?: "nl" | "en";
}) {
  const t =
    locale === "en"
      ? {
          available: "Available now, 24/7",
          from: "Price from",
          note: "Price confirmed on the phone before any work begins. Say no and you pay nothing.",
        }
      : {
          available: "Nu beschikbaar, 24/7",
          from: "Prijs vanaf",
          note: "Prijs telefonisch bevestigd voordat we beginnen. Zegt u nee, dan betaalt u niets.",
        };

  return (
    <aside className="sticky top-20 rounded-sm border border-line bg-navy-surface p-6">
      <p className="text-eyebrow text-signal-orange">{t.available}</p>
      <p className="text-price text-frost mt-2">
        {t.from} €{priceFrom}
      </p>
      <div className="mt-4 flex flex-col gap-3">
        <CallButton className="w-full" />
        <WhatsAppButton className="w-full" />
      </div>
      <p className="text-body-small text-mist mt-4">{t.note}</p>
    </aside>
  );
}
