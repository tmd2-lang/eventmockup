# Ligo demo backend — implementation plan

Goal: move **canon content** out of TypeScript into **Supabase**, so the app reads one source of truth. No Receipts easter eggs, no Connection Night UI yet — **storage + import + thin read layer first**.

---

## Import rules (canon)

1. **Scores and copy are verbatim** — the import script reads Excel cells only; it never computes overlap, match counts, or scores.
2. **`answer_kind` comes from the question** — copied from `daily_questions.answer_type` (`Song` / `Artist` / `Genre` → `song` / `artist` / `genre`); never inferred from `answer_text`.
3. **All 9 profiles** — including `marcus`, even if app UI is not fully wired yet.
4. **`connection_roster` is self-contained** — full denormalized fields per row, copied from the Connection Night (per viewer) sheet. This is the runtime source for Connection Night.
5. **`connection_pairs` is reference only** — populated from Unique Connections; the app reads Connection Night from `connection_roster` only (no runtime join required).

Optional: parse `artist` / `title` from `answer_text` when it contains ` — ` (display convenience only).

---

## Canon row counts (verified)

| Table | Rows |
|-------|------|
| `profiles` | 9 |
| `daily_questions` | 28 |
| `daily_answers` | 252 (28 × 9) |
| `connection_pairs` | 16 |
| `connection_roster` | 29 |

---

## 1. Principles

| Rule | Why |
|------|-----|
| **28-day matrix + Connection Seed = canon** | Old matching doc scores are dead |
| **Assets stay in `public/`** | DB stores paths only (`/covers/...`, `/assets/...`) |
| **Demo content is public-read** | No real users yet; password gate stays on the app |
| **Session stuff stays local for v1** | `activeUserId`, daily answer, vibe/spark → `localStorage` until phase 4 |
| **Import from Excel, not hand-typed SQL** | One script, re-runnable when sheets change |
| **Don't migrate everything day one** | Canon first, then catalogs, then profile blobs |

---

## 2. Supabase project setup

**You do (dashboard):**

