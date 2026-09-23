import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { regions, getRegion } from "@/data/regions";
import { services } from "@/data/services";
import { Hero } from "@/components/Hero";
import { Testimonial } from "@/components/Testimonial";
import { images } from "@/lib/images";

const regionImages = [images.carSnow, images.heroCarDusk, images.nightCityStreet, images.carRainCity];

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
  return {
    title: `Autosleutelservice ${region.name}`,
    description: `Autosleutel bijmaken, verloren sleutel of buitengesloten in ${region.name}? Onze technicus is gemiddeld binnen ${region.avgArrivalMin} minuten ter plekke.`,
  };
}

export default async function RegionPage({ params }: { params: Promise<{ stad: string }> }) {
  const region = getRegion((await params).stad);
  if (!region) notFound();

  return (
    <>
      <Hero
        eyebrow={`Werkgebied · gem. ${region.avgArrivalMin} min aankomst`}
        headline={`Autosleutelservice in ${region.name}.`}
        sub={`Van ${region.areas[0]} tot ${region.areas[region.areas.length - 1]} — onze technicus kent ${region.name} en is gemiddeld binnen ${region.avgArrivalMin} minuten bij u.`}
        image={regionImages[region.slug.length % regionImages.length]}
        compact
      />

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-heading-3 text-frost mb-6">Diensten in {region.name}</h2>
          <ul className="divide-y divide-line">
            {services.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/werkgebied/${region.slug}/${s.id}`}
                  className="flex items-center justify-between py-4 hover:bg-navy-surface transition-colors"
                >
                  <p className="text-heading-4 text-frost">{s.name}</p>
                  <p className="text-price text-signal-orange">vanaf €{s.priceFrom}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-heading-3 text-frost mb-4">Ook actief rond</h2>
          <div className="flex flex-wrap gap-2">
            {region.areas.map((area) => (
              <span key={area} className="rounded-full border border-line px-3 py-1 text-body-small text-mist">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <Testimonial
            quote={`Snel geholpen in ${region.areas[0]}, precies zoals aan de telefoon beloofd.`}
            author={`Klant uit ${region.name}`}
          />
        </div>
      </section>
    </>
  );
}
