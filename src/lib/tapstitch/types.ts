/** Subset of Tapstitch Open Platform types used by GTTW routes. */

export type Money = {
  amount?: string;
  currency?: string;
};

export type TapstitchImage = {
  url?: string;
  width?: number;
  height?: number;
};

export type TapstitchColor = {
  id?: string;
  name?: string;
  hex?: string;
};

export type TapstitchCatalogVariant = {
  id: string;
  catalog_product_id?: string;
  color?: TapstitchColor;
  size?: string;
  production_days?: { min?: number; max?: number } | null;
};

export type TapstitchCatalogProduct = {
  id: string;
  style_code?: string;
  title?: string;
  description?: string | null;
  status?: string;
  price?: Money;
  main_image?: TapstitchImage | null;
  media?: Array<{ type?: string; url?: string }>;
  colors?: TapstitchColor[];
  sizes?: string[];
  variants?: TapstitchCatalogVariant[];
};

export type FrontendProduct = {
  id: string;
  styleCode: string | null;
  title: string;
  description: string | null;
  status: string | null;
  price: { amount: string; currency: string } | null;
  mockups: string[];
  colors: Array<{ id: string | null; name: string | null; hex: string | null }>;
  sizes: string[];
  variants: Array<{
    id: string;
    catalogProductId: string | null;
    size: string | null;
    colorId: string | null;
    colorName: string | null;
  }>;
};

export type CheckoutLineItem = {
  catalogVariantId: string;
  designId: string;
  quantity: number;
};

export type CheckoutShippingAddress = {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  country: string;
  state?: string;
  address1: string;
  address2?: string;
  city: string;
  district?: string;
  zip: string;
};

/** Body accepted by POST /api/tapstitch/orders */
export type CreateOrderPayload = {
  externalId?: string;
  shippingAddress: CheckoutShippingAddress;
  lineItems: CheckoutLineItem[];
  fulfillmentCenter?: "international" | "usa";
  shippingTypeId: number;
  /** Optional Idempotency-Key forwarded to Tapstitch */
  idempotencyKey?: string;
};

export type TapstitchProblem = {
  type?: string;
  status?: number;
  title?: string;
  detail?: string;
  instance?: string;
};
