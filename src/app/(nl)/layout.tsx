import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { business, siteUrl } from "@/lib/business";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { SiteAnalytics } from "@/components/SiteAnalytics";
import { AttributionCapture } from "@/components/AttributionCapture";
import { localBusinessSchema, webSiteSchema } from "@/lib/schema";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${business.name} — Autosleutel bijmaken, kwijt of buitengesloten`,
    template: `%s | ${business.name}`,
  },
  description:
    "Landelijk technicianetwerk voor autosleutel bijmaken, verloren sleutels, buitengesloten raken en contactslot vervangen. Prijs vooraf, 24/7 bereikbaar.",
  // No `alternates` here on purpose: every page builds its own canonical +
  // hreflang through `seo()` in src/lib/seo.ts. A `languages` map at layout
  // level is silently replaced by any page that sets `alternates`, which is
  // how this site ended up serving zero hreflang tags.
  // Search Console / Bing Webmaster site-ownership verification — set once
  // the accounts exist; the meta tag simply doesn't render until then.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${fontVariables} h-full`}>
      <body className="min-h-full flex flex-col pb-16 sm:pb-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema()) }}
        />
        <Header locale="nl" />
        <main className="flex-1">{children}</main>
        <Footer locale="nl" />
        <MobileStickyBar />
        <SiteAnalytics />
        <AttributionCapture />
      </body>
    </html>
  );
}
