import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { Button } from "@/components/ui/button";
import { CATEGORIES, CAR_BRANDS, PRODUCTS } from "@/data/catalog";
import { cn } from "@/lib/utils";

const Shop = () => {
  const [params, setParams] = useSearchParams();
  const activeCategory = params.get("category") ?? "all";
  const activeBrand = params.get("brand") ?? "all";
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc">("featured");
  const { t } = useTranslation();

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (activeCategory !== "all") list = list.filter((p) => p.category === activeCategory);
    if (activeBrand !== "all") list = list.filter((p) => p.brand === activeBrand);
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "featured") list.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    return list;
  }, [activeCategory, activeBrand, sort]);

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value === "all") next.delete(key);
    else next.set(key, value);
    setParams(next);
  };

  return (
    <SiteLayout>
      <PageHeader
        eyebrow={t("shop.eyebrow")}
        title={t("shop.title")}
        description={t("shop.description")}
      />

      <section className="container-tight py-12">
        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-eyebrow mr-2">{t("shop.category")}</span>
            <FilterChip active={activeCategory === "all"} onClick={() => setParam("category", "all")}>
              {t("shop.all")}
            </FilterChip>
            {CATEGORIES.map((c) => (
              <FilterChip
                key={c.slug}
                active={activeCategory === c.slug}
                onClick={() => setParam("category", c.slug)}
              >
                {c.name}
              </FilterChip>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-eyebrow mr-2">{t("shop.brand")}</span>
            <FilterChip active={activeBrand === "all"} onClick={() => setParam("brand", "all")}>
              {t("shop.all")}
            </FilterChip>
            {CAR_BRANDS.map((b) => (
              <FilterChip
                key={b.slug}
                active={activeBrand === b.slug}
                onClick={() => setParam("brand", b.slug)}
              >
                {b.name}
              </FilterChip>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-border pt-4">
            <p className="text-sm text-muted-foreground">
              {t("shop.productsCount", { count: filtered.length })}
            </p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="featured">{t("shop.sortFeatured")}</option>
              <option value="price-asc">{t("shop.sortPriceAsc")}</option>
              <option value="price-desc">{t("shop.sortPriceDesc")}</option>
            </select>
          </div>
        </div>

        <ProductGrid products={filtered} emptyMessage={t("shop.emptyFilters")} />
      </section>
    </SiteLayout>
  );
};

const FilterChip = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <Button
    variant={active ? "default" : "outline"}
    size="sm"
    onClick={onClick}
    className={cn("rounded-full text-xs uppercase tracking-wider", active && "shadow-card-soft")}
  >
    {children}
  </Button>
);

export default Shop;
