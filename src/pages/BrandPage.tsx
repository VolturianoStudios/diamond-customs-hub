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
        <div className="container-tight flex items-center gap-10 py-12 md:gap-14 md:py-16">
          <img
            src={brand.logo.original}
            srcSet={`${brand.logo.optimized} 640w, ${brand.logo.original} 1280w`}
            sizes="(max-width: 768px) 192px, 288px"
            alt={`${brand.name} logo`}
            className="h-48 w-48 shrink-0 object-contain md:h-72 md:w-72"
          />
          <div className="flex flex-col gap-3">
            <p className="text-eyebrow">{t("brand.eyebrow")}</p>
            {brand.tagline && (
              <p className="font-display text-xl font-medium tracking-tight text-foreground md:text-2xl">
                {brand.tagline}
              </p>
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
