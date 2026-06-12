# The Reveal — Inputs V1 (Revised)

**Last updated:** June 8, 2026 · **Status:** In Progress · **Audience:** @TJ Dozier @Mekhi

> Every example line in this document is written to the emotional design standard: recognition over information, positions not preferences, uniqueness as inevitable not surprising. If a copy line doesn't pass that test, it doesn't belong here.
> 

---

## What the Reveal Is

Every day, users answer one music question. At **8 PM**, a countdown completes and something reveals. That reveal is the core product moment — it happens every single night without exception.

The **inputs** are the content pieces that fill that reveal. Not every input fires every night — some require a user threshold, some require data history, some are always on. The reveal is built from whatever inputs are qualified to fire that night, rotating so it never feels the same.

The sub-expressions within each input are **options, not requirements.** They're ways to make that input richer. Not all of them will ship — they exist so we have a full menu to choose from as we design and build.

---

## The Three Night Types

**Every Night — Reveal Night**

The base. Always happens. Most nights are this.

**Random 1–2× per week — Connection Night**

Same reveal format. Cumulative weekly answers surface matches. Vibe (friendship) or Spark (romantic). Users never know in advance — prevents gaming, builds anticipation all week. After matching, users can set up events and meet IRL.

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

## 01 — Campus Pulse/ 07 — Music Moment

**What it is:** What did campus collectively answer tonight? The anchor of every reveal — always present. Works from day one. This is the moment the campus becomes a character, not a data set.

**~~Always on · Confirmed V1~~**

### What It Shows

- **The Winner** — campus made its call. Direct, no hedging. "Georgetown went Frank Ocean tonight."
- **~~The Runner Up** — "Tyler had 28%. It wasn't close until it was." The tension in the spread is the story.~~
- **The Spread** — unanimous or divided changes everything. A 90/10 split hits differently than 52/48. The copy reflects which world the user is in.
- **~~The Surprise** — when campus goes somewhere unexpected, name it. "Georgetown didn't go where you'd think tonight."~~

### Options to Lean Into

- *~~Momentum Read* — "Frank Ocean has been Georgetown's answer three times this week. Campus has made up its mind." Needs 7+ days of history.~~
- *Consensus Score* — how unified was campus. Framed as campus character, not a stat. "Georgetown rarely agrees this unanimously."
- *~~Anonymous Reaction* — one user reaction surfaced anonymously. Adds a human voice to what could otherwise feel like a report.~~

### Emotional Design Check

The campus is the character here. Every copy line should treat Georgetown like it made a decision, not like a survey returned a result.

### Data + Threshold

- **Data needed:** That day's question answers only
- **Works at cold start:** Yes — 50 users generates a result
- **Fully meaningful:** 200+ DAUs
- **Network dependency:** Low — improves linearly

---

## 02 — Personal Standing 05 — Personal Recap Card

**What it is:** Where do you fit in tonight's campus answer? Powered by a rarity score, not a label. Campus Pulse tells you what everyone decided — this tells you where you stood within all of it. **The most identity-forming input in the product.**

**Confirmed V1**

### What It Shows

- **Rarity Percentile** — not a compliment, a position. "You're in the top 7% most distinct answers on campus tonight." Mathematical. Changes every day.
- **~~Tribe Size** — gives the percentile a human scale. "44 people went the same way you did." Whether that feels like a lot or a little depends on the question — the copy should reflect that.~~
- **Majority / Minority Frame** — app picks whichever is more interesting for that user that night. If they went with campus: "Georgetown went your way." If they didn't: "You went the other way. You usually do."
- **Niche Coefficient** — cumulative uniqueness over time. Not surfaced as a number — expressed as a pattern. "Your answers have been consistently off the beaten path." Also the backbone of Connection Night matching — built once, powers everything.

### The Math

- **Entropy / Rarity Score** — every answer gets a rarity weight based on how few people chose it
- **Percentile Ranking** — position in the rarity distribution across all campus answers that night
- **Niche Coefficient** — cumulative rarity pattern over time. Powers both Personal Standing and Connection Night matching
- **Requires 4-5+ answer options per question** — below this, scores cluster and lose meaning

