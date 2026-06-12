# Ligo Reveal Inputs — Product Spec

**Last updated:** June 6, 2026 · **Status:** In Progress · **Audience:** @TJ Dozier @Mekhi  

---

## What the Reveal Is

Every day, users answer one music question. At **8 PM**, a countdown completes and something reveals. That reveal is the core product moment — it happens every single night without exception.

The **inputs** are the content pieces that fill that reveal. Not every input fires every night — some require a user threshold, some require data history, some are always on. The reveal is built from whatever inputs are qualified to fire that night, rotating so it never feels the same.

The sub-expressions within each input are **options, not requirements.** They're ways to make that input richer. Not all of them will ship — they exist so we have a full menu to choose from as we design and build.

---

## The Three Night Types

**Every Night — Reveal Night**

The base. Always happens. The confirmed inputs fill this moment. Most nights are this.

**Random 1–2× per week — Connection Night**

Same reveal format. Cumulative weekly answers surface matches. Vibe (friendship) or spark (romantic). Users never know in advance — prevents gaming, builds anticipation all week. After matching, users can set up events and meet IRL.

**End of Week — Ligo Wrap Night**

Its own distinct moment. Weekly summary of campus and your personal music identity. Entirely separate from the daily reveal.

---

## The Network Effect Number

> **300 DAUs per campus is the inflection point.**
> 

> 
> 

> Below 300, the reveal works but feels early. Above 300, network effects become self-reinforcing — matches improve, breakdowns unlock, cross-campus comparisons become honest. Georgetown target: 300 DAUs within the first 4 weeks of relaunch.
> 

---

## What Fires When — DAU Ladder

| Input | Cold Start (50) | Early (150–200) | Growth (300–500) | Scale (500+) | Status |
| --- | --- | --- | --- | --- | --- |
| Campus Pulse | ✅ On | ✅ On | ✅ On | ✅ On | **Confirmed V1** |
| Personal Standing | ⚠️ Thin | ✅ On | ✅ On | ✅ On | **Confirmed V1** |
| Forward Hook | ✅ On | ✅ On | ✅ On | ✅ On | **Confirmed V1** |
| Campus Mood | ✅ On | ✅ On | ✅ On | ✅ On | **Confirmed V1** |
| Personal Recap Card | ✅ On | ✅ On | ✅ On | ✅ On | **Confirmed V1** |
| Question Sneak Peek | ✅ On | ✅ On | ✅ On | ✅ On | **Confirmed V1** |
| Music Moment | ✅ On | ✅ On | ✅ On | ✅ On | **Confirmed V1** |
| Share Card | ✅ On | ✅ On | ✅ On | ✅ On | **Confirmed V1** |
| Founding Energy Frame | ✅ On | ⚠️ Retire at 200 | ❌ Off | ❌ Off | **Confirmed V1** |
| Outlier Spotlight | ❌ Off | ✅ On | ✅ On | ✅ On | On the Menu |
| Local Tie-In | ⚠️ Manual | ✅ On | ✅ On | ✅ On | On the Menu |
| Post-Connection Reveal | ❌ Off | ✅ On | ✅ On | ✅ On | On the Menu |
| Cross-Campus Tease | ⚠️ Contrast only | ✅ On | ✅ On | ✅ On | On the Menu |
| Historical Compare | ❌ Off | ⚠️ Week 2+ | ✅ On | ✅ On | On the Menu |
| The Breakdown | ❌ Off | ❌ Off | ⚠️ Emerging | ✅ On | On the Menu |
| Social Proof Hook | ❌ Off | ❌ Off | ⚠️ Emerging | ✅ On | On the Menu |
| Implied Individual | ❌ Off | ❌ Off | ✅ On | ✅ On | On the Menu |
| Campus Character | ❌ Off | ❌ Off | ⚠️ Emerging | ✅ On | Later |
| The Anomaly | ❌ Off | ⚠️ Consider | ⚠️ Consider | ⚠️ Consider | Under Review |

---

# Confirmed V1 Inputs

*These are decided. All work at cold start.*

---

## 01 — Campus Pulse

**What it is:** What did the campus collectively answer tonight? The anchor of every reveal — always present. Works from day one.

