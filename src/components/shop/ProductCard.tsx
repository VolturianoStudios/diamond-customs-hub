import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { formatShopifyPrice, type ShopifyProduct } from "@/lib/shopify";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
  className?: string;
}

export const ProductCard = ({ product, className }: ProductCardProps) => {
  const { t } = useTranslation();
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const node = product.node;
  const variant = node.variants.edges[0]?.node;
  const image = node.images.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;
  const compareAt = variant?.compareAtPrice;
  const onSale = compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount);

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success(t("product.addedToCart", { name: node.title }));
  };

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-md border border-border bg-card transition-all duration-300 hover:shadow-elegant",
        className,
      )}
    >
      <Link to={`/product/${node.handle}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-muted">
          {image ? (
            <img
              src={image.url}
              alt={image.altText ?? node.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
              {node.title}
            </div>
          )}
          {onSale && (
            <span className="absolute right-3 top-3 rounded-sm bg-destructive px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-destructive-foreground">
              {t("common.sale")}
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        {node.vendor && <p className="text-eyebrow">{node.vendor}</p>}
        <Link to={`/product/${node.handle}`}>
          <h3 className="line-clamp-2 font-display text-base font-medium leading-tight transition-colors group-hover:text-muted-foreground">
            {node.title}
          </h3>
        </Link>
        {node.description && (
          <p className="line-clamp-2 text-sm text-muted-foreground">{node.description}</p>
        )}

        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <div>
            {onSale && (
              <span className="mr-2 text-xs text-muted-foreground line-through">
                {formatShopifyPrice(compareAt!)}
              </span>
            )}
            <span className="font-display text-lg font-semibold">
              {formatShopifyPrice(price)}
            </span>
          </div>
          <Button size="sm" onClick={handleAdd} disabled={isLoading || !variant?.availableForSale}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : variant?.availableForSale ? (
              t("product.addToCart")
            ) : (
              t("product.outOfStock")
            )}
          </Button>
        </div>
      </div>
    </article>
  );
};
