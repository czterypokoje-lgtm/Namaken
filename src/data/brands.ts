export type BrandGroup = { label: string; brands: string[] };

export const brandGroups: BrandGroup[] = [
  { label: "Merken A-D", brands: ["Alfa Romeo", "Audi", "Chevrolet", "Chrysler", "Citroën", "Dacia", "Daewoo"] },
  { label: "Merken D-K", brands: ["Daihatsu", "Fiat", "Ford", "Honda", "Hyundai", "Jeep", "Kia"] },
  { label: "Merken L-O", brands: ["Lancia", "Landrover", "Mazda", "Mercedes", "Mitsubishi", "Nissan", "Opel"] },
  { label: "Merken P-V", brands: ["Peugeot", "Renault", "Seat", "Skoda", "Suzuki", "Toyota", "Volkswagen"] },
];

export const allBrands = brandGroups.flatMap((g) => g.brands);

export const slugifyBrand = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const getBrandBySlug = (slug: string) => allBrands.find((b) => slugifyBrand(b) === slug);
