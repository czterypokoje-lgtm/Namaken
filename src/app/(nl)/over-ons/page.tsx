import type { Metadata } from "next";
import { business } from "@/lib/business";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Over ons",
  description: `Wij zijn een gespecialiseerd netwerk van mobiele autosleutel monteurs in Nederland. Geen tussenpersonen, echte technici, vaste prijzen vooraf.`,
  alternates: { canonical: "/over-ons" },
};

const team = [
  { name: "Marco V.", role: "Hoofdtechnicus. Rijdt dagelijks spoedklussen en is specialist in transponder- en keyless-go-codering." },
  { name: "Dennis B.", role: "Automotive specialist. Expert in schadevrij openen van zware en recente voertuigen." },
  { name: "Lisa T.", role: "Centrale planning & klantenservice. Zorgt dat u direct een accurate ETA en vaste prijsopgave krijgt." },
];

const numbers = [
  { num: `${business.foundedYear}`, label: "Opgericht" },
  { num: `${business.jobsSince}+`, label: "Geholpen bestuurders" },
  { num: `${business.rating}★`, label: "Gemiddelde beoordeling" },
  { num: "35 min", label: "Gemiddelde aanrijtijd" },
];

export default function OverOnsPage() {
  return (
    <>
      <section className="px-4 pt-32 pb-16 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-display-page text-frost mb-12 max-w-3xl">
            Geen callcenter. Direct de specialist aan de lijn.
          </h1>
          <div className="grid gap-8 md:grid-cols-2 md:gap-16">
            <blockquote className="border-l-2 border-signal-orange pl-6 text-heading-3 text-frost">
              &ldquo;Mensen kregen telefonisch een lage prijs te horen, maar aan de auto werd plotseling het
              drievoudige berekend. Wij zijn {business.name} gestart om dat voorgoed te veranderen.&rdquo;
            </blockquote>
            <div className="text-body text-mist space-y-4">
              <p>
                De markt voor slotenmakers en pechhulp heeft te vaak te maken met ondoorzichtige tussenpersonen en
                vage beloftes. Wij geloven in duidelijke taal en directe communicatie.
              </p>
              <p>
                Wanneer u ons belt, spreekt u direct met iemand die verstand heeft van transponderchips,
                contactsloten en voertuigelektronica. We bevestigen altijd eerst de prijs voordat er een technicus
                naar u toe rijdt.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-heading-1 text-frost mb-4">Het team.</h2>
          <p className="text-body text-mist mb-12 max-w-xl">
            De vakmensen die u daadwerkelijk te woord staan en gemiddeld binnen 35 minuten bij uw auto staan.
          </p>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <div key={member.name}>
                <div className="mb-6 aspect-[3/4] w-full border border-line bg-navy-surface" />
                <h3 className="text-heading-3 text-frost mb-2">{member.name.toUpperCase()}</h3>
                <p className="text-body-small text-mist">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 sm:grid-cols-4">
          {numbers.map((n) => (
            <div key={n.label}>
              <p style={{ fontFamily: "var(--font-big-shoulders)" }} className="text-4xl font-black text-frost sm:text-5xl">
                {n.num}
              </p>
              <p className="text-eyebrow text-mist mt-2">{n.label}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand locale="nl" />
    </>
  );
}
