import Image from "next/image";
import Link from "next/link";
import { allBrands, slugifyBrand } from "@/data/brands";
import { business } from "@/lib/business";

// Manufacturer logos are trademarks of their respective owners, sourced from
// public Wikimedia Commons files. Shown here for brand/model identification
// only (nominative use) — we are an independent locksmith network, not an
// authorized dealer for any of these brands. Alfa Romeo has no freely
// licensed logo file available, so it falls back to a text wordmark tile.
const logoExt: Record<string, string> = {
  audi: "svg",
  chevrolet: "svg",
  chrysler: "svg",
  citroen: "png",
  dacia: "svg",
  daewoo: "svg",
  daihatsu: "svg",
  fiat: "svg",
  ford: "svg",
  honda: "svg",
  hyundai: "svg",
  jeep: "svg",
  kia: "svg",
  lancia: "jpg",
  landrover: "svg",
  mazda: "svg",
  mercedes: "svg",
  mitsubishi: "svg",
  nissan: "svg",
  opel: "svg",
  peugeot: "svg",
  renault: "svg",
  seat: "svg",
  skoda: "png",
  suzuki: "svg",
  toyota: "svg",
  volkswagen: "svg",
};

export function BrandLogoGrid() {
  return (
    <div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {allBrands.map((brand) => {
          const slug = slugifyBrand(brand);
          const ext = logoExt[slug];
          return (
            <Link
              key={brand}
              href={`/merken/${slug}`}
              className="group flex aspect-[4/3] items-center justify-center rounded-sm bg-frost p-4 transition-transform hover:-translate-y-1"
              title={`${brand} sleutel bijmaken`}
            >
              {ext ? (
                <div className="relative h-full w-full">
                  <Image
                    src={`/brands/${slug}.${ext}`}
                    alt={`${brand} logo`}
                    fill
                    sizes="150px"
                    className="object-contain"
                  />
                </div>
              ) : (
                <p style={{ fontFamily: "var(--font-big-shoulders)" }} className="text-center text-sm font-black uppercase text-navy-band">
                  {brand}
                </p>
              )}
            </Link>
          );
        })}
      </div>
      <p className="text-mono text-faint mt-6">
        Alle merklogo&apos;s zijn eigendom van de respectievelijke fabrikanten. {business.name} is een
        onafhankelijk technicianetwerk en geen erkende dealer of licentiehouder van deze merken.
      </p>
    </div>
  );
}
