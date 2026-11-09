/**
 * Registers the Consent Mode v2 default state.
 *
 * This is a plain inline <script>, not next/script, and it is rendered as the
 * very first thing in <body> on purpose. An inline script executes the moment
 * the parser reaches it, which guarantees it runs before gtag.js (loaded by
 * next/script with afterInteractive) and therefore before any Google tag has a
 * chance to write a cookie. A next/script with the same contents would be
 * injected after hydration — too late to be a *default*.
 *
 * Everything that can carry an identifier starts denied. `security_storage`
 * is granted because it covers strictly necessary security functions, and
 * `functionality_storage` because it covers cookies that make the site work;
 * neither requires consent under the Telecommunicatiewet.
 *
 * `wait_for_update` gives the banner a moment to replay a stored decision
 * before tags give up and fall back to cookieless pings, so a returning
 * visitor who already accepted is measured fully on their first page view
 * rather than from the second one onward.
 */
export function ConsentDefaults() {
  const script = `window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
window.gtag=window.gtag||gtag;
gtag('consent','default',{
'ad_storage':'denied',
'ad_user_data':'denied',
'ad_personalization':'denied',
'analytics_storage':'denied',
'personalization_storage':'denied',
'functionality_storage':'granted',
'security_storage':'granted',
'wait_for_update':500
});
gtag('set','url_passthrough',true);
gtag('set','ads_data_redaction',true);`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
