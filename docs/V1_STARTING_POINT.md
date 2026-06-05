# v1 starting point — empty data canvas

v1 is a **clean slate** for building new product experiments. The UI shell, nine demo profiles, and profile-rich presentation data stay in TypeScript. Canon content tables (daily answers, connection roster, home feed, wrapped) are **not** seeded — APIs return empty 200 bundles and the UI shows soft empty states.

**v0** (tag `v0-demo-mockup`) remains the frozen full-canon demo. See [DEPLOY_V0.md](./DEPLOY_V0.md) for deploying that snapshot.

---

## Philosophy

| Layer | v0 | v1 |
|-------|----|----|
| Supabase project | Existing project with full canon | **New** project, profiles only |
| Daily / Connection / Home APIs | Full spreadsheet data | Empty bundles (`meta.empty: true`) |
| Profile UI blobs | `lib/users.tsx` | Same — unchanged |
| Canon import scripts | `archive/v0/scripts/` | Not used on v1 branch |

v1 lets you add features (new tables, real auth, live Wrapped, etc.) without touching the frozen v0 demo or its Supabase data.

---

## Setup (local)

### 1. Create a new Supabase project

Create a fresh project in the [Supabase dashboard](https://supabase.com/dashboard). Do **not** reuse the v0 project.

### 2. Apply the v1 migration

Run `supabase/migrations/001_v1_profiles_only.sql` against the new project (SQL editor or `npm run db:migrate` with `DATABASE_URL` set).

This creates only the `profiles` table with public read RLS.

### 3. Configure `.env.local` for v1

Point at the **new** project:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<your-v1-project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<v1-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<v1-service-role-key>
```

Keep a separate copy of v0 keys (e.g. `.env.local.v0`) if you still run the frozen demo locally.

### 4. Seed profiles

```bash
npm run import:profiles
```

Dry run first if you like:

```bash
npm run import:profiles:dry
```

This inserts the nine demo profiles from `scripts/canon/constants.ts` → `PROFILE_IDENTITY`.

### 5. Run the app

```bash
npm run dev
```

Switch profiles from the home top bar. Expect:

- **Daily Pick** — “Today's question coming soon”
- **News / Near you** — “Nothing here yet”
- **Connection Night** — empty roster message (no carousel)
- **Wrapped** — “No wrapped data yet”
- **Profile answer trail** — “No answers yet”

APIs return HTTP 200 with empty payloads when content tables are missing or empty.

---

## Deploy v1 (optional)

Deploy from branch `v1` with v1 Supabase env vars on Vercel (or similar). Do not point a v1 deployment at the v0 Supabase project.

**v0 production URL** (when deployed): _paste confirmed URL here after deploy_

---

## Restoring full canon locally

To run the full spreadsheet demo again:

1. Checkout tag `v0-demo-mockup` or branch `cursor/supabase-canon-connection-night`
2. Swap `.env.local` to v0 Supabase keys
3. Use scripts under `archive/v0/scripts/` and migrations under `archive/v0/supabase/`

Do not move or delete tag `v0-demo-mockup`.
