import Image from 'next/image';
import { images } from '@/lib/images';
import FadeIn from './FadeIn';

const TYPES_NL = [
  {
    image: images.blackKeyFobCloseup,
    title: 'Transpondersleutel',
    desc: 'Een sleutel met een ingebouwde chip die communiceert met de startonderbreker van de auto. Meestal vanaf €150 bij te maken.',
  },
  {
    image: images.startStopEngineButton,
    title: 'Smart key / keyless start',
    desc: 'Sleutel met startknop-functie — de auto start zodra de sleutel in de buurt is, zonder hem uit uw zak te halen.',
  },
  {
    image: images.handHoldingKeyFob,
    title: 'Afstandsbediening',
    desc: 'Los bedieningsblokje voor centrale vergrendeling op afstand, vaak samen met de sleutel geprogrammeerd.',
  },
  {
    image: images.personHoldingCarKey,
    title: 'Klapsleutel',
    desc: 'Sleutel met inklapbaar baard en geïntegreerde afstandsbediening in één behuizing.',
  },
] as const;

const TYPES_EN = [
  {
    image: images.blackKeyFobCloseup,
    title: 'Transponder key',
    desc: "A key with a built-in chip that talks to the car's immobilizer. Usually duplicated from €150.",
  },
  {
    image: images.startStopEngineButton,
    title: 'Smart key / keyless start',
    desc: 'A key with a start-button function — the car starts as soon as the key is nearby, no need to take it out.',
  },
  {
    image: images.handHoldingKeyFob,
    title: 'Remote control',
    desc: 'A separate fob for remote central locking, usually programmed together with the key.',
  },
  {
    image: images.personHoldingCarKey,
    title: 'Flip key',
    desc: 'A key with a folding blade and an integrated remote in a single housing.',
  },
] as const;

export default function KeyTypesSection({ locale = 'nl' }: { locale?: 'nl' | 'en' }) {
  const isEn = locale === 'en';
  const TYPES = isEn ? TYPES_EN : TYPES_NL;
  return (
    <section className="border-t border-line px-4 py-16 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-5xl">
        <FadeIn className="mb-10">
          <p className="text-eyebrow text-mist">{isEn ? 'Know your key' : 'Welk type sleutel heeft u'}</p>
          <h2 className="text-heading-1 text-frost mt-2">
            {isEn ? 'The 4 most common car key types' : 'De 4 meest voorkomende autosleutels'}
          </h2>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2">
          {TYPES.map((type, idx) => (
            <FadeIn key={type.title} delay={idx * 0.1} className="border border-line bg-navy-surface p-6">
              <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-sm">
                <Image src={type.image} alt={type.title} fill sizes="400px" className="object-cover" />
              </div>
              <h3 className="text-heading-4 text-frost mb-2">{type.title}</h3>
              <p className="text-body-small text-mist">{type.desc}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