**Always on · Confirmed V1**

### What It Shows

- **The Winner** — most popular answer, clean and direct. "Georgetown's answer tonight is Frank Ocean."
- **The Runner Up** — second place with percentage. "28% said Tyler. It was close."
- **The Spread** — was it unanimous or divided? Changes the emotional tone of the whole reveal.
- **The Surprise** — if campus went a different direction than expected, call it out.

### Options to Lean Into

- *Momentum Read* — "Frank Ocean has been trending up all week." Needs 7+ days of history.
- *Consensus Score* — how unified was campus on a scale from divided to unanimous.
- *Anonymous Quote* — one user reaction surfaced anonymously. Adds a human voice.

### Data + Threshold

- **Data needed:** That day's question answers only
- **Works at cold start:** Yes — 50 users generates a result
- **Fully meaningful:** 200+ DAUs
- **Network dependency:** Low — improves linearly

---

## 02 — Personal Standing

**What it is:** Where do you fit within campus tonight? Powered by a rarity score, not a label. Campus Pulse tells you what everyone thinks — this tells you where you stand within all of it.

**Confirmed V1**

### What It Shows

- **Rarity Percentile** — "You're in the top 7% most unique answers on campus tonight." Mathematical, changes every day.
- **Tribe Size** — "47 people answered the same as you." Gives the percentile a human scale.
- **Majority / Minority Frame** — with the grain or against it. App picks whichever is more interesting for that user that night.
- **Niche Coefficient** — cumulative uniqueness over time. Builds the user's music ego profile. Also the backbone of Connection Night matching — built once, powers everything.

### The Math

- **Entropy / Rarity Score** — every answer gets a rarity weight based on how few people chose it
- **Percentile Ranking** — position in the rarity distribution across all campus answers that night
- **Niche Coefficient** — cumulative rarity pattern over time. Powers both Personal Standing and Connection Night matching
- **Requires 6+ answer options per question** — below this, scores cluster and lose meaning

### Options to Lean Into

- *Position Shift* — "You were more unique today than yesterday."
- *Campus vs. You Over Time* — personal arc diverging from collective arc. Needs 4+ weeks.

### Data + Threshold

- **Works at cold start:** Slightly thin at 50, honest at 150+
- **Network dependency:** Medium — needs enough users across enough answer options

---

## 03 — Forward Hook

**What it is:** The last thing a user sees before closing the app. Pulls them back tomorrow. Zero network dependency — carries the product through cold start.

**Always on · Confirmed V1**

### Constants — Always Fire

- **Streak** — current count. One freeze per week. Graceful loss framing: "Your streak ended but your music identity didn't."
- **Countdown** — live timer to next 8 PM. Intensity shifts at 12 hours vs 1 hour out. "Answers still coming in."

### Rotating

- **Tomorrow's Tease** — one-line hint without revealing the question. "Tomorrow's question is going to divide campus."
- **Connection Night Anticipation** — "The week is building. Every answer is counting toward something." Intensity ramps Mon → Thu. Never confirms when Connection Night is.

### Options to Lean Into

- *Consequence Frame* — "This week's answers are almost locked in." Adds stakes without revealing timing.
- *Campus Streak Compare* — how your streak ranks vs. the most consistent user on campus.

### Data + Threshold

- **Streak + Countdown:** Works with 1 user. Zero network dependency.
- **Anticipation:** Works at 50+ DAUs — feels hollow if Connection Night never delivers

---

## 04 — Campus Mood

**What it is:** One line that captures what the campus is feeling tonight, derived from the answers. Highly shareable. Works from day one.

**Always on · Confirmed V1**

### What It Shows

- **Mood Line** — one expressive sentence, campus-specific, changes every night. "Georgetown is feeling nostalgic." "Campus energy is chaotic." "Georgetown is in its feels."
- **Emotional Classification** — backend classifies answers into emotional buckets (nostalgic, hype, introspective, divided, unanimous). Mood line generated from that.

### Options to Lean Into

- *Mood History* — "Georgetown has been nostalgic 4 nights in a row." Needs 7+ days.
- *Mood vs. Last Week* — week-over-week emotional arc.

