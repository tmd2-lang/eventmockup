# Deploy v0 to Vercel (ligo-v0)

**Live:** https://ligo-v0.vercel.app

Frozen demo tag: **`v0-demo-mockup`** (commit `d4f9944`, same as branch **`v0-release`**).

Uses the **existing v0 Supabase project** (full canon data). Do not point this deployment at the v1 Supabase project.

## Current Vercel settings (configured)

- **Project:** `ligo-v0`
- **Production branch:** `v0-release`
- **Env vars (Production):** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (v0 project)

## 1. Import project (one-time)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import GitHub repo **`tmd2-lang/ligo-home-mockup`**
3. Project name: **`ligo-v0`**

## 2. Git settings

- **Production Branch:** `v0-release` (tracks tag `v0-demo-mockup`)

## 3. Environment variables (Production)

| Variable | Value |
|----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | From your v0 `.env.local` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | From your v0 `.env.local` |
| `SITE_PASSWORD` | Optional demo gate password |

Never add `SUPABASE_SERVICE_ROLE_KEY` to Vercel.

## 4. Build settings

- Framework: Next.js
- Build command: `npm run build`
- Install command: `npm install`

## 5. Deploy and verify

After deploy succeeds, smoke test on the production URL:

1. Cole — Daily Pick question, news strip, Connection Night carousel, Wrapped
2. Marcus — Wrapped "The Deep Cut Generalist"
3. Sofia — Wrapped "The Mood Curator"

Paste the production URL into `docs/V1_STARTING_POINT.md` when confirmed: **https://ligo-v0.vercel.app** (done).
