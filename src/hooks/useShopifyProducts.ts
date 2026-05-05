import { useQuery } from "@tanstack/react-query";
import {
  PRODUCTS_QUERY,
  PRODUCT_BY_HANDLE_QUERY,
  storefrontApiRequest,
  type ShopifyProduct,
  type ShopifyProductNode,
} from "@/lib/shopify";

export function useShopifyProducts(query?: string, first = 100) {
  return useQuery({
    queryKey: ["shopify-products", query, first],
    queryFn: async () => {
      const data = await storefrontApiRequest<{
        products: { edges: ShopifyProduct[] };
      }>(PRODUCTS_QUERY, { first, query: query ?? null });
      return data?.data?.products?.edges ?? [];
    },
    staleTime: 60_000,
  });
}

export function useShopifyProduct(handle: string | undefined) {
  return useQuery({
    queryKey: ["shopify-product", handle],
    enabled: !!handle,
    queryFn: async () => {
      const data = await storefrontApiRequest<{ product: ShopifyProductNode | null }>(
        PRODUCT_BY_HANDLE_QUERY,
        { handle },
      );
      return data?.data?.product ?? null;
    },
    staleTime: 60_000,
  });
}
