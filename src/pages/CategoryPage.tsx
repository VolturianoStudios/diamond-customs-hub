import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { CATEGORIES } from "@/data/catalog";
import { CATEGORY_TYPE } from "@/lib/shopify";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { Button } from "@/components/ui/button";

const CategoryPage = () => {
  const { slug = "" } = useParams();
  const category = CATEGORIES.find((c) => c.slug === slug);
  const type = CATEGORY_TYPE[slug];
  const { data: products = [], isLoading } = useShopifyProducts(
    type ? `product_type:"${type}"` : undefined,
  );
  const { t } = useTranslation();

  if (!category) {
    return (
      <SiteLayout>
        <div className="container-tight py-32 text-center">
          <h1 className="font-display text-3xl font-semibold">{t("category.notFound")}</h1>
          <Button asChild className="mt-6">
            <Link to="/shop">{t("common.backToShop")}</Link>
          </Button>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <PageHeader eyebrow={t("category.eyebrow")} title={category.name} description={category.description} />
      <section className="container-tight py-12">
        <ProductGrid products={products} loading={isLoading} emptyMessage={t("category.empty")} />
      </section>
    </SiteLayout>
  );
};

export default CategoryPage;
