import { business } from "@/lib/business";
import { regions } from "@/data/regions";
import { services } from "@/data/services";

export function localBusinessSchema() {
  const url = `https://${business.domain}`;
  return {
    "@context": "https://schema.org",
    // "Locksmith" is schema.org's own subtype for exactly this business
    // (car key/lock services) — more specific than generic "LocalBusiness",
    // which is what search engines and AI answer engines use to categorize
    // the entity correctly.
    "@type": "Locksmith",
    "@id": `${url}/#business`,
    name: business.name,
    telephone: business.phoneHref.replace("tel:", ""),
    email: business.email,
    url,
    // Mobile, nationwide technician network with no public storefront —
    // deliberately no `address` field (a fabricated one would violate
    // Google's guidelines for service-area businesses); areaServed is the
    // correct schema.org signal for this business model instead.
    areaServed: regions.map((r) => r.name),
    priceRange: `€${services[0].priceFrom}-€${Math.max(...services.map((s) => s.priceFrom))}`,
    openingHours: "Mo-Su 00:00-23:59",
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
