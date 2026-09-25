import type { Metadata } from "next";
import { ArrivalsBoard } from "@/components/ArrivalsBoard";
import { regions } from "@/data/regions";
import { CityHubHero } from "@/components/ag/CityHubHero";

export const metadata: Metadata = {
  title: "Areas covered",
  description: `Car key service in ${regions.length} regions across the Netherlands, with average arrival times per region.`,
  alternates: { canonical: "/en/werkgebied" },
};

export default function EnglishAreasIndexPage() {
  const sorted = [...regions].sort((a, b) => a.avgArrivalMin - b.avgArrivalMin);
  const fastest = sorted[0];
  const slowest = sorted[sorted.length - 1];
  const avg = Math.round(regions.reduce((sum, r) => sum + r.avgArrivalMin, 0) / regions.length);

  return (
    <>
      <CityHubHero 
        fastestName={fastest.name}
        fastestMin={fastest.avgArrivalMin}
        slowestName={slowest.name}
        slowestMin={slowest.avgArrivalMin}
        avgMin={avg}
        regionCount={regions.length}
        isEn={true}
      />
      <ArrivalsBoard locale="en" />
    </>
  );
}
