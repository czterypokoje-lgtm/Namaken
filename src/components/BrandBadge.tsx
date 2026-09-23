// A brand emblem in our own design system rather than the manufacturer's
// trademarked logo artwork — avoids hotlinking/licensing real logo files
// while still identifying the brand clearly on the page.
export function BrandBadge({ brand }: { brand: string }) {
  const initials = brand
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  return (
    <div className="flex h-40 w-40 shrink-0 flex-col items-center justify-center rounded-full border-4 border-signal-orange bg-navy-surface">
      <p style={{ fontFamily: "var(--font-big-shoulders)" }} className="text-4xl font-black text-frost">
        {initials}
      </p>
      <p className="text-mono text-mist mt-1 text-center px-2">{brand}</p>
    </div>
  );
}
