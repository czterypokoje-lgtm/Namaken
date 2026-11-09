export type BrandGroup = { label: string; brands: string[] };

// BMW and Volvo were missing entirely, which is why this list grew: both are
// among the most common cars in the Netherlands, and a competitor carries BMW
// as one of only seven brand pages it has. Jaguar, Lexus, Mini, Porsche, Saab,
// Smart, Subaru and Tesla were added for the same reason — real demand with no
// page to land on.
export const brandGroups: BrandGroup[] = [
  { label: "Merken A-C", brands: ["Alfa Romeo", "Audi", "BMW", "Chevrolet", "Chrysler", "Citroën"] },
  { label: "Merken D-H", brands: ["Dacia", "Daewoo", "Daihatsu", "Fiat", "Ford", "Honda", "Hyundai"] },
  {
    label: "Merken J-M",
    brands: ["Jaguar", "Jeep", "Kia", "Lancia", "Landrover", "Lexus", "Mazda", "Mercedes", "Mini", "Mitsubishi"],
  },
  {
    label: "Merken N-S",
    brands: ["Nissan", "Opel", "Peugeot", "Porsche", "Renault", "Saab", "Seat", "Skoda", "Smart", "Subaru", "Suzuki"],
  },
  { label: "Merken T-V", brands: ["Tesla", "Toyota", "Volkswagen", "Volvo"] },
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
