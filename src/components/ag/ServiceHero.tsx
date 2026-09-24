"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { business } from "@/lib/business";
import { trackConversion } from "@/lib/analytics";
import styles from "./ServiceHero.module.css";

interface ServiceHeroProps {
  headline: string;
  sub: string;
  image: string;
  priceFrom?: number;
  timeOnSite?: string;
  averageArrival?: string;
  isEn?: boolean;
}

export function ServiceHero({
  headline,
  sub,
  image,
  priceFrom,
  timeOnSite,
  averageArrival,
  isEn = false,
}: ServiceHeroProps) {
  return (
    <section className={styles.hero}>
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className={styles.bgImage}
      >
        <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <div className={styles.bgOverlay} />

      <div className={styles.content}>
        <div className={styles.bottomGrid}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
            className={styles.heading}
          >
            {headline}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring", bounce: 0.2 }}
            className={styles.descWrapper}
          >
            <p className={styles.desc}>{sub}</p>
            <div className={styles.buttonGroup}>
              <a
                href={business.phoneHref}
                onClick={() => trackConversion("tel_click")}
                className={styles.primaryButton}
              >
                {isEn ? `Call ${business.phone}` : `Bel ${business.phone}`}
              </a>
              <Link href={isEn ? '/en/contact' : '/contact'} className={styles.secondaryButton}>
                {isEn ? "Book this service" : "Boek deze dienst"}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {(priceFrom !== undefined) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={styles.statsRow}
        >
          <div className={styles.statItem}>
            <span className={styles.statLabel}>{isEn ? "PRICE FROM" : "PRIJS VANAF"}</span>
            <span className={styles.statValueOrange}>€{priceFrom}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>{isEn ? "TIME ON SITE" : "TIJD TER PLEKKE"}</span>
            <span className={styles.statValue}>{timeOnSite}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>{isEn ? "AVERAGE ARRIVAL" : "GEM. AANKOMST"}</span>
            <span className={styles.statValue}>{averageArrival}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>{isEn ? "EVERY JOB" : "ELKE KLUS"}</span>
            <span className={styles.statValue}>
              {isEn ? "LICENSED, BONDED, INSURED" : "GECERTIFICEERD & VERZEKERD"}
            </span>
          </div>
        </motion.div>
      )}
    </section>
  );
}
