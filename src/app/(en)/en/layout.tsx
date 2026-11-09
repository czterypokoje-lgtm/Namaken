import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { business, siteUrl } from "@/lib/business";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { SiteAnalytics } from "@/components/SiteAnalytics";
import { ConsentDefaults } from "@/components/ConsentDefaults";
import { ConsentBanner } from "@/components/ConsentBanner";
import { AttributionCapture } from "@/components/AttributionCapture";
import { localBusinessSchema, webSiteSchema } from "@/lib/schema";
import "../../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${business.name} — Car Key Duplication, Lost Keys & Lockouts`,
    template: `%s | ${business.name}`,
  },
  description:
    "Nationwide mobile car-key technician network in the Netherlands: key duplication, lost key replacement, lockouts and ignition lock repair. Price confirmed upfront, 24/7.",
  // No `alternates` here on purpose: every page builds its own canonical +
  // hreflang through `seo()` in src/lib/seo.ts. A `languages` map at layout
  // level is silently replaced by any page that sets `alternates`, which is
  // how this site ended up serving zero hreflang tags.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
};

export default function EnglishRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontVariables} h-full`}>
      <body className="min-h-full flex flex-col pb-16 sm:pb-0">
        <ConsentDefaults />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema()) }}
        />
        <Header locale="en" />
        <main className="flex-1">{children}</main>
        <Footer locale="en" />
        <MobileStickyBar locale="en" />
        <SiteAnalytics />
        <AttributionCapture />
        <ConsentBanner locale="en" />
      </body>
    </html>
  );
}
