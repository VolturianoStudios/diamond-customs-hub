import { useEffect, useState } from "react";
import { ExternalLink, Loader2, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCartStore } from "@/stores/cartStore";
import { formatShopifyPrice } from "@/lib/shopify";

interface CartDrawerProps {
  trigger: React.ReactNode;
}

export const CartDrawer = ({ trigger }: CartDrawerProps) => {
  const [open, setOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } =
    useCartStore();
  const { t } = useTranslation();

  useEffect(() => {
    if (open) syncCart();
  }, [open, syncCart]);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce(
    (s, i) => s + parseFloat(i.price.amount) * i.quantity,
    0,
  );
  const currencyCode = items[0]?.price.currencyCode ?? "SEK";

  const handleCheckout = () => {
    const url = getCheckoutUrl();
    if (url) {
      window.open(url, "_blank");
      setOpen(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="flex h-full w-full flex-col sm:max-w-lg">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle>{t("cart.title")}</SheetTitle>
          <SheetDescription>
            {totalItems === 0
              ? t("cart.emptyText")
              : t("shop.productsCount", { count: totalItems })}
          </SheetDescription>
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col pt-6">
          {items.length === 0 ? (
            <div className="flex flex-1 items-center justify-center">
              <div className="text-center">
                <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">{t("cart.emptyText")}</p>
              </div>
            </div>
          ) : (
            <>
              <div className="min-h-0 flex-1 overflow-y-auto pr-2">
                <div className="space-y-4">
                  {items.map((item) => {
                    const img = item.product.node.images.edges[0]?.node;
                    return (
                      <div key={item.variantId} className="flex gap-4 rounded-md border border-border p-3">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                          {img && (
                            <img
                              src={img.url}
                              alt={item.product.node.title}
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="truncate font-medium">{item.product.node.title}</h4>
                          {item.selectedOptions.length > 0 &&
                            item.variantTitle !== "Default Title" && (
                              <p className="text-xs text-muted-foreground">
                                {item.selectedOptions.map((o) => o.value).join(" • ")}
                              </p>
                            )}
                          <p className="mt-1 font-semibold">{formatShopifyPrice(item.price)}</p>
                        </div>
                        <div className="flex flex-shrink-0 flex-col items-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => removeItem(item.variantId)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-6 text-center text-sm">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex-shrink-0 space-y-4 border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">{t("cart.total")}</span>
                  <span className="font-display text-xl font-bold">
                    {formatShopifyPrice({
                      amount: totalPrice.toString(),
                      currencyCode,
                    })}
                  </span>
                </div>
                <Button
                  onClick={handleCheckout}
                  className="w-full"
                  size="lg"
                  disabled={items.length === 0 || isLoading || isSyncing}
                >
                  {isLoading || isSyncing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {t("cart.checkout")}
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
