import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { regions, getRegion } from "@/data/regions";
import { services } from "@/data/services";
import { Hero } from "@/components/Hero";
import { pickCityImage } from "@/lib/images";

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
  return {
    title: `Car key service ${name}`,
    description: `Car key duplication, lost keys or lockouts in ${name}? Our technician arrives in about ${region.avgArrivalMin} minutes on average.`,
    alternates: { canonical: `/en/werkgebied/${region.slug}` },
  };
}

export default async function EnglishRegionPage({ params }: { params: Promise<{ stad: string }> }) {
  const region = getRegion((await params).stad);
  if (!region) notFound();
  const name = region.enName ?? region.name;

  return (
    <>
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
    </>
  );
}