### Options to Lean Into

- *~~Position Shift* — "You went more niche today than yesterday. The pattern is holding." Never frame the shift as surprising.~~
- *~~Campus vs. You Over Time* — "Georgetown has been trending mainstream. You've been going the other direction." Needs 4+ weeks. This is when the product starts feeling like it actually knows someone.~~

### Emotional Design Check

Never consoling. The minority frame is the identity frame. "Of course you went that way" is always better than "it's okay that you were different."

### Data + Threshold

- **Works at cold start:** Slightly thin at 50, honest at 150+
- **Network dependency:** Medium — needs enough users across enough answer options

---

## 03 — Forward Hook

**~~What it is:** The last thing a user sees before they close the app. Its only job is to make closing feel temporary. Zero network dependency — this carries the product through cold start entirely on its own.~~

**Always on · Confirmed V1**

### Constants — Always Fire

- **Streak** — current count. One freeze per week. Loss framing that doesn't punish: "Your streak ended. Your taste didn't."
- **Countdown** — live timer to next 8 PM. The copy shifts with proximity. At 12 hours out: "Answers are still coming in." At 1 hour out: "This is almost locked."

### Rotating

- **Tomorrow's Tease** — one line that hints without revealing. "Tomorrow's question is going to split campus." "Tomorrow is one of those questions people think about all day."
- **~~Connection Night Anticipation** — the week is building. The copy intensity ramps Monday through Thursday. Never confirms when Connection Night is. "Every answer this week is counting toward something." By Thursday: "This week is almost locked in."~~

### Options to Lean Into

- *~~Consequence Frame* — "Three more answers and this week's pattern is set." Adds stakes without revealing timing.~~
- *Campus Streak Compare* — "You're one of the 12 most consistent people on campus." Identity through consistency, not just numbers.

### Emotional Design Check

**The not-knowing is the product.** ~~Connection Night Anticipation copy should never resolve the tension — it should sustain it.~~

### Data + Threshold

- **Streak + Countdown:** Works with 1 user. Zero network dependency.
- **Anticipation:** Works at 50+ DAUs — feels hollow if Connection Night never pays off

---

## 04 — Campus Mood

**What it is:** One line that captures what campus is feeling tonight, derived from the answers. The campus-as-character input. **Highly shareable.** Works from day one.

**Always on · Confirmed V1**

### What It Shows

- **Mood Line** — one sentence, campus-specific, changes every night. Not a report. A read. "Georgetown is in its feelings tonight." "Campus went somewhere chaotic." "Georgetown made a decision and stood on it."
- **Emotional Classification** — backend classifies answers into emotional buckets (nostalgic, hype, introspective, divided, unanimous). Mood line is generated from that classification. The copy should always sound like someone who has been watching campus all week — not like a weather report.

### Options to Lean Into

- *Mood History* — "Georgetown has been nostalgic four nights in a row. Something is in the air." Needs 7+ days.
- *Mood vs. Last Week* — "Last week Georgetown was restless. This week it's settled into something." Week-over-week arc.

### Emotional Design Check

The campus is a person here. "Georgetown voted" is wrong. "Georgetown went somewhere tonight" is right.

### Data + Threshold

- **Works at cold start:** Yes — 50 users enough to classify a mood
- **Technical note:** Questions must be tagged with emotional categories at approval time. Who owns that taxonomy is an open question.

---

## 05 — Personal Recap Card

**What it is:** ~~The closing card.~~ ~~One sentence~~ that synthesizes the whole reveal into a personal statement. The thing users screenshot. ~~Always fires last.~~ This is the most shareable moment in the product.

**Always last · Confirmed V1**

- **The Closing Statement** — one generated sentence that combines the user's answer, their rarity score, and their position on campus. It should land like a read, not a summary. "You went against campus tonight. That's not new. Your people are out there."
- **Shareable by design** — layout, copy, and visual treatment all optimize for screenshots from the start. If a user wouldn't send this to a friend, it's not done.

### Options to Lean Into

- *Cumulative Identity Line* — after several weeks of data, the card evolves. It stops describing tonight and starts describing the person. "Georgetown keeps changing its mind. You haven't."

### Emotional Design Check

