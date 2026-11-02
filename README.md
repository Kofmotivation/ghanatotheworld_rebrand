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

## Payments (Stripe Checkout)

Cart checkout no longer opens Cargo/`gttw.net`. It creates a **Stripe Checkout Session** via `POST /api/checkout` and redirects to Stripe-hosted pay. Abstraction lives in `src/lib/payments/` (`PAYMENT_PROVIDER=stripe` today; other gateways can plug in later).

| Route | Purpose |
| --- | --- |
| `POST /api/checkout` | Create Checkout Session from cart lines |
| `GET /api/checkout` | Config probe (`configured` / provider) |
| `POST /api/webhooks/stripe` | Payment events (signed) |
| `/checkout/success` | Thank-you + clear cart |

Prices are resolved **server-side** from `src/lib/content.ts` (client amounts are ignored).

### Enable on Vercel

1. [Stripe Dashboard → API keys](https://dashboard.stripe.com/apikeys) → copy **Secret key** (`sk_test_…` then later `sk_live_…`)
2. Vercel → Environment Variables:

| Variable | Value |
| --- | --- |
| `PAYMENTS_ENABLED` | `false` until keys are ready, then `true` |
| `PAYMENT_PROVIDER` | `stripe` |
| `STRIPE_SECRET_KEY` | `sk_…` |
| `STRIPE_WEBHOOK_SECRET` | `whsec_…` (after webhook setup) |
| `NEXT_PUBLIC_SITE_URL` | `https://www.ghanatotheworld.com` |

3. Stripe → Developers → Webhooks → Add endpoint:  
   `https://www.ghanatotheworld.com/api/webhooks/stripe`  
   Events: `checkout.session.completed`, `checkout.session.async_payment_succeeded`  
   Copy signing secret → `STRIPE_WEBHOOK_SECRET`
4. Redeploy. Keep `PAYMENTS_ENABLED=false` until a test payment works in test mode.

Local: put the same vars in `.env.local`, run `npm run dev`, use Stripe CLI `stripe listen --forward-to localhost:3000/api/webhooks/stripe`.
