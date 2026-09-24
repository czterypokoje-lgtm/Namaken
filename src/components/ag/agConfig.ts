import { business } from "@/lib/business";

export const SITE_CONFIG = {
  name: business.name,
  domain: "https://autosleutelnamaken.nl",
  tagline: "24/7 mobiele autosleutelservice door heel Nederland",
  phone: business.phone,
  phoneHref: business.phoneHref,
  whatsapp: business.whatsappHref,
  email: business.email,
  responseTime: 35,
  address: {
    street: "Hoofdvestiging op aanvraag",
    city: "Utrecht",
  },
};
