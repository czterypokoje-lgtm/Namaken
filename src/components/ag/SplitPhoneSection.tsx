import Image from 'next/image';
import { SITE_CONFIG } from './agConfig';
import FadeIn from './FadeIn';
import styles from './SplitPhoneSection.module.css';
import { images } from '@/lib/images';

export default function SplitPhoneSection() {
  const phoneParts = SITE_CONFIG.phone.split(' '); // e.g. "06", "11", "75", "12", "31"
  // Group them for a 3-line layout if we want, or just let them wrap
  const phoneFormattedLines = [
    phoneParts.slice(0, 2).join(' '),
    phoneParts.slice(2, 4).join(' '),
    phoneParts.slice(4).join(' ')
  ];

  return (
    <section className={styles.section}>
      <div className={styles.imageCol}>
        <Image
          src={images.nightCityStreet}
          alt="Mobiele servicewagen 's nachts"
          fill
          className={styles.image}
        />
      </div>
      <div className={styles.textCol}>
        <div className={styles.textInner}>
          <FadeIn>
            <h2 className={styles.title}>NOG STEEDS BUITEN?</h2>
            
            <a href={SITE_CONFIG.phoneHref} className={styles.massivePhone}>
              {phoneFormattedLines.map((line, idx) => (
                <span key={idx} className={styles.phoneLine}>{line}</span>
              ))}
            </a>
          </FadeIn>

          <div className={styles.bottomMeta}>
            <div className={styles.metaBlock}>
              <span className={styles.metaLabel}>MOBIELE SERVICE</span>
              <span className={styles.metaValue}>24/7, elke dag</span>
            </div>
            <div className={styles.metaBlock}>
              <span className={styles.metaLabel}>WERKPLAATS</span>
              <span className={styles.metaValue}>Ma t/m Za, 08:00 tot 18:00</span>
            </div>
            <div className={styles.metaBlock}>
              <span className={styles.metaLabel}>HOOFDVESTIGING</span>
              <span className={styles.metaValue}>{SITE_CONFIG.address.street}, {SITE_CONFIG.address.city}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