### Data + Threshold

- **Works at cold start:** Yes — 50 users enough to classify a mood
- **Technical note:** Questions should be tagged with emotional categories at approval time in the question generator

---

## 05 — Personal Recap Card

**What it is:** The closing card. One sentence synthesizing the whole reveal into a personal statement. The thing users screenshot. Always fires last.

**Always last · Confirmed V1**

### What It Shows

- **The Closing Statement** — one generated sentence combining the user's answer, rarity score, and campus position. "You went against campus tonight. You're consistently niche. Your people are out there."
- **Shareable by design** — built to be screenshotted and posted. Layout, copy, and visual treatment optimize for that from the start.

### Options to Lean Into

- *Cumulative Identity Line* — after several weeks of data, the card evolves to reflect full music identity, not just tonight.

### Data + Threshold

- **Works at cold start:** Yes — synthesizes existing inputs, no new data needed
- **Network dependency:** None

---

## 06 — Question Sneak Peek

**What it is:** Tomorrow's question revealed early — exclusively to users who answered today. A reward for participation. Costs nothing technically. Drives next-day opens.

**Confirmed V1**

### What It Shows

- **Early Access** — you answered today, you see tomorrow's question tonight. Everyone else waits until morning.
- **Exclusivity framing** — "You answered tonight. Here's tomorrow's question early — just for you."

### Data + Threshold

- **Works at cold start:** Yes — purely content-based
- **Gate:** Only fires if user answered that day's question. Non-answerers don't see it — that's the point.

---

## 07 — Music Moment

**What it is:** Ties the reveal back to actual music. A song or clip connected to the campus answer of the day. Grounds the data in the thing that started it — music as a sensory moment, not just a data point.

**Confirmed V1**

### What It Shows

- **Campus Song of the Day** — song most associated with the winning answer. "Georgetown picked Frank Ocean tonight — here's the song."
- **15-second clip or deep link** — short preview or direct link to Spotify/Apple Music. A taste, not a full play.

### Options to Lean Into

- *Discovery Layer* — based on campus answer, here's an artist you might not know.
- *Cultural Moment* — "Georgetown picked Frank Ocean — and he just dropped something new." Requires live music news feed.

### Data + Threshold

- **Works at cold start:** Yes — API or content driven
- **Technical note:** Requires mapping between question answers and associated songs/artists. Start manual, move to API later.

---

## 08 — Share Card

**What it is:** Designed shareability layered across every input. The primary growth mechanism at cold start — brings non-users in before the network is dense enough to pull them on its own.

**Always on · Confirmed V1**

### What It Shows

- **Every confirmed input generates a share card** — Campus Pulse, Personal Standing, Campus Mood, Personal Recap all have a shareable visual version
- **Instagram / Stories optimized** — vertical format, Ligo branding, campus name, date
- **Non-user CTA** — every shared card includes a hook. "Georgetown is on Ligo. Are you?"

### Data + Threshold

- **Works at cold start:** Yes — design layer, no data dependency
- **Network dependency:** Inverse — more critical at cold start than at scale
- **Technical note:** Needs a shareable card generator pulling from whatever inputs fired that night for that user

---

## 09 — Founding Energy Frame

**What it is:** The cold start narrative. Turns thin data into founding energy. Makes early users feel like contributors, not beta testers. **Retire automatically at 200 DAUs.**

**Cold start only · Confirmed V1**

### What It Shows

- **Founding Framing** — "Georgetown is just finding its voice. You're one of the first to define it."
- **Hard off at 200 DAUs** — the math retires this automatically. No editorial override needed.

### Data + Threshold

- **Works at cold start:** Yes — designed for it
- **Network dependency:** Negative — exists precisely because the network doesn't yet

---

# On the Menu — Not Yet Confirmed

*These inputs need user density or time before they fire. Not decided — available when the data supports them.*

---

## 10 — Outlier Spotlight

**What it is:** Rewards contrarians. Turns a zero-match Connection Night into an identity moment. Plants the seed for Connection Night during the week. Needs 100+ DAUs to be mathematically honest.

**On the Menu**

### Possible Expressions

