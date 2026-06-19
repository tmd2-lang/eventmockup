# LIGO v1 archive

Frozen snapshot of the v1 demo era before the v2 strip (tag: `v1-final`).

## What lived here

- **Night Preview** — N1–N10 aurora intensity + CN preview flag
- **Connection Night** — person slides, vibe/spark/pass, demo rosters
- **Orbit / Meetup** — `MockBackend`, `OrbitSheet`, meetup invite flow
- **Games Hub** — trivia, ranking, soundmoji (`gameQuestions`, `gameState`)
- **Wrapped / legacy connection** — parked home modes in `HomeScreen.v1.tsx`

## Recovering code

```bash
git show v1-final:path/to/file
# or browse this folder — paths mirror the old app tree
```

Do not import from `archive/v1` in the live v2 app. Port pieces intentionally when building new slices.
