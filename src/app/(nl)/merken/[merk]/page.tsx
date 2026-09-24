import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { allBrands, getBrandBySlug, slugifyBrand } from "@/data/brands";
import { getBrandModels } from "@/data/brandModels";
import { services } from "@/data/services";
import { getBrandContent } from "@/lib/brandContent";
import { pickBrandImages } from "@/lib/images";
import { Hero } from "@/components/Hero";
import { BrandBadge } from "@/components/BrandBadge";
import { PriceTiers } from "@/components/PriceTiers";
import { business } from "@/lib/business";
import { breadcrumbSchema } from "@/lib/schema";
import { Breadcrumb } from "@/components/Breadcrumb";

export function generateStaticParams() {
  return allBrands.map((b) => ({ merk: slugifyBrand(b) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ merk: string }>;
}): Promise<Metadata> {
  const brand = getBrandBySlug((await params).merk);
  if (!brand) return {};
  const bijmakenPrice = services.find((s) => s.id === "autosleutel-bijmaken")!.priceFrom;
  return {
    title: `${brand} sleutel bijmaken`,
    description: `${brand} autosleutel bijmaken, inprogrammeren of alle sleutels kwijt? Vaste prijzen vanaf €${bijmakenPrice}, op locatie of in de winkel.`,
    alternates: { canonical: `/merken/${slugifyBrand(brand)}` },
  };
}

export default async function BrandPage({ params }: { params: Promise<{ merk: string }> }) {
  const brand = getBrandBySlug((await params).merk);
  if (!brand) notFound();

  const models = getBrandModels(brand);
  const price = services.find((s) => s.id === "autosleutel-bijmaken")!.priceFrom;
  const content = getBrandContent(brand, price);

  const midpoint = Math.ceil(models.length / 2);
  const colA = models.slice(0, midpoint);
  const colB = models.slice(midpoint);

  const [heroImage, inprogrammerenImage, dealerImage, behuizingImage, alleSleutelsImage] = pickBrandImages(brand);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `${brand} sleutel bijmaken`,
    offers: { "@type": "Offer", priceCurrency: "EUR", price },
  };

  const base = `https://${business.domain}`;
  const breadcrumbItems = [
    { name: "Home", url: base },
    { name: "Merken", url: `${base}/merken` },
    { name: brand, url: `${base}/merken/${slugifyBrand(brand)}` },
  ];
  const breadcrumb = breadcrumbSchema(breadcrumbItems);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Breadcrumb items={breadcrumbItems} />

      <Hero
        eyebrow="Merkspecifiek"
        headline={`${brand} sleutel bijmaken`}
        sub={`Voordat u langskomt wilt u natuurlijk weten wat het bijmaken van een ${brand} sleutel kost. Onze technicus programmeert de sleutel op locatie — hieronder alles wat u moet weten.`}
        image={heroImage}
        compact
      />

      {/* Model list */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-heading-2 text-frost mb-4">Welke {brand} autosleutels wij bijmaken</h1>
              <p className="text-body text-mist">{content.intro}</p>
            </div>
            <BrandBadge brand={brand} />
          </div>

          {models.length > 0 && (
            <div className="mt-10 grid gap-x-12 sm:grid-cols-2">
              <ul className="space-y-2">
                {colA.map((m) => (
                  <li key={m.name} className="text-body text-frost">
                    <span className="font-semibold">{m.name}</span>{" "}
                    <span className="text-mist">— {m.years}</span>
                  </li>
                ))}
              </ul>
              <ul className="space-y-2">
                {colB.map((m) => (
                  <li key={m.name} className="text-body text-frost">
                    <span className="font-semibold">{m.name}</span>{" "}
                    <span className="text-mist">— {m.years}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Laten inprogrammeren */}
      <section className="border-t border-line px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <Image src={inprogrammerenImage} alt={`${brand} sleutel inprogrammeren`} fill sizes="500px" className="object-cover" />
          </div>
          <div>
            <h2 className="text-heading-3 text-frost mb-4">{content.inprogrammeren.heading}</h2>
            <p className="text-body-small text-mist mb-4">{content.inprogrammeren.p1}</p>
            <p className="text-body-small text-mist mb-4">{content.inprogrammeren.p2}</p>
            <p className="text-body-small text-mist">{content.inprogrammeren.p3}</p>
          </div>
        </div>
      </section>

      {/* Kosten + price tiers */}
      <section className="border-t border-line bg-night-navy px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-heading-2 text-frost mb-10">{content.kosten.heading}</h2>
          <p className="text-body-small text-mist mb-4 mx-auto max-w-2xl">{content.kosten.p1}</p>
          <p className="text-body-small text-mist mb-10 mx-auto max-w-2xl">{content.kosten.p2}</p>
          <div className="text-left">
            <PriceTiers />
          </div>
        </div>
      </section>

      {/* Net als bij de dealer */}
      <section className="border-t border-line px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-heading-3 text-frost mb-4">{content.dealer.heading}</h2>
            <p className="text-body-small text-mist mb-4">{content.dealer.p1}</p>
            <p className="text-body-small text-mist">{content.dealer.p2}</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <Image src={dealerImage} alt={`${brand} sleutel bijmaken zoals bij de dealer`} fill sizes="500px" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Alle sleutels kwijt */}
      <section className="border-t border-line bg-signal-orange px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <Image src={alleSleutelsImage} alt={`Alle ${brand} sleutels kwijt`} fill sizes="500px" className="object-cover" />
          </div>
          <div>
            <h2 className="text-heading-3 text-on-orange mb-4">{content.alleSleutels.heading}</h2>
            <p className="text-body-small text-navy-band mb-4">{content.alleSleutels.p1}</p>
            <p className="text-body-small text-navy-band">{content.alleSleutels.p2}</p>
          </div>
        </div>
      </section>

      {/* Behuizing vervangen */}
      <section className="border-t border-line px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-heading-3 text-frost mb-4">{content.behuizing.heading}</h2>
            <p className="text-body-small text-mist mb-4">{content.behuizing.p1}</p>
            <p className="text-body-small text-mist">{content.behuizing.p2}</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <Image src={behuizingImage} alt={`${brand} sleutel behuizing vervangen`} fill sizes="500px" className="object-cover" />
          </div>
        </div>
      </section>
    </>
  );
}