- **Solo Outlier** — "You're the only person on campus who said X tonight." Pure identity.
- **Micro Tribe** — "You and 2 other people said X. You don't know each other yet." Plants a seed before Connection Night pays it off.
- **Tribe Name** — auto-generated. "The Burial 3." "The Lauryn Hill Club."
- **Zero Match Recovery** — fires automatically on Connection Nights when a user gets no matches. "You're so unique no one matched you — but that means you're hard to find."
- *Outlier Streak* — "You've been uniquely yourself 3 days in a row."
- *Micro Tribe Payoff* — Micro Tribe members are prioritized in Connection Night matching. The seed becomes the connection.

### Threshold

- **Solo Outlier:** 100+ DAUs minimum
- **Micro Tribe:** 150+ DAUs minimum
- **Ceiling:** Only fires for top 5–10% rarest answers — keeps it special

---

## 11 — Local Tie-In

**What it is:** Bridges music identity to nearby events and venues. User's music affinity — not just tonight's answer — connects to what's happening on and around campus. Feels like a recommendation, not an ad.

**On the Menu**

### Possible Expressions

- **Music Affinity Match** — cumulative music identity aligns with a nearby event. "Your taste lines up with R&B night at The Tombs this Thursday."
- **Org Event Bridge** — org hosting an event whose playlist aligns with your affinity. "People who listen like you are going to this."
- **Non-fire logic:** If no event aligns with user's affinity, input doesn't surface. The system knows when not to show it.
- *Event Song Recommendations* — users invited to an org event can recommend songs for the playlist.

### Threshold

- **Cold start version:** Manual curation by Micah/Cristina until the data pipeline is built
- **Affinity Match:** Needs 2+ weeks of answer history per user
- **Partner side:** Needs 3–5 active venue/org partners posting regular events

---

## 12 — Post-Connection Reveal

**What it is:** The day after a Connection Night. What shows in the reveal when a vibe or spark was accepted. One of the most emotionally significant moments in the app.

**On the Menu**

### Possible Expressions

- **Connection Accepted** — "Your vibe was accepted." Lives in the reveal, not just a notification.
- **Why You Matched** — "You both gravitated toward the same artists 4 nights in a row." Makes the connection feel earned.
- **Next Step Prompt** — soft nudge toward event setup or IRL meetup.

### Threshold

- **Fires when:** Connection Night has occurred AND a vibe/spark was accepted
- **Minimum:** 150 DAUs with 1 week of answer history

---

## 13 — Cross-Campus Tease

**What it is:** Georgetown vs. Howard. No details — just the contrast. Makes Ligo feel bigger than one campus and turns expansion into a product feature, not just a growth metric.

**On the Menu**

### Possible Expressions

- **The Simple Contrast** — "Howard answered completely differently tonight." Works with Georgetown + Howard right now.
- **The Alliance** — "Georgetown and Howard agreed on something. That's rare."
- *The Rivalry* — "Georgetown and Howard have disagreed 4 nights in a row." Needs 300+ DAUs per campus.
- *The Expansion Hook* — "15 campuses are answering this same question right now."

### Threshold

- **Simple Contrast:** 2 campuses with 100+ DAUs — works now
- **Alliance / Rivalry:** 300+ DAUs per campus
- **HBCU vs. PWI framing:** 500+ DAUs + editorial review

---

## 14 — Historical Compare

**What it is:** Time-dependent more than user-dependent. Campus taste evolving week over week. Your personal music arc. Needs data history before it says anything meaningful.

**On the Menu**

### Possible Expressions

- **Week-over-Week** — "Last week Georgetown said Drake. This week Kendrick. The campus is shifting." Earliest fire: Day 8.
- **Streak Compare** — "Georgetown has picked R&B 4 nights in a row."
- **Personal Arc** — "Your answers have gotten more niche over the past month."
- *Seasonal Shift* — needs 3+ months of data. V2.

### Threshold

- **Week-over-Week:** 7 days of data — works with 50 DAUs after week 1
- **Personal Arc:** 4+ weeks of individual answer history
- **Network dependency:** Low user dependency, high time dependency

---

## 15 — The Breakdown

