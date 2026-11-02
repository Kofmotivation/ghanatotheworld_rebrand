# Tapstitch — frontend guidance (GTTW)

## Feature flag

Backend routes return **503** with `{ configured: false }` until:

- `TAPSTITCH_ENABLED=true`
- `TAPSTITCH_ACCESS_TOKEN` (Developer Portal private token)

Do not block page render on Tapstitch. Treat the shop catalog as optional until Kofi enables env in Vercel.

## Fetch catalog

```ts
// GET /api/tapstitch/products?status=active&limit=50
type FrontendProduct = {
  id: string;
  title: string;
  price: { amount: string; currency: string } | null;
  mockups: string[];
  colors: Array<{ id: string | null; name: string | null; hex: string | null }>;
  sizes: string[];
  variants: Array<{
    id: string; // ← catalog_variant_id for checkout
    catalogProductId: string | null;
    size: string | null;
    colorId: string | null;
    colorName: string | null;
  }>;
};

async function fetchProducts() {
  const res = await fetch("/api/tapstitch/products?status=active", {
    cache: "no-store",
  });
  if (res.status === 503) return { products: [], configured: false };
  if (!res.ok) throw new Error("catalog failed");
  return res.json() as Promise<{ products: FrontendProduct[]; configured?: boolean }>;
}
```

### SWR (optional)

```ts
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url).then(async (r) => {
    if (r.status === 503) return { products: [], configured: false };
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  });

export function useTapstitchProducts() {
  return useSWR("/api/tapstitch/products?status=active", fetcher, {
    revalidateOnFocus: false,
  });
}
```

`swr` is **not** installed in this repo yet — add it only when wiring the shop UI.

## Variant ID mapping

| UI selection | Tapstitch field | Notes |
| --- | --- | --- |
| Color + size pick | `variants[].id` | This is `catalog_variant_id` on `POST /v1/orders` |
| Product card | `product.id` | Catalog product id (mockups / design areas) |
| Checkout line | `designId` | Numeric string from Tapstitch Design API / portal — **required**; blank blanks cannot be invented |
| Shipping method | `shippingTypeId` | From `POST /v1/orders/shipping-options` (call via a future thin proxy or server action) |

Map UI state → one variant:

```ts
function resolveVariant(
  product: FrontendProduct,
  size: string,
  colorId: string | null,
) {
  return product.variants.find(
    (v) => v.size === size && (colorId == null || v.colorId === colorId),
  );
}
```

## Create order

```ts
await fetch("/api/tapstitch/orders", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    externalId: "gttw-" + crypto.randomUUID(),
    shippingTypeId: 1, // replace with value from shipping-options
    fulfillmentCenter: "international",
    shippingAddress: {
      firstName: "…",
      lastName: "…",
      phone: "…",
      email: "…",
      country: "US",
      address1: "…",
      city: "…",
      zip: "…",
    },
    lineItems: [
      {
        catalogVariantId: variant.id,
        designId: "1234567890", // Tapstitch design id
        quantity: 1,
      },
    ],
    idempotencyKey: crypto.randomUUID(),
  }),
});
```

- **400** — validation / Tapstitch rejected payload  
- **502** — upstream / network after retries  
- **503** — bridge disabled or token missing  

Never send API tokens from the browser; only call GTTW `/api/tapstitch/*`.
