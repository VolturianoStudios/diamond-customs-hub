import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check, ExternalLink, Loader2, Minus, Plus, ShieldCheck, Truck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useShopifyProduct, useShopifyProducts } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";
import { formatShopifyPrice } from "@/lib/shopify";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { toast } from "sonner";

const ProductPage = () => {
  const { handle = "" } = useParams();
  const { data: product, isLoading } = useShopifyProduct(handle);
  const { data: allProducts = [] } = useShopifyProducts();
  const addItem = useCartStore((s) => s.addItem);
  const cartIsLoading = useCartStore((s) => s.isLoading);
  const { t } = useTranslation();

  const [variantId, setVariantId] = useState<string | null>(null);
  const [qty, setQty] = useState(1);

  if (isLoading) {
    return (
      <SiteLayout>
        <section className="container-tight grid gap-12 py-12 lg:grid-cols-2">
          <Skeleton className="aspect-square w-full" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-32 w-full" />
          </div>
        </section>
      </SiteLayout>
    );
  }

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

  const variants = product.variants.edges.map((e) => e.node);
  const selectedVariant = variants.find((v) => v.id === variantId) ?? variants[0];
  const image = product.images.edges[0]?.node;
  const compareAt = selectedVariant?.compareAtPrice;
  const onSale =
    compareAt &&
    selectedVariant &&
    parseFloat(compareAt.amount) > parseFloat(selectedVariant.price.amount);

  const related = allProducts
    .filter(
      (p) =>
        p.node.id !== product.id &&
        (p.node.productType === product.productType || p.node.vendor === product.vendor),
    )
    .slice(0, 4);

  const handleAdd = async () => {
    if (!selectedVariant) return;
    await addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: qty,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success(t("product.addedToCart", { name: product.title }));
  };

  const showVariantPicker =
    variants.length > 1 || (variants[0] && variants[0].title !== "Default Title");

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
          {image ? (
            <img
              src={image.url}
              alt={image.altText ?? product.title}
              className="aspect-square w-full object-cover"
            />
          ) : (
            <div className="flex aspect-square w-full items-center justify-center text-sm text-muted-foreground">
              {product.title}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          {product.vendor && <p className="text-eyebrow mb-2">{product.vendor}</p>}
          <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {product.title}
          </h1>

          <div className="mt-4 flex items-baseline gap-3">
            {selectedVariant && (
              <span className="font-display text-3xl font-semibold">
                {formatShopifyPrice(selectedVariant.price)}
              </span>
            )}
            {onSale && (
              <span className="text-sm text-muted-foreground line-through">
                {formatShopifyPrice(compareAt!)}
              </span>
            )}
          </div>

          {product.description && (
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          )}

          <Separator className="my-8" />

          {showVariantPicker && (
            <div className="mb-6 flex flex-wrap gap-2">
              {variants.map((v) => {
                const active = (variantId ?? variants[0]?.id) === v.id;
                return (
                  <Button
                    key={v.id}
                    variant={active ? "default" : "outline"}
                    size="sm"
                    onClick={() => setVariantId(v.id)}
                    disabled={!v.availableForSale}
                  >
                    {v.title}
                  </Button>
                );
              })}
            </div>
          )}

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
              onClick={handleAdd}
              disabled={cartIsLoading || !selectedVariant?.availableForSale}
            >
              {cartIsLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : selectedVariant?.availableForSale ? (
                <>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {t("product.addToCart")}
                </>
              ) : (
                t("product.outOfStock")
              )}
            </Button>
          </div>

          <ul className="mt-8 space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-foreground" />
              {selectedVariant?.availableForSale ? t("product.inStock") : t("product.outOfStock")}
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
