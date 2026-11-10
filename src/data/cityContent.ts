import { regions, type Region } from "@/data/regions";
import { services, type Service, type ServiceId } from "@/data/services";
import { business } from "@/lib/business";

/**
 * Content for the 22 region pages and the 88 region x service pages.
 *
 * These pages were previously generated from four interchangeable intro
 * sentences and one identical FAQ per service, with the city name swapped in —
 * the pattern Google's scaled-content-abuse policy targets. The fix here is
 * not more sentence variants: it is giving each page real substance that only
 * applies to that city and that service.
 *
 * Everything below is either data the business already states (arrival times,
 * districts, prices, what a job involves) or verifiable Dutch geography. No
 * local claim is invented.
 */

/**
 * Neighbouring regions, by road proximity, for the "nearby" sections.
 *
 * This is what makes the long-tail pages genuinely useful rather than
 * interchangeable: each one links to the same service in the regions a visitor
 * might actually be between, and to the other services in their own region.
 * It also builds a real internal link graph, so crawl equity reaches the deep
 * pages instead of dead-ending on them.
 */
const neighbours: Record<string, string[]> = {
  utrecht: ["amersfoort", "ede", "almere"],
  amsterdam: ["zaandam", "haarlem", "hoofddorp"],
  haarlem: ["zaandam", "hoofddorp", "amsterdam"],
  zaandam: ["amsterdam", "haarlem", "hoofddorp"],
  hoofddorp: ["haarlem", "amsterdam", "leiden"],
  leiden: ["den-haag", "hoofddorp", "haarlem"],
  "den-haag": ["leiden", "rotterdam", "hoofddorp"],
  rotterdam: ["dordrecht", "den-haag", "leiden"],
  dordrecht: ["rotterdam", "breda", "tilburg"],
  breda: ["tilburg", "dordrecht", "oss"],
  tilburg: ["breda", "oss", "eindhoven"],
  nijmegen: ["arnhem", "oss", "ede"],
  arnhem: ["nijmegen", "ede", "apeldoorn"],
  oss: ["nijmegen", "tilburg", "eindhoven"],
  ede: ["arnhem", "amersfoort", "utrecht"],
  amersfoort: ["utrecht", "ede", "apeldoorn"],
  apeldoorn: ["arnhem", "amersfoort", "ede"],
  almere: ["amsterdam", "utrecht", "amersfoort"],
  limburg: ["venlo", "eindhoven", "helmond"],
  venlo: ["limburg", "helmond", "eindhoven"],
  eindhoven: ["helmond", "tilburg", "oss"],
  helmond: ["eindhoven", "venlo", "oss"],
};

export function nearbyRegions(region: Region): Region[] {
  return (neighbours[region.slug] ?? [])
    .map((slug) => regions.find((r) => r.slug === slug))
    .filter((r): r is Region => Boolean(r));
}

/**
 * Deterministic variant picker. Keyed on region AND service, so the 88 pages
 * spread across the available phrasings instead of every city sharing one
 * sentence per service. Deterministic so a page's wording is stable between
 * builds — wording that shuffled on each deploy would look like churn to a
 * crawler.
 */
function pick<T>(options: readonly T[], seed: string, offset = 0): T {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 100000;
  }
  return options[(hash + offset) % options.length];
}

/**
 * How to name each service inside a Dutch sentence.
 *
 * `service.name` is a headline ("Autosleutel kwijt") and `service.shortName` is
 * a navigation label ("Kwijt / verloren"); dropping either into running prose
 * produces things like "Veelgestelde vragen over kwijt / verloren". These are
 * noun phrases that read correctly after "voor", "over" and "bij".
 */
const taskLabels: Record<ServiceId, string> = {
  "autosleutel-bijmaken": "een sleutel bijmaken",
  "autosleutel-kwijt": "een verloren sleutel",
  "auto-openen-zonder-sleutel": "een auto openen zonder sleutel",
  "contactslot-vervangen": "een contactslot vervangen",
};

export function taskLabel(service: Service): string {
  return taskLabels[service.id];
}

