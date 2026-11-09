import { Big_Shoulders, Chivo, Chivo_Mono } from "next/font/google";

export const bigShoulders = Big_Shoulders({
  subsets: ["latin"],
  weight: ["800", "900"],
  variable: "--font-big-shoulders",
  // Big Shoulders is a heavily condensed display face, and next/font has no
  // metrics for it ("Failed to find font override values" at build time), so
  // it cannot synthesise a width-matched fallback. Without this list the
  // fallback is a normal-width sans: measured at the hero's 144px, the word
  // "Autosleutel" is 784px wide in that fallback against a 725px column, so
  // it breaks mid-word until the webfont swaps in. In Big Shoulders itself
  // the same word is 677px and fits. These condensed fallbacks keep the
  // headline on the same line breaks through the swap.
  fallback: ["Arial Narrow", "Liberation Sans Narrow", "Impact", "sans-serif"],
});

export const chivo = Chivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-chivo",
});

export const chivoMono = Chivo_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-chivo-mono",
});

export const fontVariables = `${bigShoulders.variable} ${chivo.variable} ${chivoMono.variable}`;
