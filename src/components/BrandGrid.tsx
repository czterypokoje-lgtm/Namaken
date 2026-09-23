import Link from "next/link";
import { brandGroups, slugifyBrand } from "@/data/brands";

export function BrandGrid() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {brandGroups.map((group) => (
        <div key={group.label}>
          <p className="text-eyebrow text-signal-orange mb-3">{group.label}</p>
          <ul className="space-y-2">
            {group.brands.map((brand) => (
              <li key={brand}>
                <Link href={`/merken/${slugifyBrand(brand)}`} className="text-body text-frost hover:text-signal-orange">
                  {brand}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
