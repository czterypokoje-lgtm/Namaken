import { Big_Shoulders, Chivo, Chivo_Mono } from "next/font/google";

export const bigShoulders = Big_Shoulders({
  subsets: ["latin"],
  weight: ["800", "900"],
  variable: "--font-big-shoulders",
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
