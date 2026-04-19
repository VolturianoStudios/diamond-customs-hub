import { ProductCard } from "./ProductCard";
import type { Product } from "@/data/types";

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
}

export const ProductGrid = ({ products, emptyMessage = "No products found." }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center rounded-md border border-dashed border-border">
        <p className="text-sm text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};
