# Investor demo (archived)

Retired from the live Next.js app on 2026-06-05. Kept here in case we revive a one-off investor/storyboard export.

## What’s in here

- `app/investor-demo/` — standalone storyboard UI (was `/investor-demo`)
- `app/export-*` — slide/horoscope/gracestreet export routes
- `scripts/` — puppeteer/capture helpers
- `screenshots/` — generated slide PNGs
- `micah-investor-demo-updated.html` — static HTML snapshot

## To revive (roughly)

1. Copy `app/*` back under project `app/`
2. Re-export `EVENTS` etc. from `components/EventsScreen.tsx` if needed
3. Add deps: `puppeteer`, `html-to-image`
4. Run capture scripts from repo root with dev server up

Not wired to Supabase canon or Connection Night — demo-only.
