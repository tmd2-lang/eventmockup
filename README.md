# LIGO — Home Screen Mockup

An interactive, clickable prototype of the **LIGO** home screen — a music-first
social app for college students. One page, a phone frame, and a segmented
toggle that switches three **day-states** (Normal / Connection / Wrapped).

Built faithfully from the Ligo design system (`ligo-design-system/project/`):
exact colors, fonts (Bricolage Grotesque), radii, shadows, and spacing are
ported into the Tailwind config and `app/globals.css`.

## Stack

- **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS** + ESLint
- No backend, no database, no `localStorage` — all state is client-side `useState`
- Deployable on **Vercel** out of the box

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build (must pass cleanly)
npm start       # serve the production build
```

## What's on screen

A phone frame with two tabs (Home and Events), switched from the bottom bar.

**Home** manages three states internally — no top toggle. You reach them through
the in-app "This week on Ligo" cards:

- **Normal** — the daily pick (open question you answer + lock in), a live reveal
  countdown, the "This week on Ligo" Connections/Wrapped teasers, a "your artists
  this week" news strip, and a "near you" shows block.
- **Connection** — a full-screen **"Tonight's Reveal"**: a sealed opening moment,
  then a story-style carousel of the people who picked the same song as you. Tap
  right/left (or swipe) and **Vibe**, **Spark**, or pass; a summary slide lets you
  plan a hang. No DMs — a Spark stays anonymous until it's mutual.
- **Wrapped** — a full-screen Wrapped story (horoscope → stat slides → share).

**Events tab** — the LIGO v3 Events screen: a music-first feed (on-campus groups ·
City · DC venues · cross-campus shows), Music / Everything-else segments, filters,
taste-match %, an event detail view with RSVP, and a create-event sheet.

Bottom nav: **Events · Home · Profile** (Home centered) — Home and Events are
wired; Profile is a parked placeholder.

## Editing copy & mock data (no code needed)

Home content lives in the data arrays near the top of
**[`components/HomeScreen.tsx`](components/HomeScreen.tsx)** — `NEWS` (news strip),
`SYNCED` (synced library), `SHOWS` (near-you), `PEOPLE` (reveal), the Wrapped stat
slides, and `VENUES` (meetup). Event listings live in the `EVENTS` array near the
top of **[`components/EventsScreen.tsx`](components/EventsScreen.tsx)**. Change a
string or number, save, and it updates on screen.

## Project structure

```
app/
  layout.tsx        root layout + global CSS (globals + home + events)
  page.tsx          the single page — tabs, phone, home/events
  globals.css       @font-face + design tokens + semantic type classes
  home.css          home animations (countdown, reveal, wrapped, meetup)
  events.css        LIGO v3 Events styles, namespaced under .ligo-events
  login/            password-gate prompt page
  api/auth/         password-gate verify route (sets the cookie)
components/
  Primitives.tsx    LigoMark, Icon registry, Eyebrow, Avatar, NowPip, Button…
  IOSDevice.tsx     the iPhone frame (status bar, island, home indicator)
  HomeScreen.tsx    the home interface — normal / connection / wrapped + meetup
  EventsScreen.tsx  LIGO v3 Events tab (feed, detail, RSVP, create sheet)
  BottomNav.tsx     Events · Home · Profile bottom bar (supports a dark variant)
lib/
  authConfig.ts     shared cookie name + expiry for the password gate
public/
  artists/  schools/  fonts/  logo-mark.svg
middleware.ts       site-wide password gate
```

## Recreated (not in the original design folder)

These were built from brand tokens because the source kit didn't include them:

- **Sonic-match progress bar** (Connections) — orange→yellow fill on a hairline track.
- **"Games" tab icon** — the kit has 3 tabs; this needed 4. Drawn to the same 2px round-stroke spec.
- **Bottom-sheet shell** — the kit defines the `--el-sheet` shadow but ships no sheet component.
- **Countdown timer** — uses the kit's type; the ticking logic is new.

Everything else traces directly to `colors_and_type.css` and the `ui_kits/` components.

## Deploy to Vercel

See the push + deploy commands in the handoff notes, or:

1. Push this folder to a GitHub repo.
2. Import the repo at [vercel.com/new](https://vercel.com/new) — Vercel auto-detects Next.js.
3. Click **Deploy**. No environment variables needed.
