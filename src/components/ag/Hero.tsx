'use client';

import Link from 'next/link';
import { SITE_CONFIG } from './agConfig';
import styles from './Hero.module.css';
import { motion, type Variants } from 'framer-motion';

interface HeroProps {
  city?: string;
  heroImage?: string;
}

export default function Hero({ city, heroImage }: HeroProps) {
  const displayCity = city ?? 'Nederland';

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50, damping: 15 } }
  };

  return (
    <section className={styles.hero}>
      <div className={styles.bg}>
        {heroImage && (
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className={styles.bgImage}
            style={{ backgroundImage: `url(${heroImage})` }}
            aria-hidden="true"
          />
        )}
        <div className={styles.bgOverlay} />
      </div>

      <motion.div 
        className={styles.content}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className={styles.badge} aria-label="Nooddienst actief">
          <span className={styles.liveDot} aria-hidden="true" />
          Nu bereikbaar · Mobiele technicus in {displayCity} onderweg
        </motion.div>

        <motion.div variants={item} className={styles.bottomGrid}>
          <h1 className={styles.heading}>
            Autosleutel kwijt?<br />
            Binnen 35 min. ter plekke.
          </h1>
          <div className={styles.descWrapper}>
            <div>
              <p className={styles.desc}>
                Sleutel bijmaken, verloren sleutel vervangen, buitengesloten of contactslot defect in {displayCity} en regio. Prijs hoort u altijd vooraf aan de telefoon.
              </p>
              <Link href="/leistungen" className={styles.ctaLink}>
                Bekijk onze diensten
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        className={styles.phoneContainer}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8, type: 'spring', bounce: 0.3 }}
      >
        <a href={SITE_CONFIG.phoneHref} className={styles.phoneNumber} aria-label={`Nu bellen: ${SITE_CONFIG.phone}`}>
          {SITE_CONFIG.phone}
        </a>
      </motion.div>
    </section>
  );
}