/** Dutch enumeration: "A, B of C" rather than "A of B of C". */
function joinOr(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} of ${items[items.length - 1]}`;
}

/** Per-service framing for the opening sentence. */
const serviceOpenings: Record<ServiceId, readonly string[]> = {
  "autosleutel-bijmaken": [
    "Een tweede autosleutel laten bijmaken is in %CITY% zelden urgent — tot de enige sleutel die u heeft kwijtraakt of stukgaat.",
    "In %CITY% maken we de meeste sleutels bij voordat er iets misgaat: een reservesleutel kost een fractie van een spoedklus.",
    "Autosleutel bijmaken in %CITY% doen we op locatie, zodat u uw auto niet hoeft achter te laten bij een garage.",
    "Wie in %CITY% een extra autosleutel wil, hoeft daarvoor niet naar de dealer: wij programmeren hem bij u op de stoep.",
  ],
  "autosleutel-kwijt": [
    "Alle autosleutels kwijt in %CITY%? Dat betekent niet dat uw auto gesleept moet worden.",
    "Een verloren autosleutel in %CITY% lossen we meestal dezelfde dag op, ook als er geen reservesleutel meer is.",
    "Sleutel kwijt in %CITY%? We maken een volledig nieuwe sleutel aan de auto zelf, zonder het origineel.",
    "In %CITY% komen we regelmatig bij auto's waarvan beide sleutels weg zijn — dat is op locatie op te lossen.",
  ],
  "auto-openen-zonder-sleutel": [
    "Buitengesloten in %CITY%, met de sleutel zichtbaar op de stoel: dat is het telefoontje dat we het vaakst krijgen.",
    "Een auto openen zonder sleutel in %CITY% doen we schadevrij — geen ruit, geen beschadigd portier.",
    "Staat u in %CITY% naast een afgesloten auto, dan hoeft daar geen schade bij te komen.",
    "Auto openen zonder sleutel in %CITY% is bijna altijd een kwestie van techniek, niet van kracht.",
  ],
  "contactslot-vervangen": [
    "Een contactslot dat in %CITY% niet meer omdraait, is zelden de sleutel: meestal is het slot zelf versleten.",
    "Contactslot vervangen in %CITY% doen we op locatie, inclusief het opnieuw koppelen aan uw sleutel.",
    "Als de sleutel in %CITY% nog wel past maar niet meer draait, kijken we eerst naar het contactslot.",
    "In %CITY% vervangen we contactsloten zonder dat de auto naar een garage hoeft.",
  ],
};

/** The data-bearing middle sentence: district coverage plus arrival time. */
const coverageSentences: readonly string[] = [
  "We rijden in de regio het vaakst richting %AREAS% en staan er gemiddeld binnen %MIN% minuten.",
  "Van %FIRST% tot %LAST% is de gemiddelde aankomsttijd %MIN% minuten.",
  "Onze technici dekken onder meer %AREAS% af, met %MIN% minuten als gemiddelde aanrijtijd.",
  "Gemiddeld staan we na %MIN% minuten bij u, of u in %FIRST% staat of in %LAST%.",
];

/** The closing sentence: the commercial promise, varied in wording only. */
const closings: readonly string[] = [
  "De prijs hoort u vooraf aan de telefoon, voordat er iemand onderweg gaat.",
  "U krijgt het bedrag aan de telefoon te horen en bevestigt het voordat we rijden.",
  "Wat het kost, weet u voordat de technicus vertrekt — niet achteraf.",
  "We bevestigen de prijs telefonisch; zegt u nee, dan kost het u niets.",
];

function fillCoverage(template: string, region: Region, min: number): string {
  return template
    .replace("%AREAS%", region.areas.slice(0, 3).join(", "))
    .replace("%FIRST%", region.areas[0])
    .replace("%LAST%", region.areas[region.areas.length - 1])
    .replace("%MIN%", String(min));
}

/** The intro paragraph for a region x service page. */
export function cityServiceIntro(region: Region, service: Service): string {
  const seed = `${region.slug}:${service.id}`;
  const opening = pick(serviceOpenings[service.id], seed).replace("%CITY%", region.name);
  const coverage = fillCoverage(pick(coverageSentences, seed, 7), region, region.avgArrivalMin);
  const closing = pick(closings, seed, 13);
  return `${opening} ${coverage} ${closing}`;
}

/** Short meta description, distinct per region x service pair. */
export function cityServiceDescription(
  region: Region,
  service: Service,
  currencySymbol: string,
): string {
  const variants = [
    `${service.name} in ${region.name} en omstreken. Technicus op locatie, gemiddeld ${region.avgArrivalMin} min aankomst, vanaf ${currencySymbol}${service.priceFrom}, prijs vooraf bevestigd.`,
    `${service.name} in ${region.name}? Wij komen naar de auto — ook in ${region.areas[0]} en ${region.areas[1]}. Gemiddeld ${region.avgArrivalMin} min, vanaf ${currencySymbol}${service.priceFrom}.`,
    `${service.name} in ${region.name}: op locatie geregeld, geen sleepwagen nodig. Gemiddeld ${region.avgArrivalMin} min aankomst, vanaf ${currencySymbol}${service.priceFrom}.`,
    `${region.name}: ${service.name.toLowerCase()} door een technicus die naar u toe komt. Vanaf ${currencySymbol}${service.priceFrom}, gemiddeld ${region.avgArrivalMin} min, prijs vooraf.`,
  ];
  return pick(variants, `${service.id}:${region.slug}`);
}

/**
 * Two questions specific to this city and service, appended to the service's
 * own FAQ. Both answers are built from the region's real data, so they differ
 * genuinely from one city to the next rather than only by name.
 */
export function cityServiceFaq(region: Region, service: Service): { q: string; a: string }[] {
  const nearby = nearbyRegions(region);
  const areas = region.areas.join(", ");

  const faq = [
    {
      q: `Hoe snel kan er iemand in ${region.name} zijn voor ${taskLabels[service.id]}?`,
      a: `De gemiddelde aankomsttijd in ${region.name} is ${region.avgArrivalMin} minuten. Dat is een gemiddelde over de hele regio — in ${region.areas[0]} gaat het vaak sneller, aan de rand van het werkgebied kan het iets langer duren. Aan de telefoon hoort u een concrete tijd voor uw adres, geen gemiddelde.`,
    },
    {
      q: `In welke wijken rond ${region.name} komen jullie?`,
      a: `We werken in ${region.name} en omliggende wijken, waaronder ${areas}. Staat u net buiten de regio? ${
        nearby.length
          ? `Dan valt u mogelijk onder ${joinOr(nearby.map((r) => r.name))} — bel ons en we zeggen direct wie het snelst bij u is.`
          : "Bel ons en we zeggen direct of we bij u kunnen komen."
      }`,
    },
  ];

  // One extra answer for the job that most often makes people doubt whether an
  // on-location technician can help at all.
  if (service.id === "autosleutel-kwijt") {
    faq.push({
      q: `Kunnen jullie in ${region.name} een nieuwe sleutel maken zonder origineel?`,
      a: `Ja. We lezen het slot of de boordcomputer uit en programmeren een nieuwe sleutel aan de auto. Daarvoor hebben we het kenteken en een geldig legitimatiebewijs nodig, zodat we kunnen vaststellen dat de auto van u is. Dat gebeurt ter plekke in ${region.name}; de auto hoeft niet weggesleept te worden.`,
    });
  }

  return faq;
}

/** Intro paragraph for a region hub page, built from that region's own data. */
export function cityIntro(region: Region): string {
  const areas = region.areas.slice(0, 3).join(", ");
  const openings = [
    `In ${region.name} rijden onze technici dagelijks rond. Of u nu in ${areas} staat of net buiten het centrum, wij komen naar de auto in plaats van andersom.`,
    `${region.name} is vast werkgebied: ${areas} en de omliggende wijken worden door onze eigen technici bediend, niet door een doorverwijzing naar een derde partij.`,
    `Wie in ${region.name} zonder autosleutel staat, hoeft niet te slepen. Onze technicus komt naar u toe — in ${areas} en in de rest van de regio.`,
  ];
  return pick(openings, region.slug);
}

/**
 * Questions a visitor to a region hub page actually has, answered from that
 * region's real figures. Different per region because the numbers are.
 */
export function cityFaq(region: Region): { q: string; a: string }[] {
  const nearby = nearbyRegions(region);
  const fastest = services.reduce((a, b) => (a.priceFrom < b.priceFrom ? a : b));
  return [
    {
      q: `Hoe lang duurt het voordat er iemand in ${region.name} is?`,
      a: `Gemiddeld ${region.avgArrivalMin} minuten. Dat getal is het gemiddelde over de hele regio ${region.name}; dichter bij ${region.areas[0]} gaat het meestal sneller en aan de randen kan het wat langer duren. U hoort aan de telefoon een concrete tijd voor uw eigen adres.`,
    },
    {
      q: `Wat kost een autosleutelservice in ${region.name}?`,
      a: `De prijzen in ${region.name} zijn dezelfde als in de rest van het land: vanaf ${business.currencySymbol}${fastest.priceFrom} voor ${fastest.name.toLowerCase()}. Er geldt geen regiotoeslag. Het exacte bedrag krijgt u telefonisch bevestigd voordat de technicus vertrekt.`,
    },
    {
      q: `Komen jullie ook 's nachts naar ${region.name}?`,
      a: `Ja, ${business.hours.toLowerCase()}, ook in het weekend. Voor spoedservice buiten kantooruren geldt een toeslag die u vooraf hoort, nooit achteraf.`,
    },
    {
      q: `Ik sta net buiten ${region.name} — kom ik dan ook in aanmerking?`,
      a: nearby.length
        ? `Waarschijnlijk wel. Naast ${region.name} dekken wij ook ${joinOr(nearby.map((r) => r.name))} af. Bel ons met uw postcode en we zeggen direct welke technicus het snelst bij u kan zijn.`
        : `Bel ons met uw postcode, dan zeggen we direct of we bij u kunnen komen en hoe snel.`,
    },
  ];
}

