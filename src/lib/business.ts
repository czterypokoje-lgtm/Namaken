// Central business facts. Values marked PENDING are working defaults from
// the plan's research (see plan doc) — swap for confirmed real values before
// launch: BTW number, exact WhatsApp number, and final price points.

export const business = {
  name: "Autosleutelnamaken",
  // Registered legal entity behind the "Autosleutelnamaken" trade name —
  // verified against the public KVK register (kvk.nl) on 2026-09-24:
  // eenmanszaak, handelsnaam "CarKey24", matches this business's activity
  // description exactly ("Bijsnijden en dupliceren van autosleutels en
  // slotenmakers diensten").
  legalName: "CarKey24",
  domain: "autosleutelnamaken.nl",
  phone: "06 11 75 12 31",
  phoneHref: "tel:+31611751231",
  whatsappHref: "https://wa.me/31611751231", // PENDING: confirm same number as phone
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
  foundedYear: 2018, // PENDING: confirm real founding year
  jobsSince: "18.400", // PENDING: confirm real completed-jobs count
  rating: "4.9",
} as const;

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
