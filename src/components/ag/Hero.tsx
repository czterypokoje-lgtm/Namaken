'use client';

import Link from 'next/link';
import { SITE_CONFIG } from './agConfig';
import styles from './Hero.module.css';
import { motion, type Variants } from 'framer-motion';

interface HeroProps {
  city?: string;
  heroImage?: string;
  locale?: 'nl' | 'en';
}

export default function Hero({ city, heroImage, locale = 'nl' }: HeroProps) {
  const isEn = locale === 'en';
  const displayCity = city ?? (isEn ? 'the Netherlands' : 'Nederland');

  const badgeVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.4 } }
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

      <div className={styles.content}>
        <motion.div
          variants={badgeVariants}
          initial="hidden"
          animate="show"
          className={styles.badge}
          aria-label={isEn ? 'Emergency service active' : 'Nooddienst actief'}
        >
          <span className={styles.liveDot} aria-hidden="true" />
          {isEn
            ? `Available now · Mobile technician heading to ${displayCity}`
            : `Nu bereikbaar · Mobiele technicus in ${displayCity} onderweg`}
        </motion.div>

        <div className={styles.bottomGrid}>
          <h1 className={styles.heading}>
            {isEn ? (
              <>Lost your car key?<br />We&apos;re there in 35 min.</>
            ) : (
              <>Autosleutel kwijt?<br />Binnen 35 min. ter plekke.</>
            )}
          </h1>
          <div className={styles.descWrapper}>
            <div>
              <p className={styles.desc}>
                {isEn
                  ? `Key duplication, lost key replacement, lockouts or a broken ignition lock in ${displayCity} and the surrounding area. You always hear the price on the phone first.`
                  : `Sleutel bijmaken, verloren sleutel vervangen, buitengesloten of contactslot defect in ${displayCity} en regio. Prijs hoort u altijd vooraf aan de telefoon.`}
              </p>
              <Link href={isEn ? '/en/diensten' : '/diensten'} className={styles.ctaLink}>
                {isEn ? 'View our services' : 'Bekijk onze diensten'}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        className={styles.phoneContainer}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8, type: 'spring', bounce: 0.3 }}
      >
        <a href={SITE_CONFIG.phoneHref} className={styles.phoneNumber} aria-label={`${isEn ? 'Call now' : 'Nu bellen'}: ${SITE_CONFIG.phone}`}>
          {SITE_CONFIG.phone}
        </a>
      </motion.div>
    </section>
  );
}
