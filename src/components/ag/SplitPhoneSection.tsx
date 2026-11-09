import Image from 'next/image';
import { SITE_CONFIG } from './agConfig';
import FadeIn from './FadeIn';
import styles from './SplitPhoneSection.module.css';
import { images } from '@/lib/images';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';

export default function SplitPhoneSection({ locale = 'nl' }: { locale?: 'nl' | 'en' }) {
  const isEn = locale === 'en';
  // Stack the number over up to three lines for the oversized display,
  // whatever shape the number is: "085 109 1359" becomes three lines, a
  // five-group mobile number becomes 2+2+1. Derived rather than hardcoded so
  // changing business.phone can never leave a blank line here.
  const phoneParts = SITE_CONFIG.phone.split(' ').filter(Boolean);
  const lineCount = Math.min(3, phoneParts.length);
  const perLine = Math.ceil(phoneParts.length / lineCount);
  const phoneFormattedLines = Array.from({ length: lineCount }, (_, i) =>
    phoneParts.slice(i * perLine, (i + 1) * perLine).join(' ')
  ).filter(Boolean);

  return (
    <section className={styles.section}>
      <div className={styles.imageCol}>
        <Image
          src={images.nightCityStreet}
          alt={isEn ? 'Mobile service van at night' : "Mobiele servicewagen 's nachts"}
          fill
          className={styles.image}
        />
      </div>
      <div className={styles.textCol}>
        <div className={styles.textInner}>
          <FadeIn>
            <h2 className={styles.title}>{isEn ? 'STILL LOCKED OUT?' : 'NOG STEEDS BUITEN?'}</h2>

            <TrackedPhoneLink location="split_band_phone" className={styles.massivePhone}>
              {phoneFormattedLines.map((line, idx) => (
                <span key={idx} className={styles.phoneLine}>{line}</span>
              ))}
            </TrackedPhoneLink>
          </FadeIn>

          <div className={styles.bottomMeta}>
            <div className={styles.metaBlock}>
              <span className={styles.metaLabel}>{isEn ? 'MOBILE SERVICE' : 'MOBIELE SERVICE'}</span>
              <span className={styles.metaValue}>{isEn ? '24/7, every day' : '24/7, elke dag'}</span>
            </div>
            <div className={styles.metaBlock}>
              <span className={styles.metaLabel}>{isEn ? 'WORKSHOP' : 'WERKPLAATS'}</span>
              <span className={styles.metaValue}>{isEn ? 'Mon-Sat, 08:00 to 18:00' : 'Ma t/m Za, 08:00 tot 18:00'}</span>
            </div>
            <div className={styles.metaBlock}>
              <span className={styles.metaLabel}>{isEn ? 'HEAD OFFICE' : 'HOOFDVESTIGING'}</span>
              <span className={styles.metaValue}>
                {SITE_CONFIG.address.street}, {SITE_CONFIG.address.city}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
