/**
 * Tapstitch Open Platform configuration.
 *
 * Verified from public OpenAPI (2026-11):
 * https://www.tapstitch.com/developers/docs/openapi
 *
 * Auth: Authorization: Bearer {private_token}
 * Base: https://openapi.tapstitch.com
 * Optional store scope: X-PF-Store-Id when portal issues store-scoped tokens
 * (not listed in the public OpenAPI snapshot; harmless if unset)
 *
 * Feature flag: routes stay registered but return 503 when disabled / missing token
 * so the rest of the GTTW site boots without Tapstitch secrets.
 */

export const TAPSTITCH_DEFAULT_BASE_URL = "https://openapi.tapstitch.com";

export type TapstitchConfig = {
  enabled: boolean;
  baseUrl: string;
  accessToken: string | null;
  storeId: string | null;
  webhookSecret: string | null;
  /** Optional PEM / raw public key from portal for webhook signature checks */
  webhookPublicKey: string | null;
};

function truthy(v: string | undefined): boolean {
  if (!v) return false;
  return ["1", "true", "yes", "on"].includes(v.trim().toLowerCase());
}

export function getTapstitchConfig(): TapstitchConfig {
  const accessToken =
    process.env.TAPSTITCH_ACCESS_TOKEN?.trim() ||
    process.env.TAPSTITCH_API_TOKEN?.trim() ||
    null;

  return {
    enabled: truthy(process.env.TAPSTITCH_ENABLED),
    baseUrl: (
      process.env.TAPSTITCH_API_BASE_URL?.trim() || TAPSTITCH_DEFAULT_BASE_URL
    ).replace(/\/+$/, ""),
    accessToken,
    storeId: process.env.TAPSTITCH_STORE_ID?.trim() || null,
    webhookSecret: process.env.TAPSTITCH_WEBHOOK_SECRET?.trim() || null,
    webhookPublicKey: process.env.TAPSTITCH_WEBHOOK_PUBLIC_KEY?.trim() || null,
  };
}

/** Ready for outbound Partner API calls (not just feature-flagged). */
export function isTapstitchConfigured(cfg = getTapstitchConfig()): boolean {
  return cfg.enabled && Boolean(cfg.accessToken);
}

export function tapstitchDisabledReason(cfg = getTapstitchConfig()): string {
  if (!cfg.enabled) {
    return "Tapstitch is disabled. Set TAPSTITCH_ENABLED=true in Vercel env.";
  }
  if (!cfg.accessToken) {
    return "Tapstitch access token missing. Set TAPSTITCH_ACCESS_TOKEN (Developer Portal private token).";
  }
  return "Tapstitch is not configured.";
}
