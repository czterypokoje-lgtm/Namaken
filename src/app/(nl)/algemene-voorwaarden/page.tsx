import type { Metadata } from "next";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Algemene voorwaarden",
  alternates: { canonical: "/algemene-voorwaarden" },
};

export default function VoorwaardenPage() {
  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-display-page text-frost mb-2">Algemene voorwaarden.</h1>
        <p className="text-body-small text-mist mb-10">Laatst bijgewerkt: {new Date().toLocaleDateString("nl-NL")}</p>

        <div className="space-y-8 text-body text-frost [&_h2]:text-heading-4 [&_h2]:mb-2 [&_p]:text-mist">
          <div>
            <h2>Prijzen</h2>
            <p>
              Prijzen op deze site zijn startprijzen in euro&apos;s, inclusief btw. U ontvangt een bevestigde
              totaalprijs telefonisch voordat de technicus onderweg gaat, en nogmaals op locatie voordat er
              gewerkt wordt.
            </p>
          </div>
          <div>
            <h2>Eigendom</h2>
            <p>
              We werken alleen aan voertuigen waarvan de aanvrager kan aantonen eigenaar, gemachtigd bestuurder of
              een geverifieerde derde (bijvoorbeeld een garage) te zijn.
            </p>
          </div>
          <div>
            <h2>Onderdelen</h2>
            <p>Wij leveren de sleutel en het bijbehorende programmeerwerk. Op arbeid geldt 12 maanden garantie.</p>
          </div>
          <div>
            <h2>Schade</h2>
            <p>
              We werken schadevrij waar mogelijk. Als een slot al defect is en boren noodzakelijk is, leggen we
              dit uit en vragen we akkoord voordat we starten.
            </p>
          </div>
          <div>
            <h2>Betaling</h2>
            <p>Betaling na afronding van de klus, via pin, mobiel of contant. Zakelijke klanten op factuur, 15 dagen.</p>
          </div>
          <div>
            <h2>Wijzigen of annuleren</h2>
            <p>Een geplande afspraak kunt u kosteloos wijzigen tot 4 uur van tevoren.</p>
          </div>
          <div>
            <h2>Toepasselijk recht</h2>
            <p>Op deze voorwaarden is Nederlands recht van toepassing.</p>
          </div>
          <div>
            <h2>Contact</h2>
            <p>
              {business.name}, {business.email}, {business.phone}. KVK: {business.kvk} · BTW: {business.btw}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
