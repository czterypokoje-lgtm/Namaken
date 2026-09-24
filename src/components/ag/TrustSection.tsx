import FadeIn from './FadeIn';
import styles from './TrustSection.module.css';
import { business } from '@/lib/business';

const STATS_NL = [
  { number: '18.400', label: 'KLUSSEN SINDS 2018' },
  { number: '4.9', label: 'VAN 1.960 REVIEWS' },
  { number: '22', label: 'REGIO\'S IN NEDERLAND' },
  { number: '24/7', label: 'ELKE DAG VAN HET JAAR' },
];

const STATS_EN = [
  { number: '18,400', label: 'JOBS SINCE 2018' },
  { number: '4.9', label: 'FROM 1,960 REVIEWS' },
  { number: '22', label: 'REGIONS IN THE NETHERLANDS' },
  { number: '24/7', label: 'EVERY DAY OF THE YEAR' },
];

const BADGES_NL = [
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

const BADGES_EN = [
  {
    title: 'CERTIFIED',
    desc: 'Licensed locksmith network. KVK and license number available on request, by phone or on your invoice.',
  },
  {
    title: 'FULLY INSURED',
    desc: 'Liability coverage on every job. Certificate by email on request.',
  },
  {
    title: 'SCREENED STAFF',
    desc: 'Every technician is screened annually, before they ever carry a key.',
  },
  {
    title: 'ID BOTH WAYS',
    desc: "We check your identity before we open anything. You're welcome to check ours.",
  },
  {
    title: 'CLEAR INVOICE',
    desc: 'Parts, labor and costs on separate lines, emailed as soon as we finish.',
  },
  {
    title: '12-MONTH WARRANTY',
    desc: 'On labor and materials for every new installation, key and programming job.',
  },
];

export default function TrustSection({ locale = 'nl' }: { locale?: 'nl' | 'en' }) {
  const isEn = locale === 'en';
  const STATS = isEn ? STATS_EN : STATS_NL;
  const BADGES = isEn ? BADGES_EN : BADGES_NL;
  return (
    <section className={styles.section} aria-label={isEn ? 'Trust and credentials' : 'Vertrouwen en Zekerheden'}>
      <div className={styles.inner}>

        <FadeIn>
          <div className={styles.titleArea}>
            <h2 className={styles.mainTitle}>
              {isEn ? 'CERTIFIED. FULLY INSURED. AND WE ALWAYS SHOW ID.' : 'GECERTIFICEERD. VOLLEDIG VERZEKERD. EN WE TONEN ALTIJD ID.'}
            </h2>
            <p className={styles.description}>
              {isEn
                ? `${business.name} has run the same 24/7 emergency line from the same head office since 2018. KVK number always available on request.`
                : `${business.name} gebruikt al sinds 2018 dezelfde 24/7 noodlijn vanuit dezelfde hoofdvestiging. KVK-nummer altijd op verzoek beschikbaar.`}
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
