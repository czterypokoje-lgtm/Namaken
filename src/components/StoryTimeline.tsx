import Image from "next/image";
import { images } from "@/lib/images";

type Step = { time: string; title: string; body: string };

const stepsNl: Step[] = [
  { time: "2:07", title: "Iemand neemt op.", body: "Een technicus, geen callcenter. Ze vragen wat er is gebeurd, waar u bent en om wat voor sleutel het gaat." },
  { time: "2:09", title: "De prijs, voordat er iemand rijdt.", body: "Vanaf €89, plus €40 spoedtoeslag tussen 22:00 en 07:00. U hoort het aan de telefoon, en krijgt het per sms." },
  { time: "2:31", title: "Een herkenbare technicus, legitimatie eerst.", body: "De technicus checkt uw ID en kenteken, en gaat dan pas aan de slag met de sleutel." },
  { time: "2:48", title: "Betalen als het werkt.", body: "Pin, mobiel of contant, met een gespecificeerde factuur per e-mail. Verandert het totaal, dan hoort u waarom voordat we verdergaan." },
];

const stepsEn: Step[] = [
  { time: "2:07", title: "A person picks up.", body: "A technician, not a call center. They ask what happened, where you are and what kind of key it is." },
  { time: "2:09", title: "The price, before anyone drives.", body: "From €89, plus a €40 after-hours fee between 10 PM and 7 AM. You hear it on the phone and get it by text." },
  { time: "2:31", title: "A recognizable technician, ID first.", body: "The technician checks your ID and plate, then gets to work on the key." },
  { time: "2:48", title: "Pay when it works.", body: "Card, mobile or cash, with an itemized invoice by email. If the total changes, you hear why before we continue." },
];

export function StoryTimeline({ locale = "nl" }: { locale?: "nl" | "en" }) {
  const steps = locale === "en" ? stepsEn : stepsNl;

  return (
    <section className="border-t border-line px-4 py-16 sm:px-6">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
        <div className="hidden lg:block">
          <div className="sticky top-20 h-[70vh] overflow-hidden rounded-sm">
            <Image src={images.carHeadlightsAutumn} alt="" fill sizes="500px" className="object-cover" />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {steps.map((step) => (
            <div key={step.time} className="rounded-sm border border-line bg-navy-surface p-6">
              <p className="text-call-number text-signal-orange">{step.time}</p>
              <p className="text-heading-4 text-frost mt-2">{step.title}</p>
              <p className="text-body-small text-mist mt-2">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
