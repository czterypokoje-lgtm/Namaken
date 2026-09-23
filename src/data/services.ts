import { images } from "@/lib/images";

export type ServiceId =
  | "autosleutel-bijmaken"
  | "autosleutel-kwijt"
  | "auto-openen-zonder-sleutel"
  | "contactslot-vervangen";

export type Service = {
  id: ServiceId;
  name: string;
  shortName: string;
  heroHeadline: string;
  heroSub: string;
  heroImage: string;
  priceFrom: number;
  timeOnSite: string;
  averageArrival: string;
  whatWeDo: string[];
  faq: { q: string; a: string }[];
  includesKeySection: boolean; // shows TransponderSmartKeySection
  en: {
    name: string;
    heroHeadline: string;
    heroSub: string;
    whatWeDo: string[];
  };
};

export const services: Service[] = [
  {
    id: "autosleutel-bijmaken",
    name: "Autosleutel bijmaken",
    shortName: "Bijmaken",
    heroHeadline: "Autosleutel bijmaken? Wij maken hem op locatie bij.",
    heroSub:
      "Een reservesleutel is er voordat u hem nodig heeft. Onze technicus programmeert een nieuwe autosleutel bij u thuis, op het werk of langs de weg — zonder dat uw huidige sleutel het hoeft te laten afweten.",
    heroImage: images.keyCutting,
    priceFrom: 89,
    timeOnSite: "20-40 min ter plekke",
    averageArrival: "gem. 35 min",
    whatWeDo: [
      "Nieuwe transponder-, afstandsbediening- of smart key op locatie geprogrammeerd",
      "Werkt voor vrijwel elk automerk en bouwjaar",
      "Prijs vooraf bevestigd aan de telefoon, geen verrassingen achteraf",
      "Uw bestaande sleutel blijft gewoon werken",
    ],
    faq: [
      {
        q: "Moet ik mijn auto naar een garage brengen?",
        a: "Nee. Onze technicus komt naar de locatie van uw auto en programmeert de nieuwe sleutel ter plekke.",
      },
      {
        q: "Heb ik mijn huidige sleutel nodig?",
        a: "In de meeste gevallen wel, of het voertuigkenteken en een geldig ID. We checken dit vooraf telefonisch met u.",
      },
      {
        q: "Hoe snel kan dit geregeld worden?",
        a: "Vaak dezelfde dag nog. Bel ons voor de eerst beschikbare technicus in uw regio.",
      },
    ],
    includesKeySection: true,
    en: {
      name: "Car key duplication",
      heroHeadline: "Need a spare car key made? We come to you.",
      heroSub:
        "A spare key exists before you need it. Our technician programs a new car key on-site — at home, at work, or roadside.",
      whatWeDo: [
        "New transponder, remote or smart key programmed on location",
        "Works for nearly every make and model",
        "Price confirmed on the phone before we start",
        "Your existing key keeps working",
      ],
    },
  },
  {
    id: "autosleutel-kwijt",
    name: "Autosleutel kwijt",
    shortName: "Kwijt / verloren",
    heroHeadline: "Autosleutel kwijt of verloren? We maken een nieuwe aan.",
    heroSub:
      "Sleutel kwijt is vervelend, maar geen reden om de auto te laten wegslepen. Wij programmeren een volledig nieuwe sleutel, ook als er geen reservesleutel meer is.",
    heroImage: images.carHeadlightsAutumn,
    priceFrom: 149,
    timeOnSite: "30-60 min ter plekke",
    averageArrival: "gem. 35 min",
    whatWeDo: [
      "Nieuwe sleutel aangemaakt zonder dat u een bestaande sleutel nodig heeft",
      "Oude sleutel wordt uit het systeem van de auto verwijderd voor uw veiligheid",
      "Legitimatie en kentekencontrole ter plekke, geen gedoe achteraf",
      "Ook 's nachts en in het weekend bereikbaar",
    ],
    faq: [
      {
        q: "Kan dit ook zonder dat ik een reservesleutel heb?",
        a: "Ja, dat is precies waar deze dienst voor is. We maken een volledig nieuwe sleutel aan op basis van het voertuig.",
      },
      {
        q: "Is mijn oude sleutel dan nog bruikbaar als hij terecht is?",
        a: "Nee, voor uw veiligheid deactiveren we de verloren sleutel zodra de nieuwe geprogrammeerd is.",
      },
      {
        q: "Wat moet ik meenemen of klaarleggen?",
        a: "Een geldig ID en het kenteken van de auto. Bij twijfel checken we dit vooraf telefonisch.",
      },
    ],
    includesKeySection: true,
    en: {
      name: "Lost car key replacement",
      heroHeadline: "Lost your car key? We'll cut a new one from scratch.",
      heroSub:
        "A lost key doesn't mean a tow truck. We program a completely new key, even with no spare available.",
      whatWeDo: [
        "New key created without needing an existing one",
        "Old key deactivated from the car's system for your security",
        "ID and registration check on-site",
        "Available nights and weekends",
      ],
    },
  },
  {
    id: "auto-openen-zonder-sleutel",
    name: "Auto openen zonder sleutel",
    shortName: "Buitengesloten",
    heroHeadline: "Buitengesloten? We openen de auto zonder schade.",
    heroSub:
      "Sleutel in de auto, portier op slot. Onze technicus opent de auto schadevrij en checkt uw identiteit voordat we beginnen.",
    heroImage: images.houseDusk,
    priceFrom: 79,
    timeOnSite: "10-20 min ter plekke",
    averageArrival: "gem. 30 min",
    whatWeDo: [
      "Schadevrije opening met professioneel gereedschap",
      "Legitimatie gecontroleerd voordat we het portier openen",
      "Werkt bij vrijwel alle portier- en centrale-vergrendelingssystemen",
      "Indien nodig meteen door naar sleutel bijmaken",
    ],
    faq: [
      {
        q: "Beschadigen jullie de auto bij het openen?",
        a: "Vrijwel nooit. We werken schadevrij met professionele tools, tenzij het slot al defect is.",
      },
      {
        q: "Wat als ik de auto huur of leen?",
        a: "We kunnen ook voor huur- of bedrijfsauto's assisteren; bel ons om de situatie te bespreken.",
      },
      {
        q: "Hoe snel kunnen jullie er zijn?",
        a: "Gemiddeld binnen 30 minuten, afhankelijk van uw regio en de dichtstbijzijnde technicus.",
      },
    ],
    includesKeySection: false,
    en: {
      name: "Car unlock service",
      heroHeadline: "Locked out? We open the door without damage.",
      heroSub:
        "Key inside, door locked. Our technician opens it damage-free and checks your ID first.",
      whatWeDo: [
        "Damage-free entry with professional tools",
        "ID checked before we open the door",
        "Works on nearly all lock and central-locking systems",
        "Can move straight into key duplication if needed",
      ],
    },
  },
  {
    id: "contactslot-vervangen",
    name: "Contactslot vervangen",
    shortName: "Contactslot",
    heroHeadline: "Contactslot defect of vast? Wij vervangen hem op locatie.",
    heroSub:
      "Sleutel draait niet meer om, contactslot loopt vast of het startsignaal komt niet meer aan. We diagnosticeren en vervangen het contactslot ter plekke.",
    heroImage: images.carRainCity,
    priceFrom: 119,
    timeOnSite: "45-90 min ter plekke",
    averageArrival: "gem. 40 min",
    whatWeDo: [
      "Diagnose ter plekke: contactslot, stuurslot of startonderbreker",
      "Vervanging of reparatie met originele of gelijkwaardige onderdelen",
      "Nieuwe sleutel meteen mee geprogrammeerd indien nodig",
      "Prijs pas definitief na diagnose, altijd eerst akkoord",
    ],
    faq: [
      {
        q: "Hoe weet ik of het aan het contactslot ligt en niet aan de sleutel?",
        a: "Onze technicus doet eerst een diagnose ter plekke en vertelt u exact wat er aan de hand is voordat er iets vervangen wordt.",
      },
      {
        q: "Kan dit bij elk automerk?",
        a: "We werken aan vrijwel alle merken; bel ons met het kenteken zodat we het juiste onderdeel meenemen.",
      },
      {
        q: "Moet de auto naar de garage?",
        a: "In de meeste gevallen niet — dit werk gebeurt op locatie bij u.",
      },
    ],
    includesKeySection: false,
    en: {
      name: "Ignition lock replacement",
      heroHeadline: "Ignition lock stuck or broken? We replace it on-site.",
      heroSub:
        "Key won't turn, ignition sticks, or the start signal doesn't get through. We diagnose and replace the ignition lock on location.",
      whatWeDo: [
        "On-site diagnosis: ignition lock, steering lock or immobilizer",
        "Replacement with original or equivalent parts",
        "New key programmed at the same time if needed",
        "Final price only after diagnosis, always confirmed first",
      ],
    },
  },
];

export const getService = (id: string) => services.find((s) => s.id === id);
