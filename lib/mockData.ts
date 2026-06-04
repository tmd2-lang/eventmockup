/* ============================================================
   LIGO · Home-screen mock data
   ------------------------------------------------------------
   👋 NON-ENGINEERS: This is the only file you need to edit.
   Everything the home screen shows — copy, names, percentages,
   headlines, venues, stats — lives here. Change a string or a
   number, save, and it updates on screen.

   Anything wrapped like "[ 87% ]" or labelled PLACEHOLDER is a
   fake/sample value. Replace it with a real one when you have it.
   ============================================================ */

/* ── Campus identity (shown in the top bar) ───────────────── */
export const campus = {
  name: "Georgetown", // [PLACEHOLDER campus]
  onlineCount: 247, // [PLACEHOLDER online count]
};

/* ── Artist album-art images available in /public/artists ──── */
export const artistArt = {
  taylor: "/artists/taylor.png",
  sabrina: "/artists/sabrina.png",
  szaSaturn: "/artists/sza-saturn.png",
  frankBlond: "/artists/frank-blond.png",
  kendrick: "/artists/kendrick.png",
  billie: "/artists/billie.png",
  chappell: "/artists/chappell.png",
} as const;

/* ============================================================
   NORMAL DAY — the daily music prompt
   ============================================================ */
export const dailyPrompt = {
  eyebrow: "Daily prompt · today", // small caps label
  question: "Which artist is\nrunning your day?", // \n forces the line break
  // Countdown to the reveal moment. Shown as a live ticking timer.
  // Change these two numbers to move the reveal nearer/further.
  revealInHours: 2, // [PLACEHOLDER] hours until reveal
  revealInMinutes: 14, // [PLACEHOLDER] extra minutes until reveal
  voteMeta: "247 picked · tap your artist", // [PLACEHOLDER vote count]
  // The three artists a student can pick. `art` references artistArt above.
  picks: [
    { id: "sza", name: "SZA", sub: "Saturn era", art: artistArt.szaSaturn },
    { id: "frank", name: "Frank Ocean", sub: "Blonde mood", art: artistArt.frankBlond },
    { id: "kendrick", name: "Kendrick", sub: "GNX run", art: artistArt.kendrick },
  ],
};

/* Copy shown once the prompt is answered (Connection & Wrapped days) */
export const answeredPrompt = {
  eyebrow: "Today's prompt · locked in", // small caps label
  question: "Which artist is running your day?",
  // The pick the user "already made" — placeholder.
  answerName: "SZA", // [PLACEHOLDER answer]
  answerArt: artistArt.szaSaturn,
  note: "You picked SZA · reveal at 6:00pm", // [PLACEHOLDER]
};

/* ============================================================
   MUSIC-NEWS STRIP — "your artists this week"
   Horizontal scroll. Each card is one headline.
   ============================================================ */
export const newsStrip = {
  title: "Your artists this week",
  items: [
    {
      id: "n1",
      art: artistArt.szaSaturn,
      tag: "New single", // small pill
      headline: "SZA teases a Saturn deluxe — drops Friday", // [PLACEHOLDER headline]
      meta: "Pitchfork · 2h", // [PLACEHOLDER source]
    },
    {
      id: "n2",
      art: artistArt.taylor,
      tag: "Tour",
      headline: "Taylor adds a surprise East Coast date", // [PLACEHOLDER headline]
      meta: "Billboard · 5h", // [PLACEHOLDER source]
    },
    {
      id: "n3",
      art: artistArt.frankBlond,
      tag: "Rumor",
      headline: "Frank Ocean spotted in the studio again", // [PLACEHOLDER headline]
      meta: "Stereogum · 1d", // [PLACEHOLDER source]
    },
    {
      id: "n4",
      art: artistArt.kendrick,
      tag: "Chart",
      headline: "Kendrick's GNX still tops the campus chart", // [PLACEHOLDER headline]
      meta: "LIGO · 1d", // [PLACEHOLDER source]
    },
  ],
};

/* ============================================================
   NEAR YOU — local shows block (Normal day)
   ============================================================ */
export const nearYou = {
  title: "Near you",
  action: "See all",
  shows: [
    {
      id: "s1",
      when: "Tonight · 8pm", // [PLACEHOLDER]
      name: "Boygenius listening party", // [PLACEHOLDER]
      host: "Theta Phi · listening party", // [PLACEHOLDER]
      venue: "Healy 103", // [PLACEHOLDER]
      match: "94% match", // [PLACEHOLDER match]
      tag: "Listening party",
      // header gradient — yellow side of the brand palette
      headerBg: "linear-gradient(160deg, #F5D783, #E9BF52)",
      darkOnHeader: true,
    },
    {
      id: "s2",
      when: "Sat · 10pm", // [PLACEHOLDER]
      name: "House show: Quinta + Tombs", // [PLACEHOLDER]
      host: "Off-campus · pres. by Sam V.", // [PLACEHOLDER]
      venue: "14th St", // [PLACEHOLDER]
      match: "3 you've matched", // [PLACEHOLDER]
      tag: "House show",
      headerBg: "linear-gradient(160deg, #0A0907, #2A2724)",
      darkOnHeader: false,
    },
  ],
};

