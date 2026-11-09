import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/business";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Search crawlers: everything is open except the post-conversion
      // thank-you page, which has no search value and would otherwise
      // compete for brand queries and pollute conversion reporting.
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/bedankt"],
      },
      // Answer-engine and AI crawlers, listed explicitly. These are allowed
      // by the wildcard rule above already, but naming them is deliberate:
      // several of these crawlers look for a rule matching their own token
      // before falling back to `*`, and an explicit Allow removes any doubt
      // that this site wants to be quoted in AI answers. The two Google
      // tokens are not page crawlers: Google-Extended governs whether
      // content may train/ground Gemini, and Googlebot-Extended likewise —
      // they only ever read robots.txt, never pages.
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-User",
          "Claude-SearchBot",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "Googlebot-Extended",
          "Applebot",
          "Applebot-Extended",
          "Bingbot",
          "CCBot",
          "cohere-ai",
          "Meta-ExternalAgent",
        ],
        allow: "/",
        disallow: ["/bedankt"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    // Declares which of the two hostnames is the real one. Only a few
    // crawlers honour it, but it costs nothing and this site serves both
    // www and non-www.
    host: siteUrl.replace("https://", ""),
  };
}
