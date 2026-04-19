import { useParams, Link } from "react-router-dom";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { CATEGORIES, getProductsByCategory } from "@/data/catalog";
import { Button } from "@/components/ui/button";

const CategoryPage = () => {
  const { slug = "" } = useParams();
  const category = CATEGORIES.find((c) => c.slug === slug);
  const products = getProductsByCategory(slug);

  if (!category) {
    return (
      <SiteLayout>
        <div className="container-tight py-32 text-center">
          <h1 className="font-display text-3xl font-semibold">Category not found</h1>
          <Button asChild className="mt-6">
            <Link to="/shop">Back to shop</Link>
          </Button>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <PageHeader eyebrow="Category" title={category.name} description={category.description} />
      <section className="container-tight py-12">
        <ProductGrid products={products} emptyMessage="No products in this category yet." />
      </section>
    </SiteLayout>
  );
};

export default CategoryPage;
