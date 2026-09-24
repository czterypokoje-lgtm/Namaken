"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CallButton, WhatsAppButton } from "@/components/CallWhatsAppButtons";
import { business } from "@/lib/business";
import { images } from "@/lib/images";
import { trackConversion } from "@/lib/analytics";

export function Hero({
  eyebrow,
  headline,
  sub,
  showButtons = true,
  locale = "nl",
  image = images.heroCarNight,
  compact = false,
}: {
  eyebrow?: string;
  headline: string;
  sub: string;
  showButtons?: boolean;
  locale?: "nl" | "en";
  image?: string;
  compact?: boolean;
}) {
  return (
    <section className={`relative overflow-hidden border-b border-line ${compact ? "min-h-[50vh]" : "min-h-[85vh]"} flex flex-col justify-end`}>
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-night-navy via-night-navy/70 to-night-navy/30" />

      <div className="relative px-4 pt-10 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2"
        >
          <span className="h-2 w-2 rounded-full bg-signal-orange animate-pulse" />
          <p className="text-mono text-frost">
            {eyebrow ?? (locale === "en" ? "24/7 available" : "24/7 bereikbaar")}
          </p>
        </motion.div>
      </div>

      <div className="relative grid gap-6 px-4 pb-8 pt-16 sm:px-6 lg:grid-cols-[1fr_320px] lg:items-end lg:gap-12">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-hero-line text-frost"
        >
          {headline}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-body text-mist"
        >
          {sub}
        </motion.p>
      </div>

      {showButtons && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="relative border-t border-line/50 bg-night-navy/80 px-4 py-6 sm:px-6"
        >
          <a
            href={business.phoneHref}
            onClick={() => trackConversion("tel_click")}
            style={{ fontFamily: "var(--font-big-shoulders)" }}
            className="block font-black uppercase leading-[0.85] tracking-tight text-signal-orange text-[13vw] sm:text-[10vw] lg:text-[6.5rem]"
          >
            {business.phone}
          </a>
          <div className="mt-4 flex flex-wrap gap-4">
            <CallButton locale={locale} />
            <WhatsAppButton locale={locale} />
          </div>
        </motion.div>
      )}
    </section>
  );
}
