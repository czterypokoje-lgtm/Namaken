import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { fontVariables } from "@/lib/fonts";
import { business } from "@/lib/business";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { localBusinessSchema } from "@/lib/schema";
import "../../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${business.domain}`),
  title: {
    default: `${business.name} — Car Key Duplication, Lost Keys & Lockouts`,
    template: `%s | ${business.name}`,
  },
  description:
    "Nationwide mobile car-key technician network in the Netherlands: key duplication, lost key replacement, lockouts and ignition lock repair. Price confirmed upfront, 24/7.",
  alternates: { languages: { nl: "/", en: "/en" } },
};

export default function EnglishRootLayout({ children }: { children: React.ReactNode }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  return (
    <html lang="en" className={`${fontVariables} h-full`}>
      <body className="min-h-full flex flex-col pb-16 sm:pb-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
        />
        <Header locale="en" />
        <main className="flex-1">{children}</main>
        <Footer locale="en" />
        <MobileStickyBar />
      </body>
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
    </html>
  );
}
