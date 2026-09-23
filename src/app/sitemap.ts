import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { regions } from "@/data/regions";
import { allBrands, slugifyBrand } from "@/data/brands";
import { business } from "@/lib/business";

const base = `https://${business.domain}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticNl = [
    "",
    "/diensten",
    "/prijzen",
    "/over-ons",
    "/contact",
    "/veelgestelde-vragen",
    "/werkgebied",
    "/merken",
    "/privacybeleid",
    "/algemene-voorwaarden",
  ];

  const staticEn = ["/en", "/en/diensten", "/en/werkgebied"];

  const serviceNl = services.map((s) => `/diensten/${s.id}`);
  const serviceEn = services.map((s) => `/en/diensten/${s.id}`);
  const regionNl = regions.map((r) => `/werkgebied/${r.slug}`);
  const regionEn = regions.map((r) => `/en/werkgebied/${r.slug}`);
  const combo = regions.flatMap((r) => services.map((s) => `/werkgebied/${r.slug}/${s.id}`));
  const brands = allBrands.map((b) => `/merken/${slugifyBrand(b)}`);

  const all = [...staticNl, ...staticEn, ...serviceNl, ...serviceEn, ...regionNl, ...regionEn, ...combo, ...brands];

  return all.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
}