This is the line someone quotes when they tell a friend about Ligo. Write it that way.

### Data + Threshold

- **Works at cold start:** Yes — synthesizes existing inputs, no new data needed
- **Network dependency:** None

---

---

## 07 — Music Moment - 01 - Campus pulse

**What it is:** Ties the reveal back to actual music. A song connected to what campus answered tonight. The data points back to the thing — music as a sensory moment, not just a result.

**Confirmed V1**

### What It Shows

- **Campus Song of the Day** — the song most associated with tonight's campus answer. "Georgetown went Frank Ocean tonight. Here's the one." Not explained — just presented.
- **15-second clip or deep link** — a taste, not a full play. The point is the moment of recognition, not the listening session.

### Options to Lean Into

- *Discovery Layer* — "Georgetown went Frank Ocean. Here's someone you might not know who lives in the same world." Based on campus answer, not user history.
- *Cultural Moment* — "Georgetown picked Frank Ocean tonight — and something just dropped." Requires a live music news feed. V2.

### Emotional Design Check

The song should feel like a natural extension of the reveal, not an add-on. If the campus went somewhere nostalgic, the song should confirm that. The presentation is everything.

### Data + Threshold

- **Works at cold start:** Yes — API or content-driven
- **Technical note:** Requires a mapping between question answers and associated songs/artists. Start manual, move to API.

---

## 08 — Share Card

**What it is: Designed shareability layered across every input. The primary growth mechanism at cold start — brings non-users in before the network is dense enough to pull them on its own.**

**Always on · Confirmed V1**

### What It Shows

- **Every confirmed input generates a share card** — Campus Pulse, Personal Standing, Campus Mood, Personal Recap all have a shareable visual version
- **Instagram / Stories optimized** — vertical format, Ligo branding, campus name, date
- **Non-user CTA — every shared card pulls someone in. Not a generic invite. A specific provocation. "Georgetown made its call tonight. Do you know what it was?"**

### Emotional Design Check

The CTA on every share card should make a non-user feel like they missed something specific — not just that an app exists.

### Data + Threshold

- **Works at cold start:** Yes — design layer, no data dependency
- **Network dependency:** Inverse — more critical at cold start than at scale
- **Technical note:** Needs a shareable card generator pulling from whatever inputs fired that night for that user

---

## 09 — Founding Energy Frame

**What it is:** The cold start narrative. Turns thin data into founding energy. Early users aren't beta testers — they're the ones who defined what Georgetown sounds like before anyone else got a say.

**Cold start only · Confirmed V1 · Hard off at 200 DAUs**

### What It Shows

- **Founding Framing** — "Georgetown doesn't have a sound yet. You're one of the people building it."
- **Hard off at 200 DAUs** — the math retires this automatically. No editorial override needed. Once the campus has density, it speaks for itself.

### Emotional Design Check

Early users should feel like originators, not testers. The framing is: you got here first, and that means something.

### Data + Threshold

- **Works at cold start:** Yes — designed for it
- **Network dependency:** Negative — exists precisely because the network doesn't yet

---

# On the Menu — Not Yet Confirmed

*These inputs need user density or time before they fire. Not decided — available when the data supports them.*

---

## 10 — Outlier Spotlight

**What it is:** Rewards the contrarians. Turns a zero-match Connection Night into an identity statement. Plants the seed that Connection Night will eventually pay off. The rarer your answer, the more this input does for you.

**On the Menu**

### Possible Expressions

- **Solo Outlier** — "You're the only person on campus who went there tonight." No consolation. Pure position.
- **Micro Tribe** — "You and two other people said the same thing. You don't know each other yet." The seed before Connection Night pays it off.
- **Tribe Name** — auto-generated from the answer. "The Burial 3." "The Lauryn Hill Club." Names the thing before the thing exists.
- **Zero Match Recovery** — fires on Connection Nights when a user gets no matches. "Nobody matched you. That's not a miss — that's how rare you are."
- *Outlier Streak* — "You've gone off the beaten path three nights in a row. That's not an accident."
- *Micro Tribe Payoff* — Micro Tribe members are prioritized in Connection Night matching. The seed becomes the connection.

