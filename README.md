# Ghana To The World (GTTW) — Rebrand

Editorial streetwear / culture site built with Next.js App Router.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion
- Brand photography from gttw.net (Cargo CDN assets, optimized locally)

## Pages

- `/` Home
- `/shop` Collections
- `/lookbook` Editorial
- `/about` Brand story
- `/contact` Socials + note form

## Tapstitch POD API bridge

Server routes proxy the [Tapstitch Open Platform](https://www.tapstitch.com/developers/docs/openapi) (base `https://openapi.tapstitch.com`, Bearer private token from the Developer Portal). Catalog reference: [tapstitch.com/collections/all](https://www.tapstitch.com/collections/all).

| Route | Upstream |
| --- | --- |
| `GET /api/tapstitch/products` | `GET /v1/catalog/products` |
| `POST /api/tapstitch/orders` | `POST /v1/orders` |
| `POST /api/webhooks/tapstitch` | Portal webhook callback |

Shared client: `src/lib/tapstitch/`. OpenAPI snapshot: `docs/tapstitch-openapi.json`. Frontend notes: [`docs/tapstitch-frontend.md`](./docs/tapstitch-frontend.md).

### Feature flag (safe without secrets)

Routes always exist, but outbound calls require:

```bash
TAPSTITCH_ENABLED=true
TAPSTITCH_ACCESS_TOKEN=<Developer Portal private token>
```

If unset, products/orders return **503** `{ configured: false }` — the rest of the site boots normally. **Do not enable in Vercel until Kofi pastes real secrets.**

### Vercel env setup

1. Project → **Settings → Environment Variables**
2. Add (Production + Preview as needed):

| Variable | Required | Purpose |
| --- | --- | --- |
| `TAPSTITCH_ENABLED` | yes to use | `true` / `false` |
| `TAPSTITCH_ACCESS_TOKEN` | yes to use | Bearer private token |
| `TAPSTITCH_STORE_ID` | no | Optional `X-PF-Store-Id` if portal issues store-scoped tokens |
| `TAPSTITCH_API_BASE_URL` | no | Defaults to `https://openapi.tapstitch.com` |
| `TAPSTITCH_WEBHOOK_SECRET` | prod webhooks | Portal webhook `secret_key` (HMAC) |
| `TAPSTITCH_WEBHOOK_PUBLIC_KEY` | no | Portal `public_key` (reserved) |

3. Redeploy after saving env. Keep `TAPSTITCH_ENABLED=false` until tokens are verified.

See `.env.example` for local `.env.local`.

### Local webhook test

1. `npm run dev` (or `vercel dev`)
2. Expose localhost:
   - **Vercel CLI:** `vercel dev` then use the preview URL, or
   - **ngrok:** `ngrok http 3000` → `https://<id>.ngrok.io/api/webhooks/tapstitch`
3. In Tapstitch Developer Portal → Webhooks, set that URL and copy `secret_key` → `TAPSTITCH_WEBHOOK_SECRET`
4. Fire the portal simulator; confirm `GET /api/webhooks/tapstitch` health and `POST` returns `{ received: true }`
5. Confirm signature header name against `signature_sample` (client accepts common `x-tapstitch-signature` / `x-pf-signature` / `x-signature` variants)

### Orders checklist

Orders need Tapstitch `design_id` (numeric) per line item and `shipping_type_id` from `POST /v1/orders/shipping-options`. Designs are created in the portal / Design API — not inventable from the public catalog page alone.
