# Making Users Feel Something — Ligo Emotional Design Principles

**Status:** Working Document · **Owner:** Micah · **Last updated:** 2026-06-08

This is not a feature list. It's a philosophy document. Every product decision — question design, reveal structure, copy, timing — should be checked against this before it ships.

The core principle: **feeling comes from consequence.** Every interaction needs to feel like it's counting toward something, even when the user can't see what yet. The moment they feel like they're just consuming content, you've lost them.

---

## The Principles

### 1. Recognition beats information every time

Information is "You're in the top 7% most unique answers on campus tonight."

Recognition is "Georgetown went one way tonight. You went the other. You always do."

Same data. Completely different feeling. Every reveal input should be asked: does this make the user feel *recognized*, or does it just report a number? Recognition is the standard. Information alone doesn't ship.

---

### 2. Make answers feel like positions, not preferences

Right now a user answers a question. That's passive. The reveal should reframe every answer as a stance.

"Georgetown went Frank Ocean. You went Tyler. You've never once agreed with campus majority."

That's not a music preference anymore — that's an identity. People defend identities. People come back to confirm identities. The copy and framing around every reveal input should push in this direction.

---

### 3. Let the campus be a character

Right now the campus is a data set. It should feel like a living entity with moods, tendencies, and contradictions.

- "Georgetown has been in its feelings for 5 days straight."
- "Campus finally agreed on something — that never happens."
- "Georgetown is going through something."

When the campus has a personality, your relationship to it has stakes. You're either aligned with it or you're not. Both feel like something. The question bank and Campus Mood copy need to be written with this character in mind from day one.

---

### 4. Build tension into the question itself

The question bank is infrastructure but it's also the emotional engine. The feeling starts before the reveal — at the moment someone reads the question and thinks *oh this one's actually hard.*

Questions that naturally divide campus generate more feeling in the reveal than questions with obvious answers. Not controversy — genuine taste splits. "Kendrick or Drake" is controversy. "Which Frank Ocean era defined you" is a taste split. The question approval process should explicitly tag for divisiveness potential.

---

### 5. The unseen other person

One of the most powerful things the app can do is make users feel like specific other people on campus are paying attention — without ever revealing who.

"Someone on campus has answered identically to you 4 nights in a row."

No name. No profile. Just the knowledge that someone is out there moving in parallel with you. This is an extraordinary feeling and it costs almost nothing technically beyond the rarity math already built. This should be in the reveal as soon as the DAU threshold allows it.

---

### 6. Reward consistency with revelation

Users who answer every day should feel like the app is *unlocking* for them over time. Not badges. Not gamification. Depth.

Week one: campus pulse.

Week three: the app starts telling you things about yourself it couldn't have said earlier.

The product literally gets more emotionally resonant the longer you use it. That's retention built into the feeling, not bolted on top. Every input in the V1 doc should have a note on how it deepens with time — not just whether it fires at a DAU threshold.

---

### 7. Make Connection Night feel inevitable in retrospect

When a match happens, the reveal shouldn't just say you matched. It should show the trail.

"Here are the 6 nights that led to this."

The user should feel like the connection was always going to happen — like the app saw it coming before they did. That reframes the entire product retroactively. Every past answer now had meaning they didn't know about. This is the emotional peak of the whole product and the reveal design for Connection Night should be built around this single moment.

---

### 8. Let dissent feel powerful, not consoling

The users who never agree with campus are a specific personality type. They need to feel *celebrated*, not just acknowledged.

The minority frame in Personal Standing is the right instinct but it needs to be louder. Being the person who consistently goes against Georgetown should feel like a badge of honor, not a consolation prize. These users are also the most interesting for Connection Night — finding another dissenter is a stronger match signal than finding someone who agreed with the majority.

Copy direction: never frame uniqueness as surprising or unexpected. Frame it as inevitable. "Of course you went that way."

---

### 9. Anticipation is a feeling that lives outside the app

The week-long build toward Connection Night is a feeling users carry around in their lives — not just when they open the app. That's extraordinarily hard to engineer and it's baked into the structure.

The Forward Hook and Connection Night Anticipation inputs exist to sustain this. The copy should never confirm when Connection Night is. Intensity ramps Monday through Thursday. The not-knowing is the product.

---

### 10. The gap between "just answering" and "it knows me"

The highest emotional moment in the product is when a user realizes the app has been accumulating something about them without them actively thinking about it.

The daily question feels low-stakes. Then the reveal shows them a pattern. "You've been uniquely yourself 3 days in a row." "Your taste has gotten more niche over the past month." That gap — between casual daily input and the reveal of a pattern — is the feeling.

Every input worth keeping should be able to answer: does this contribute to the accumulation, or does it just report on tonight?

---

## Questions Every Feature Should Answer Before It Ships

1. Does this make the user feel recognized, or does it just report information?
2. Does this make their answer feel like a position, not just a preference?
3. Does this contribute to the accumulation — does it get richer over time?
4. Is there consequence here? Does it connect to something bigger?
5. Would a user screenshot this? Would they send it to someone?
6. Does the copy treat uniqueness as inevitable, not surprising?

---

## What This Means for the Question Bank

The question bank is the emotional engine upstream of everything. Questions need to be tagged at approval time for:

- **Divisiveness potential** — will this split campus close to 50/50?
- **Emotional category** — nostalgic / hype / introspective / identity / era-defining
- **Position potential** — can the answer to this feel like a stance?

A question that doesn't score well on at least two of these shouldn't make it into rotation. The reveal is only as emotionally resonant as the question that generated it.

---

## What This Means for Copy

Every line of reveal copy should be written as if it's talking to one specific person, not a user segment. "Georgetown voted" is data. "Georgetown made its call" is a character. "You went the other way" is recognition.

The voice rules:

- Short and declarative
- Never consoling — reframe everything as identity
- Treat the campus like a person with opinions
- Treat the user's taste as inevitable, not surprising
- Never say "interesting" or "unique" as adjectives — show it instead