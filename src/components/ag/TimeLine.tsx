'use client';

import styles from './TimeLine.module.css';
import { motion } from 'framer-motion';

const STEPS_NL = [
  {
    time: '2:07',
    counter: 'Stap 01 van 04',
    heading: 'Iemand neemt direct op.',
    text: 'Geen extern callcenter, geen keuzemenu\'s. U spreekt direct met een technicus die exact weet welke apparatuur en sleutelblanks nodig zijn voor uw automerk.',
  },
  {
    time: '2:09',
    counter: 'Stap 02 van 04',
    heading: 'Vaste prijs voordat we rijden.',
    text: 'Sleutel bijmaken vanaf €150, auto openen vanaf €150. Het exacte bedrag hoort u vooraf aan de telefoon. Er vertrekt niemand zonder uw uitdrukkelijke akkoord.',
  },
  {
    time: '2:31',
    counter: 'Stap 03 van 04',
    heading: 'Mobiele werkplaats ter plekke.',
    text: 'Onze technicus arriveert in een herkenbare servicewagen, toont legitimatie en checkt het kentekenbewijs. Vervolgens snijden en programmeren we de sleutel op locatie.',
  },
  {
    time: '2:48',
    counter: 'Stap 04 van 04',
    heading: 'Betaling pas als alles werkt.',
    text: 'Pinnen of contant — met gespecificeerde btw-factuur. We rekenen pas af als de auto start, de centrale vergrendeling soepel werkt en u 100% tevreden bent.',
  },
];

const STEPS_EN = [
  {
    time: '2:07',
    counter: 'Step 01 of 04',
    heading: 'A person picks up right away.',
    text: "No external call center, no phone menus. You speak directly with a technician who knows exactly which equipment and key blanks your make needs.",
  },
  {
    time: '2:09',
    counter: 'Step 02 of 04',
    heading: 'A fixed price before we drive.',
    text: 'Key duplication from €150, car unlock from €150. You hear the exact amount on the phone beforehand. Nobody leaves without your explicit go-ahead.',
  },
  {
    time: '2:31',
    counter: 'Step 03 of 04',
    heading: 'A mobile workshop on location.',
    text: 'Our technician arrives in a recognizable service van, shows ID and checks the registration. Then we cut and program the key on-site.',
  },
  {
    time: '2:48',
    counter: 'Step 04 of 04',
    heading: 'You pay once it works.',
    text: "Card or cash, with an itemized invoice. We only charge once the car starts, central locking works smoothly, and you're 100% satisfied.",
  },
];

export default function TimeLine({ locale = 'nl' }: { locale?: 'nl' | 'en' }) {
  const isEn = locale === 'en';
  const STEPS = isEn ? STEPS_EN : STEPS_NL;
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.sectionEyebrow}>{isEn ? 'How it works' : 'Hoe het werkt'}</p>
            <motion.h2
              className={styles.sectionTitle}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {isEn ? <>From your call<br />to a starting engine.</> : <>Van uw oproep<br />tot een startende auto.</>}
            </motion.h2>
          </div>
        </div>

        <ol className={styles.steps}>
          {STEPS.map((step, idx) => (
            <motion.li 
              key={step.time} 
              className={styles.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <div className={styles.stepTime}>
                <span className={styles.stepClock}>{step.time}</span>
                <span className={styles.stepCounter}>{step.counter}</span>
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepHeading}>{step.heading}</h3>
                <p className={styles.stepText}>{step.text}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
