import { business } from "@/lib/business";

const hash = (s: string) => s.length + s.charCodeAt(0) + (s.charCodeAt(s.length - 1) ?? 0);

const introTemplates = [
  (b: string) =>
    `Wij kunnen u voorzien van een nieuwe autosleutel voor talloze merken. Dit komt omdat wij vele soorten autosleutels op voorraad hebben, en dit is voor ${b} niet anders. Wij kunnen een ${b} sleutel bijmaken voor de volgende types:`,
  (b: string) =>
    `Onze technici hebben voor vrijwel elk merk sleutelblanks en programmeerapparatuur op de bus, en ${b} vormt daarop geen uitzondering. Hieronder ziet u voor welke ${b} modellen wij een sleutel kunnen bijmaken:`,
];

const inprogrammerenTemplates = [
  (b: string) => ({
    heading: `${b} sleutel laten inprogrammeren`,
    p1: `Wilt u een sleutel laten inprogrammeren voor uw ${b}? Dit kan zijn omdat u een sleutel in bezit heeft die niet meer werkt, of omdat u een sleutel heeft aangeschaft die nog ingeprogrammeerd mag worden in de auto.`,
    p2: `Wij hebben alleen echte specialisten in dienst, die precies weten hoe ze uw sleutel in mogen programmeren. Zo programmeren wij een ${b} sleutel voor u in terwijl u wacht. U staat dus vaak binnen enkele minuten weer buiten met een sleutel waarmee u de auto kunt betreden en deze kunt starten. Dit doen wij dagelijks voor zowel particulieren als bedrijven.`,
    p3: `Het maakt ons verder niet uit welk ${b} model u heeft, wij leren namelijk alle ${b} autosleutels (met of zonder afstandsbediening) voor u in.`,
  }),
  (b: string) => ({
    heading: `Autosleutel ${b} in laten programmeren`,
    p1: `Een sleutel die niet meer aanslaat, of een net gekochte reservesleutel die nog niet gekoppeld is aan uw ${b} — beide lossen wij op locatie op.`,
    p2: `Onze technici werken dagelijks met ${b} en weten precies welk protocol elk bouwjaar vereist. U staat doorgaans binnen enkele minuten weer buiten met een werkende sleutel, of dat nu voor uzelf is of voor een wagenpark.`,
    p3: `Of het nu om een ${b} met of zonder afstandsbediening gaat, wij programmeren elk model in.`,
  }),
];

const kostenTemplates = [
  (b: string, price: number) => ({
    heading: `Kosten ${b} sleutel bijmaken`,
    p1: `Het kan zijn dat wij uw ${b} in moeten programmeren op locatie. De kosten voor het bijmaken van een ${b} sleutel op locatie zijn vrijwel altijd €${price},-. Voor dit bedrag programmeren wij een afstandsbedieningssleutel voor u in, waardoor u de auto weer volledig kunt gebruiken.`,
    p2: `Een ${b} sleutel bij laten maken bij ons in de winkel? U vindt de tarieven hieronder in een handig overzicht. Voordat u langskomt, wilt u natuurlijk eerst weten wat het bijmaken van een ${b} sleutel gaat kosten.`,
  }),
  (b: string, price: number) => ({
    heading: `Wat kost een ${b} sleutel bijmaken`,
    p1: `Op locatie geldt voor een ${b} een vaste prijs van €${price},-, inclusief het programmeren van een sleutel met afstandsbediening. Geen verrassingen achteraf, u hoort het bedrag al aan de telefoon.`,
    p2: `Komt u liever langs in de winkel? Hieronder vindt u de tarieven per sleuteltype, zodat u vooraf weet waar u aan toe bent.`,
  }),
];

const dealerTemplates = [
  (b: string) => ({
    heading: `${b} sleutel net als bij de dealer`,
    p1: `Als u een autosleutel bij laat maken door ${business.name}, dan kunt u ervan uitgaan dat uw sleutel net zo wordt gedupliceerd als bij de dealer. U kunt dus een extra sleutel verwachten die niet onderdoet voor die van de dealer, maar u betaalt vaak de helft minder. Vaak is uw sleutel al binnen 30 minuten gerealiseerd, waar u bij de dealer soms weken moet wachten.`,
    p2: `U bent dus niet afhankelijk van de dealer en kunt snel en voordelig een ${b} sleutel bij ons laten maken. Onze specialisten blijven op de hoogte van het laatste nieuws en weten precies hoe zij een autosleutel voor uw ${b} kunnen inprogrammeren. Dit doen wij veilig, secuur en zonder poespas.`,
  }),
  (b: string) => ({
    heading: `Dealerkwaliteit, zonder de wachttijd`,
    p1: `Een ${b} sleutel bij ons laten maken levert hetzelfde resultaat op als bij de dealer, alleen sneller en voordeliger. Waar een dealer regelmatig weken plant, staat onze technicus vaak dezelfde dag nog bij u.`,
    p2: `Onze specialisten volgen de laatste ontwikkelingen op de voet en weten exact hoe elk ${b} model geprogrammeerd wordt — veilig, secuur en zonder omwegen.`,
  }),
];

