// Core domain types for Diamond Customs.
// Designed to map cleanly onto a future backend (e.g. Lovable Cloud / Supabase).

export type CarBrandSlug =
  | "bmw"
  | "mercedes"
  | "audi"
  | "volvo"
  | "volkswagen";

export type CategorySlug =
  | "badges"
  | "steering-wheels"
  | "multimedia"
  | "door-lights"
  | "ambient-lighting"
  | "cleaning";

export interface CarBrand {
  slug: CarBrandSlug;
  name: string;
  tagline?: string;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number; // in SEK, integer
  compareAtPrice?: number;
  currency: "SEK";
  images: string[]; // public URLs / imported asset paths
  category: CategorySlug;
  brand: CarBrandSlug | "universal";
  tags?: string[];
  inStock: boolean;
  featured?: boolean;
  badge?: string; // e.g. "NEW", "BESTSELLER"
}

export interface CartItem {
  productId: string;
  quantity: number;
}
