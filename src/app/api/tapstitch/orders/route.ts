import { NextResponse } from "next/server";
import {
  getTapstitchConfig,
  isTapstitchConfigured,
  tapstitchDisabledReason,
} from "@/lib/tapstitch/config";
import { TapstitchError, tapstitchFetch, tapstitchLog } from "@/lib/tapstitch/client";
import type { CreateOrderPayload } from "@/lib/tapstitch/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function badRequest(message: string, details?: unknown) {
  return NextResponse.json({ error: message, details }, { status: 400 });
}

function validatePayload(body: unknown): CreateOrderPayload | NextResponse {
  if (!body || typeof body !== "object") {
    return badRequest("JSON body required");
  }
  const b = body as Record<string, unknown>;
  const shipping = b.shippingAddress as Record<string, unknown> | undefined;
  const lineItems = b.lineItems as unknown[] | undefined;

  if (!shipping || typeof shipping !== "object") {
    return badRequest("shippingAddress is required");
  }
  if (!Array.isArray(lineItems) || lineItems.length < 1) {
    return badRequest("lineItems must be a non-empty array");
  }
  if (typeof b.shippingTypeId !== "number" || b.shippingTypeId < 1) {
    return badRequest(
      "shippingTypeId is required (from POST /v1/orders/shipping-options)",
    );
  }

  const requiredAddr = [
    "firstName",
    "lastName",
    "phone",
    "country",
    "address1",
    "city",
    "zip",
  ] as const;
  for (const key of requiredAddr) {
    if (!shipping[key] || typeof shipping[key] !== "string") {
      return badRequest(`shippingAddress.${key} is required`);
    }
  }

  const mappedItems = [];
  for (const [i, item] of lineItems.entries()) {
    if (!item || typeof item !== "object") {
      return badRequest(`lineItems[${i}] invalid`);
    }
    const li = item as Record<string, unknown>;
    if (typeof li.catalogVariantId !== "string" || !li.catalogVariantId) {
      return badRequest(`lineItems[${i}].catalogVariantId is required`);
    }
    if (typeof li.designId !== "string" || !/^[1-9][0-9]*$/.test(li.designId)) {
      return badRequest(
        `lineItems[${i}].designId is required (Tapstitch design id, numeric string)`,
      );
    }
    const qty = Number(li.quantity);
    if (!Number.isInteger(qty) || qty < 1) {
      return badRequest(`lineItems[${i}].quantity must be an integer ≥ 1`);
    }
    mappedItems.push({
      catalogVariantId: li.catalogVariantId,
      designId: li.designId,
      quantity: qty,
    });
  }

  const country = String(shipping.country).toUpperCase();
  if (!/^[A-Z]{2}$/.test(country)) {
    return badRequest("shippingAddress.country must be ISO-3166 alpha-2");
  }

  return {
    externalId:
      typeof b.externalId === "string" ? b.externalId : undefined,
    shippingAddress: {
      firstName: String(shipping.firstName),
      lastName: String(shipping.lastName),
      phone: String(shipping.phone),
      email: typeof shipping.email === "string" ? shipping.email : undefined,
      country,
      state: typeof shipping.state === "string" ? shipping.state : undefined,
      address1: String(shipping.address1),
      address2:
        typeof shipping.address2 === "string" ? shipping.address2 : undefined,
      city: String(shipping.city),
      district:
        typeof shipping.district === "string" ? shipping.district : undefined,
      zip: String(shipping.zip),
    },
    lineItems: mappedItems,
    fulfillmentCenter:
      b.fulfillmentCenter === "usa" || b.fulfillmentCenter === "international"
        ? b.fulfillmentCenter
        : "international",
    shippingTypeId: b.shippingTypeId as number,
    idempotencyKey:
      typeof b.idempotencyKey === "string" ? b.idempotencyKey : undefined,
  };
}

/**
 * POST /api/tapstitch/orders
 * Creates a Tapstitch order via `POST /v1/orders`.
 *
 * Requires prior Tapstitch design_id per line item (upload designs via
 * Tapstitch Design API / portal). shippingTypeId from shipping-options.
 */
export async function POST(request: Request) {
  const cfg = getTapstitchConfig();
  if (!isTapstitchConfigured(cfg)) {
    return NextResponse.json(
      { error: tapstitchDisabledReason(cfg), configured: false },
      { status: 503 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return badRequest("Invalid JSON body");
  }

  const parsed = validatePayload(json);
  if (parsed instanceof NextResponse) return parsed;

  const tapBody = {
    external_id: parsed.externalId,
    shipping_address: {
      first_name: parsed.shippingAddress.firstName,
      last_name: parsed.shippingAddress.lastName,
      phone: parsed.shippingAddress.phone,
      email: parsed.shippingAddress.email,
      country: parsed.shippingAddress.country,
      state: parsed.shippingAddress.state,
      address1: parsed.shippingAddress.address1,
      address2: parsed.shippingAddress.address2,
      city: parsed.shippingAddress.city,
      district: parsed.shippingAddress.district,
      zip: parsed.shippingAddress.zip,
    },
    line_items: parsed.lineItems.map((li) => ({
      catalog_variant_id: li.catalogVariantId,
      design_id: li.designId,
      quantity: li.quantity,
    })),
    fulfillment_center: parsed.fulfillmentCenter,
    shipping_type_id: parsed.shippingTypeId,
  };

  try {
    const data = await tapstitchFetch(
      "/v1/orders",
      {
        method: "POST",
        body: tapBody,
        idempotencyKey: parsed.idempotencyKey,
        retries: 3,
      },
      cfg,
    );

    tapstitchLog("info", "order_created", {
      hasExternalId: Boolean(parsed.externalId),
      lineItemCount: parsed.lineItems.length,
    });

    return NextResponse.json({ ok: true, data }, { status: 201 });
  } catch (e) {
    if (e instanceof TapstitchError) {
      if (e.status === 400) {
        return NextResponse.json(
          { error: e.message, problem: e.problem },
          { status: 400 },
        );
      }
      tapstitchLog("error", "order_create_failed", { status: e.status });
      return NextResponse.json(
        { error: e.message, problem: e.problem },
        { status: 502 },
      );
    }
    tapstitchLog("error", "order_create_unexpected");
    return NextResponse.json(
      { error: "Failed to create Tapstitch order" },
      { status: 502 },
    );
  }
}
