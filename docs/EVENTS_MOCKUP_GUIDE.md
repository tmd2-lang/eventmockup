# Ligo Events Mockup — Team Guide

How to click through the **events / clubs** side of the mockup.  
Send this with the live link when you share the demo with the team.

**What this is:** a clickable prototype for campus **organizers** and **members** — create events, invite people onto Ligo, RSVP, club chat, event group chat. Not a finished product; scripted Georgetown demo data.

**Live link:** use the Vercel URL TJ / Micah share for this build (repo: `eventmockup` / `ligo-home-mockup`).

---

## Before you start

1. Open the link on desktop (phone frame in the browser is fine).
2. Bottom nav: **Events · Home · Profile**.
3. Switch people from **Profile** (or the avatar / profile switcher on Home) — pick **Cole** or **Jordan**. That choice sticks in the browser.
4. Prefer **one tab** when demoing. Two tabs won’t update each other live; refresh the second tab after you publish.

### Who to use

| Profile | Role in this mock | Why |
|--------|-------------------|-----|
| **Cole B.** | Admin of **Georgetown Program Board (GPB)** | Organizer path — Manage, create, invite members, event dashboard |
| **Jordan D.** | Member of **GPB** (+ SigEp) | Member path — Clubs tab, My Events, Pass / I’m In, club home |

Marcus / Sofia still work for older frat / Phantoms paths; **lead with Cole + Jordan** for this events story.

---

## The story in one line

Clubs don’t need another guest-list tool. They need: **invite people into the app → run the event → reach campus when it’s public** — without drowning in GroupMe + Gmail + Calendar.

---

## Walkthrough A — Organizer (Cole)

Switch to **Cole** → bottom nav **Events**.

### 1. Open Manage
- Tap **Manage** (top tabs) → short splash **“Running the board · GPB”**.
- You’re in **Event ops**: Overview · Events · Members.

### 2. Members / invite-to-app (not a party guest list)
- **Members** tab → roster with **On Ligo / Invited / Not on Ligo**.
- Quick action **Invite members** → Share / Text / Email / Upload roster.  
  Pitch line: *people join Ligo, then join the org* — not “upload a darty guest list.”

### 3. Publish a **members-only** event (Kickoff)
- **Create event** → **Autofill Kickoff** → distribution **Members Only** → Publish.
- After publish: dashboard with **Going / Pending / Declined**.
- Open **Group chat** (about *this* event only) · **Send update** (one-way blast) · **View event**.

**Where Kickoff shows up**
- ✅ Cole: Manage → Events (internal)
- ✅ Jordan: Pass / I’m In, My Events, Clubs → GPB → Events  
- ❌ **Not** on Explore (hidden from campus feed)

### 4. Publish a **campus** event (Midnight Breakfast)
- Create event → **Autofill Breakfast** → distribution **Georgetown** → Publish.

**Where Breakfast shows up**
- ✅ **Explore** (everyone on campus)
- ✅ Manage → Events (campus / public)
- ✅ Clubs → GPB → Events → “Also hosting on campus”
- ❌ Not in the Pass / I’m In invite stack (that’s for invites / members-only)

---

## Walkthrough B — Member (Jordan)

Switch to **Jordan** → **Events**.

### 1. Pass / I’m In
- If he has pending invites, the **Needs Response** cards appear (Pass / I’m In).
- Look for **who’s going** (real faces + honest counts) — not fake Posh-style attendance.

### 2. My Events
- Pending / going / hosting that belong to **this** profile.
- Members-only club events show up here too — you don’t need Clubs just to RSVP.

### 3. Clubs
- **Clubs** tab → **Georgetown Program Board**.
- Splash **“Welcome to GPB”** → club home list: **Chat · Events · People**.
- **Chat** = whole-club chat (ops / banter — *not* the Kickoff thread).
- **Events** = members-only first; campus GPB events underneath.
- Tap an event → event page → **Event group chat** (same thread Cole sees from Manage).
- I’m in / Maybe here writes the **real** RSVP (same as My Events).

### 4. People
- Roster by committee; tap someone for contact info.

---

## Quick map: where does an event appear?

| | Explore | My Events / Pass–I’m In | Clubs → Events | Manage → Events |
|--|---------|-------------------------|----------------|-----------------|
| **Georgetown / campus** (Breakfast) | Yes | Only if you RSVP going/maybe | “Also hosting…” | Yes (public list) |
| **Members only** (Kickoff) | No | Yes (pending → going) | “For members” | Yes (internal) |

---

## Autofill buttons (Cole / GPB create sheet)

| Button | Type | Use in demo |
|--------|------|-------------|
| **Autofill Kickoff** | Members only | Internal programming meeting + event group chat |
| **Autofill Breakfast** | Georgetown / campus | Public Midnight Breakfast on Explore |

---

## Live Activity (fake)

When you tap **I’m In / Going**, a black **Live · Going** pill can appear under the Dynamic Island. Tap to open the event; × dismisses. Demo theater only — not a real iOS Live Activity.

---

## What *not* to expect

- Two browser tabs won’t sync live — refresh after publishing.
- Supabase / real backend isn’t required for this events slice.
- Home (daily question / reveal) is separate; this guide is **Events-first**.
- Not every club path is polished yet — **GPB + Cole + Jordan** is the path to show.

---

## Suggested 3-minute script

1. **Cole** → Manage → Members → “invite to Ligo, not guest list.”  
2. Create → Autofill Kickoff → publish → Group chat + Send update.  
3. Switch **Jordan** → Pass / I’m In or Clubs → GPB → Events → open Kickoff → Event group chat.  
4. Cole → Autofill Breakfast → publish → Jordan Explore → Breakfast on the feed.  
5. Line: *Members-only stays in the club. Campus-wide hits Explore.*

---

## Questions / bugs

Ping TJ or Micah with a screenshot + which profile you were on (Cole vs Jordan). Hard-refresh if something looks stuck from an older local session.