**What it is:** Slices the campus answer by segment — grade, gender, org. The gossipy input. High data dependency — do not surface until thresholds are met. The math decides, not editorial.

**On the Menu**

### Possible Expressions

- **By Grade** — freshman vs. senior splits. "The freshmen and seniors agreed. That never happens."
- **By Gender** — non-binary inclusive. Hard floor of 15+ per segment. Observation not stereotype.
- **The Surprise Breakdown** — when two segments that shouldn't agree do. Inversion = shareability.
- *By Org / Club* — needs org adoption first. Most socially interesting long-term. V2.

### Threshold

- **Hard floor per segment:** 15 responses minimum — non-negotiable for privacy
- **Minimum total DAUs:** 300 before any breakdown surfaces

---

## 16 — Social Proof Hook

**What it is:** How your network answered vs. you. Requires a friend graph. True network effect input — literally cannot exist before connections do.

**On the Menu**

### Possible Expressions

- **Friend Agreement** — "X of your friends answered the same as you tonight."
- **Friend Outlier** — "Nobody in your network agreed with you tonight." Reframes isolation as identity.
- **Network Pulse** — "Your network skewed differently from campus tonight."

### Threshold

- **Requires friend graph:** Each user needs 3+ connections
- **Minimum:** 500+ DAUs with active connection mechanic

---

## 17 — Implied Individual

**What it is:** An anonymous standout taste profile on campus. Not named, not revealed — just implied. Creates intrigue around the idea that specific people with strong music identities exist on campus.

**On the Menu**

### Possible Expressions

- **The Mystery Profile** — "Someone on campus has answered the most uniquely all week. You don't know who."
- **The Taste Outlier** — anonymous description of a standout music identity. "There's someone on campus whose taste doesn't fit any category."

### Threshold

- **Minimum:** 200+ DAUs — can't surface until campus is large enough that no one can guess who it is

---

# Under Review

---

## 18 — The Anomaly

**What it is:** Surfaces the most statistically unexpected answer of the night. Conceptually interesting but overlaps with Outlier Spotlight. **Decision needed before design begins.**

**Under Review**

### Proposed Expressions

- **The Lone Wolf** — most statistically rare answer. No identity revealed. "Someone on campus said X. We're not saying who."
- **The Niche Cluster** — 2–5 people independently picked the same deep cut. "3 people said the same thing tonight. They don't know each other yet."
- **The Genre Anomaly** — a genre that doesn't usually show up dominated tonight.

### Decision Needed

- Core question: Does this add enough beyond Outlier Spotlight to justify the complexity?
- Overlap concern: Niche Cluster is essentially the same as Micro Tribe in Outlier Spotlight

---

## 19 — Campus Character

**What it is:** Over time, cumulative answers build a personality profile for the campus. "Georgetown is consistently nostalgic, genre-fluid, and slightly contrarian." A living description that evolves weekly. Needs months of data. V2.

**Later**

### What It Could Be

- **Campus Personality** — one or two adjectives describing the campus's cumulative musical identity. Updates weekly.
- **Campus vs. You** — "Georgetown is getting more mainstream. You're going the opposite direction."

### Threshold

- **Minimum:** 4+ weeks of data with 200+ DAUs
- Design toward it, don't build toward it yet.

---

# Open Questions

1. What's the exact UI flow of the reveal? Swipeable cards, scrollable feed, or a single layered moment? This decision is upstream of all design work.
2. What's the rotation logic for inputs within the reveal? Personal Recap Card is always last, Forward Hook is always present — what governs the order of everything in between?
3. How does the countdown UI land visually? The All Hands referenced "like a snake popping out" — 3D elements, school colors, gift box animation. What's the actual interaction?
4. Does The Anomaly stay or get cut? Needs a clear decision before design touches it.
5. What's the emotional classification system for Campus Mood? Questions need to be tagged at approval time. Who owns that taxonomy?
6. What's the Share Card visual design system? Needs Ligo brand treatment, campus-specific color logic (Hoya blue, Howard bison blue), consistent template across all inputs.
7. How does Local Tie-In fire in the first few weeks before the affinity pipeline is built? Define the manual curation process for Micah/Cristina as an interim workflow.