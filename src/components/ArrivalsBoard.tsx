"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { regions } from "@/data/regions";
import styles from "./ArrivalsBoard.module.css";

const THRESHOLD_MIN = 45;

export function ArrivalsBoard({ locale = "nl" }: { locale?: "nl" | "en" }) {
  const isEn = locale === "en";
  const base = isEn ? "/en/werkgebied" : "/werkgebied";
  const avg = Math.round(regions.reduce((sum, r) => sum + r.avgArrivalMin, 0) / regions.length);
  const sorted = [...regions].sort((a, b) => a.avgArrivalMin - b.avgArrivalMin);

  return (
    <section className={styles.board}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.headerTitle}>
            {isEn ? "Arrivals." : "Aankomsten."}
          </h2>
          <span className={styles.headerSub}>({regions.length})</span>
        </div>
        <p className={styles.intro}>
          {isEn
            ? `Sorted by average arrival time. Each bar runs against our ${THRESHOLD_MIN}-minute limit; orange means under the ${avg}-minute nationwide average.`
            : `Gesorteerd op gemiddelde aankomsttijd. Elke balk loopt tegen onze limiet van ${THRESHOLD_MIN} minuten; oranje betekent sneller dan het landelijk gemiddelde van ${avg} minuten.`}
        </p>

        <div className={styles.tableHeader}>
          <span>{isEn ? "MIN" : "MIN"}</span>
          <span>{isEn ? "AREA AND ZIP CODES" : "REGIO EN POSTCODES"}</span>
          <span>{isEn ? `AGAINST ${THRESHOLD_MIN} MIN` : `TEGEN ${THRESHOLD_MIN} MIN`}</span>
          <span className={styles.tableHeaderRight}>{isEn ? "STATUS" : "STATUS"}</span>
        </div>

        <ul className={styles.list}>
          {sorted.map((r, i) => {
            const faster = r.avgArrivalMin < avg;
            const width = Math.min(100, (r.avgArrivalMin / THRESHOLD_MIN) * 100);
            return (
              <motion.li
                key={r.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={styles.listItem}
              >
                <Link href={`${base}/${r.slug}`} className={styles.row}>
                  <div className={styles.minCell}>
                    <span className={styles.minNumber}>{r.avgArrivalMin}</span>
                    <span className={styles.minLabel}>MIN</span>
                  </div>
                  <div className={styles.areaCell}>
                    <h3 className={styles.areaName}>{isEn && r.enName ? r.enName : r.name}</h3>
                    <p className={styles.areaSub}>{r.areas.slice(0, 3).join(", ")}</p>
                  </div>
                  <div className={styles.barCell}>
                    <div
                      className={faster ? styles.barFill : styles.barFillGray}
                      style={{ width: `${width}%` }}
                    />
                  </div>
                  <div className={`${styles.statusCell} ${faster ? styles.statusFast : styles.statusSlow}`}>
                    {faster
                      ? isEn
                        ? `UNDER ${avg} MIN`
                        : `ONDER ${avg} MIN`
                      : isEn
                        ? `${avg} TO ${THRESHOLD_MIN} MIN`
                        : `${avg} TOT ${THRESHOLD_MIN} MIN`}
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </ul>

        <p className={styles.footerText}>
          {isEn
            ? "Outside this list? Call and ask \u2014 we handle scheduled work and business accounts beyond these areas too."
            : "Niet in dit lijstje? Bel en vraag \u2014 voor afspraken en zakelijke accounts rijden we ook buiten deze regio's."}
        </p>
      </div>
    </section>
  );
}
