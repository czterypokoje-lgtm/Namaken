import { business, siteUrl } from "@/lib/business";

export const SITE_CONFIG = {
  name: business.name,
  domain: siteUrl,
  tagline: "24/7 mobiele autosleutelservice door heel Nederland",
  phone: business.phone,
  phoneHref: business.phoneHref,
  whatsapp: business.whatsappHref,
  email: business.email,
  responseTime: 35,
  // Registered address, kept identical to business.address so the address
  // shown on the page, the address in JSON-LD and the address on Google
  // Business Profile are one and the same string. Search engines compare
  // these three; an invented head-office city used to contradict the other two.
  address: {
    street: business.address.street,
    city: business.address.city,
  },
};
