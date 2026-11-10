import type { Metadata } from "next";
import { seo } from "@/lib/seo";
import Link from "next/link";
import { services } from "@/data/services";

export const metadata: Metadata = seo({
  path: "/diensten",
  altPath: "/en/diensten",
  title: "Diensten",
  description: "Alle autosleutelservices: bijmaken, verloren sleutel, buitengesloten en contactslot vervangen.",
});

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

        <div className="mt-14 border-t border-line pt-10">
          <h2 className="text-heading-3 text-frost mb-4">Alles gebeurt op locatie</h2>
          <p className="text-body text-mist mb-4">
            Wat deze vier diensten gemeen hebben: de technicus komt naar de auto. Dat scheelt een sleepwagen en
            een afspraak bij de dealer, en het is de reden dat een klus meestal dezelfde dag rond is in plaats
            van over enkele weken. Sleutels worden ter plekke gesneden en aan de boordcomputer gekoppeld, dus u
            rijdt er direct mee weg.
          </p>
          <p className="text-body text-mist mb-4">
            Voordat er iemand vertrekt, bevestigen we de prijs telefonisch. Zegt u op dat moment nee, dan kost
            het u niets. En voordat de technicus begint, controleren we met het kenteken en een geldig
            legitimatiebewijs of de auto van u is — dat is geen formaliteit maar precies wat deze dienst
            veilig houdt.
          </p>

          <h2 className="text-heading-3 text-frost mt-10 mb-4">Welke dienst heeft u nodig?</h2>
          <ul className="space-y-3">
            <li className="text-body text-mist">
              <strong className="text-frost">U heeft nog een werkende sleutel</strong> en wilt een reserve:{" "}
              <Link href="/diensten/autosleutel-bijmaken" className="underline hover:text-frost">
                autosleutel bijmaken
              </Link>
              .
            </li>
            <li className="text-body text-mist">
              <strong className="text-frost">Alle sleutels zijn weg</strong> of onvindbaar:{" "}
              <Link href="/diensten/autosleutel-kwijt" className="underline hover:text-frost">
                autosleutel kwijt
              </Link>
              . Een origineel is niet nodig.
            </li>
            <li className="text-body text-mist">
              <strong className="text-frost">De sleutel ligt in de afgesloten auto</strong>:{" "}
              <Link href="/diensten/auto-openen-zonder-sleutel" className="underline hover:text-frost">
                auto openen zonder sleutel
              </Link>
              , schadevrij.
            </li>
            <li className="text-body text-mist">
              <strong className="text-frost">De sleutel past maar draait niet meer</strong>: dan is het meestal
              het slot, niet de sleutel —{" "}
              <Link href="/diensten/contactslot-vervangen" className="underline hover:text-frost">
                contactslot vervangen
              </Link>
              .
            </li>
          </ul>
          <p className="text-body-small text-mist mt-6">
            Twijfelt u welke het is? Bel ons en beschrijf wat er gebeurt — dat scheelt u een verkeerde afspraak.
            Bekijk ook de{" "}
            <Link href="/prijzen" className="underline hover:text-frost">
              prijzen per dienst
            </Link>{" "}
            of ons{" "}
            <Link href="/werkgebied" className="underline hover:text-frost">
              werkgebied
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
