import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import type { CartItem, Product } from "@/data/types";
import { getProductById } from "@/data/catalog";

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  add: (productId: string, quantity?: number) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  detailed: Array<{ product: Product; quantity: number; lineTotal: number }>;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "diamond-customs-cart";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const detailed = items
      .map((it) => {
        const product = getProductById(it.productId);
        if (!product) return null;
        return { product, quantity: it.quantity, lineTotal: product.price * it.quantity };
      })
      .filter((x): x is { product: Product; quantity: number; lineTotal: number } => x !== null);

    return {
      items,
      detailed,
      itemCount: items.reduce((acc, it) => acc + it.quantity, 0),
      subtotal: detailed.reduce((acc, d) => acc + d.lineTotal, 0),
      add: (productId, quantity = 1) =>
        setItems((prev) => {
          const existing = prev.find((p) => p.productId === productId);
          if (existing) {
            return prev.map((p) =>
              p.productId === productId ? { ...p, quantity: p.quantity + quantity } : p,
            );
          }
          return [...prev, { productId, quantity }];
        }),
      remove: (productId) => setItems((prev) => prev.filter((p) => p.productId !== productId)),
      setQuantity: (productId, quantity) =>
        setItems((prev) =>
          quantity <= 0
            ? prev.filter((p) => p.productId !== productId)
            : prev.map((p) => (p.productId === productId ? { ...p, quantity } : p)),
        ),
      clear: () => setItems([]),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