### Emotional Design Check

None of this is a consolation prize. The copy should treat being rare as the thing, not as the explanation for why something else didn't happen.

### Threshold

- **Solo Outlier:** 100+ DAUs minimum
- **Micro Tribe:** 150+ DAUs minimum
- **Ceiling:** Only fires for top 5–10% rarest answers — keeps it special

---

## 11 — Local Tie-In

**What it is:** Bridges music identity to what's happening on and around campus. Your cumulative taste — not just tonight's answer — connects to real events and venues nearby. Feels like a recommendation from someone who actually knows you.

**On the Menu**

### Possible Expressions

- **Music Affinity Match** — "Your taste lines up with R&B night at The Tombs this Thursday." Not based on tonight — based on who you've been all week.
- **Org Event Bridge** — "People who listen like you are going to this." Org hosting an event whose playlist aligns with your affinity.
- **Non-fire logic:** If nothing aligns, the input doesn't surface. The system knows when not to show it.
- *Event Song Recommendations* — users invited to an org event can suggest songs for the playlist. Music identity becomes contribution.

### Threshold

- **Cold start version:** Manual curation by Micah/Cristina until the data pipeline is built
- **Affinity Match:** Needs 2+ weeks of answer history per user
- **Partner side:** Needs 3–5 active venue/org partners posting regular events

---

## 12 — Post-Connection Reveal

**What it is:** The day after a Connection Night when a Vibe or Spark was accepted. One of the most emotionally significant moments in the product. The reveal should make the connection feel inevitable, not lucky.

**On the Menu**

### Possible Expressions

- **Connection Accepted** — lives in the reveal, not just a notification. "Your Vibe was accepted." Presented with weight.
- **Why You Matched** — "You both went to the same place four nights in a row without knowing it." The trail. Makes the connection feel earned, not random.
- **Next Step Prompt** — soft nudge toward an event or IRL meetup. Never pushy. "You could meet."

### Emotional Design Check

The feeling here is inevitability. "Of course this happened" is the emotion. The reveal should show the trail that made it feel that way.

### Threshold

- **Fires when:** Connection Night has occurred AND a Vibe/Spark was accepted
- **Minimum:** 150 DAUs with 1 week of answer history

---

## 13 — Cross-Campus Tease

**What it is:** Georgetown vs. Howard. No details — just the contrast. Makes Ligo feel bigger than one campus and turns expansion into a product feature, not a growth metric.

**On the Menu**

### Possible Expressions

- **The Simple Contrast** — "Howard went somewhere completely different tonight." No details. Just the fact of the divergence.
- **The Alliance** — "Georgetown and Howard agreed tonight. That almost never happens."
- *The Rivalry* — "Georgetown and Howard have disagreed four nights in a row. Something is going on." Needs 300+ DAUs per campus.
- *The Expansion Hook* — "Fifteen campuses answered this same question tonight." When the network is big enough to say it honestly.

### Threshold

- **Simple Contrast:** 2 campuses with 100+ DAUs — works now
- **Alliance / Rivalry:** 300+ DAUs per campus
- **HBCU vs. PWI framing:** 500+ DAUs + editorial review before anything culturally charged goes live

---

## 14 — Historical Compare

**What it is:** Time-dependent more than user-dependent. Campus taste evolving over time. Your personal music arc across weeks. Needs data history before it says anything true.

**On the Menu**

### Possible Expressions

- **Week-over-Week** — "Last week Georgetown said Drake. This week it moved to Kendrick. The campus is shifting." Earliest fire: Day 8.
- **Streak Compare** — "Georgetown has landed in R&B four nights running."
- **Personal Arc** — "Your answers have gotten more specific over the past month. You know what you like." Needs 4+ weeks of individual history.
- *Seasonal Shift* — needs 3+ months of data. V2.

### Threshold

- **Week-over-Week:** 7 days of data — works with 50 DAUs after week 1
- **Personal Arc:** 4+ weeks of individual answer history
- **Network dependency:** Low user dependency, high time dependency

---

## 15 — The Breakdown

**What it is:** Slices the campus answer by segment — grade, gender, org. The most socially interesting input at scale. High data dependency. The math decides when this fires, not editorial.

