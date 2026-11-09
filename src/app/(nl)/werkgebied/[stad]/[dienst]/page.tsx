import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { regions, getRegion } from "@/data/regions";
import { services, getService } from "@/data/services";
import {
  cityServiceDescription,
  cityServiceFaq,
  cityServiceIntro,
  nearbyRegions,
  otherServices,
  taskLabel,
} from "@/data/cityContent";
import { ServiceHero } from "@/components/ag/ServiceHero";
import { StickyCtaSidebar } from "@/components/StickyCtaSidebar";
import { Faq } from "@/components/Faq";
import { business, siteUrl } from "@/lib/business";
import { seo } from "@/lib/seo";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { Breadcrumb } from "@/components/Breadcrumb";
import { pickServiceImage } from "@/lib/images";

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
  return seo({
    path: `/werkgebied/${region.slug}/${service.id}`,
    title: `${service.name} ${region.name}`,
    description: cityServiceDescription(region, service, business.currencySymbol),
  });
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

  const intro = cityServiceIntro(region, service);
  const nearby = nearbyRegions(region);
  const siblings = otherServices(service.id);
  const faqItems = [...service.faq, ...cityServiceFaq(region, service)];

  const base = siteUrl;
  const schema = serviceSchema({
    name: `${service.name} ${region.name}`,
    description: intro,
    url: `${base}/werkgebied/${region.slug}/${service.id}`,
    priceFrom: service.priceFrom,
    areaName: region.name,
    areas: region.areas,
  });

  const breadcrumbItems = [
    { name: "Home", url: base },
    { name: "Werkgebied", url: `${base}/werkgebied` },
    { name: region.name, url: `${base}/werkgebied/${region.slug}` },
    { name: service.name, url: `${base}/werkgebied/${region.slug}/${service.id}` },
  ];
  const breadcrumb = breadcrumbSchema(breadcrumbItems);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Breadcrumb items={breadcrumbItems} />

      <ServiceHero
        headline={`${service.name} in ${region.name}`}
        sub={intro}
        image={pickServiceImage(service.id, region.slug)}
        priceFrom={service.priceFrom}
        timeOnSite={service.timeOnSite}
        averageArrival={`gem. ${region.avgArrivalMin} min`}
        isEn={false}
      />

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <h2 className="text-heading-3 text-frost mb-4">
              Wat de technicus in {region.name} doet
            </h2>
            <ul className="space-y-3">
              {service.whatWeDo.map((item) => (
                <li key={item} className="flex items-start gap-2 text-body text-frost">
                  <span className="text-signal-orange">→</span>
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="text-heading-3 text-frost mt-12 mb-4">
              Aankomst en dekking in {region.name}
            </h2>
            <p className="text-body text-mist mb-6">
              De gemiddelde aanrijtijd in {region.name} is{" "}
              <strong className="text-frost">{region.avgArrivalMin} minuten</strong>, en een klus als deze
              duurt daarna {service.timeOnSite.toLowerCase()}. Aan de telefoon hoort u een concrete tijd voor
              uw adres in plaats van dit gemiddelde.
            </p>
            <p className="text-body-small text-mist mb-3">Wijken en plaatsen die we hier afdekken:</p>
            <div className="flex flex-wrap gap-2">
              {region.areas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-line px-3 py-1 text-body-small text-mist"
                >
                  {area}
                </span>
              ))}
            </div>

            {nearby.length > 0 && (
              <>
                <h2 className="text-heading-3 text-frost mt-12 mb-4">
                  {service.name} in de buurt van {region.name}
                </h2>
                <p className="text-body text-mist mb-4">
                  Staat u tussen twee regio&rsquo;s in? Dit zijn de aanrijtijden van de gebieden die aan{" "}
                  {region.name} grenzen.
                </p>
                <table className="w-full border-collapse text-body-small">
                  <thead>
                    <tr className="border-b border-line text-left">
                      <th className="py-2 font-semibold text-frost">Regio</th>
                      <th className="py-2 font-semibold text-frost">Gem. aankomst</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nearby.map((r) => (
                      <tr key={r.slug} className="border-b border-line">
                        <td className="py-2">
                          <Link
                            href={`/werkgebied/${r.slug}/${service.id}`}
                            className="text-frost underline hover:text-signal-orange"
                          >
                            {service.name} {r.name}
                          </Link>
                        </td>
                        <td className="py-2 text-mist">{r.avgArrivalMin} min</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}

            <h2 className="text-heading-3 text-frost mt-12 mb-4">
              Andere diensten in {region.name}
            </h2>
            <ul className="divide-y divide-line">
              {siblings.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/werkgebied/${region.slug}/${s.id}`}
                    className="flex items-center justify-between py-3 transition-colors hover:bg-navy-surface"
                  >
                    <span className="text-body text-frost">
                      {s.name} in {region.name}
                    </span>
                    <span className="text-price text-signal-orange">
                      vanaf {business.currencySymbol}
                      {s.priceFrom}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-body-small text-mist mt-6">
              Liever eerst de dienst zelf doorlezen?{" "}
              <Link href={`/diensten/${service.id}`} className="underline hover:text-frost">
                Alles over {service.name.toLowerCase()}
              </Link>{" "}
              of bekijk{" "}
              <Link href={`/werkgebied/${region.slug}`} className="underline hover:text-frost">
                ons werkgebied in {region.name}
              </Link>
              .
            </p>
          </div>
          <StickyCtaSidebar priceFrom={service.priceFrom} />
        </div>
      </section>

      <Faq
        items={faqItems}
        title={`Veelgestelde vragen over ${taskLabel(service)} in ${region.name}`}
      />
    </>
  );
}
