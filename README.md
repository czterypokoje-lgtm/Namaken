# Autosleutelnamaken

Next.js lead-generation site for a mobile car-key technician network in the
Netherlands: car key duplication, lost keys, lockouts, and ignition lock
replacement — 22 regions, 28 brand pages, NL/EN.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` and fill in real values (Resend API key
for the lead form, GTM container ID) before deploying.

## Design tokens

Colors and typography are generated from `design/styles.json` (a Framer
export) via `scripts/build-tokens.mjs`, which writes `src/app/tokens.css`.
Re-run it after editing `design/styles.json`:

```bash
node scripts/build-tokens.mjs
```

## Deploy

```bash
npm run build
```

Deploys cleanly to [Vercel](https://vercel.com/new).
