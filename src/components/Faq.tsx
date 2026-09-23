export function Faq({ items, title }: { items: { q: string; a: string }[]; title: string }) {
  return (
    <section className="border-t border-line px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-heading-3 text-frost mb-6">{title}</h2>
        <div className="divide-y divide-line">
          {items.map((item) => (
            <details key={item.q} className="group py-4">
              <summary className="cursor-pointer list-none text-heading-4 text-frost flex items-center justify-between">
                {item.q}
                <span className="text-signal-orange group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-body-small text-mist mt-2">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
