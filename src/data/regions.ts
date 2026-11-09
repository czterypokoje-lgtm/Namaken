export type Region = {
  slug: string;
  name: string;
  areas: string[]; // named sub-locations, used in copy + schema areaServed
  avgArrivalMin: number;
  enName?: string; // only set where it differs from `name`
};

export const regions: Region[] = [
  { slug: "utrecht", name: "Utrecht", areas: ["Overvecht", "Leidsche Rijn", "Zuilen", "Kanaleneiland"], avgArrivalMin: 28 },
  { slug: "amsterdam", name: "Amsterdam", areas: ["Amsterdam-Zuid", "Amsterdam-Noord", "Osdorp", "Amsterdam-Oost"], avgArrivalMin: 30 },
  { slug: "haarlem", name: "Haarlem", areas: ["Schalkwijk", "Haarlem-Noord", "Centrum"], avgArrivalMin: 32 },
  { slug: "zaandam", name: "Zaandam", areas: ["Poelenburg", "Zaandam-Zuid", "Kogerveld"], avgArrivalMin: 33 },
  { slug: "hoofddorp", name: "Hoofddorp", areas: ["Toolenburg", "Floriande", "Overbos"], avgArrivalMin: 31 },
  { slug: "leiden", name: "Leiden", areas: ["Merenwijk", "Leiden-Zuidwest", "De Kooi"], avgArrivalMin: 34 },
  { slug: "den-haag", name: "Den Haag", enName: "The Hague", areas: ["Scheveningen", "Loosduinen", "Escamp", "Segbroek"], avgArrivalMin: 29 },
  { slug: "rotterdam", name: "Rotterdam", areas: ["Kralingen", "Feijenoord", "Charlois", "Overschie"], avgArrivalMin: 27 },
  { slug: "dordrecht", name: "Dordrecht", areas: ["Sterrenburg", "Dubbeldam", "Stadspolders"], avgArrivalMin: 33 },
  { slug: "breda", name: "Breda", areas: ["Ginneken", "Prinsenbeek", "Teteringen"], avgArrivalMin: 35 },
  { slug: "tilburg", name: "Tilburg", areas: ["Reeshof", "Tilburg-Noord", "Berkel-Enschot"], avgArrivalMin: 36 },
  { slug: "nijmegen", name: "Nijmegen", areas: ["Dukenburg", "Lindenholt", "Nijmegen-Oost"], avgArrivalMin: 34 },
  { slug: "arnhem", name: "Arnhem", areas: ["Arnhem-Zuid", "Presikhaaf", "Schuytgraaf"], avgArrivalMin: 33 },
  { slug: "oss", name: "Oss", areas: ["Ussen", "Ruwaard", "Oss-Zuid"], avgArrivalMin: 38 },
  { slug: "ede", name: "Ede", areas: ["Ede-Zuid", "Bennekom", "Lunteren"], avgArrivalMin: 32 },
  { slug: "amersfoort", name: "Amersfoort", areas: ["Vathorst", "Kattenbroek", "Schothorst"], avgArrivalMin: 29 },
  { slug: "apeldoorn", name: "Apeldoorn", areas: ["Zuidbroek", "Osseveld", "Apeldoorn-Noord"], avgArrivalMin: 36 },
  { slug: "almere", name: "Almere", areas: ["Almere Buiten", "Almere Stad", "Almere Poort"], avgArrivalMin: 30 },
  { slug: "limburg", name: "Limburg", areas: ["Maastricht", "Heerlen", "Roermond", "Venlo e.o."], avgArrivalMin: 45 },
  { slug: "venlo", name: "Venlo", areas: ["Blerick", "Venlo-Zuid", "Tegelen"], avgArrivalMin: 42 },
  { slug: "eindhoven", name: "Eindhoven", areas: ["Woensel", "Strijp", "Tongelre"], avgArrivalMin: 34 },
  { slug: "helmond", name: "Helmond", areas: ["Brouwhuis", "Helmond-Noord", "Dierdonk"], avgArrivalMin: 37 },
];

export const getRegion = (slug: string) => regions.find((r) => r.slug === slug);

// The region x service copy that used to live here (four interchangeable intro
// sentences and two "why us" sentences) has moved to src/data/cityContent.ts,
// where each page is built from the region's real data — districts, arrival
// time, neighbouring regions — instead of a name swapped into one sentence.
