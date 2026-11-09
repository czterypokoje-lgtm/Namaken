import Script from "next/script";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

/**
 * Every measurement tag the site uses, in one place, each one switched on by
 * the presence of its environment variable and absent otherwise.
 *
 * The site previously shipped with GTM support only, and with no container ID
 * set in production — so the live site collected nothing at all: no sessions,
 * no sources, no conversions. GA4 is wired directly here rather than only
 * through GTM so that pasting one ID starts collection, without first having
 * to build tags inside a container.
 *
 * GA4 and Google Ads share the same `gtag.js` runtime. `GoogleAnalytics`
 * loads it, so when an Ads ID is also present we only need to add a second
 * `config` call rather than load the library twice.
 *
 * NOTE ON CONSENT: these tags set cookies and start collecting as soon as a
 * page loads. Under the Dutch Telecommunicatiewet / GDPR an analytics and
 * advertising setup like this needs prior consent from the visitor, which
 * means a consent banner plus Google Consent Mode v2. That banner does not
 * exist on this site yet — see the audit notes. Nothing here depends on the
 * banner, so it can be added in front of these tags without rework.
 */
export function SiteAnalytics() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  return (
    <>
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      {gaId && <GoogleAnalytics gaId={gaId} />}

      {/* Google Ads. When GA4 is present it has already loaded gtag.js, so
          this only registers the Ads account. When GA4 is absent, gtag.js is
          loaded here instead so Ads conversion tracking still works. */}
      {adsId && !gaId && (
        <Script
          id="google-ads-base"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${adsId}`}
        />
      )}
      {adsId && (
        <Script id="google-ads-config" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = window.gtag || gtag;
gtag('js', new Date());
gtag('config', '${adsId}');`}
        </Script>
      )}

      {/* Microsoft Clarity: session recordings and heatmaps. Shows where
          visitors hesitate or drop off on the way to calling. */}
      {clarityId && (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window,document,"clarity","script","${clarityId}");`}
        </Script>
      )}
    </>
  );
}
