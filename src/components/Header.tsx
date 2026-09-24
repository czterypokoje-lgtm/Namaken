"use client";

import Link from "next/link";
import { useState } from "react";
import { business } from "@/lib/business";
import { CallButton } from "@/components/CallWhatsAppButtons";

type NavLink = { href: string; label: string };

const navByLocale: Record<"nl" | "en", NavLink[]> = {
  nl: [
    { href: "/diensten", label: "Diensten" },
    { href: "/prijzen", label: "Prijzen" },
    { href: "/werkgebied", label: "Werkgebied" },
    { href: "/merken", label: "Merken" },
    { href: "/over-ons", label: "Over ons" },
  ],
  en: [
    { href: "/en/diensten", label: "Services" },
    { href: "/en/werkgebied", label: "Areas" },
  ],
};

export function Header({ locale = "nl" }: { locale?: "nl" | "en" }) {
  const [open, setOpen] = useState(false);
  const links = navByLocale[locale];
  const home = locale === "en" ? "/en" : "/";

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-night-navy/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href={home} className="text-heading-4 text-frost font-bold tracking-tight">
          {business.name}
        </Link>

        <nav className="hidden gap-6 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-body-small text-mist hover:text-frost transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <CallButton locale={locale} />
        </div>

        <button
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="text-frost md:hidden"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-line px-4 py-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2 text-body text-frost"
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-2">
            <CallButton className="w-full" locale={locale} />
          </div>
        </nav>
      )}
    </header>
  );
}