**On the Menu**

### Possible Expressions

- **By Grade** — "The freshmen and seniors agreed tonight. That almost never happens."
- **By Gender** — non-binary inclusive. Hard floor of 15+ per segment. Framed as observation, never stereotype.
- **The Surprise Breakdown** — when two groups that shouldn't agree do. The inversion is the story. "The people you'd least expect agreed tonight."
- *By Org / Club* — needs org adoption first. Most culturally interesting long-term. V2.

### Threshold

- **Hard floor per segment:** 15 responses minimum — non-negotiable for privacy
- **Minimum total DAUs:** 300 before any breakdown surfaces

---

## 16 — Social Proof Hook

**What it is:** How your connections answered vs. you. A true network effect input — literally cannot exist before connections do.

**On the Menu**

### Possible Expressions

- **Friend Agreement** — "Three of your connections went the same way you did tonight."
- **Friend Outlier** — "Nobody in your network agreed with you tonight." Not a miss — a position. "You went somewhere they didn't."
- **Network Pulse** — "Your network skewed differently from campus tonight. You're in a different world."

### Threshold

- **Requires friend graph:** Each user needs 3+ connections
- **Minimum:** 500+ DAUs with active connection mechanic

---

## 17 — Implied Individual

**What it is:** An anonymous standout taste profile on campus. Not named. Not revealed. Just implied. Creates the feeling that specific people with strong music identities exist on campus — and that you might be one of them, or you might meet one.

**On the Menu**

### Possible Expressions

- **The Mystery Profile** — "Someone on campus has gone the most distinct route all week. You don't know who."
- **The Taste Outlier** — "There's someone on campus whose answers don't fit any pattern. They're in their own category."

### Threshold

- **Minimum:** 200+ DAUs — can't surface until campus is large enough that no one can guess who it is

---

# Under Review

---

## 18 — The Anomaly

**What it is:** Surfaces the most statistically unexpected answer of the night. Interesting in theory. Overlaps significantly with Outlier Spotlight. Decision needed before design touches this.

**Under Review**

### Proposed Expressions

- **The Lone Wolf** — most statistically rare answer. No identity revealed. "Someone on campus went somewhere tonight. We're not saying who."
- **The Niche Cluster** — 2–5 people independently picked the same deep cut. "Three people said the same thing tonight. They don't know each other yet." (Note: nearly identical to Micro Tribe in Outlier Spotlight.)
- **The Genre Anomaly** — a genre that doesn't usually show up dominated tonight.

### Decision Needed

- Does this add enough beyond Outlier Spotlight to justify the complexity?
- Niche Cluster and Micro Tribe are functionally the same input. One of them needs to go.

---

## 19 — Campus Character

**What it is:** Over time, cumulative answers build a personality for the campus. "Georgetown is consistently nostalgic, genre-fluid, and slightly contrarian." A living description that evolves weekly. Needs months of data.

**Later — design toward it, don't build toward it yet**

### What It Could Be

- **Campus Personality** — one or two words describing the campus's cumulative musical identity. Updates weekly. "Georgetown is nostalgic and resistant."
- **Campus vs. You** — "Georgetown is going mainstream. You're going the other direction."

### Threshold

- **Minimum:** 4+ weeks of data with 200+ DAUs

---

# Open Questions

1. What's the exact UI flow of the reveal? Swipeable cards, scrollable feed, or a single layered moment? This decision is upstream of all design work.
2. What's the rotation logic for inputs within the reveal? Personal Recap Card is always last, Forward Hook is always present — what governs the order of everything in between?
3. How does the countdown UI land visually? The All Hands referenced a 3D animation with school colors. What's the actual interaction?
4. Does The Anomaly stay or get cut? Needs a clear decision before design touches it.
5. What's the emotional classification system for Campus Mood? Questions need to be tagged at approval time. Who owns that taxonomy?
6. What's the Share Card visual design system? Needs Ligo brand treatment, campus-specific color logic (Hoya blue, Howard bison blue), consistent template across all inputs.
7. How does Local Tie-In fire in the first few weeks before the affinity pipeline is built? Define the manual curation process as an interim workflow.