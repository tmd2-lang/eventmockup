# Deploy v0 to Vercel (ligo-v0)

Frozen demo tag: **`v0-demo-mockup`** (commit `51063f4`).

Uses the **existing v0 Supabase project** (full canon data). Do not point this deployment at the v1 Supabase project.

## 1. Import project

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import GitHub repo **`tmd2-lang/ligo-home-mockup`**
3. Project name: **`ligo-v0`**

## 2. Git settings

- **Production Branch:** create a branch from tag or deploy from tag `v0-demo-mockup`
  - Option A: In Vercel → Settings → Git → set Production Branch to `cursor/supabase-canon-connection-night` at commit `51063f4` (same as tag)
  - Option B: Create branch `v0-release` at tag and use that as production branch

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

Paste the production URL into `docs/V1_STARTING_POINT.md` when confirmed.
