import Image from "next/image";
import { images } from "@/lib/images";

export function Testimonial({
  quote,
  author,
  rating = "4.9",
  reviewCount = "312",
  locale = "nl",
}: {
  quote: string;
  author: string;
  rating?: string;
  reviewCount?: string;
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