1. Create project at [supabase.com](https://supabase.com) (name e.g. `ligo-demo`)
2. Save **Project URL** + **anon key** (app) + **service role key** (import script only — never in client)
3. Add to repo `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...   # scripts only, gitignored
```

**We do (repo):**

- `supabase/migrations/001_initial_schema.sql`
- `supabase/seed/` or `scripts/import-canon.ts` (reads xlsx → upserts)
- `lib/supabase/client.ts` (browser)
- `lib/supabase/server.ts` (optional, for API routes)
- `.env.example` documenting vars

No Supabase CLI required initially — run migration SQL in dashboard **SQL Editor**, run import script locally.

---

## 3. Database schema (phase 1 — canon only)

### `profiles`

Cast identity. One row per demo student.

| Column | Type | Notes |
|--------|------|--------|
| `id` | text PK | `jordan`, `cole`, `marcus` — slug, not UUID |
| `display_name` | text | Jordan D. |
| `first_name` | text | Jordan |
| `year_level` | text | Senior |
| `pronouns` | text | He/Him |
| `school` | text | Georgetown |
| `archetype_name` | text | The Hypnotist |
| `archetype_id` | text | `hypnotist` — links to UI |
| `avatar_url` | text | `/assets/Jordan-profile.png` |
| `gradient` | text | CSS gradient string |
| `hot_take` | text | |
| `behavioral_note` | text | From Profiles sheet in 28-day workbook |
| `sort_order` | int | Switcher order in app |
| `created_at` | timestamptz | |

**Seed from:** Profiles sheet + minimal fields from `users.tsx` identity block. Marcus included when you add him.

---

### `daily_questions`

28 rows — the question calendar.

| Column | Type | Notes |
|--------|------|--------|
| `day_number` | int PK | 1–28 |
| `scheduled_date` | date | From Question Bank |
| `weekday` | text | Friday |
| `question_type` | text | Context \| Emotional \| Playful \| Discovery |
| `answer_type` | text | Song \| Artist \| Genre |
| `question_text` | text | Full prompt |
| `original_number` | int | Pre-shuffle # from Question Bank (optional) |

**Seed from:** Daily Answer Matrix + Question Bank sheets.

---

### `daily_answers`

252 rows (28 × 9 profiles).

| Column | Type | Notes |
|--------|------|--------|
| `id` | uuid PK | default gen |
| `day_number` | int FK → `daily_questions` | |
| `profile_id` | text FK → `profiles` | |
| `answer_text` | text | Raw cell: `Morgan Wallen` or `Kill Bill — SZA` |
| `answer_kind` | text | song \| artist \| genre — denormalized from question |
| `artist` | text | Parsed, nullable |
| `title` | text | Parsed, nullable |
| `cover_url` | text | Nullable — filled in phase 2 via catalog lookup |

**Unique:** `(day_number, profile_id)`

**Seed from:** Daily Answer Matrix columns H–P.

**Parsing rule:** If `answer_text` contains ` — ` → split title / artist; else whole string maps to artist or genre based on `answer_type`.

---

### `connection_pairs`

Unique relationships (~15 rows). Undirected — store with consistent ordering (`profile_a_id` < `profile_b_id` alphabetically by id).

| Column | Type | Notes |
|--------|------|--------|
| `profile_a_id` | text FK | |
| `profile_b_id` | text FK | |
| `score` | int | 95, 79, … |
| `match_type` | text | Twin \| Bridge |
| `shared_lane` | text | Red Dirt country |
| `headline_overlap` | text | Both said Morgan Wallen (Day 14) |
| `why_copy` | text | Connection Night copy |

**PK:** `(profile_a_id, profile_b_id)`

**Seed from:** Unique Connections sheet.

---

### `connection_roster`

Who each viewer sees, ranked (Connection Night carousel order).

| Column | Type | Notes |
|--------|------|--------|
| `viewer_id` | text FK → `profiles` | |
| `rank` | int | 1–4 |
| `match_id` | text FK → `profiles` | |
| `score` | int | Denormalized from pair for fast reads |
| `match_type` | text | Denormalized |
| `shared_lane` | text | |
| `headline_overlap` | text | |
| `why_copy` | text | |

**Unique:** `(viewer_id, rank)` and `(viewer_id, match_id)`

**Seed from:** Connection Night (per viewer) sheet.

---

## 4. Database schema (phase 2 — app content, after canon works)

### `profile_content`

One JSON row per profile — **entire** `users.tsx` profile block minus identity (already in `profiles`).

| Column | Type |
|--------|------|
| `profile_id` | text PK FK |
| `content` | jsonb |

Includes: answerTrail (temporary until derived from `daily_answers`), playlist, notifications, streaks, etc.

**Why JSON first:** Fast migration; split into tables later if needed.

---

### `catalog_songs`

Library search / daily pick autocomplete.

| Column | Type |
|--------|------|
| `id` | uuid PK |
| `profile_id` | text FK |
| `artist` | text |
| `title` | text |
| `album` | text |
| `cover_url` | text |
| `bucket` | text |
| `audio_src` | text nullable |

**Index:** `(profile_id)`, optional full-text on title/artist.

**Seed from:** existing `lib/*-catalog.ts` via one export script.

---

### `home_news`, `home_shows`, `wrapped_stories` (phase 3)

One table each, `profile_id` + sort + JSON or flat columns. Pulled from `HomeScreen.tsx` when you're ready to kill inline arrays.

---

## 5. What we are **not** storing yet

| Item | Where for now |
|------|----------------|
| Photos, MP3s, covers | `public/` |
| Demo session (who you're viewing, vibe/spark) | `localStorage` |
| Password gate | Existing cookie middleware |
| Receipts / Answer Trail UI logic | Code later, reads `daily_answers` |
| Real users / auth | Future |

---

## 6. Row Level Security (RLS)

For demo v1:

```sql
-- All canon tables: public read, no client write
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read" ON profiles FOR SELECT USING (true);

-- Same pattern for daily_questions, daily_answers,
-- connection_pairs, connection_roster, profile_content, catalog_songs
```

Writes only via **service role** in import script. No anon insert/update.

When you add real users later: new tables (`user_answers`, `connection_actions`) with proper RLS — don't bolt auth onto demo seed tables.

---

## 7. Import pipeline

```
Ligo_28_Day_Daily_Answers_Matrix.xlsx  ──┐
Ligo_Connection_Seed.xlsx              ──┼──► scripts/import-canon.ts
                                         │         │
                                         │         ▼
                                         │    Supabase (service role)
                                         │         upsert
                                         └──► profiles, daily_questions,
                                              daily_answers, connection_*
```

**Script responsibilities:**

1. Map display names → slug ids (`Jordan D.` → `jordan`, `Alessia C.` → `alessia`)
2. Parse answers into artist/title where possible
3. Normalize connection pairs (a < b)
4. Idempotent **upsert** — safe to re-run after Excel edits
5. Print summary: row counts, missing profiles, parse failures

**Phase 2 script:** `import-catalogs.ts`, `import-profile-content.ts` from TS files.

---

## 8. App read layer (thin, after import)

```
lib/supabase/
  client.ts          # createBrowserClient
  types.ts           # generated or hand-written Database type
  queries/
    profiles.ts      # getProfiles(), getProfile(id)
    daily.ts         # getQuestion(day), getAnswers(profileId), getWeek(profileId, days)
    connections.ts   # getRoster(viewerId), getPair(a, b)
```

**No UI rewiring in phase 1** — optional API route or dev page that proves data loads:

`GET /api/dev/canon?profile=cole` → returns profile + 28 answers + connection roster

Then migrate screens one at a time.

---

## 9. Build order (execution phases)

| Phase | Deliverable | Done when |
|-------|-------------|-----------|
| **0** | Supabase project + env vars | Dashboard live |
| **1a** | Migration SQL (5 canon tables) | Tables exist |
| **1b** | `import-canon.ts` + run | 28 + 252 + pairs + roster in DB |
| **1c** | `lib/supabase/client` + dev query | `/api/dev/canon` returns Cole correctly |
| **2a** | `profile_content` + import from `users.tsx` | Profile tab can read from DB (optional swap) |
| **2b** | `catalog_songs` + import | Search reads from DB for one profile |
| **3** | Wire HomeScreen Connection Night to `connection_roster` | One viewer (e.g. Cole) end-to-end |
| **4** | Wire daily pick + answer trail from `daily_answers` | Last 7 days from DB |
| **5** | `home_news`, `wrapped_stories`, etc. | Home fully off TS blobs |

**Recommendation:** Stop and validate after **1c** before touching UI.

---

## 10. ID mapping (fix once, use everywhere)

| Spreadsheet name | `profiles.id` |
|------------------|---------------|
| Jordan D. | `jordan` |
| Alessia C. | `alessia` |
| Charlotte W. | `charlotte` |
| Cole B. | `cole` |
| Sofia L. | `sofia` |
| Bennett R. | `bennett` |
| Caroline M. | `caroline` |
| Maddie R. | `maddie` |
| Marcus T. | `marcus` |

Single map in import script — same slugs as `ligo:active_user` in the app.

---

## 11. Dependencies to add

```json
"@supabase/supabase-js": "^2.x"
```

Dev only (import script):

```json
"xlsx" or "exceljs"
tsx
```

---

## 12. Success criteria (phase 1 complete)

- [ ] All **9** profiles in `profiles` (including Marcus)
- [ ] **28** questions, **252** answers — spot-check Day 14 Cole + Caroline both Morgan Wallen
- [ ] **16** connection pairs, **29** roster rows — Cole rank 1 = Caroline, score 95, Twin copy verbatim
- [ ] Re-import after Excel edit updates DB without duplicates (`npm run import:canon`)
- [ ] `GET /api/dev/canon?profile=cole` returns profile + 28 answers + roster
- [ ] App UI not rewired yet (stop at 1c)

---

## 13. Repo files (phase 1)

| Path | Purpose |
|------|---------|
| `supabase/migrations/001_initial_schema.sql` | Run once in Supabase SQL Editor |
| `scripts/import-canon.ts` | Verbatim xlsx → Supabase upsert |
| `scripts/canon/constants.ts` | Slug map + profile identity |
| `data/canon/*.xlsx` | Canon spreadsheets |
| `lib/supabase/` | Client, types, queries |
| `app/api/dev/canon/route.ts` | Validation endpoint |
| `.env.example` | Env var template |

**Apply migration:** Supabase Dashboard → SQL → paste `001_initial_schema.sql` → Run.

**Import canon:** copy `.env.example` → `.env.local`, fill keys, then `npm run import:canon`.

---

## 14. What I need from you to run import

1. Supabase project created
2. Migration SQL applied (`001_initial_schema.sql`)
3. `.env.local` with `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`

---

## Bottom line

Phase 1 is five tables, one import script, one read client, one dev endpoint. No Receipts, no easter eggs, no Connection Night UI — just canon in Supabase, verified, then wire the app in bits.
