import Script from "next/script";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { ClarityScript } from "@/components/ClarityScript";

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
 * CONSENT: <ConsentDefaults /> denies every consent signal before these tags
 * load, and <ConsentBanner /> replays the visitor's decision. So the Google
 * tags here load in a restricted state and send only cookieless pings until
 * consent is granted — Google's "advanced" Consent Mode v2 model, which keeps
 * modelled data flowing without setting cookies first. Clarity is handled
 * differently: it is not a Google tag, Consent Mode cannot restrain it, and it
 * records sessions, so it is not loaded at all until consent exists.
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

      {/* Session recordings and heatmaps, gated on consent. */}
      {clarityId && <ClarityScript projectId={clarityId} />}
    </>
  );
}
