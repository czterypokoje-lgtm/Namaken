import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, getService } from "@/data/services";
import { Hero } from "@/components/Hero";
import { ServiceBadgeRow } from "@/components/ServiceBadgeRow";
import { StickyCtaSidebar } from "@/components/StickyCtaSidebar";
import { TransponderSmartKeySection } from "@/components/TransponderSmartKeySection";
import KeyTypesSection from "@/components/ag/KeyTypesSection";
import { Faq } from "@/components/Faq";
import { AlsoUsefulCrossSell } from "@/components/AlsoUsefulCrossSell";
import { business } from "@/lib/business";
import { breadcrumbSchema } from "@/lib/schema";
import { Breadcrumb } from "@/components/Breadcrumb";

export function generateStaticParams() {
  return services.map((s) => ({ dienst: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ dienst: string }>;
}): Promise<Metadata> {
  const service = getService((await params).dienst);
  if (!service) return {};
  return {
    title: service.name,
    description: service.heroSub,
    alternates: { canonical: `/diensten/${service.id}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ dienst: string }> }) {
  const service = getService((await params).dienst);
  if (!service) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    provider: {
      "@type": "LocalBusiness",
      name: business.name,
      telephone: business.phoneHref.replace("tel:", ""),
      email: business.email,
    },
    areaServed: "NL",
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: service.priceFrom,
    },
  };

  const base = `https://${business.domain}`;
  const breadcrumbItems = [
    { name: "Home", url: base },
    { name: "Diensten", url: `${base}/diensten` },
    { name: service.name, url: `${base}/diensten/${service.id}` },
  ];
  const breadcrumb = breadcrumbSchema(breadcrumbItems);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Breadcrumb items={breadcrumbItems} />
      <Hero headline={service.heroHeadline} sub={service.heroSub} image={service.heroImage} compact />
      <ServiceBadgeRow
        priceFrom={service.priceFrom}
        timeOnSite={service.timeOnSite}
        averageArrival={service.averageArrival}
      />

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <h2 className="text-heading-3 text-frost mb-4">Wat we doen</h2>
            <ul className="space-y-3">
              {service.whatWeDo.map((item) => (
                <li key={item} className="flex items-start gap-2 text-body text-frost">
                  <span className="text-signal-orange">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <StickyCtaSidebar priceFrom={service.priceFrom} />
        </div>
      </section>

      {service.includesKeySection && <TransponderSmartKeySection />}
      {service.includesKeySection && <KeyTypesSection />}

      <Faq items={service.faq} title="Veelgestelde vragen" />

      <AlsoUsefulCrossSell excludeId={service.id} />
    </>
  );
}
