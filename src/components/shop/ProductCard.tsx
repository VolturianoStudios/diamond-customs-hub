import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/types";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard = ({ product, className }: ProductCardProps) => {
  const { t } = useTranslation();
  const onSale = product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-md border border-border bg-card transition-all duration-300 hover:shadow-elegant",
        className,
      )}
    >
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.images[0] ?? "/placeholder.svg"}
            alt={product.name}
            loading="lazy"
            width={600}
            height={600}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.badge && (
            <span className="absolute left-3 top-3 rounded-sm bg-primary px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
              {product.badge}
            </span>
          )}
          {onSale && (
            <span className="absolute right-3 top-3 rounded-sm bg-destructive px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-destructive-foreground">
              {t("common.sale")}
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-eyebrow">{product.brand === "universal" ? t("common.universal") : product.brand.toUpperCase()}</p>
        <Link to={`/product/${product.slug}`}>
          <h3 className="line-clamp-2 font-display text-base font-medium leading-tight transition-colors group-hover:text-muted-foreground">
            {product.name}
          </h3>
        </Link>
        <p className="line-clamp-2 text-sm text-muted-foreground">{product.shortDescription}</p>

        <div className="mt-auto flex items-end justify-between pt-3">
          <div>
            {onSale && (
              <span className="mr-2 text-xs text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice!, product.currency)}
              </span>
            )}
            <span className="font-display text-lg font-semibold">
              {formatPrice(product.price, product.currency)}
            </span>
          </div>
          <Button asChild size="sm" variant="outline">
            <Link to={`/product/${product.slug}`}>{t("common.view")}</Link>
          </Button>
        </div>
      </div>
    </article>
  );
};
