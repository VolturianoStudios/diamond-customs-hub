import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { CAR_BRANDS, CATEGORIES } from "@/data/catalog";
import { useCart } from "@/context/CartContext";
import { LanguageToggle } from "@/components/LanguageToggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export const SiteHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount } = useCart();
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-md">
      <div className="container-tight flex h-16 items-center justify-between gap-6">
        <Logo />

        {/* Desktop nav */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-sm font-medium uppercase tracking-wider">
                {t("nav.shopByCar")}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[280px] gap-1 p-3">
                  {CAR_BRANDS.map((b) => (
                    <li key={b.slug}>
                      <Link
                        to={`/brand/${b.slug}`}
                        className="block rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent"
                      >
                        <div className="font-medium">{b.name}</div>
                        {b.tagline && (
                          <div className="text-xs text-muted-foreground">{b.tagline}</div>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-sm font-medium uppercase tracking-wider">
                {t("nav.categories")}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[420px] grid-cols-2 gap-1 p-3">
                  {CATEGORIES.map((c) => (
                    <li key={c.slug}>
                      <Link
                        to={`/category/${c.slug}`}
                        className="block rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent"
                      >
                        <div className="font-medium">{c.name}</div>
                        <div className="line-clamp-1 text-xs text-muted-foreground">
                          {c.description}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link
                to="/shop"
                className="inline-flex items-center px-4 py-2 text-sm font-medium uppercase tracking-wider transition-colors hover:text-muted-foreground"
              >
                {t("nav.allProducts")}
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link
                to="/about"
                className="inline-flex items-center px-4 py-2 text-sm font-medium uppercase tracking-wider transition-colors hover:text-muted-foreground"
              >
                {t("nav.about")}
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link
                to="/contact"
                className="inline-flex items-center px-4 py-2 text-sm font-medium uppercase tracking-wider transition-colors hover:text-muted-foreground"
              >
                {t("nav.contact")}
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-1">
          <LanguageToggle />

          <Button asChild variant="ghost" size="icon" className="relative">
            <Link to="/cart" aria-label={t("nav.openCart")}>
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                  {itemCount}
                </span>
              )}
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={t("nav.toggleNav")}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "overflow-hidden border-t border-border bg-background lg:hidden",
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
