import Link from 'next/link';
import styles from './PhotoGrid.module.css';
import { images } from '@/lib/images';

const PHOTOS_NL = [
  {
    image: images.lockoutAirWedgeTool,
    caption: 'Schadevrij openen zonder sleutel',
    href: '/diensten/auto-openen-zonder-sleutel',
  },
  {
    image: images.keyCutting,
    caption: 'Autosleutel bijmaken & programmeren ter plekke',
    href: '/diensten/autosleutel-bijmaken',
  },
  {
    image: images.blackKeyFobCloseup,
    caption: 'Originele kwaliteit transpondersleutels voor elk merk',
    href: '/diensten/autosleutel-bijmaken',
  },
  {
    image: images.ignitionBarrelCloseup,
    caption: 'Contactslot vervanging en reparatie op locatie',
    href: '/diensten/contactslot-vervangen',
  },
];

const PHOTOS_EN = [
  {
    image: images.lockoutAirWedgeTool,
    caption: 'Damage-free entry without a key',
    href: '/en/diensten/auto-openen-zonder-sleutel',
  },
  {
    image: images.keyCutting,
    caption: 'Car key duplication & programming on location',
    href: '/en/diensten/autosleutel-bijmaken',
  },
  {
    image: images.blackKeyFobCloseup,
    caption: 'Original-quality transponder keys for every make',
    href: '/en/diensten/autosleutel-bijmaken',
  },
  {
    image: images.ignitionBarrelCloseup,
    caption: 'Ignition lock replacement and repair on location',
    href: '/en/diensten/contactslot-vervangen',
  },
];

export default function PhotoGrid({ locale = 'nl' }: { locale?: 'nl' | 'en' }) {
  const PHOTOS = locale === 'en' ? PHOTOS_EN : PHOTOS_NL;
  return (
    <section className={styles.gridSection}>
      <div className={styles.grid}>
        {PHOTOS.map((photo, i) => (
          <Link
            key={i}
            href={photo.href}
            className={styles.item}
            style={{ backgroundImage: `url(${photo.image})` }}
          >
            <div className={styles.overlay} />
            <div className={styles.caption}>{photo.caption}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
