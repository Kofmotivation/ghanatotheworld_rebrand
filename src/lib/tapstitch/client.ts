import {
  getTapstitchConfig,
  isTapstitchConfigured,
  tapstitchDisabledReason,
  type TapstitchConfig,
} from "@/lib/tapstitch/config";
import type { TapstitchProblem } from "@/lib/tapstitch/types";

export class TapstitchError extends Error {
  status: number;
  problem: TapstitchProblem | null;
  retryable: boolean;

  constructor(
    message: string,
    opts: {
      status: number;
      problem?: TapstitchProblem | null;
      retryable?: boolean;
    },
  ) {
    super(message);
    this.name = "TapstitchError";
    this.status = opts.status;
    this.problem = opts.problem ?? null;
    this.retryable = opts.retryable ?? false;
  }
}

export type TapstitchRequestOptions = {
  method?: string;
  query?: Record<string, string | number | undefined | null>;
  body?: unknown;
  idempotencyKey?: string;
  /** Override default retries (orders use higher). */
  retries?: number;
  signal?: AbortSignal;
};

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function buildUrl(
  baseUrl: string,
  path: string,
  query?: TapstitchRequestOptions["query"],
) {
  const url = new URL(
    path.startsWith("/") ? path : `/${path}`,
    `${baseUrl}/`,
  );
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v === undefined || v === null || v === "") continue;
      url.searchParams.set(k, String(v));
    }
  }
  return url;
}

function isRetryableStatus(status: number) {
  return status === 408 || status === 409 || status === 429 || status >= 500;
}

/** Safe log helper — never prints tokens or full PII payloads. */
export function tapstitchLog(
  level: "info" | "warn" | "error",
  message: string,
  meta?: Record<string, unknown>,
) {
  const line = {
    scope: "tapstitch",
    message,
    ...meta,
  };
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.info(line);
}

/**
 * Shared Tapstitch Partner API client.
 * Injects Bearer auth + optional X-PF-Store-Id; retries with exponential backoff.
 */
export async function tapstitchFetch<T = unknown>(
  path: string,
  options: TapstitchRequestOptions = {},
  cfg: TapstitchConfig = getTapstitchConfig(),
): Promise<T> {
  if (!isTapstitchConfigured(cfg)) {
    throw new TapstitchError(tapstitchDisabledReason(cfg), {
      status: 503,
      retryable: false,
    });
  }

  const method = (options.method || "GET").toUpperCase();
  const retries =
    options.retries ?? (method === "GET" || method === "HEAD" ? 2 : 3);
  const url = buildUrl(cfg.baseUrl, path, options.query);

  let lastError: TapstitchError | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const headers: Record<string, string> = {
      Accept: "application/json",
      Authorization: `Bearer ${cfg.accessToken}`,
    };
    if (cfg.storeId) {
      headers["X-PF-Store-Id"] = cfg.storeId;
    }
    if (options.body !== undefined) {
      headers["Content-Type"] = "application/json";
    }
    if (options.idempotencyKey) {
      headers["Idempotency-Key"] = options.idempotencyKey;
    }

    try {
      const res = await fetch(url, {
        method,
        headers,
        body:
          options.body === undefined ? undefined : JSON.stringify(options.body),
        signal: options.signal,
        cache: "no-store",
      });

      const text = await res.text();
      let data: unknown = null;
      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          data = { raw: text.slice(0, 200) };
        }
      }

      if (res.ok) {
        return data as T;
      }

      const problem =
        data && typeof data === "object"
          ? (data as TapstitchProblem)
          : null;
      const retryable = isRetryableStatus(res.status);
      const err = new TapstitchError(
        problem?.detail ||
          problem?.title ||
          `Tapstitch ${method} ${path} failed (${res.status})`,
        { status: res.status, problem, retryable },
      );

      tapstitchLog("warn", "upstream_error", {
        path,
        method,
        status: res.status,
        attempt,
        retryable,
        problemType: problem?.type,
        requestId: problem?.instance,
      });

      if (!retryable || attempt === retries) {
        throw err;
      }
      lastError = err;
    } catch (e) {
      if (e instanceof TapstitchError) {
        if (!e.retryable || attempt === retries) throw e;
        lastError = e;
      } else {
        const err = new TapstitchError(
          e instanceof Error ? e.message : "Tapstitch network error",
          { status: 502, retryable: true },
        );
        tapstitchLog("warn", "network_error", {
          path,
          method,
          attempt,
        });
        if (attempt === retries) throw err;
        lastError = err;
      }
    }

    // Exponential backoff: 250ms, 500ms, 1000ms… (+ jitter)
    const backoff = 250 * 2 ** attempt + Math.floor(Math.random() * 100);
    await sleep(backoff);
  }

  throw (
    lastError ??
    new TapstitchError("Tapstitch request failed", {
      status: 502,
      retryable: true,
    })
  );
}
