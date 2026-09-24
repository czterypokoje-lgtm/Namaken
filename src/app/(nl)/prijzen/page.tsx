import type { Metadata } from "next";
import { services } from "@/data/services";
import { Faq } from "@/components/Faq";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Prijzen",
  description: "Vaste, transparante prijzen voor autosleutel bijmaken, verloren sleutels, buitengesloten en contactslot vervangen.",
};

const priceList = [
  { name: "Voorrijkosten", included: "Reistijd en diagnose binnen ons werkgebied", price: "€0" },
  ...services.map((s) => ({ name: s.name, included: s.whatWeDo[0], price: `vanaf €${s.priceFrom}` })),
  { name: "Spoedtoeslag", included: "Vast bedrag, tussen 22:00 en 07:00, elke klus", price: "+€40" },
];

const priceFactors = [
  { label: "Slottype & merk", body: "Beveiligde of merkspecifieke sloten kosten meer onderdelen en tijd." },
  { label: "Aantal sloten/sleutels", body: "Meerdere sleutels tegelijk laten maken is per stuk goedkoper." },
  { label: "Voertuig & sleuteltype", body: "Een basissleutel kost minder dan een smart key met keyless entry." },
  { label: "Tijdstip", body: "Eén vaste spoedtoeslag van €40, tussen 22:00 en 07:00. Nooit een vermenigvuldiging." },
];

const paymentMethods = [
  { label: "Kaart", value: "Tikken, chip of swipe" },
  { label: "Mobiel betalen", value: "Betaal vanaf uw telefoon" },
  { label: "Contant", value: "Gepast geld op prijs gesteld" },
  { label: "Zakelijke factuur", value: "Netto 15 dagen voor accounts" },
];

const pricingFaq = [
  {
    q: "Waarom noemen sommige aanbieders eerst €19 aan de telefoon?",
    a: "Dat bedrag is meestal alleen de voorrijkosten. Vraag altijd naar de totale startprijs voor uw klus — bij ons zit de voorrijkosten daar altijd al in.",
  },
  {
    q: "Worden de voorrijkosten in rekening gebracht als het probleem is opgelost?",
    a: "Ja, de voorrijkosten dekken reistijd en diagnose. Als de technicus de sleutel niet kan maken zoals afgesproken, betaalt u alsnog niets extra's.",
  },
  {
    q: "Wat als de klus groter blijkt dan gedacht?",
    a: "Dan hoort u dat, met de nieuwe prijs, voordat we verdergaan. U beslist of we doorgaan.",
  },
  {
    q: "Rekenen jullie meer in het weekend of op feestdagen?",
    a: "Nee. Alleen tussen 22:00 en 07:00 geldt de vaste spoedtoeslag van €40 — nooit een extra toeslag voor weekend of feestdagen.",
  },
];

export default function PrijzenPage() {
  const today = new Date().toLocaleDateString("nl-NL", { month: "long", year: "numeric" });

  return (
    <>
      <section className="border-b border-line bg-night-navy px-4 pt-10 pb-16 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-between text-mono text-mist mb-10">
            <p>Prijzen in euro&apos;s, vooraf</p>
            <p>Bijgewerkt {today}</p>
          </div>

          <h1 className="text-display-page text-frost mb-10">Prijzen.</h1>

          <div className="grid gap-8 border-t border-line pt-8 lg:grid-cols-[1fr_320px]">
            <p className="text-body text-mist max-w-xl">
              Elke prijs op deze pagina is een echte startprijs. U hoort hem aan de telefoon, de technicus bevestigt
              het totaal op locatie, en er gebeurt niets voordat u ja zegt.
            </p>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-4 text-body-small">
              <div>
                <dt className="text-eyebrow text-mist">Voorrijkosten</dt>
                <dd className="text-frost">€0</dd>
              </div>
              <div>
                <dt className="text-eyebrow text-mist">Buiten werkgebied</dt>
                <dd className="text-frost">Op aanvraag</dd>
              </div>
              <div>
                <dt className="text-eyebrow text-mist">Spoedtoeslag</dt>
                <dd className="text-frost">Vast +€40, 22:00–07:00</dd>
              </div>
              <div>
                <dt className="text-eyebrow text-mist">Aanbetaling</dt>
                <dd className="text-frost">Geen. Betalen als het klaar is.</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-heading-2 text-frost mb-2">De lijst.</h2>
          <p className="text-body-small text-mist mb-10 max-w-xl">
            Startprijzen voor heel Nederland. Onderdelen, hoogbeveiligde cilinders en sleutelblanks worden apart
            geoffreerd, voordat we beginnen.
          </p>

          <div className="hidden border-b border-line pb-2 text-eyebrow text-mist sm:grid sm:grid-cols-[1fr_1fr_140px] sm:gap-4">
            <span>Dienst</span>
            <span>Wat is inbegrepen</span>
            <span className="text-right">Prijs</span>
          </div>
          <div className="divide-y divide-line">
            {priceList.map((item) => (
              <div key={item.name} className="grid gap-1 py-4 sm:grid-cols-[1fr_1fr_140px] sm:items-center sm:gap-4">
                <p className="text-heading-4 text-frost">{item.name}</p>
                <p className="text-body-small text-mist">{item.included}</p>
                <p className="text-price text-signal-orange text-2xl sm:text-right">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-heading-2 text-frost mb-2">Vier dingen bepalen de prijs.</h2>
          <p className="text-heading-2 text-frost mb-4">Stress hoort er niet bij.</p>
          <p className="text-body-small text-mist mb-10 max-w-xl">
            Afstand binnen ons werkgebied, het weekend en hoe gehaast u klinkt veranderen de prijs nooit.
          </p>

          <div className="divide-y divide-line border-t border-line">
            {priceFactors.map((f) => (
              <div key={f.label} className="grid gap-2 py-4 sm:grid-cols-[240px_1fr] sm:items-center">
                <p className="text-heading-4 text-frost">{f.label}</p>
                <p className="text-body-small text-mist">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-heading-2 text-frost mb-2">Betalen als de klus klaar is.</h2>
          <p className="text-body-small text-mist mb-10 max-w-xl">
            Geen aanbetaling en niets online te betalen vooraf. U krijgt een gespecificeerde factuur met bedrijfsnaam,
            technicus, onderdelen en arbeid.
          </p>
          <div className="grid grid-cols-2 gap-8 border-t border-line pt-8 sm:grid-cols-4">
            {paymentMethods.map((m) => (
              <div key={m.label}>
                <p className="text-eyebrow text-signal-orange">{m.label}</p>
                <p className="text-heading-4 text-frost mt-1">{m.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Faq items={pricingFaq} title="Geld, in duidelijke taal." />

      <CtaBand locale="nl" />
    </>
  );
}
