import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Ticker } from "@/components/Ticker";
import { StatPhotoSection } from "@/components/StatPhotoSection";
import { StoryTimeline } from "@/components/StoryTimeline";
import { ArrivalsBoard } from "@/components/ArrivalsBoard";
import { TrustCredentialsBand } from "@/components/TrustCredentialsBand";
import { FooterCta } from "@/components/FooterCta";
import { services } from "@/data/services";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Car Key Duplication, Lost Keys & Lockouts — Nationwide NL",
  description:
    "Car key duplication, lost key replacement, lockouts and ignition lock repair across the Netherlands. Technicians come to you, price confirmed upfront, 24/7.",
};

export default function EnglishHomePage() {
  return (
    <>
      <Hero
        locale="en"
        eyebrow="24/7 available · nationwide technician network"
        headline="Lost your car key? We're there, in about 35 minutes."
        sub="Key duplication, lost key replacement, lockouts, or a broken ignition lock — our technicians work on location, all across the Netherlands. You hear the price before anyone drives out."
        image={images.heroCarNight}
      />

      <Ticker locale="en" />

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-heading-3 text-frost mb-6">Services.</h2>
          <ul className="divide-y divide-line">
            {services.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/en/diensten/${s.id}`}
                  className="flex items-center justify-between py-4 hover:bg-navy-surface transition-colors"
                >
                  <div>
                    <p className="text-heading-4 text-frost">{s.en.name}</p>
                    <p className="text-body-small text-mist">{s.en.heroSub}</p>
                  </div>
                  <p className="text-price text-signal-orange whitespace-nowrap ml-4">from €{s.priceFrom}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <StatPhotoSection locale="en" />

      <ArrivalsBoard locale="en" />

      <StoryTimeline locale="en" />

      <TrustCredentialsBand locale="en" />

      <FooterCta locale="en" />
    </>
  );
}
