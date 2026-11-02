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
  /** True when ACCESS_TOKEN was set but contains non-ASCII (invalid for HTTP headers). */
  tokenInvalid: boolean;
};

function truthy(v: string | undefined): boolean {
  if (!v) return false;
  return ["1", "true", "yes", "on"].includes(v.trim().toLowerCase());
}

/** HTTP header values must be ByteString (code points ≤ 255). */
function isHeaderSafe(value: string): boolean {
  for (let i = 0; i < value.length; i++) {
    if (value.charCodeAt(i) > 255) return false;
  }
  return true;
}

export function getTapstitchConfig(): TapstitchConfig {
  const rawToken =
    process.env.TAPSTITCH_ACCESS_TOKEN?.trim() ||
    process.env.TAPSTITCH_API_TOKEN?.trim() ||
    null;

  // Reject tokens with Unicode (e.g. pasted “Portal → API”) — fetch would throw ByteString errors.
  const tokenInvalid = Boolean(rawToken && !isHeaderSafe(rawToken));
  const accessToken =
    rawToken && !tokenInvalid ? rawToken : null;

  return {
    enabled: truthy(process.env.TAPSTITCH_ENABLED),
    baseUrl: (
      process.env.TAPSTITCH_API_BASE_URL?.trim() || TAPSTITCH_DEFAULT_BASE_URL
    ).replace(/\/+$/, ""),
    accessToken,
    storeId: (() => {
      const v = process.env.TAPSTITCH_STORE_ID?.trim() || null;
      return v && isHeaderSafe(v) ? v : null;
    })(),
    webhookSecret: process.env.TAPSTITCH_WEBHOOK_SECRET?.trim() || null,
    webhookPublicKey: process.env.TAPSTITCH_WEBHOOK_PUBLIC_KEY?.trim() || null,
    tokenInvalid,
  };
}

/** Ready for outbound Partner API calls (not just feature-flagged). */
export function isTapstitchConfigured(cfg = getTapstitchConfig()): boolean {
  return cfg.enabled && Boolean(cfg.accessToken) && !cfg.tokenInvalid;
}

export function tapstitchDisabledReason(cfg = getTapstitchConfig()): string {
  if (!cfg.enabled) {
    return "Tapstitch is disabled. Set TAPSTITCH_ENABLED=true in Vercel env.";
  }
  if (cfg.tokenInvalid) {
    return "TAPSTITCH_ACCESS_TOKEN contains non-ASCII characters (often a pasted “→”). Re-paste only the raw private token from the Developer Portal.";
  }
  if (!cfg.accessToken) {
    return "Tapstitch access token missing. Set TAPSTITCH_ACCESS_TOKEN (Developer Portal private token).";
  }
  return "Tapstitch is not configured.";
}
