import { trustStats, trustBadges } from "@/lib/business";

export function TrustCredentialsBand({ locale = "nl" }: { locale?: "nl" | "en" }) {
  const isEn = locale === "en";

  return (
    <section className="border-t border-line bg-night-navy px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-heading-2 text-frost mb-4">
          {isEn
            ? "Verified. Insured. And we show ID first."
            : "Gescreend. Verzekerd. En wij tonen ons ID eerst."}
        </h2>
        <p className="text-body-small text-mist mb-10 max-w-xl">
          {isEn
            ? "Every technician in our network is background-checked and identifies before any work starts."
            : "Elke technicus in ons netwerk is gescreend en toont zich eerst voordat er gewerkt wordt."}
        </p>

        <div className="grid grid-cols-2 gap-8 border-t border-line pt-8 sm:grid-cols-4">
          {trustStats.map((stat) => (
            <div key={stat.label}>
              <p className="text-stat-figure text-frost">{stat.figure}</p>
              <p className="text-body-small text-mist mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {trustBadges.map((badge) => (
            <div key={badge.label}>
              <p className="text-eyebrow text-signal-orange">{badge.label}</p>
              <p className="text-body-small text-mist mt-1">{badge.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
