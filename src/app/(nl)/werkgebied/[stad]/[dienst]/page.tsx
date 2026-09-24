import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { regions, getRegion, cityServiceIntro, cityServiceWhy } from "@/data/regions";
import { services, getService } from "@/data/services";
import { Hero } from "@/components/Hero";
import { ServiceBadgeRow } from "@/components/ServiceBadgeRow";
import { StickyCtaSidebar } from "@/components/StickyCtaSidebar";
import { Faq } from "@/components/Faq";
import { business } from "@/lib/business";
import { breadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
  return regions.flatMap((r) => services.map((s) => ({ stad: r.slug, dienst: s.id })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ stad: string; dienst: string }>;
}): Promise<Metadata> {
  const { stad, dienst } = await params;
  const region = getRegion(stad);
  const service = getService(dienst);
  if (!region || !service) return {};
  return {
    title: `${service.name} ${region.name}`,
    description: `${service.name} in ${region.name}: gemiddeld ${region.avgArrivalMin} min aankomst, prijs vanaf €${service.priceFrom}, vooraf bevestigd aan de telefoon.`,
  };
}

export default async function CityServicePage({
  params,
}: {
  params: Promise<{ stad: string; dienst: string }>;
}) {
  const { stad, dienst } = await params;
  const region = getRegion(stad);
  const service = getService(dienst);
  if (!region || !service) notFound();

  const intro = cityServiceIntro(region, service.name);
  const why = cityServiceWhy(region, service.name);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    areaServed: {
      "@type": "City",
      name: region.name,
    },
    provider: {
      "@type": "LocalBusiness",
      name: business.name,
      telephone: business.phoneHref.replace("tel:", ""),
      email: business.email,
      areaServed: region.areas,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: service.priceFrom,
    },
  };

  const base = `https://${business.domain}`;
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: base },
    { name: "Werkgebied", url: `${base}/werkgebied` },
    { name: region.name, url: `${base}/werkgebied/${region.slug}` },
    { name: service.name, url: `${base}/werkgebied/${region.slug}/${service.id}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Hero
        eyebrow={`${service.name} · ${region.name}`}
        headline={`${service.name} in ${region.name}`}
        sub={intro}
        image={service.heroImage}
        compact
      />
      <ServiceBadgeRow
        priceFrom={service.priceFrom}
        timeOnSite={service.timeOnSite}
        averageArrival={`gem. ${region.avgArrivalMin} min`}
      />

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <h2 className="text-heading-3 text-frost mb-4">
              Waarom {service.shortName.toLowerCase()} in {region.name}
            </h2>
            <p className="text-body text-mist mb-6">{why}</p>
            <ul className="space-y-3">
              {service.whatWeDo.map((item) => (
                <li key={item} className="flex items-start gap-2 text-body text-frost">
                  <span className="text-signal-orange">→</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-body-small text-mist mt-6">
              Ook actief rond: {region.areas.join(", ")}.
            </p>
          </div>
          <StickyCtaSidebar priceFrom={service.priceFrom} />
        </div>
      </section>

      <Faq items={service.faq} title={`Veelgestelde vragen over ${service.shortName.toLowerCase()} in ${region.name}`} />
    </>
  );
}
