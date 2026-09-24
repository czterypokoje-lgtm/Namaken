import styles from './MarqueeBanner.module.css';

const citiesNl = [
  "AMSTERDAM CA. 35 MIN.", "UTRECHT CA. 35 MIN.", "HAARLEM CA. 35 MIN.",
  "DEN HAAG CA. 35 MIN.", "ROTTERDAM CA. 35 MIN.", "ZAANDAM CA. 35 MIN."
];

const citiesEn = [
  "AMSTERDAM APPROX. 35 MIN.", "UTRECHT APPROX. 35 MIN.", "HAARLEM APPROX. 35 MIN.",
  "THE HAGUE APPROX. 35 MIN.", "ROTTERDAM APPROX. 35 MIN.", "ZAANDAM APPROX. 35 MIN."
];

export default function MarqueeBanner({ locale = 'nl' }: { locale?: 'nl' | 'en' }) {
  const cities = locale === 'en' ? citiesEn : citiesNl;
  return (
    <div className={styles.marqueeWrapper}>
      <div className={styles.marqueeTrack}>
        {/* Repeat 4 times to ensure infinite scroll fills wide screens */}
        {[...Array(4)].map((_, i) => (
          <div key={i} className={styles.marqueeContent}>
            {cities.map((city, j) => (
              <span key={j} className={styles.marqueeItem}>
                {city}
                <svg className={styles.keyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2v2a2 2 0 01-2 2h-1v2h-1v2h-1a2 2 0 01-2-2v-1h-1a2 2 0 01-2-2V9a2 2 0 012-2h4z" />
                  <circle cx="9" cy="9" r="2" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
