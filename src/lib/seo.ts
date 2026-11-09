import type { Metadata } from "next";
import { business, siteUrl, absoluteUrl } from "@/lib/business";

/**
 * Builds a page's complete `Metadata`: title, description, a self-referencing
 * canonical, reciprocal hreflang and Open Graph / Twitter card fields.
 *
 * Why this exists: Next.js merges `metadata` field-by-field, so a page that
 * declared `alternates: { canonical: "/prijzen" }` REPLACED the whole
 * `alternates` object inherited from the layout — including its `languages`
 * map. Every page on the site did exactly that, so the site shipped a
 * canonical tag and zero hreflang tags. `openGraph` has the same
 * replace-not-merge behaviour. Producing all of it from one call makes that
 * class of bug impossible: a page cannot set one part and silently drop
 * the rest.
 *
 * hreflang annotations are only honoured when reciprocal, so `altPath` is
 * passed only for pages that genuinely have a counterpart in the other
 * language. NL-only pages (prices, brands, legal, city+service combinations)
 * get a canonical and no language alternates, which is correct rather than
 * merely cautious.
 */
export function seo({
  path,
  altPath,
  locale = "nl",
  title,
  description,
  robots,
}: {
  /** App-relative path of THIS page, e.g. "/prijzen" or "/". */
  path: string;
  /**
   * App-relative path of the same page in the other language. On an NL page
   * that is the English URL; on an English page it is the Dutch URL. Omit
   * when the page exists in one language only.
   */
  altPath?: string;
  locale?: "nl" | "en";
  title?: string;
  description?: string;
  /** Set `{ index: false }` for pages that must stay out of the index. */
  robots?: Metadata["robots"];
}): Metadata {
  const isEn = locale === "en";
  const selfUrl = absoluteUrl(path);

  // Resolve the pair to concrete NL and EN URLs regardless of which side
  // of the pair this page is.
  const nlUrl = isEn ? (altPath ? absoluteUrl(altPath) : undefined) : selfUrl;
  const enUrl = isEn ? selfUrl : altPath ? absoluteUrl(altPath) : undefined;

  const languages =
    nlUrl && enUrl
      ? {
          nl: nlUrl,
          en: enUrl,
          // Visitors whose language matches neither get the Dutch page: this
          // is a Netherlands-only service and Dutch is the primary market.
          "x-default": nlUrl,
        }
      : undefined;

  // Mirror the layout's `%s | Autosleutelnamaken` title template for social
  // cards, which do not get the template applied, while avoiding a doubled
  // brand name on pages whose title already carries it.
  const socialTitle =
    title && !title.includes(business.name) ? `${title} | ${business.name}` : title;

  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    ...(robots ? { robots } : {}),
    alternates: {
      canonical: selfUrl,
      ...(languages ? { languages } : {}),
    },
    openGraph: {
      type: "website",
      siteName: business.name,
      locale: isEn ? "en_US" : "nl_NL",
      url: selfUrl,
      ...(socialTitle ? { title: socialTitle } : {}),
      ...(description ? { description } : {}),
    },
    twitter: {
      card: "summary_large_image",
      ...(socialTitle ? { title: socialTitle } : {}),
      ...(description ? { description } : {}),
    },
  };
}

export { siteUrl };
