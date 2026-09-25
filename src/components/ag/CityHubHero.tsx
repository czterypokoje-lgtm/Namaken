"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { business } from "@/lib/business";
import { images } from "@/lib/images";
import styles from "./CityHubHero.module.css";

interface CityHubHeroProps {
  fastestName: string;
  fastestMin: number;
  slowestName: string;
  slowestMin: number;
  avgMin: number;
  regionCount: number;
  isEn?: boolean;
}

export function CityHubHero({
  fastestName,
  fastestMin,
  slowestName,
  slowestMin,
  avgMin,
  regionCount,
  isEn = false,
}: CityHubHeroProps) {
  return (
    <section className={styles.hero}>
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className={styles.bgImage}
      >
        <Image src={images.nightCityStreet} alt="" fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <div className={styles.bgOverlay} />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={styles.topBar}
      >
        <p className={styles.topMono}>
          {isEn ? "SERVICE AREA IN THE NETHERLANDS" : "WERKGEBIED DOOR HEEL NEDERLAND"}
        </p>
        <p className={`${styles.topMono} hidden sm:block text-right`}>
          {isEn ? `VANS PARKED IN ${fastestName.toUpperCase()} AND MORE` : `TECHNICI GESTATIONEERD IN ${fastestName.toUpperCase()} EN MEER`}
        </p>
      </motion.div>

      <div className={styles.content}>
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
          }}
          className={styles.bottomGrid}
        >
          <motion.h1 
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0, transition: { type: "spring", damping: 20, stiffness: 100 } },
            }}
            className={styles.heading}
          >
            {regionCount} {isEn ? "AREAS." : "REGIO'S."}
            <br />
            {fastestMin} {isEn ? "TO" : "TOT"} {slowestMin} {isEn ? "MINUTES." : "MINUTEN."}
          </motion.h1>

          <div className={styles.descWrapper}>
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0, transition: { type: "spring", damping: 20, stiffness: 100 } },
              }}
              className={styles.descInner}
            >
              <p className={styles.desc}>
                {isEn
                  ? "Technicians start their shifts spread across the country, so the closest van takes your call. Times below are average arrival over the last 30 days of calls."
                  : "Technici zitten verspreid door het hele land, zodat de dichtstbijzijnde altijd uw oproep aanneemt. De tijden hieronder zijn het gemiddelde over de afgelopen 30 dagen."}
              </p>
              <a href="/contact" className={styles.ctaLink}>
                {isEn ? "Call and ask about your street" : "Bel en vraag naar uw straat"}
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, type: "spring", bounce: 0.2 }}
        className={styles.statsRow}
      >
        <p>{isEn ? "FASTEST:" : "SNELSTE:"} {fastestName.toUpperCase()}, {fastestMin} MIN</p>
        <p>{isEn ? "ALL CALLS:" : "ALLE OPROEPEN:"} {isEn ? "AVG" : "GEM."} {avgMin} MIN</p>
        <p>{isEn ? "FARTHEST:" : "VERST:"} {slowestName.toUpperCase()}, {slowestMin} MIN</p>
        <p>{isEn ? "SCHEDULED WORK: FURTHER OUT" : "GEPLAND WERK: OOK VERDER WEG"}</p>
      </motion.div>
    </section>
  );
}
