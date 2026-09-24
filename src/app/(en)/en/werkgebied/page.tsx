import type { Metadata } from "next";
import { ArrivalsBoard } from "@/components/ArrivalsBoard";
import { regions } from "@/data/regions";

export const metadata: Metadata = {
  title: "Areas covered",
  description: `Car key service in ${regions.length} regions across the Netherlands, with average arrival times per region.`,
  alternates: { canonical: "/en/werkgebied" },
};

export default function EnglishAreasIndexPage() {
  return (
    <>
      <section className="border-b border-line bg-night-navy px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-display-page text-frost">{regions.length} areas.</h1>
          <p className="text-lead text-mist mt-4 max-w-2xl">
            Technicians spread across the country, so the closest one always takes your call.
          </p>
        </div>
      </section>
      <ArrivalsBoard locale="en" />
    </>
  );
}