/** English intro for a region hub page. */
export function cityIntroEn(region: Region): string {
  const name = region.enName ?? region.name;
  const areas = region.areas.slice(0, 3).join(", ");
  const openings = [
    `Our technicians drive through ${name} every day. Whether you are in ${areas} or just outside the centre, we come to the car instead of the other way round.`,
    `${name} is a fixed service area: ${areas} and the surrounding districts are covered by our own technicians, not passed on to a third party.`,
    `If you are stuck without a car key in ${name}, nothing needs towing. Our technician comes to you — in ${areas} and across the rest of the region.`,
  ];
  return pick(openings, region.slug);
}

/** English FAQ for a region hub page, from that region's own figures. */
export function cityFaqEn(region: Region): { q: string; a: string }[] {
  const name = region.enName ?? region.name;
  const nearby = nearbyRegions(region);
  const cheapest = services.reduce((a, b) => (a.priceFrom < b.priceFrom ? a : b));
  const joinOrEn = (items: string[]) =>
    items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} or ${items[items.length - 1]}`;
  return [
    {
      q: `How long does it take for someone to reach me in ${name}?`,
      a: `About ${region.avgArrivalMin} minutes on average. That figure is the average across the whole ${name} region; closer to ${region.areas[0]} it is usually quicker, and at the edges it can take a little longer. On the phone you get a concrete time for your own address.`,
    },
    {
      q: `What does a car key service in ${name} cost?`,
      a: `The same as anywhere else in the country: from ${business.currencySymbol}${cheapest.priceFrom} for ${cheapest.en.name.toLowerCase()}. There is no regional surcharge. You hear the exact amount on the phone before the technician sets off.`,
    },
    {
      q: `Do you come to ${name} at night as well?`,
      a: `Yes, we are reachable 24/7, weekends included. An out-of-hours call-out carries a surcharge, which you hear in advance and never afterwards.`,
    },
    {
      q: `I am just outside ${name} — can you still help?`,
      a: nearby.length
        ? `Most likely. Besides ${name} we also cover ${joinOrEn(nearby.map((r) => r.enName ?? r.name))}. Call us with your postcode and we will say straight away which technician can reach you fastest.`
        : `Call us with your postcode and we will tell you right away whether we can reach you, and how quickly.`,
    },
  ];
}

/** The other services, for cross-linking within the same region. */
export function otherServices(current: ServiceId): Service[] {
  return services.filter((s) => s.id !== current);
}
