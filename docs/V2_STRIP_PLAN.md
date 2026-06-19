# LIGO v2 strip plan

Branch: **`v2`** · Tag before strip: **`v1-final`**

## Live app (v2)

| Surface | Status |
|---------|--------|
| **Home** | Daily pick → 5s countdown → Aurora reveal (5 acts) → replay teaser |
| **Events** | Unchanged |
| **Profile** | 9 Georgetown profiles unchanged |
| **Reveal** | Single pinned night — `ACTIVE_REVEAL_NIGHT` in `lib/revealData.ts` (formerly N1) |

## Removed from live tree (in `archive/v1/`)

- Night Preview toolbar (N1–N10, CN, RST)
- Connection Night acts, orbit, meetup sheets, mock backend
- Games Hub + game question bank
- Wrapped utils + legacy connection/wrapped home modes
- `/api/connection-night`

## Iteration slices (not built yet)

1. CN person slides inside reveal (no orbit/meetup)
2. Tap person → full profile
3. Aurora-style closing on CN nights
4. Mutual vibe/spark → timed messaging window

## Key files

| File | Role |
|------|------|
| `app/page.tsx` | Events · Home · Profile shell |
| `components/HomeScreen.tsx` | Daily pick + countdown orchestrator |
| `components/RevealScreen.tsx` | Five-act Aurora reveal |
| `lib/revealData.ts` | `ACTIVE_REVEAL_NIGHT` |
| `lib/revealConstants.ts` | 5s countdown, demo question |
