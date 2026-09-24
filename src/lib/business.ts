// Central business facts. Values marked PENDING are working defaults from
// the plan's research (see plan doc) — swap for confirmed real values before
// launch: KVK/BTW numbers, exact WhatsApp number, and final price points.

export const business = {
  name: "Autosleutelnamaken",
  domain: "autosleutelnamaken.nl",
  phone: "06 11 75 12 31",
  phoneHref: "tel:+31611751231",
  whatsappHref: "https://wa.me/31611751231", // PENDING: confirm same number as phone
  email: "info@autosleutelnamaken.nl",
  hours: "24/7 bereikbaar",
  technicianCount: 7,
  kvk: "PENDING", // PENDING: real KVK number for footer/schema trust signals
  btw: "PENDING", // PENDING: real BTW/VAT number
  foundedYear: 2018, // PENDING: confirm real founding year
  jobsSince: "18.400", // PENDING: confirm real completed-jobs count
  rating: "4.9",
} as const;

export const priceTiers = [
  {
    id: "basis",
    name: "Standaard transpondersleutel",
    price: 89,
    description: "Voor auto's zonder afstandsbediening in de sleutel.",
  },
  {
    id: "afstandsbediening",
    name: "Sleutel met afstandsbediening",
    price: 149,
    description: "Klapsleutel of sleutel met centrale vergrendeling.",
  },
  {
    id: "keyless",
    name: "Smart key met keyless entry",
    price: 189,
    description: "Voor auto's met keyless toegang en start-stopknop.",
  },
] as const; // PENDING: confirm real price points before launch

export const trustStats = [
  { figure: "4.9", label: "Gemiddelde beoordeling" },
  { figure: `${business.technicianCount}`, label: "Technici in het land" },
  { figure: "22", label: "Regio's met vaste dekking" },
  { figure: "24/7", label: "Elke dag van het jaar" },
] as const;

export const trustBadges = [
  { label: "Gescreend", body: "Elke technicus jaarlijks gecontroleerd voordat hij een sleutel draagt." },
  { label: "Verzekerd", body: "Aansprakelijkheidsverzekering op elke klus, certificaat op aanvraag." },
  { label: "Legitimatie eerst", body: "We checken uw ID voordat we beginnen. Vraag gerust naar dat van ons." },
  { label: "Prijs vooraf", body: "Bevestigd aan de telefoon, voordat er iemand onderweg gaat." },
  { label: "Gespecificeerde factuur", body: "Onderdelen, arbeid en toeslagen apart, per e-mail." },
  { label: "12 maanden garantie", body: "Op arbeid voor elke installatie en herprogrammering." },
] as const;
