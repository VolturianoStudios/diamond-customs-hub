import { Link } from "react-router-dom";
import { Logo } from "@/components/brand/Logo";
import { CATEGORIES, CAR_BRANDS } from "@/data/catalog";

export const SiteFooter = () => {
  return (
    <footer className="border-t border-border bg-brand-black text-brand-white">
      <div className="container-tight grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo variant="light" />
          <p className="max-w-xs text-sm leading-relaxed text-white/60">
            Premium modifications and accessories — built by enthusiasts, for enthusiasts.
          </p>
        </div>

        <div>
          <p className="text-eyebrow mb-4 text-white/50">Categories</p>
          <ul className="space-y-2 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link to={`/category/${c.slug}`} className="text-white/70 transition-colors hover:text-white">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-eyebrow mb-4 text-white/50">Brands</p>
          <ul className="space-y-2 text-sm">
            {CAR_BRANDS.map((b) => (
              <li key={b.slug}>
                <Link to={`/brand/${b.slug}`} className="text-white/70 transition-colors hover:text-white">
                  {b.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-eyebrow mb-4 text-white/50">Company</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="text-white/70 hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-white/70 hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/shop" className="text-white/70 hover:text-white">
                Shop all
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-tight flex flex-col items-start justify-between gap-2 py-6 text-xs text-white/40 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Diamond Customs. All rights reserved.</p>
          <p>Designed in Sweden.</p>
        </div>
      </div>
    </footer>
  );
};
