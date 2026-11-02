import { NextResponse } from "next/server";
import {
  getTapstitchConfig,
  isTapstitchConfigured,
  tapstitchDisabledReason,
} from "@/lib/tapstitch/config";
import { TapstitchError, tapstitchFetch, tapstitchLog } from "@/lib/tapstitch/client";
import { mapCatalogProduct } from "@/lib/tapstitch/map";
import type { TapstitchCatalogProduct } from "@/lib/tapstitch/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type CatalogListResponse = {
  products?: TapstitchCatalogProduct[];
  paging?: { page?: number; limit?: number; total?: number };
};

/**
 * GET /api/tapstitch/products
 * Proxies Tapstitch `GET /v1/catalog/products` → frontend-friendly JSON.
 * Query: fulfillment_center, status, style_code, page, limit
 */
export async function GET(request: Request) {
  const cfg = getTapstitchConfig();
  if (!isTapstitchConfigured(cfg)) {
    return NextResponse.json(
      { error: tapstitchDisabledReason(cfg), configured: false },
      { status: 503 },
    );
  }

  const { searchParams } = new URL(request.url);
  const query = {
    fulfillment_center: searchParams.get("fulfillment_center") || undefined,
    status: searchParams.get("status") || "active",
    style_code: searchParams.get("style_code") || undefined,
    page: searchParams.get("page") || undefined,
    limit: searchParams.get("limit") || undefined,
  };

  try {
    const data = await tapstitchFetch<CatalogListResponse>(
      "/v1/catalog/products",
      { method: "GET", query },
      cfg,
    );

    const products = (data.products || []).map(mapCatalogProduct);

    return NextResponse.json({
      products,
      paging: data.paging ?? null,
      source: "tapstitch",
    });
  } catch (e) {
    if (e instanceof TapstitchError) {
      // Map auth / upstream failures to 502; keep 400 for bad query-shaped upstream errors.
      const status =
        e.status === 400 ? 400 : e.status === 503 ? 503 : 502;
      tapstitchLog("error", "products_proxy_failed", { status: e.status });
      return NextResponse.json(
        {
          error: e.message,
          problem: e.problem,
        },
        { status },
      );
    }
    tapstitchLog("error", "products_proxy_unexpected");
    return NextResponse.json(
      { error: "Failed to fetch Tapstitch catalog" },
      { status: 502 },
    );
  }
}
