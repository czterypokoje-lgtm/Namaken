import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, getService } from "@/data/services";
import { Hero } from "@/components/Hero";
import { ServiceBadgeRow } from "@/components/ServiceBadgeRow";
import { StickyCtaSidebar } from "@/components/StickyCtaSidebar";
import { TransponderSmartKeySection } from "@/components/TransponderSmartKeySection";
import { Faq } from "@/components/Faq";

export function generateStaticParams() {
  return services.map((s) => ({ dienst: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ dienst: string }>;
}): Promise<Metadata> {
  const service = getService((await params).dienst);
  if (!service) return {};
  return { title: service.en.name, description: service.en.heroSub };
}

export default async function EnglishServicePage({ params }: { params: Promise<{ dienst: string }> }) {
  const service = getService((await params).dienst);
  if (!service) notFound();

  return (
    <>
      <Hero
        locale="en"
        headline={service.en.heroHeadline}
        sub={service.en.heroSub}
        image={service.heroImage}
        compact
      />
      <ServiceBadgeRow
        priceFrom={service.priceFrom}
        timeOnSite={service.en.timeOnSite}
        averageArrival={service.en.averageArrival}
        locale="en"
      />

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <h2 className="text-heading-3 text-frost mb-4">What we do</h2>
            <ul className="space-y-3">
              {service.en.whatWeDo.map((item) => (
                <li key={item} className="flex items-start gap-2 text-body text-frost">
                  <span className="text-signal-orange">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <StickyCtaSidebar priceFrom={service.priceFrom} locale="en" />
        </div>
      </section>

      {service.includesKeySection && <TransponderSmartKeySection locale="en" />}

      <Faq items={service.en.faq} title="Common questions" />
    </>
  );
}
