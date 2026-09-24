import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { fontVariables } from "@/lib/fonts";
import { business } from "@/lib/business";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { localBusinessSchema } from "@/lib/schema";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${business.domain}`),
  title: {
    default: `${business.name} — Autosleutel bijmaken, kwijt of buitengesloten`,
    template: `%s | ${business.name}`,
  },
  description:
    "Landelijk technicianetwerk voor autosleutel bijmaken, verloren sleutels, buitengesloten raken en contactslot vervangen. Prijs vooraf, 24/7 bereikbaar.",
  alternates: { languages: { nl: "/", en: "/en" } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  return (
    <html lang="nl" className={`${fontVariables} h-full`}>
      <body className="min-h-full flex flex-col pb-16 sm:pb-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
        />
        <Header locale="nl" />
        <main className="flex-1">{children}</main>
        <Footer locale="nl" />
        <MobileStickyBar />
      </body>
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
    </html>
  );
}
