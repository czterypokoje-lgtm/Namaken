import type { Metadata } from "next";
import { seo } from "@/lib/seo";
import { notFound } from "next/navigation";
import { services, getService } from "@/data/services";
import { ServiceHero } from "@/components/ag/ServiceHero";
import { StickyCtaSidebar } from "@/components/StickyCtaSidebar";
import { TransponderSmartKeySection } from "@/components/TransponderSmartKeySection";
import KeyTypesSection from "@/components/ag/KeyTypesSection";
import { Faq } from "@/components/Faq";
import { AlsoUsefulCrossSell } from "@/components/AlsoUsefulCrossSell";
import { siteUrl } from "@/lib/business";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
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
  return seo({
    path: `/diensten/${service.id}`,
    altPath: `/en/diensten/${service.id}`,
    title: service.name,
    description: service.heroSub,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ dienst: string }> }) {
  const service = getService((await params).dienst);
  if (!service) notFound();

  const base = siteUrl;
  const schema = serviceSchema({
    name: service.name,
    description: service.heroSub,
    url: `${base}/diensten/${service.id}`,
    priceFrom: service.priceFrom,
  });

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
      
      <ServiceHero 
        headline={service.heroHeadline}
        sub={service.heroSub}
        image={service.heroImage || ''}
        priceFrom={service.priceFrom}
        timeOnSite={service.timeOnSite}
        averageArrival={service.averageArrival}
        isEn={false}
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
