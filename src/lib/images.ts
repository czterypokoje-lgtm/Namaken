// Curated stock photography (Unsplash, verified resolvable) standing in for
// real business/technician/vehicle photos until the user provides their own.
// Swap these for real photos before launch — see plan doc "Pending inputs".

const unsplash = (id: string, w: number, q = 70) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=${q}&auto=format&fit=crop`;

export const images = {
  heroCarDusk: unsplash("1580273916550-e323be2ae537", 1600),
  heroCarNight: unsplash("1580654712603-eb43273aff33", 1600),
  keyCutting: unsplash("1558618666-fcd25c85cd64", 1200),
  nightCityStreet: unsplash("1533106497176-45ae19e68ba2", 1600),
  houseDusk: unsplash("1600585154340-be6161a56a0c", 1600),
  carSnow: unsplash("1517524008697-84bbe3c3fd98", 1200),
  carHeadlightsAutumn: unsplash("1541348263662-e068662d82af", 1200),
  houseKeychain: unsplash("1560518883-ce09059eeffa", 1200),
  // Added for photo variety across the 88 city×service and 28 brand pages —
  // real key/lock/technician scenes instead of reusing the 9 above everywhere.
  handHoldingKeyFob: unsplash("1652509573480-a190f1c61f6d", 1200),
  personHoldingCarKey: unsplash("1653565217811-85b41bcd1edb", 1200),
  blackKeyFobCloseup: unsplash("1562003596-a5827707367d", 1200),
  startStopEngineButton: unsplash("1578452171578-a605cb38abe1", 1200),
  keyInDoorLock: unsplash("1549380430-e2beef691ae8", 1200),
  carDoorHandleCloseup: unsplash("1719929830065-7cdb8386da70", 1200),
  serviceVanParked: unsplash("1570905375301-e33b61438107", 1200),
  // Real on-site process shots (supplied by the business) — lockout tool use,
  // ignition cylinder repair and the key handoff moment.
  lockoutAirWedgeTool: "/photos/lockout-airwedge-tool.webp",
  lockoutDoorHandleTool: "/photos/lockout-doorhandle-tool.webp",
  ignitionCylinderRemoved: "/photos/ignition-cylinder-removed.webp",
  ignitionColumnOpen: "/photos/ignition-column-open.webp",
  ignitionBarrelCloseup: "/photos/ignition-barrel-closeup.webp",
  keyHandoff: "/photos/key-handoff.webp",
} as const;

// Real, verified-location photos of each covered city (checked one by one on
// Unsplash — location tag or title confirms the city, and license is free).
// The previous approach rotated 1-2 generic "city" stock photos across every
// region — one of them (a supplied "aerial night city" shot) turned out to
// have palm trees and clearly wasn't even in the Netherlands, so it was
// showing a wrong, made-up city for Utrecht. This map only ever shows a
// place we've actually confirmed.
export const cityPhotoBySlug: Record<string, string> = {
  utrecht: unsplash("1651397876655-048325ae5fd0", 1600),
  amsterdam: unsplash("1583295125721-766a0088cd3f", 1600),
  haarlem: unsplash("1650379892700-06be52680f6f", 1600),
  zaandam: unsplash("1566450653303-2614cbb292ea", 1600),
  leiden: unsplash("1782156451512-567ae463dc1c", 1600),
  "den-haag": unsplash("1586174035695-35ab9e19215c", 1600),
  rotterdam: unsplash("1614521272693-73052eaefc51", 1600),
  dordrecht: unsplash("1672551978864-283f9099f52b", 1600),
  breda: unsplash("1615989521077-b63d15dcfc41", 1600),
  tilburg: unsplash("1696629592005-94269f149265", 1600),
  nijmegen: unsplash("1597577827388-f906d5227bba", 1600),
  amersfoort: unsplash("1626789896983-ce036577d092", 1600),
  apeldoorn: unsplash("1577892987956-ecf8e19f86d4", 1600),
  almere: unsplash("1623005470778-6d6e27b75186", 1600),
  limburg: unsplash("1562758477-db861f798e9d", 1600), // Maastricht, Limburg's largest city
  eindhoven: unsplash("1659789178944-8299a5e9047e", 1600),
  helmond: unsplash("1696152576083-db88c29e1bc9", 1600),
  // Supplied directly by the business (verified against known local
  // landmarks before use — see chat: one of the 5 supplied this round was
  // actually Amsterdam's Spiegelgracht, not Hoofddorp, so it was left out).
  arnhem: "/photos/city-arnhem.webp", // Eusebiuskerk tower
  ede: "/photos/city-ede.webp", // Ede raadhuis/Cultura carillon tower
  venlo: "/photos/city-venlo.webp", // historic Stadhuis on the Maas
};

// DJB2-style string hash — good distribution across every character, unlike a
// first/last-char-only hash which collides often at small pool sizes (e.g.
// "utrecht" and "arnhem" both landed on remainder 0 mod 4 with that approach).
export const hash = (s: string) => {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = (h * 33) ^ s.charCodeAt(i);
  }
  return Math.abs(h);
};

// Regions with no verified city-specific photo yet (Hoofddorp, Arnhem, Oss,
// Ede, Venlo) fall back to this action pool instead of a mislabeled or
// unverified "generic city" photo.
const cityFallbackPool = [images.serviceVanParked, images.keyHandoff, images.lockoutAirWedgeTool] as const;

export const pickCityImage = (slug: string): string => cityPhotoBySlug[slug] ?? cityFallbackPool[hash(slug) % cityFallbackPool.length];

export const keyServiceImagePool = [
  images.keyCutting,
  images.handHoldingKeyFob,
  images.personHoldingCarKey,
  images.blackKeyFobCloseup,
  images.startStopEngineButton,
] as const;

export const lockoutImagePool = [
  images.lockoutAirWedgeTool,
  images.lockoutDoorHandleTool,
  images.keyInDoorLock,
  images.carDoorHandleCloseup,
] as const;

export const ignitionImagePool = [
  images.ignitionCylinderRemoved,
  images.ignitionColumnOpen,
  images.ignitionBarrelCloseup,
  images.startStopEngineButton,
] as const;

export const supportingImagePool = [
  images.serviceVanParked,
  images.nightCityStreet,
  images.carSnow,
  images.houseKeychain,
] as const;

const poolByService: Record<string, readonly string[]> = {
  "autosleutel-bijmaken": keyServiceImagePool,
  "autosleutel-kwijt": keyServiceImagePool,
  "auto-openen-zonder-sleutel": lockoutImagePool,
  "contactslot-vervangen": ignitionImagePool,
};

// Deterministically picks a thematically-correct photo for a given service,
// varied by `seed` (e.g. a region slug) so pages for the same service don't
// all show the exact same photo.
export const pickServiceImage = (serviceId: string, seed: string): string => {
  const pool = poolByService[serviceId] ?? keyServiceImagePool;
  return pool[hash(seed) % pool.length];
};

const brandPagePool = [...keyServiceImagePool, ...supportingImagePool];

const slugifyBrandName = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// A real photo of that brand's own car (checked one by one — grille badge,
// wordmark or an explicit "<brand> car" caption confirms it) for the brand
// page hero, so the BMW page shows a BMW and the Honda page shows a Honda
// instead of a generic key photo. No stock match was found yet for Seat —
// every free candidate was actually badged "Cupra" (a related but different
// brand) — so it still falls back to the generic rotation below.
export const brandPhotoBySlug: Record<string, string> = {
  "alfa-romeo": unsplash("1741090868609-2166f09eab8e", 1600),
  audi: unsplash("1502161254066-6c74afbf07aa", 1600),
  chevrolet: unsplash("1590456744030-8b9128517cbb", 1600),
  chrysler: unsplash("1786975658747-9249e2bbd82a", 1600),
  citroen: unsplash("1641368255943-674052d0f003", 1600),
  dacia: unsplash("1697461132284-7f1110d1f061", 1600),
  daewoo: unsplash("1690108232595-2ed012be66b7", 1600),
  daihatsu: unsplash("1749042920720-13cf5931f41b", 1600),
  fiat: unsplash("1757120602359-59272740fb0a", 1600),
  ford: unsplash("1590043586837-35512e866a4e", 1600),
  honda: unsplash("1578659258511-4a4e7dee7344", 1600),
  hyundai: unsplash("1575090536203-2a6193126514", 1600),
  jeep: unsplash("1515049497350-e9dfc9527f5d", 1600),
  kia: unsplash("1688893287848-a218df183f36", 1600),
  lancia: unsplash("1728990005420-652fffe19e1e", 1600),
  landrover: unsplash("1549632891-a0bea6d0355b", 1600),
  mazda: unsplash("1631856507174-5229e66c6344", 1600),
  mercedes: unsplash("1592805723127-004b174a1798", 1600),
  mitsubishi: unsplash("1558199099-ab7fa8a61cb4", 1600),
  nissan: unsplash("1551817280-6d59c77ce1b8", 1600),
  opel: unsplash("1785134838800-a49cdf308d5c", 1600),
  peugeot: unsplash("1566421740474-8456c6840c71", 1600),
  renault: unsplash("1745856305747-d1872fa7fe67", 1600),
  skoda: unsplash("1768907217527-848954c12983", 1600),
  suzuki: unsplash("1653287184042-eff1453aa30b", 1600),
  toyota: unsplash("1547245324-d777c6f05e80", 1600),
  volkswagen: unsplash("1561517118-6068d92c6474", 1600),
};

// Returns 5 images for a brand page (hero + 4 inline sections). The hero is
// that brand's own car when we have one verified; the 4 supporting photos
// stay on the generic key/process rotation, hashed by brand name so they
// don't all show the same fixed photos in the same positions.
export const pickBrandImages = (brand: string): [string, string, string, string, string] => {
  const offset = hash(brand) % brandPagePool.length;
  const rotated = [...brandPagePool.slice(offset), ...brandPagePool.slice(0, offset)];
  const hero = brandPhotoBySlug[slugifyBrandName(brand)] ?? rotated[0];
  return [hero, rotated[1], rotated[2], rotated[3], rotated[0]];
};
