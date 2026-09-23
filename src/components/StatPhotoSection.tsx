import Image from "next/image";
import { images } from "@/lib/images";

export function StatPhotoSection({ locale = "nl" }: { locale?: "nl" | "en" }) {
  const isEn = locale === "en";

  return (
    <section className="relative overflow-hidden border-y border-line bg-signal-orange px-4 py-16 sm:px-6">
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[300px_1fr]">
        <div>
          <div className="relative aspect-[4/5] w-full max-w-xs overflow-hidden rounded-sm grayscale">
            <Image src={images.keyCutting} alt="" fill sizes="300px" className="object-cover" />
          </div>
          <p className="text-mono text-on-orange mt-2">
            {isEn ? "Technician, Rotterdam depot" : "Technicus, depot Rotterdam"}
          </p>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <p className="text-eyebrow text-on-orange mb-2">
              {isEn ? "Measured from your call to our knock" : "Gemeten van uw telefoontje tot de klop op de deur"}
            </p>
            <h2 className="text-hero-line text-on-orange">
              {isEn ? "From the call to the knock on your door." : "Van de telefoon tot de klop op uw deur."}
            </h2>
            <p className="text-body text-navy-band mt-4 max-w-md">
              {isEn
                ? "Technicians are spread nationwide, so the closest one always takes your call. You get a real ETA by text before anyone drives."
                : "Onze technici zitten verspreid door het hele land, zodat de dichtstbijzijnde altijd uw oproep aanneemt. U krijgt een echte ETA per sms voordat er iemand vertrekt."}
            </p>
          </div>

          <p style={{ fontFamily: "var(--font-big-shoulders)" }} className="mt-10 font-black uppercase leading-[0.85] text-navy-band text-[22vw] sm:text-[14vw] lg:text-[9rem]">
            35 min
          </p>
        </div>
      </div>
    </section>
  );
}
