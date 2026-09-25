# Reusing this codebase for a new country

This site (Autosleutelnamaken / CarKey24, NL) is built to be forked into
other-country mobile car-key/locksmith sites. The layout, components, page
templates, schema structure and SEO plumbing are all country-agnostic
already — what changes per country is **data, copy, and a handful of
config values**, never the structure. Don't restructure the app to add a
country; add the country's data instead.

Read this end-to-end before starting a new country. It's organized in the
order you'll actually touch things.

## 0. Before you start: what needs REAL research, not translation

These four things cannot be filled in by translating the Dutch copy. Get
them right first, the same way the NL data was verified in this repo (see
git history — every region photo and brand photo was individually checked
against a real source before use, twice after mistakes: a supplied "city"
photo turned out to be a different country's skyline, and a supplied "Seat"
photo turned out to be badged "Cupra"):

1. **Legal entity & business registration.** Every country has its own
   registry and its own required disclosures (NL: KVK + BTW via
   Handelsregisterwet; DE: Handelsregister + USt-IdNr; UK: Companies House
   + VAT; UAE: Trade License via the relevant free zone or DED; AU: ABN/ACN;
   NO: Organisasjonsnummer; FI: Y-tunnus). Get the real registration number
   and verify it against that country's public register before it goes in
   `business.ts` or schema — don't fabricate a placeholder that looks real.
2. **Legal pages** (`algemene-voorwaarden`, `privacybeleid`). These currently
   reflect Dutch consumer law and GDPR as applied in NL. They need review by
   someone qualified in the target country's law, not a translation of the
   Dutch text — consumer-protection, cancellation-rights and data-protection
   rules differ (UAE and Australia in particular are materially different
   from EU/EEA law).
3. **City/region list + real photos.** Don't reuse Unsplash search
   guesswork blindly — verify each candidate photo actually shows the named
   place (reverse-check landmarks, read the location tag, view the photo
   yourself) before using it. See `src/lib/images.ts`'s `cityPhotoBySlug`
   for the pattern and its comments for what went wrong when this wasn't
   done carefully.
4. **Brand relevance per market.** The current 28-brand list
   (`src/data/brands.ts`) reflects the Dutch car market. Adjust it for the
   target market (e.g. different brand mix is common in the UK, UAE,
   Australia) before generating 28 brand pages nobody searches for.

## 1. Business identity — `src/lib/business.ts`

Single source of truth for name, contact info, and the market-specific
constants added specifically for templating:

```ts
countryCode: "NL",      // ISO 3166-1 alpha-2 — feeds schema.org addressCountry/areaServed
currencyCode: "EUR",    // ISO 4217 — feeds schema.org priceCurrency
currencySymbol: "€",    // display text only
```

Change these three plus `name`, `legalName`, `domain`, `phone`/`phoneHref`,
`whatsappHref`, `email`, `kvk`/`btw`-equivalent, and `address`. Everything
else in the app (schema.ts, all page metadata, the footer legal line)
already reads from this file — you shouldn't need to touch schema.ts itself
for a currency/country change (verified: changing these three fields alone
updates every `priceCurrency`/`addressCountry`/`areaServed` in the site's
JSON-LD with zero other edits).

**Still hardcoded and needs a project-wide find-replace per fork** (a
deliberate choice — see the commit that centralized currencyCode/Symbol —
these are display text mixed into JSX, not config, and most target markets
in this list keep €/EUR anyway so a premature abstraction wasn't worth the
risk):

```bash
grep -rln "vanaf\|€" src/ --include="*.ts" --include="*.tsx"
```
For UK (£), UAE (AED/د.إ), Australia (A$), Norway (kr) specifically, this
grep-and-replace is a real step. For Germany and Finland, € stays as-is.

## 2. Regions/cities — `src/data/regions.ts`

Replace the 22-entry `regions` array with the target country's cities. Each
entry needs: `slug`, `name`, `areas` (3-4 real neighborhood/sub-area names
— used in on-page copy, not decorative), `avgArrivalMin` (a plausible
number, this drives the "gem. X min aankomst" copy sitewide), optional
`enName` if it transliterates differently in English.