const alleSleutelsTemplates = [
  (b: string, price: number) => ({
    heading: `Alle sleutels kwijt van uw ${b}?`,
    p1: `Heeft u geen sleutels meer? Blijf rustig en bel ons. Vaak kunnen wij u op locatie alsnog helpen met een sleutel voor uw ${b}. Zo komen wij met onze geavanceerde apparatuur bij u langs, waarna wij u voorzien van een sleutel.`,
    p2: `Wat wij van u nodig hebben is een mechanische sleutelcode. Dit zijn eigenlijk de insnijdingen van uw sleutel waarmee u de deur kunt openen en het contact kunt omdraaien. Hiermee start uw auto nog niet, maar zo kunnen wij wel een sleutel voor u in het contact inprogrammeren. Vaak kunt u de ${b} dealer bellen en uzelf legitimeren, waarna u de mechanische code uitgeprint krijgt die u weer aan ons kunt doorgeven. Zo kunnen wij een afstandsbediening en transponder al voor u op locatie inprogrammeren voor €${price},-.`,
  }),
  (b: string, price: number) => ({
    heading: `Geen enkele ${b} sleutel meer over?`,
    p1: `Ook zonder werkende sleutel staat u niet vast. Onze technicus komt met apparatuur die op locatie een compleet nieuwe sleutel voor uw ${b} kan aanmaken.`,
    p2: `Daarvoor hebben wij de mechanische sleutelcode nodig — de insnijding waarmee het portier en contactslot mechanisch bediend worden. De ${b} dealer kan deze code, na legitimatie, voor u opzoeken en uitprinten. Zodra wij die hebben, programmeren wij een afstandsbediening en transponder voor u in, op locatie, voor €${price},-.`,
  }),
];

const behuizingTemplates = [
  (b: string) => ({
    heading: `${b} behuizing vervangen van sleutel`,
    p1: `Heeft u een ${b} sleutel waarbij de behuizing defect begint te vertonen? Misschien heeft u een sleutel waarbij het sleutelblad is gaan slijten, waardoor deze niet meer goed in het contact past. Wij vervangen de behuizing voor u. Dit doen wij secuur en professioneel. In sommige gevallen is de behuizing vastgelijmd en kunnen wij eigenlijk niet voorzien van een nieuwe behuizing — dan maken wij natuurlijk altijd een nieuwe sleutel voor u.`,
    p2: `Ook voor het vervangen van uw batterij kunt u bij ons terecht. Vaak kunnen wij u dan wel voorzien van een hele nieuwe sleutel, maar het overzetten van uw oude sleutel gaat in dit geval helaas niet altijd.`,
  }),
  (b: string) => ({
    heading: `Losse of versleten ${b} sleutelbehuizing`,
    p1: `Een klapmechanisme dat los zit of een sleutelblad dat slijt: wij vervangen de behuizing van uw ${b} sleutel secuur en op locatie. Zit de behuizing vastgelijmd aan de elektronica, dan maken wij in plaats daarvan een volledig nieuwe sleutel voor u.`,
    p2: `Een lege batterij lossen wij meestal net zo snel op — soms door simpelweg te vervangen, soms is een geheel nieuwe sleutel de betere optie.`,
  }),
];

export function getBrandContent(brand: string, price: number) {
  const i = hash(brand);
  return {
    intro: introTemplates[i % introTemplates.length](brand),
    inprogrammeren: inprogrammerenTemplates[i % inprogrammerenTemplates.length](brand),
    kosten: kostenTemplates[i % kostenTemplates.length](brand, price),
    dealer: dealerTemplates[i % dealerTemplates.length](brand),
    alleSleutels: alleSleutelsTemplates[i % alleSleutelsTemplates.length](brand, price),
    behuizing: behuizingTemplates[i % behuizingTemplates.length](brand),
  };
}
