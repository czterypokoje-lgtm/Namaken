"use client";

import { business } from "@/lib/business";
import { trackConversion } from "@/lib/analytics";

/**
 * A `tel:` link that records the click as a conversion.
 *
 * Several of the most prominent phone links on the site (the oversized number
 * in the hero, the full-bleed number in the "still locked out?" band, the
 * number on the contact page) were plain anchors in server components, so the
 * site's highest-intent clicks were invisible in reporting while smaller
 * buttons were tracked. This wraps them without turning whole sections into
 * client components.
 *
 * `location` names where on the page the click happened, so call volume can be
 * attributed to a specific placement rather than just a page.
 */
export function TrackedPhoneLink({
  location,
  className,
  style,
  children,
  "aria-label": ariaLabel,
}: {
  location: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  "aria-label"?: string;
}) {
  return (
    <a
      href={business.phoneHref}
      className={className}
      style={style}
      aria-label={ariaLabel}
      onClick={() => trackConversion("tel_click", { link_location: location })}
    >
      {children ?? business.phone}
    </a>
  );
}

/** Same idea for WhatsApp links outside the shared button component. */
export function TrackedWhatsAppLink({
  location,
  className,
  children,
}: {
  location: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={business.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackConversion("whatsapp_click", { link_location: location })}
    >
      {children}
    </a>
  );
}
