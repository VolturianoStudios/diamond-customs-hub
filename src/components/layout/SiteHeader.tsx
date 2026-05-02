import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { CAR_BRANDS, CATEGORIES } from "@/data/catalog";
import { useCart } from "@/context/CartContext";
import { LanguageToggle } from "@/components/LanguageToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export const SiteHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount } = useCart();
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top promo bar */}
      <div className="w-full border-b border-border bg-background">
        <div className="container-tight flex h-9 items-center justify-center px-4 text-center">
          <p className="text-[11px] font-medium tracking-wide text-foreground sm:text-xs">
            {t("nav.promo")}
          </p>
        </div>
      </div>

      {/* Main bar — black */}
      <div className="w-full bg-brand-black text-brand-white">
        <div className="container-tight grid h-20 grid-cols-[1fr_auto_1fr] items-center gap-4">
          {/* Left: catalog button + search (desktop) / menu (mobile) */}
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  className="hidden h-10 rounded-sm bg-brand-white px-4 text-xs font-semibold uppercase tracking-[0.18em] text-brand-black hover:bg-brand-silver lg:inline-flex"
                >
                  {t("nav.showCatalog")}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                <DropdownMenuLabel>{t("nav.shopByCar")}</DropdownMenuLabel>
                {CAR_BRANDS.map((b) => (
                  <DropdownMenuItem key={b.slug} asChild>
                    <Link to={`/brand/${b.slug}`}>{b.name}</Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuLabel>{t("nav.categories")}</DropdownMenuLabel>
                {CATEGORIES.map((c) => (
                  <DropdownMenuItem key={c.slug} asChild>
                    <Link to={`/category/${c.slug}`}>{c.name}</Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/shop">{t("nav.allProducts")}</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="hidden h-10 w-10 text-brand-white hover:bg-brand-graphite hover:text-brand-white lg:inline-flex"
              aria-label={t("nav.search")}
            >
              <Search className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-brand-white hover:bg-brand-graphite hover:text-brand-white lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={t("nav.toggleNav")}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Center: Logo */}
          <div className="flex items-center justify-center">
            <Link
              to="/"
              aria-label="Diamond Customs — Home"
              className="group inline-flex items-center gap-2"
            >
              <span className="relative inline-flex h-8 w-8 items-center justify-center text-brand-white">
                <svg viewBox="0 0 32 32" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M16 2 L30 14 L16 30 L2 14 Z" />
                  <path d="M9 14 L16 7 L23 14" opacity="0.6" />
                  <path d="M9 14 L16 22 L23 14" opacity="0.4" />
                </svg>
              </span>
              <span className="font-display text-base font-semibold tracking-[0.22em] text-brand-white sm:text-lg">
                DIAMOND<span className="font-light text-brand-silver">CUSTOMS</span>
              </span>
            </Link>
          </div>

          {/* Right: language + cart */}
          <div className="flex items-center justify-end gap-1">
            <div className="text-brand-white">
              <LanguageToggle />
            </div>

            <Button
              asChild
              variant="ghost"
              size="icon"
              className="relative h-10 w-10 text-brand-white hover:bg-brand-graphite hover:text-brand-white"
            >
              <Link to="/cart" aria-label={t("nav.openCart")}>
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-white px-1 text-[10px] font-semibold text-brand-black">
                    {itemCount}
                  </span>
                )}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Secondary category strip */}
      <div className="hidden border-b border-border bg-background lg:block">
        <div className="container-tight flex h-12 items-center justify-center gap-8">
          {CATEGORIES.slice(0, 6).map((c) => (
            <Link
              key={c.slug}
              to={`/category/${c.slug}`}
              className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground transition-colors hover:text-muted-foreground"
            >
              {c.name}
            </Link>
          ))}
          <Link
            to="/shop"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground transition-colors hover:text-muted-foreground"
          >
            {t("nav.allProducts")}
          </Link>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "overflow-hidden border-b border-border bg-background lg:hidden",
          mobileOpen ? "max-h-[80vh]" : "max-h-0",
          "transition-[max-height] duration-300 ease-out",
        )}
      >
        <div className="container-tight space-y-6 py-6">
          <div>
            <p className="text-eyebrow mb-3">{t("nav.shopByCar")}</p>
            <ul className="grid grid-cols-2 gap-2">
              {CAR_BRANDS.map((b) => (
                <li key={b.slug}>
                  <Link
                    to={`/brand/${b.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-md border border-border px-3 py-2 text-sm font-medium"
                  >
                    {b.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-eyebrow mb-3">{t("nav.categories")}</p>
            <ul className="space-y-1">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/category/${c.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-2 border-t border-border pt-4">
            {[
              { to: "/shop", label: t("nav.allProducts") },
              { to: "/about", label: t("nav.about") },
              { to: "/contact", label: t("nav.contact") },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
