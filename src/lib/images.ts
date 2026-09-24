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
  lockoutAirWedgeTool: "/photos/lockout-airwedge-tool.png",
  lockoutDoorHandleTool: "/photos/lockout-doorhandle-tool.jpg",
  ignitionCylinderRemoved: "/photos/ignition-cylinder-removed.jpg",
  ignitionColumnOpen: "/photos/ignition-column-open.jpg",
  ignitionBarrelCloseup: "/photos/ignition-barrel-closeup.png",
  keyHandoff: "/photos/key-handoff.jpg",
  cityNightAerial: "/photos/city-night-aerial.jpg",
} as const;

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

// Leans toward "we're already on our way" action shots (van, technician at
// work) rather than generic skyline photos — better for conversion, since
// it shows the actual service instead of just proving the city exists.
export const cityImagePool = [
  images.serviceVanParked,
  images.keyHandoff,
  images.cityNightAerial,
  images.lockoutAirWedgeTool,
  images.nightCityStreet,
] as const;

export const supportingImagePool = [
  images.serviceVanParked,
  images.nightCityStreet,
  images.carSnow,
  images.houseKeychain,
] as const;

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

// Returns 5 images for a brand page (hero + 4 inline sections), rotated by a
// hash of the brand name so the 28 brand pages don't all show the same fixed
// photos in the same positions.
export const pickBrandImages = (brand: string): [string, string, string, string, string] => {
  const offset = hash(brand) % brandPagePool.length;
  const rotated = [...brandPagePool.slice(offset), ...brandPagePool.slice(0, offset)];
  return [rotated[0], rotated[1], rotated[2], rotated[3], rotated[0]];
};
