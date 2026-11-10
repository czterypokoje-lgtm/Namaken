import type { Metadata } from "next";
import { seo } from "@/lib/seo";
import Link from "next/link";
import { services } from "@/data/services";

export const metadata: Metadata = seo({
  path: "/en/diensten",
  altPath: "/diensten",
  locale: "en",
  title: "Services",
  description: "Car key duplication, lost key replacement, lockouts and ignition lock repair.",
});

export default function EnglishServicesIndexPage() {
  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-display-page text-frost mb-4">Services.</h1>
        <p className="text-lead text-mist mb-10 max-w-2xl">
          Four ways to be stuck without a car key, one number for all of them. Every price below is the
          starting price you hear confirmed on the phone.
        </p>
        <ul className="divide-y divide-line">
          {services.map((s) => (
            <li key={s.id}>
              <Link
                href={`/en/diensten/${s.id}`}
                className="flex items-center justify-between py-6 hover:bg-navy-surface transition-colors"
              >
                <div>
                  <p className="text-heading-3 text-frost">{s.en.name}</p>
                  <p className="text-body text-mist mt-1 max-w-xl">{s.en.heroSub}</p>
                </div>
                <p className="text-price text-signal-orange whitespace-nowrap ml-4">from €{s.priceFrom}</p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-14 border-t border-line pt-10">
          <h2 className="text-heading-3 text-frost mb-4">Everything happens where your car is</h2>
          <p className="text-body text-mist mb-4">
            What these four services have in common is that the technician comes to the car. That saves a tow
            truck and a dealer appointment, and it is why a job is usually finished the same day rather than
            weeks later. Keys are cut and paired with the car&rsquo;s computer on the spot, so you drive away
            with a working key.
          </p>
          <p className="text-body text-mist mb-4">
            The price is confirmed by phone before anyone sets off. If you say no at that point, it costs you
            nothing. And before the technician starts, we check the registration and a valid ID to confirm the
            car is yours — not a formality, but the thing that keeps this service safe.
          </p>

          <h2 className="text-heading-3 text-frost mt-10 mb-4">Which one do you need?</h2>
          <ul className="space-y-3">
            <li className="text-body text-mist">
              <strong className="text-frost">You still have a working key</strong> and want a spare:{" "}
              <Link href="/en/diensten/autosleutel-bijmaken" className="underline hover:text-frost">
                car key duplication
              </Link>
              .
            </li>
            <li className="text-body text-mist">
              <strong className="text-frost">Every key is gone</strong>:{" "}
              <Link href="/en/diensten/autosleutel-kwijt" className="underline hover:text-frost">
                lost car key
              </Link>
              . No original key is needed.
            </li>
            <li className="text-body text-mist">
              <strong className="text-frost">The key is locked inside the car</strong>:{" "}
              <Link href="/en/diensten/auto-openen-zonder-sleutel" className="underline hover:text-frost">
                opening a car without a key
              </Link>
              , without damage.
            </li>
            <li className="text-body text-mist">
              <strong className="text-frost">The key fits but no longer turns</strong> — usually the lock
              rather than the key:{" "}
              <Link href="/en/diensten/contactslot-vervangen" className="underline hover:text-frost">
                ignition lock replacement
              </Link>
              .
            </li>
          </ul>
          <p className="text-body-small text-mist mt-6">
            Not sure which one it is? Call and describe what happens — it saves you booking the wrong job. You
            can also check{" "}
            <Link href="/en/werkgebied" className="underline hover:text-frost">
              the areas we cover
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
