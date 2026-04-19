import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check, Minus, Plus, ShieldCheck, Truck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { getProductBySlug, PRODUCTS } from "@/data/catalog";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { formatPrice } from "@/lib/format";
import { toast } from "sonner";

const ProductPage = () => {
  const { slug = "" } = useParams();
  const product = getProductBySlug(slug);
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const { t } = useTranslation();

  if (!product) {
    return (
      <SiteLayout>
        <div className="container-tight py-32 text-center">
          <h1 className="font-display text-3xl font-semibold">{t("product.notFound")}</h1>
          <Button asChild className="mt-6">
            <Link to="/shop">{t("common.backToShop")}</Link>
          </Button>
        </div>
      </SiteLayout>
    );
  }

  const related = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand),
  ).slice(0, 4);

  const onSale = product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <SiteLayout>
      <section className="container-tight py-8">
        <Link
          to="/shop"
          className="inline-flex items-center text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-3 w-3" /> {t("common.backToShop")}
        </Link>
      </section>

      <section className="container-tight grid gap-12 pb-16 lg:grid-cols-2 lg:pb-24">
        <div className="overflow-hidden rounded-md border border-border bg-secondary">
          <img
            src={product.images[0] ?? "/placeholder.svg"}
            alt={product.name}
            width={800}
            height={800}
            className="aspect-square w-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <p className="text-eyebrow mb-2">
            {product.brand === "universal" ? t("common.universal") : product.brand.toUpperCase()}
          </p>
          <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {product.name}
          </h1>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-display text-3xl font-semibold">
              {formatPrice(product.price, product.currency)}
            </span>
            {onSale && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice!, product.currency)}
              </span>
            )}
          </div>

          <p className="mt-6 text-base leading-relaxed text-muted-foreground">{product.description}</p>

          <Separator className="my-8" />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="inline-flex items-center rounded-md border border-border">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex h-11 w-11 items-center justify-center hover:bg-accent"
                aria-label={t("product.decrease")}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-sm font-medium">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="flex h-11 w-11 items-center justify-center hover:bg-accent"
                aria-label={t("product.increase")}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <Button
              size="lg"
              className="flex-1"
              onClick={() => {
                add(product.id, qty);
                toast.success(t("product.addedToCart", { name: product.name }));
              }}
              disabled={!product.inStock}
            >
              {product.inStock ? t("product.addToCart") : t("product.outOfStock")}
            </Button>
          </div>

          <ul className="mt-8 space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-foreground" />
              {t("product.inStock")}
            </li>
            <li className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-foreground" />
              {t("product.freeShipping")}
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-foreground" />
              {t("product.returns")}
            </li>
          </ul>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-border bg-secondary">
          <div className="container-tight py-16">
            <p className="text-eyebrow mb-3">{t("product.relatedEyebrow")}</p>
            <h2 className="mb-8 font-display text-2xl font-semibold tracking-tight md:text-3xl">
              {t("product.relatedTitle")}
            </h2>
            <ProductGrid products={related} />
          </div>
        </section>
      )}
    </SiteLayout>
  );
};

export default ProductPage;
