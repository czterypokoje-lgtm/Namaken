export function TransponderSmartKeySection({ locale = "nl" }: { locale?: "nl" | "en" }) {
  const isEn = locale === "en";

  return (
    <section className="border-t border-line bg-navy-surface px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-heading-3 text-frost mb-4">
          {isEn ? "Transponder & smart key programming" : "Transponder- en smart key programmeren"}
        </h2>
        <p className="text-body text-mist mb-6">
          {isEn
            ? "Modern car keys aren't just cut metal — a transponder chip talks to the immobilizer, and smart keys handle keyless entry and push-to-start. We program all of it on-site, matched to your exact make, model and year."
            : "Moderne autosleutels zijn meer dan een stukje metaal. De transponderchip communiceert met de startonderbreker, en smart keys regelen keyless entry en start-stop. Wij programmeren dit alles op locatie, afgestemd op uw merk, model en bouwjaar."}
        </p>
        <ul className="grid gap-3 sm:grid-cols-2">
          {(isEn
            ? [
                "Standard transponder keys",
                "Remote/flip keys with central locking",
                "Smart keys with keyless entry",
                "Matched to your car's specific system",
              ]
            : [
                "Standaard transpondersleutels",
                "Klapsleutels met centrale vergrendeling",
                "Smart keys met keyless entry",
                "Afgestemd op het systeem van uw auto",
              ]
          ).map((item) => (
            <li key={item} className="flex items-start gap-2 text-body-small text-frost">
              <span className="text-signal-orange">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