/* ============================================================
   CONNECTION DAY — "Tonight's Reveal" experience
   ------------------------------------------------------------
   A sealed opening moment → a story-style carousel of the people
   who chose the same song as you → Vibe / Spark / Pass per person
   → a summary slide. Replaces the old "connections" list.
   No DMs anywhere — a Spark stays anonymous until it's mutual.
   ============================================================ */
export const reveal = {
  // sealed (opening) moment
  sealedLabel: "Tonight's Reveal · Georgetown", // [PLACEHOLDER campus]
  bigCount: 3, // [PLACEHOLDER] how many people matched tonight
  peopleLabel: "people at Georgetown tonight",
  headlineTop: "chose the same",
  headlineBottom: "song as you.",
  sealedSub: "You'll never know it was coming. That's the point.",
  // the song that connected everyone tonight
  sealedSong: {
    emoji: "🌊",
    name: "Self Control", // [PLACEHOLDER song]
    artist: "Frank Ocean", // [PLACEHOLDER artist]
    tag: "Your pick",
  },
  openCta: "See who they are",
  sealedHint: "Disappears at midnight",

  // one slide per person in the carousel
  people: [
    {
      id: "p1",
      initials: "AJ",
      avClass: "av1", // gold→orange
      ringClass: "r1",
      name: "Alexis J.", // [PLACEHOLDER name]
      meta: "Junior · She/Her", // [PLACEHOLDER]
      archetype: "🎵 The Culture Keeper", // [PLACEHOLDER]
      song: { emoji: "🌊", name: "Self Control", artist: "Frank Ocean" }, // [PLACEHOLDER]
      // the week strip — "match" = overlapped, "today" = tonight, "" = no overlap
      week: [
        { d: "Mon", s: "match" },
        { d: "Tue", s: "" },
        { d: "Wed", s: "match" },
        { d: "Thu", s: "" },
        { d: "Fri", s: "today" },
      ],
      prompt: "Three times this week. Same place, no coordination.", // [PLACEHOLDER]
    },
    {
      id: "p2",
      initials: "MT",
      avClass: "av2", // purple
      ringClass: "r2",
      name: "Marcus T.", // [PLACEHOLDER name]
      meta: "Senior · He/Him", // [PLACEHOLDER]
      archetype: "🔭 The Early Adopter", // [PLACEHOLDER]
      song: { emoji: "🌊", name: "Self Control", artist: "Frank Ocean" }, // [PLACEHOLDER]
      week: [
        { d: "Mon", s: "" },
        { d: "Tue", s: "match" },
        { d: "Wed", s: "" },
        { d: "Thu", s: "match" },
        { d: "Fri", s: "today" },
      ],
      prompt: "Also three times this week. Neither of you knew.", // [PLACEHOLDER]
    },
    {
      id: "p3",
      initials: "SL",
      avClass: "av3", // teal
      ringClass: "r3",
      name: "Sofia L.", // [PLACEHOLDER name]
      meta: "Sophomore · She/Her", // [PLACEHOLDER]
      archetype: "🌙 The Mood Curator", // [PLACEHOLDER]
      song: { emoji: "🌊", name: "Self Control", artist: "Frank Ocean" }, // [PLACEHOLDER]
      week: [
        { d: "Mon", s: "match" },
        { d: "Tue", s: "" },
        { d: "Wed", s: "" },
        { d: "Thu", s: "match" },
        { d: "Fri", s: "today" },
      ],
      prompt: "Same song, three different nights. That's not random.", // [PLACEHOLDER]
    },
  ],

  // the two reactions + the pass
  actions: {
    vibe: { title: "Vibe", sub: "Friends energy", icon: "👋", done: "✓ Vibed" },
    spark: { title: "Spark", sub: "Something more", icon: "✨", done: "✨ Sparked" },
    pass: "Not right now",
  },

  // the summary slide
  done: {
    title: "That's tonight's reveal.",
    sub: "If you sent a Spark — she sees that someone sparked her. She just doesn't know it was you until she sends one back.",
    replay: "Replay",
  },
};

/* ============================================================
   WRAPPED DAY — the shareable LIGO Wrapped card
   ============================================================ */
export const wrapped = {
  eyebrow: "LIGO Wrapped · this week",
  topArtistLabel: "Your top artist",
  topArtist: "SZA", // [PLACEHOLDER top artist]
  topArtistArt: artistArt.szaSaturn,
  // a single mood stat
  moodLabel: "Your week sounded",
  moodValue: "Nocturnal & nostalgic", // [PLACEHOLDER mood]
  minutesLabel: "Minutes listened",
  minutes: "1,240", // [PLACEHOLDER minutes]
  shareCta: "Share to your story",
};

/* ============================================================
   BOTTOM NAV — Home / Events / Games / Profile
   Only Home is wired; the rest are visual placeholders.
   ============================================================ */
export const navItems = [
  { id: "home", label: "Home" },
  { id: "events", label: "Events" },
  { id: "games", label: "Games" },
  { id: "profile", label: "Profile" },
] as const;

export type DayState = "normal" | "connection" | "wrapped";

export const dayStates: { id: DayState; label: string }[] = [
  { id: "normal", label: "Normal day" },
  { id: "connection", label: "Connection day" },
  { id: "wrapped", label: "Wrapped day" },
];
