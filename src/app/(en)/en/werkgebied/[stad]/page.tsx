import type { Metadata } from "next";
import { seo } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { regions, getRegion } from "@/data/regions";
import { services } from "@/data/services";
import { Hero } from "@/components/Hero";
import { pickCityImage } from "@/lib/images";
import { siteUrl } from "@/lib/business";
import { breadcrumbSchema } from "@/lib/schema";
import { cityFaqEn, cityIntroEn, nearbyRegions } from "@/data/cityContent";
import { Faq } from "@/components/Faq";

export function generateStaticParams() {
  return regions.map((r) => ({ stad: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ stad: string }>;
}): Promise<Metadata> {
  const region = getRegion((await params).stad);
  if (!region) return {};
  const name = region.enName ?? region.name;
  return seo({
    path: `/en/werkgebied/${region.slug}`,
    altPath: `/werkgebied/${region.slug}`,
    locale: "en",
    title: `Car key service ${name}`,
    description: `Car key duplication, lost keys or lockouts in ${name}? Our technician arrives in about ${region.avgArrivalMin} minutes on average.`,
  });
}

export default async function EnglishRegionPage({ params }: { params: Promise<{ stad: string }> }) {
  const region = getRegion((await params).stad);
  if (!region) notFound();
  const name = region.enName ?? region.name;

  const intro = cityIntroEn(region);
  const faqItems = cityFaqEn(region);
  const nearby = nearbyRegions(region);

  const base = siteUrl;
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: `${base}/en` },
    { name: "Areas covered", url: `${base}/en/werkgebied` },
    { name, url: `${base}/en/werkgebied/${region.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Hero
        locale="en"
        eyebrow={`Coverage area · avg. ${region.avgArrivalMin} min arrival`}
        headline={`Car key service in ${name}.`}
        sub={`From ${region.areas[0]} to ${region.areas[region.areas.length - 1]} — our technician knows ${name} and arrives in about ${region.avgArrivalMin} minutes on average.`}
        image={pickCityImage(region.slug)}
        compact
      />

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <p className="text-body text-mist mb-8">{intro}</p>

          <h2 className="text-heading-3 text-frost mb-4">Arrival and coverage in {name}</h2>
          <p className="text-body text-mist mb-6">
            Average arrival time in {name} is{" "}
            <strong className="text-frost">{region.avgArrivalMin} minutes</strong>. The technician works at the
            car itself — at home, at work or on the roadside — so there is no tow truck and no dealer
            appointment. You hear the price on the phone before anyone sets off, and there is no regional
            surcharge for {name}.
          </p>

          <h2 className="text-heading-3 text-frost mb-6">Services in {name}</h2>
          <ul className="divide-y divide-line">
            {services.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/en/diensten/${s.id}`}
                  className="flex items-center justify-between py-4 hover:bg-navy-surface transition-colors"
                >
                  <p className="text-heading-4 text-frost">{s.en.name}</p>
                  <p className="text-price text-signal-orange">from €{s.priceFrom}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      {nearby.length > 0 && (
        <section className="border-t border-line px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-heading-3 text-frost mb-4">Regions next to {name}</h2>
            <ul className="divide-y divide-line">
              {nearby.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/en/werkgebied/${r.slug}`}
                    className="flex items-center justify-between py-3 transition-colors hover:bg-navy-surface"
                  >
                    <span className="text-body text-frost">Car key service {r.enName ?? r.name}</span>
                    <span className="text-body-small text-mist">avg. {r.avgArrivalMin} min</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <Faq items={faqItems} title={`Frequently asked questions about car key service in ${name}`} />
    </>
  );
}
