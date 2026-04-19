import { useParams, Link } from "react-router-dom";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { CAR_BRANDS, getProductsByBrand } from "@/data/catalog";
import { Button } from "@/components/ui/button";

const BrandPage = () => {
  const { slug = "" } = useParams();
  const brand = CAR_BRANDS.find((b) => b.slug === slug);
  const products = getProductsByBrand(slug);

  if (!brand) {
    return (
      <SiteLayout>
        <div className="container-tight py-32 text-center">
          <h1 className="font-display text-3xl font-semibold">Brand not found</h1>
          <Button asChild className="mt-6">
            <Link to="/shop">Back to shop</Link>
          </Button>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <PageHeader eyebrow="Brand" title={brand.name} description={brand.tagline} />
      <section className="container-tight py-12">
        <ProductGrid products={products} emptyMessage="No products for this brand yet." />
      </section>
    </SiteLayout>
  );
};

export default BrandPage;
