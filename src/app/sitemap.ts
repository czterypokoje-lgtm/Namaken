import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { regions } from "@/data/regions";
import { allBrands, slugifyBrand } from "@/data/brands";
import { siteUrl } from "@/lib/business";

const base = siteUrl;

/**
 * Build-time timestamp, computed once. Previously every entry got
 * `new Date()` evaluated per URL, so all 181 URLs claimed to change on every
 * deploy. A sitemap that marks the privacy policy as freshly modified on each
 * build teaches crawlers to ignore `lastmod` entirely, which wastes the one
 * recrawl signal a sitemap actually carries.
 */
const buildDate = new Date();

type Entry = MetadataRoute.Sitemap[number];

/**
 * One sitemap entry. `altPath` adds the reciprocal hreflang annotations that
 * Google reads from the sitemap, which is the second (and for large sites,
 * more reliable) channel alongside the <link> tags in each page's head.
 */
function entry(
  path: string,
  priority: number,
  changeFrequency: Entry["changeFrequency"],
  altPath?: string,
): Entry {
  const url = path === "/" ? base : `${base}${path}`;
  const isEn = path === "/en" || path.startsWith("/en/");
  const nlUrl = isEn ? (altPath ? `${base}${altPath}` : undefined) : url;
  const enUrl = isEn ? url : altPath ? `${base}${altPath}` : undefined;

  return {
    url,
    lastModified: buildDate,
    changeFrequency,
    priority,
    ...(nlUrl && enUrl
      ? { alternates: { languages: { nl: nlUrl, en: enUrl, "x-default": nlUrl } } }
      : {}),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Priority is a relative hint within this one site, not a global score.
    // It is set to mirror commercial intent: the money pages (home, the four
    // services, the region hubs) rank above legal boilerplate.
    entry("/", 1.0, "weekly", "/en"),
    entry("/diensten", 0.9, "monthly", "/en/diensten"),
    entry("/werkgebied", 0.9, "monthly", "/en/werkgebied"),
    entry("/prijzen", 0.8, "monthly"),
    entry("/merken", 0.8, "monthly"),
    entry("/contact", 0.7, "yearly"),
    entry("/over-ons", 0.5, "yearly"),
    entry("/veelgestelde-vragen", 0.6, "monthly"),
    entry("/privacybeleid", 0.1, "yearly"),
    entry("/algemene-voorwaarden", 0.1, "yearly"),

    // English hub pages, each paired back to its Dutch counterpart.
    entry("/en", 0.7, "weekly", "/"),
    entry("/en/diensten", 0.6, "monthly", "/diensten"),
    entry("/en/werkgebied", 0.6, "monthly", "/werkgebied"),

    // Service pages: the primary commercial landing pages.
    ...services.map((s) => entry(`/diensten/${s.id}`, 0.9, "monthly", `/en/diensten/${s.id}`)),
    ...services.map((s) => entry(`/en/diensten/${s.id}`, 0.6, "monthly", `/diensten/${s.id}`)),

    // Region hubs.
    ...regions.map((r) => entry(`/werkgebied/${r.slug}`, 0.8, "monthly", `/en/werkgebied/${r.slug}`)),
    ...regions.map((r) => entry(`/en/werkgebied/${r.slug}`, 0.5, "monthly", `/werkgebied/${r.slug}`)),

    // Brand pages.
    ...allBrands.map((b) => entry(`/merken/${slugifyBrand(b)}`, 0.7, "monthly")),

    // Region x service long-tail. Deliberately the lowest non-legal priority:
    // these are template-generated and should not out-compete the service and
    // region pages they derive from.
    ...regions.flatMap((r) =>
      services.map((s) => entry(`/werkgebied/${r.slug}/${s.id}`, 0.4, "monthly")),
    ),
  ];
}
