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
    // "Autosleutelnamaken" is the trade name; CarKey24 is the KVK-registered
    // legal entity behind it (verified against the public KVK register).
    legalName: business.legalName,
    telephone: business.phoneHref.replace("tel:", ""),
    email: business.email,
    url,
    // Registered address (verified via kvk.nl). This business has no public
    // storefront — customers never visit it — so it stays out of the site's
    // visible UI copy, but including the real registered address here in
    // structured data is correct and expected for entity verification.
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      postalCode: business.address.postalCode,
      addressLocality: business.address.city,
      addressCountry: "NL",
    },
    identifier: {
      "@type": "PropertyValue",
      name: "KVK",
      value: business.kvk,
    },
    // Mobile, nationwide technician network — areaServed is the correct
    // schema.org signal for where the service is actually delivered.
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
