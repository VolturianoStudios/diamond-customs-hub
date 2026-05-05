import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { CAR_BRANDS, getProductsByBrand } from "@/data/catalog";
import { BrandLogo } from "@/components/shop/BrandLogo";
import { Button } from "@/components/ui/button";

const BrandPage = () => {
  const { slug = "" } = useParams();
  const brand = CAR_BRANDS.find((b) => b.slug === slug);
  const products = getProductsByBrand(slug);
  const { t } = useTranslation();

  if (!brand) {
    return (
      <SiteLayout>
        <div className="container-tight py-32 text-center">
          <h1 className="font-display text-3xl font-semibold">{t("brand.notFound")}</h1>
          <Button asChild className="mt-6">
            <Link to="/shop">{t("common.backToShop")}</Link>
          </Button>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary">
        <div className="container-tight flex items-center gap-6 py-8 md:gap-8 md:py-10">
          <BrandLogo brand={brand} size="sm" className="h-28 w-28 shrink-0 md:h-36 md:w-36" />
          <div className="flex flex-col gap-1">
            <p className="text-eyebrow">{t("brand.eyebrow")}</p>
            {brand.tagline && (
              <p className="text-sm text-muted-foreground md:text-base">{brand.tagline}</p>
            )}
          </div>
        </div>
      </section>
      <section className="container-tight py-12">
        <ProductGrid products={products} emptyMessage={t("brand.empty")} />
      </section>
    </SiteLayout>
  );
};

export default BrandPage;