Then in `src/lib/images.ts`, replace `cityPhotoBySlug` following the
verification method in section 0.3 above — search, then confirm the photo
via its location tag/title AND a visual landmark check, not just search
relevance. Budget real time for this; it was the single most time-consuming
part of building the NL version (22 cities, several dead ends per city).

## 3. Services — `src/data/services.ts`

The 4 service types (key duplication, lost key, lockout, ignition lock)
are close to universal for this business — likely no structural change
needed, just translated copy (`heroHeadline`, `heroSub`, `whatWeDo`, `faq`,
and the `en.*` mirror if you're also shipping an English version of a
non-English-primary site) and re-priced `priceFrom`/`timeOnSite` in the
local currency.

## 4. Language / locale routing

The app uses Next.js route groups for locale: `src/app/(nl)/` is the
primary-language tree, `src/app/(en)/en/` is the English mirror. Every
shared component takes a `locale?: "nl" | "en"` prop (or an `isEn` boolean
in a few of the newer components) and branches copy inline — grep any
component for `isEn` to see the pattern before adding a language.

To add a third language (e.g. German for a DE site, or a DE mirror of an
NL-primary site — decide your primary market first): duplicate the route
group pattern, e.g. `src/app/(de)/` as primary or `src/app/(en)/de/` as a
mirror, and extend the locale prop's union type sitewide (TypeScript will
point you at every component that needs the new branch — trust the type
errors rather than grepping manually). Don't invent a generic i18n
abstraction for this; the existing per-component ternary pattern is simple,
already proven at 2 languages, and consistent with the rest of the
codebase's style.

Update `alternates.languages` in both root layouts' metadata, and
`sitemap.ts`'s `staticEn` array (or equivalent) to match whichever pages
actually exist in the new locale — don't sitemap a route that doesn't exist.

## 5. Schema / structured data — `src/lib/schema.ts`

No changes needed beyond what `business.ts` already feeds it (see §1),
**except**:
- `openingHours: "Mo-Su 00:00-23:59"` — only change if the new market's
  service isn't actually 24/7.
- The `"Locksmith"` `@type` is schema.org's own subtype for this exact
  business and is not country-specific — keep it.
- Do not add a fabricated street `address` for a mobile/no-storefront
  business — only add a real, verifiable one (see §0.1). `areaServed` is
  the correct signal for a service-area business either way.

## 6. Brand pages — `src/data/brands.ts` + `src/lib/images.ts`

`brandPhotoBySlug` in images.ts holds one verified real-car photo per
brand, used only for that brand's page hero — see §0.4 on adjusting the
brand list itself first. Re-verify each photo the same way as city photos
(explicit brand badge/wordmark visible, confirmed free license) — don't
carry over the NL photo IDs blind, even for brands that appear in both
lists, since a fresh check costs one Unsplash search and catches mistakes
like the Seat/Cupra mixup mentioned in §0.

The brand pages' 4 supporting-section photos (`brandTrustImagePool`) are
deliberately generic "trust" photos (key handoff, smiling technician, happy
customer) reused across every brand — these don't need to change per
country unless the existing ones read as visually wrong for the new
market (see the earlier fix where a US car-wash worker's branded uniform
was swapped out for being the wrong market fit for an NL audience — apply
the same judgment call to a new market).

## 7. Analytics / tracking — `.env.local`

Each country site should get its **own** GTM container, GA4 property, and
ad-platform accounts (Google Ads, Bing Ads, etc.) — don't share one GTM
container across legally/commercially separate sites, even if they're the
same operator, so conversion data doesn't mix across markets. See
`.env.example` for the variable names; the dataLayer events themselves
(`tel_click`, `whatsapp_click`, `lead_form_submit` in `src/lib/analytics.ts`)
are already generic and need no changes.

## 8. What to leave alone

Everything not listed above: the Tailwind design tokens, the `ag/*`
component visual system, the page-template structure (Hero → badges →
what-we-do → FAQ, city-hub template, brand-page template), the
photo-rotation hashing logic (`hash()`/`pickServiceImage()`/
`pickBrandImages()`/`pickCityImage()` in images.ts), the sitemap/robots
generation logic, and the WebP/image-optimization setup. These are the
actual "template" — they're already country-agnostic and shouldn't need
to change to ship a new country.
