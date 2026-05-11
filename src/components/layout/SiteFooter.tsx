import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { CATEGORIES, CAR_BRANDS } from "@/data/catalog";

export const SiteFooter = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border bg-brand-black text-brand-white">
      <div className="container-tight grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo variant="light" />
          <p className="max-w-xs text-sm leading-relaxed text-white/60">
            {t("footer.tagline")}
          </p>
          <Button asChild variant="secondary" size="sm">
            <Link to="/contact">Boka en konsultation</Link>
          </Button>
        </div>

        <div>
          <p className="text-eyebrow mb-4 text-white/50">{t("footer.categories")}</p>
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
          <p className="text-eyebrow mb-4 text-white/50">{t("footer.brands")}</p>
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
          <p className="text-eyebrow mb-4 text-white/50">{t("footer.company")}</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="text-white/70 hover:text-white">
                {t("nav.about")}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-white/70 hover:text-white">
                {t("nav.contact")}
              </Link>
            </li>
            <li>
              <Link to="/shop" className="text-white/70 hover:text-white">
                {t("footer.shopAll")}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-tight flex flex-col items-start justify-between gap-2 py-6 text-xs text-white/40 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Diamond Customs. {t("footer.rights")}</p>
          <p>{t("footer.designedIn")}</p>
        </div>
      </div>
    </footer>
  );
};
