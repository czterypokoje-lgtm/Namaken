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
  carRainCity: unsplash("1471479917193-f00955256257", 1200),
} as const;
