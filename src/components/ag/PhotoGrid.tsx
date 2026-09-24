import styles from './PhotoGrid.module.css';
import { images } from '@/lib/images';

const PHOTOS = [
  {
    image: images.carHeadlightsAutumn,
    caption: 'Schadevrij openen zonder sleutel',
  },
  {
    image: images.keyCutting,
    caption: 'Autosleutel bijmaken & programmeren ter plekke',
  },
  {
    image: images.houseKeychain,
    caption: 'Originele kwaliteit transpondersleutels voor elk merk',
  },
  {
    image: images.carRainCity,
    caption: 'Contactslot vervanging en reparatie op locatie',
  },
];

export default function PhotoGrid() {
  return (
    <section className={styles.gridSection}>
      <div className={styles.grid}>
        {PHOTOS.map((photo, i) => (
          <div
            key={i}
            className={styles.item}
            style={{ backgroundImage: `url(${photo.image})` }}
          >
            <div className={styles.overlay} />
            <div className={styles.caption}>{photo.caption}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
