import { business } from "@/lib/business";
import { regions } from "@/data/regions";

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    telephone: business.phoneHref.replace("tel:", ""),
    email: business.email,
    url: `https://${business.domain}`,
    areaServed: regions.map((r) => r.name),
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
