import { business, siteUrl } from "@/lib/business";
import { regions } from "@/data/regions";
import { services } from "@/data/services";

const BUSINESS_ID = `${siteUrl}/#business`;
const WEBSITE_ID = `${siteUrl}/#website`;

/**
 * The business entity. Emitted once per page from the root layout.
 *
 * "Locksmith" is schema.org's own subtype for exactly this business (car
 * key/lock services) — more specific than generic "LocalBusiness", which is
 * what search engines and AI answer engines use to categorize the entity.
 */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Locksmith",
    "@id": BUSINESS_ID,
    name: business.name,
    // "Autosleutelnamaken" is the trade name; CarKey24 is the KVK-registered
    // legal entity behind it (verified against the public KVK register).
    legalName: business.legalName,
    // E.164 is the format Google documents for `telephone`, and it is what
    // makes the number click-to-call in results and reusable by AI answers.
    telephone: business.phoneE164,
    email: business.email,
    url: siteUrl,
    // Registered address (verified via kvk.nl). This business has no public
    // storefront — customers never visit it — but the real registered
    // address here is correct and expected for entity verification, and it
    // matches the address shown on the page and on Google Business Profile.
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      postalCode: business.address.postalCode,
      addressLocality: business.address.city,
      addressCountry: business.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    identifier: {
      "@type": "PropertyValue",
      name: "KVK",
      value: business.kvk,
    },
    // Mobile, nationwide technician network — areaServed is the correct
    // schema.org signal for where the service is actually delivered.
    areaServed: regions.map((r) => ({
      "@type": "City",
      name: r.name,
      addressCountry: business.countryCode,
    })),
    priceRange: `${business.currencySymbol}${Math.min(
      ...services.map((s) => s.priceFrom),
    )}-${business.currencySymbol}${Math.max(...services.map((s) => s.priceFrom))}`,
    currenciesAccepted: business.currencyCode,
    // Round-the-clock availability stated the structured way, which is what
    // generates the "Open 24 hours" line rather than a free-text string.
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: business.phoneE164,
      contactType: "customer service",
      areaServed: business.countryCode,
      availableLanguage: ["nl", "en"],
    },
    // The four services, so an answer engine asked "what do they do?" has a
    // machine-readable list instead of having to infer it from prose.
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Autosleutelservice",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          serviceType: s.name,
          url: `${siteUrl}/diensten/${s.id}`,
        },
        price: s.priceFrom,
        priceCurrency: business.currencyCode,
        // States that the listed price is a floor, not the final amount.
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: s.priceFrom,
          priceCurrency: business.currencyCode,
          valueAddedTaxIncluded: true,
        },
      })),
    },
    // NOTE: no `aggregateRating` here on purpose. Google's structured-data
    // policy requires a rating to come from reviews that are visible on the
    // same page, and marking up an unsourced score risks a manual action.
    // Add it only once real reviews are collected and displayed — the
    // Google Business Profile rating cannot simply be copied in here.
  };
}

/**
 * WebSite entity, linked to the business as its publisher. Gives search
 * engines one canonical node for the site itself and declares the site's
 * language, which matters on a bilingual domain.
 */
export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteUrl,
    name: business.name,
    inLanguage: ["nl-NL", "en"],
    publisher: { "@id": BUSINESS_ID },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * A single service, optionally scoped to one region. `provider` points at the
 * business node by @id rather than restating its details, so there is exactly
 * one business entity across the whole site instead of a near-duplicate on
 * every service page.
 */
export function serviceSchema({
  name,
  description,
  url,
  priceFrom,
  areaName,
  areas,
}: {
  name: string;
  description?: string;
  url: string;
  priceFrom: number;
  areaName?: string;
  areas?: readonly string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType: name,
    ...(description ? { description } : {}),
    url,
    provider: { "@id": BUSINESS_ID },
    areaServed: areaName
      ? {
          "@type": "City",
          name: areaName,
          addressCountry: business.countryCode,
          ...(areas?.length ? { containsPlace: areas.map((a) => ({ "@type": "Place", name: a })) } : {}),
        }
      : regions.map((r) => ({
          "@type": "City",
          name: r.name,
          addressCountry: business.countryCode,
        })),
    offers: {
      "@type": "Offer",
      priceCurrency: business.currencyCode,
      price: priceFrom,
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: priceFrom,
        priceCurrency: business.currencyCode,
        valueAddedTaxIncluded: true,
      },
      availability: "https://schema.org/InStock",
      areaServed: areaName ?? business.countryCode,
    },
  };
}
