import Link from "next/link";
import { business } from "@/lib/business";
import { services } from "@/data/services";
import { regions } from "@/data/regions";

export function Footer({ locale = "nl" }: { locale?: "nl" | "en" }) {
  const isEn = locale === "en";
  const base = isEn ? "/en" : "";

  return (
    <footer className="border-t border-line bg-navy-band">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <svg viewBox="0 0 800 24" className="mb-8 w-full max-w-md text-signal-orange" aria-hidden>
          <path
            d="M4 12h20l4-6 4 6 4-8 4 8 4-6 4 6 4-8 4 8 4-6 4 6h700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>

        <div className="grid grid-cols-2 gap-8 text-body-small md:grid-cols-4">
          <div>
            <p className="mb-2 font-semibold text-signal-orange">{isEn ? "24/7 line" : "24/7 lijn"}</p>
            <p className="text-frost">{business.phone}</p>
            <p className="text-mist">{business.email}</p>
            <p className="text-mist">{business.hours}</p>
          </div>
          <div>
            <p className="mb-2 font-semibold text-signal-orange">{isEn ? "Services" : "Diensten"}</p>
            <ul className="space-y-1">
              {services.map((s) => (
                <li key={s.id}>
                  <Link href={`${base}/diensten/${s.id}`} className="text-mist hover:text-frost">
                    {isEn ? s.en.name : s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 font-semibold text-signal-orange">{isEn ? "Coverage" : "Werkgebied"}</p>
            <ul className="space-y-1">
              <li>
                <Link href={`${base}/werkgebied`} className="text-frost font-semibold hover:text-signal-orange">
                  {isEn ? "All areas" : "Alle regio's"}
                </Link>
              </li>
              {isEn
                ? regions.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/en/werkgebied/${r.slug}`} className="text-mist hover:text-frost">
                        {r.enName ?? r.name}
                      </Link>
                    </li>
                  ))
                : regions.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/werkgebied/${r.slug}`} className="text-mist hover:text-frost">
                        {r.name}
                      </Link>
                    </li>
                  ))}
              {!isEn && (
                <li className="pt-1">
                  <Link href="/merken" className="text-frost font-semibold hover:text-signal-orange">
                    Alle merken
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div>
            <p className="mb-2 font-semibold text-signal-orange">{isEn ? "Company" : "Bedrijf"}</p>
            <ul className="space-y-1">
              {!isEn && (
                <>
                  <li>
                    <Link href="/prijzen" className="text-mist hover:text-frost">
                      Prijzen
                    </Link>
                  </li>
                  <li>
                    <Link href="/over-ons" className="text-mist hover:text-frost">
                      Over ons
                    </Link>
                  </li>
                  <li>
                    <Link href="/veelgestelde-vragen" className="text-mist hover:text-frost">
                      Veelgestelde vragen
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-mist hover:text-frost">
                      Contact
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        <p className="mt-8 text-mono text-faint">
          {business.name} is een landelijk technicianetwerk voor mobiele autosleutelservice. KVK: {business.kvk} ·
          BTW: {business.btw}.
        </p>

        <div className="mt-4 flex flex-col justify-between gap-2 border-t border-line pt-4 text-mono text-faint sm:flex-row">
          <p>© {new Date().getFullYear()} {business.name}</p>
          {!isEn && (
            <div className="flex gap-4">
              <Link href="/privacybeleid" className="hover:text-mist">
                Privacybeleid
              </Link>
              <Link href="/algemene-voorwaarden" className="hover:text-mist">
                Algemene voorwaarden
              </Link>
            </div>
          )}
        </div>
      </div>

      <p
        style={{ fontFamily: "var(--font-big-shoulders)" }}
        className="select-none overflow-hidden whitespace-nowrap px-4 pb-4 font-black uppercase leading-[0.8] text-signal-orange text-[16vw] sm:px-6"
        aria-hidden
      >
        {business.name}
      </p>
    </footer>
  );
}
