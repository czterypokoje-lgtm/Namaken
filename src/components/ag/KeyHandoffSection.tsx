import Image from 'next/image';
import { images } from '@/lib/images';
import { business } from '@/lib/business';
import FadeIn from './FadeIn';

export default function KeyHandoffSection({ locale = 'nl' }: { locale?: 'nl' | 'en' }) {
  const isEn = locale === 'en';
  return (
    <section className="border-t border-line bg-navy-surface px-4 py-16 sm:px-6 lg:py-24">
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-center">
        <FadeIn>
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <Image
              src={images.keyHandoff}
              alt={isEn ? 'Technician handing over a new key' : 'Technicus overhandigt een nieuwe sleutel'}
              fill
              sizes="500px"
              className="object-cover"
            />
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-eyebrow text-signal-orange mb-2">
            {isEn ? 'Every key, handed over in person' : 'Elke sleutel persoonlijk overhandigd'}
          </p>
          <h2 className="text-heading-1 text-frost mb-4">
            {isEn ? 'From phone call to key in hand.' : 'Van telefoontje tot sleutel in uw hand.'}
          </h2>
          <p className="text-body text-mist mb-8">
            {isEn
              ? 'Our technician confirms the price by phone first, then only hands over the new key once you’ve checked it starts the car.'
              : 'Onze technicus bevestigt de prijs eerst telefonisch, en overhandigt de nieuwe sleutel pas nadat u heeft gecontroleerd dat de auto ermee start.'}
          </p>
          <div className="flex gap-10">
            <div>
              <span
                style={{ fontFamily: 'var(--font-big-shoulders)' }}
                className="block text-3xl font-black text-signal-orange"
              >
                {business.jobsSince}
              </span>
              <span className="text-mono text-mist">
                {isEn ? 'keys handed over since ' + business.foundedYear : 'sleutels overhandigd sinds ' + business.foundedYear}
              </span>
            </div>
            <div>
              <span
                style={{ fontFamily: 'var(--font-big-shoulders)' }}
                className="block text-3xl font-black text-signal-orange"
              >
                {business.rating}
              </span>
              <span className="text-mono text-mist">{isEn ? 'average rating' : 'gemiddelde beoordeling'}</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
