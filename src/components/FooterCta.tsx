"use client";

import Image from "next/image";
import { business } from "@/lib/business";
import { images } from "@/lib/images";
import { trackConversion } from "@/lib/analytics";

export function FooterCta({ locale = "nl" }: { locale?: "nl" | "en" }) {
  const isEn = locale === "en";

  return (
    <section className="grid border-t border-line lg:grid-cols-2">
      <div className="relative min-h-[40vh]">
        <Image src={images.carSnow} alt="" fill sizes="50vw" className="object-cover" />
      </div>
      <div className="flex flex-col justify-center bg-night-navy px-4 py-16 sm:px-6">
        <p className="text-heading-2 text-frost">{isEn ? "Still stuck?" : "Nog steeds vast?"}</p>
        <a
          href={business.phoneHref}
          onClick={() => trackConversion("tel_click")}
          style={{ fontFamily: "var(--font-big-shoulders)" }}
          className="mt-4 block font-black uppercase leading-[0.9] tracking-tight text-signal-orange text-[13vw] sm:text-[8vw] lg:text-[4.5rem]"
        >
          {business.phone}
        </a>

        <div className="mt-10 grid grid-cols-2 gap-4 border-t border-line pt-6 text-body-small">
          <div>
            <p className="text-eyebrow text-mist">{isEn ? "Mobile service" : "Mobiele service"}</p>
            <p className="text-frost">{isEn ? "24/7, every day" : "24/7, elke dag"}</p>
          </div>
          <div>
            <p className="text-eyebrow text-mist">{isEn ? "Coverage" : "Dekking"}</p>
            <p className="text-frost">{isEn ? "22 regions, nationwide" : "22 regio's, heel Nederland"}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
