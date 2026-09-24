import FadeIn from './FadeIn';
import styles from './TrustSection.module.css';

const STATS = [
  { number: '18.400', label: 'KLUSSEN SINDS 2018' },
  { number: '4.9', label: 'VAN 1.960 REVIEWS' },
  { number: '22', label: 'REGIO\'S IN NEDERLAND' },
  { number: '24/7', label: 'ELKE DAG VAN HET JAAR' },
];

const BADGES = [
  {
    title: 'GECERTIFICEERD',
    desc: 'Erkend slotenmaker. KVK- en licentienummer op verzoek, telefonisch of op uw factuur.',
  },
  {
    title: 'VOLLEDIG VERZEKERD',
    desc: 'Aansprakelijkheidsdekking bij elke klus. Certificaat per e-mail op verzoek.',
  },
  {
    title: 'GESCREEND PERSONEEL',
    desc: 'Elke technicus wordt jaarlijks gescreend, nog voordat ze een sleutel dragen.',
  },
  {
    title: 'ID VAN BEIDE KANTEN',
    desc: 'Wij controleren uw identiteit voordat we iets openen. U kunt de onze controleren.',
  },
  {
    title: 'DUIDELIJKE FACTUUR',
    desc: 'Onderdelen, arbeid en kosten op aparte regels, direct gemaild als we klaar zijn.',
  },
  {
    title: '12 MAANDEN GARANTIE',
    desc: 'Op arbeid en materiaal voor elke nieuwe installatie, sleutel en programmering.',
  },
];

export default function TrustSection() {
  return (
    <section className={styles.section} aria-label="Vertrouwen en Zekerheden">
      <div className={styles.inner}>
        
        <FadeIn>
          <div className={styles.titleArea}>
            <h2 className={styles.mainTitle}>
              GECERTIFICEERD. VOLLEDIG VERZEKERD. EN WE TONEN ALTIJD ID.
            </h2>
            <p className={styles.description}>
              Autosleutelnamaken gebruikt al sinds 2018 dezelfde 24/7 noodlijn vanuit dezelfde hoofdvestiging. KVK-nummer altijd op verzoek beschikbaar.
            </p>
          </div>
        </FadeIn>

        <div className={styles.statsWrapper}>
          {STATS.map((s, idx) => (
            <FadeIn key={idx} delay={idx * 0.15} className={styles.statBox}>
              <span className={styles.statNumber}>{s.number}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </FadeIn>
          ))}
        </div>

        <div className={styles.badgesGrid}>
          {BADGES.map((b, idx) => (
            <FadeIn key={idx} delay={idx * 0.1} className={styles.badgeCard}>
              <span className={styles.badgeTitle}>{b.title}</span>
              <p className={styles.badgeDesc}>{b.desc}</p>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
