import Link from "next/link";

export function Breadcrumb({ items }: { items: { name: string; url: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-line bg-night-navy px-4 py-3 sm:px-6">
      <ol className="mx-auto flex max-w-5xl flex-wrap items-center gap-2 text-mono text-mist">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          const path = new URL(item.url).pathname;
          return (
            <li key={item.url} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {isLast ? (
                <span className="text-signal-orange">{item.name}</span>
              ) : (
                <Link href={path} className="hover:text-frost">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
