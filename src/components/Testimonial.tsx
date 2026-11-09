import Image from "next/image";
import { images } from "@/lib/images";

/**
 * A customer review.
 *
 * `rating` and `reviewCount` have no defaults on purpose. This component used
 * to default to "4.9" out of "312 reviews" and was rendered on all 22 region
 * pages with a quote generated from the region name and attributed to
 * "Klant uit <city>". Fabricated reviews breach EU consumer law (the Omnibus
 * Directive, enforced in the Netherlands by the ACM) as well as Google's own
 * policies, so every value here must come from a real, attributable review.
 */

export function Testimonial({
  quote,
  author,
  rating,
  reviewCount,
  locale = "nl",
}: {
  /** A real quote from a real customer. Never a generated sentence. */
  quote: string;
  /** The customer, as they agreed to be credited. */
  author: string;
  rating: string;
  /** Number of reviews the rating is based on. Required: a rating shown
   *  without a verifiable count is an unsubstantiated claim. */
  reviewCount: string;
  locale?: "nl" | "en";
}) {
  const isEn = locale === "en";

  return (
    <div className="relative min-h-[60vh] overflow-hidden rounded-sm">
      <Image src={images.keyCutting} alt="" fill sizes="800px" className="object-cover grayscale" />
      <div className="absolute inset-0 bg-gradient-to-t from-night-navy via-night-navy/40 to-night-navy/10" />

      <div className="relative flex h-full min-h-[60vh] flex-col justify-between p-6 sm:p-10">
        <div>
          <p className="text-stat-figure text-signal-orange text-5xl">{rating}</p>
          <p className="text-body-small text-frost mt-1">
            {isEn ? `Average rating · ${reviewCount} reviews` : `Gemiddelde beoordeling · ${reviewCount} reviews`}
          </p>
        </div>

        <blockquote>
          <p className="text-quote-large text-frost">&ldquo;{quote}&rdquo;</p>
          <cite className="text-mono text-faint mt-4 block not-italic">{author}</cite>
        </blockquote>
      </div>
    </div>
  );
}
