import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/data/services";
import { images } from "@/lib/images";
import Hero from "@/components/ag/Hero";
import MarqueeBanner from "@/components/ag/MarqueeBanner";
import PhotoGrid from "@/components/ag/PhotoGrid";
import ServiceRow from "@/components/ag/ServiceRow";
import TimeLine from "@/components/ag/TimeLine";
import TrustSection from "@/components/ag/TrustSection";
import SplitPhoneSection from "@/components/ag/SplitPhoneSection";
import FadeIn from "@/components/ag/FadeIn";
import { BrandLogoGrid } from "@/components/BrandLogoGrid";

export const metadata: Metadata = {
  title: "Car Key Duplication, Lost Keys & Lockouts — Nationwide NL",
  description:
    "Car key duplication, lost key replacement, lockouts and ignition lock repair across the Netherlands. Technicians come to you, price confirmed upfront, 24/7.",
  alternates: { canonical: "/en" },
};

export default function EnglishHomePage() {
  return (
    <main>
      <Hero locale="en" city="Utrecht" heroImage={images.heroCarNight} />
      <MarqueeBanner locale="en" />
      <PhotoGrid locale="en" />

      <section className="border-t border-line px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <FadeIn className="mb-10">
            <p className="text-eyebrow text-mist">Coverage by brand</p>
            <h2 className="text-heading-1 text-frost mt-2">Car key duplication for these brands</h2>
          </FadeIn>
          <BrandLogoGrid locale="en" />
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <FadeIn className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-eyebrow text-mist">What we do</p>
              <h2 className="text-heading-1 text-frost mt-2">Our services</h2>
            </div>
            <Link href="/en/diensten" className="text-label font-semibold text-frost underline hidden sm:block">
              View all services →
            </Link>
          </FadeIn>

          <div>
            {services.map((service, idx) => (
              <ServiceRow
                key={service.id}
                category="Service"
                title={service.en.name}
                description={service.en.heroSub}
                price={`${service.priceFrom} €`}
                href={`/en/diensten/${service.id}`}
                index={idx}
                priceLabel="from"
              />
            ))}
          </div>
        </div>
      </section>

      <TimeLine locale="en" />

      <section className="border-t border-line px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <FadeIn className="mb-12">
            <p className="text-eyebrow text-signal-orange mb-2">Transparent rates</p>
            <h2 className="text-heading-1 text-frost">
              No hidden costs.<br />No surprises afterwards.
            </h2>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, idx) => (
              <FadeIn key={service.id} delay={idx * 0.15} className="border border-line bg-navy-surface p-6">
                <span className="text-eyebrow text-mist block">{service.en.whatWeDo[0]}</span>
                <span className="text-heading-4 text-frost mt-2 block">{service.en.name}</span>
                <span style={{ fontFamily: "var(--font-big-shoulders)" }} className="mt-4 block text-3xl font-black text-signal-orange">
                  from €{service.priceFrom}
                </span>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.5}>
            <p className="text-body-small text-mist mt-8">
              All prices are <strong className="text-frost">confirmed on the phone</strong> before the technician
              leaves.{" "}
              <Link href="/en/diensten" className="text-frost underline">
                View all services →
              </Link>
            </p>
          </FadeIn>
        </div>
      </section>

      <TrustSection locale="en" />
      <SplitPhoneSection locale="en" />
    </main>
  );
}
