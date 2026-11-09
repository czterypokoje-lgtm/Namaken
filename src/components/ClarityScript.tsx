"use client";

import Script from "next/script";
import { useAnalyticsConsent } from "@/components/ConsentBanner";

/**
 * Microsoft Clarity, loaded only after analytics consent.
 *
 * Clarity is not a Google tag, so Consent Mode does not restrain it: there is
 * no "denied" state in which it behaves acceptably. It records what visitors
 * do on the page, so it must not load at all until it is allowed to, rather
 * than load and be asked to hold back.
 */
export function ClarityScript({ projectId }: { projectId: string }) {
  const granted = useAnalyticsConsent();
  if (!granted) return null;

  return (
    <Script id="microsoft-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window,document,"clarity","script","${projectId}");`}
    </Script>
  );
}
