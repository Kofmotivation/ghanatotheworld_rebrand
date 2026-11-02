import type {
  FrontendProduct,
  TapstitchCatalogProduct,
} from "@/lib/tapstitch/types";

/** Map Tapstitch catalog product → frontend-friendly shape. */
export function mapCatalogProduct(
  product: TapstitchCatalogProduct,
): FrontendProduct {
  const mockups = [
    product.main_image?.url,
    ...(product.media || []).map((m) => m.url),
  ].filter((u): u is string => Boolean(u));

  const uniqueMockups = [...new Set(mockups)];

  return {
    id: product.id,
    styleCode: product.style_code ?? null,
    title: product.title || product.style_code || product.id,
    description: product.description ?? null,
    status: product.status ?? null,
    price: product.price?.amount
      ? {
          amount: product.price.amount,
          currency: product.price.currency || "USD",
        }
      : null,
    mockups: uniqueMockups,
    colors: (product.colors || []).map((c) => ({
      id: c.id ?? null,
      name: c.name ?? null,
      hex: c.hex ?? null,
    })),
    sizes: product.sizes || [],
    variants: (product.variants || []).map((v) => ({
      id: v.id,
      catalogProductId: v.catalog_product_id ?? product.id,
      size: v.size ?? null,
      colorId: v.color?.id ?? null,
      colorName: v.color?.name ?? null,
    })),
  };
}
