import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

const Cart = () => {
  const { detailed, subtotal, setQuantity, remove, itemCount } = useCart();
  const { t } = useTranslation();

  if (itemCount === 0) {
    return (
      <SiteLayout>
        <PageHeader eyebrow={t("cart.eyebrow")} title={t("cart.emptyTitle")} />
        <section className="container-tight py-16 text-center">
          <p className="mb-6 text-muted-foreground">{t("cart.emptyText")}</p>
          <Button asChild size="lg">
            <Link to="/shop">{t("cart.startShopping")}</Link>
          </Button>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <PageHeader eyebrow={t("cart.eyebrow")} title={t("cart.title")} />

      <section className="container-tight grid gap-12 py-12 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          {detailed.map(({ product, quantity, lineTotal }) => (
            <div
              key={product.id}
              className="flex flex-col gap-4 rounded-md border border-border bg-card p-4 sm:flex-row"
            >
              <Link
                to={`/product/${product.slug}`}
                className="block aspect-square w-full overflow-hidden rounded-md bg-muted sm:w-28"
              >
                <img
                  src={product.images[0] ?? "/placeholder.svg"}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </Link>

              <div className="flex flex-1 flex-col">
                <p className="text-eyebrow">
                  {product.brand === "universal" ? t("common.universal") : product.brand.toUpperCase()}
                </p>
                <Link
                  to={`/product/${product.slug}`}
                  className="font-display text-base font-medium hover:underline"
                >
                  {product.name}
                </Link>
                <p className="mt-1 text-sm text-muted-foreground">
                  {formatPrice(product.price, product.currency)} {t("cart.each")}
                </p>

                <div className="mt-4 flex items-center justify-between gap-4">
                  <div className="inline-flex items-center rounded-md border border-border">
                    <button
                      onClick={() => setQuantity(product.id, quantity - 1)}
                      className="flex h-9 w-9 items-center justify-center hover:bg-accent"
                      aria-label={t("product.decrease")}
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center text-sm">{quantity}</span>
                    <button
                      onClick={() => setQuantity(product.id, quantity + 1)}
                      className="flex h-9 w-9 items-center justify-center hover:bg-accent"
                      aria-label={t("product.increase")}
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-display text-base font-semibold">
                      {formatPrice(lineTotal, product.currency)}
                    </span>
                    <button
                      onClick={() => remove(product.id)}
                      className="text-muted-foreground hover:text-destructive"
                      aria-label={t("cart.remove")}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-md border border-border bg-card p-6">
          <h2 className="font-display text-lg font-semibold">{t("cart.summary")}</h2>
          <Separator className="my-4" />
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">{t("cart.subtotal")}</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">{t("cart.shipping")}</dt>
              <dd>{subtotal >= 1500 ? t("common.free") : formatPrice(99)}</dd>
            </div>
          </dl>
          <Separator className="my-4" />
          <div className="flex justify-between">
            <span className="font-display text-base font-semibold">{t("cart.total")}</span>
            <span className="font-display text-base font-semibold">
              {formatPrice(subtotal + (subtotal >= 1500 ? 0 : 99))}
            </span>
          </div>
          <Button asChild size="lg" className="mt-6 w-full">
            <Link to="/checkout">{t("cart.checkout")}</Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="mt-2 w-full">
            <Link to="/shop">{t("cart.continue")}</Link>
          </Button>
        </aside>
      </section>
    </SiteLayout>
  );
};

export default Cart;
