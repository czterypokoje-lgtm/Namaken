// Central business facts. Values marked PENDING are working defaults from
// the plan's research (see plan doc) — swap for confirmed real values before
// launch: BTW number and final price points.

export const business = {
  name: "Autosleutelnamaken",
  // Registered legal entity behind the "Autosleutelnamaken" trade name —
  // verified against the public KVK register (kvk.nl) on 2026-09-24:
  // eenmanszaak, handelsnaam "CarKey24", matches this business's activity
  // description exactly ("Bijsnijden en dupliceren van autosleutels en
  // slotenmakers diensten").
  legalName: "CarKey24",

  // --- Hostnames -------------------------------------------------------
  // `domain` is the bare registrable domain. Use it for e-mail addresses
  // and anywhere a brand-readable domain is wanted — NEVER for building
  // page URLs.
  domain: "autosleutelnamaken.nl",
  // `canonicalHost` is the ONE host search engines should index. The
  // production server 308-redirects autosleutelnamaken.nl -> www, so www is
  // the host that actually serves pages and therefore the host every
  // canonical, hreflang and sitemap URL must use. Mismatching these is why
  // the whole sitemap used to point at redirecting URLs.
  // If the hosting redirect is ever flipped to non-www, change this one line.
  canonicalHost: "www.autosleutelnamaken.nl",

  // --- Contact ---------------------------------------------------------
  // National 085 number: non-geographic, which suits a nationwide mobile
  // technician network better than a regional 06 mobile number, and keeps
  // one consistent NAP across site, schema.org and Google Business Profile.
  phone: "085 109 1359",
  phoneE164: "+31851091359",
  phoneHref: "tel:+31851091359",
  whatsappHref: "https://wa.me/31851091359",
  email: "info@autosleutelnamaken.nl",
  hours: "24/7 bereikbaar",
  technicianCount: 7,
  kvk: "42155437",
  btw: "PENDING", // PENDING: real BTW/VAT number (not derivable from KVK since the 2020 privacy reform)
  address: {
    street: "Kapelstraat 9C",
    postalCode: "1404HT",
    city: "Bussum",
  },
  // Approximate coordinates of the registered address (Bussum). Used for
  // schema.org `geo`, which helps search engines resolve the entity to a
  // place even though there is no walk-in storefront.
  geo: { latitude: 52.2769, longitude: 5.1618 },
  // Template variables: the two market-specific values every schema.org
  // Offer/PostalAddress on the site reads from — change these two lines
  // (plus the currency symbol "€" used in on-page price display text,
  // grep for it) when forking this site for a different country.
  countryCode: "NL",
  currencyCode: "EUR",
  currencySymbol: "€",
  foundedYear: 2018, // PENDING: confirm real founding year
  jobsSince: "18.400", // PENDING: confirm real completed-jobs count
  rating: "4.9",
} as const;

// Absolute origin for every indexable URL on the site. Everything that
// builds a URL (canonicals, hreflang, sitemap, JSON-LD @id) must derive it
// from here so the site can never again emit two competing hostnames.
export const siteUrl = `https://${business.canonicalHost}`;

/** Absolute URL for an app-relative path. `absoluteUrl("/")` -> origin. */
export function absoluteUrl(path: string): string {
  if (path === "/" || path === "") return siteUrl;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export const trustStats = [
  { figure: "4.9", label: "Gemiddelde beoordeling", enLabel: "Average rating" },
  { figure: `${business.technicianCount}`, label: "Technici in het land", enLabel: "Technicians nationwide" },
  { figure: "22", label: "Regio's met vaste dekking", enLabel: "Regions with fixed coverage" },
  { figure: "24/7", label: "Elke dag van het jaar", enLabel: "Every day of the year" },
] as const;

export const trustBadges = [
  {
    label: "Gescreend",
    body: "Elke technicus jaarlijks gecontroleerd voordat hij een sleutel draagt.",
    enLabel: "Background-checked",
    enBody: "Every technician is screened annually before carrying a key.",
  },
  {
    label: "Verzekerd",
    body: "Aansprakelijkheidsverzekering op elke klus, certificaat op aanvraag.",
    enLabel: "Insured",
    enBody: "Liability insurance on every job, certificate available on request.",
  },
  {
    label: "Legitimatie eerst",
    body: "We checken uw ID voordat we beginnen. Vraag gerust naar dat van ons.",
    enLabel: "ID first",
    enBody: "We check your ID before we start. Feel free to ask for ours too.",
  },
  {
    label: "Prijs vooraf",
    body: "Bevestigd aan de telefoon, voordat er iemand onderweg gaat.",
    enLabel: "Price upfront",
    enBody: "Confirmed on the phone, before anyone drives out.",
  },
  {
    label: "Gespecificeerde factuur",
    body: "Onderdelen, arbeid en toeslagen apart, per e-mail.",
    enLabel: "Itemized invoice",
    enBody: "Parts, labor and surcharges listed separately, emailed to you.",
  },
  {
    label: "12 maanden garantie",
    body: "Op arbeid voor elke installatie en herprogrammering.",
    enLabel: "12-month warranty",
    enBody: "On labor for every installation and reprogramming.",
  },
] as const;
