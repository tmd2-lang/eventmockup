import re

with open("components/HomeScreen.tsx", "r") as f:
    text = f.read()

# 1. Imports
if "import { searchMarcusCatalog" not in text:
    text = text.replace(
        'import { searchSofiaCatalog } from "@/lib/sofia-catalog";',
        'import { searchSofiaCatalog } from "@/lib/sofia-catalog";\nimport { searchMarcusCatalog } from "@/lib/marcus-catalog";'
    )

# 2. News
marcus_news = """const MARCUS_NEWS = [
  { art: '/artists/tameimpala-profile.jpeg', src: 'Ligo Radar', when: '1h', head: 'Tame Impala hints at an upcoming B-sides compilation.' },
  { art: '/artists/MGMT-profile.jpeg', src: 'Campus chart', when: '3h', head: '"Electric Feel" takes over the Georgetown late night aux.' },
  { art: '/artists/freddiegibbs-profile.jpeg', src: 'Tour', when: '5h', head: 'Freddie Gibbs announces a surprise East Coast run.' },
  { art: '/artists/MK-profile.jpeg', src: 'Breaking', when: '12h', head: 'MK drops a new house anthem perfect for the pregame.' },
  { art: '/artists/fleetwoodmac-profike.jpeg', src: 'Pitchfork', when: '1d', head: 'Fleetwood Mac Rumours experiences a campus resurgence.' },
];
"""
if "const MARCUS_NEWS" not in text:
    text = text.replace("const ALESSIA_NEWS = [", marcus_news + "\nconst ALESSIA_NEWS = [")

text = text.replace(
    "activeUserId === 'alessia' ? ALESSIA_NEWS : NEWS;",
    "activeUserId === 'marcus' ? MARCUS_NEWS : activeUserId === 'alessia' ? ALESSIA_NEWS : NEWS;"
)

# 3. Search Hook
text = text.replace(
    "activeUserId === 'sofia'\n    ? searchSofiaCatalog(draft, 8)",
    "activeUserId === 'marcus'\n    ? searchMarcusCatalog(draft, 8)\n    : activeUserId === 'sofia'\n    ? searchSofiaCatalog(draft, 8)"
)

# 4. Shows
marcus_shows = """const MARCUS_SHOWS = [
  { name: 'Tame Impala Listening Party', venue: 'Leavey Center', when: 'Tonight 9:00', tag: 'Free', tagCls: 'green', art: '/artists/tameimpala-profile.jpeg' },
  { name: 'MK Deep House Basement', venue: 'Off campus', when: 'Fri 10:30', tag: '$10', tagCls: 'orange', art: '/artists/MK-profile.jpeg' },
];
"""
if "const MARCUS_SHOWS" not in text:
    text = text.replace("const ALESSIA_SHOWS = [", marcus_shows + "\nconst ALESSIA_SHOWS = [")

text = text.replace(
    "activeUserId === 'maddie' ? MADDIE_SHOWS : SHOWS;",
    "activeUserId === 'marcus' ? MARCUS_SHOWS : activeUserId === 'maddie' ? MADDIE_SHOWS : SHOWS;"
)

# 5. Connection Reveal Data
marcus_people = """const MARCUS_PEOPLE = [
  {
    name: 'Maddie R.', initials: 'MR', grad: 'linear-gradient(140deg, #F97316, #EA8CE1)',
    meta: 'Junior · She/Her', archetype: 'The Pop Oracle', aIcon: Icon.Music,
    week: ['match', 'miss', 'match', 'miss', 'today'],
    prompt: 'Three times this week. Tame Impala brought you together.',
    horoscope: "A Pop Oracle caught your rhythm. She reached for Charli XCX on Monday and Wednesday — and tonight you both landed on Tame Impala. The stars read late nights: a connection that thrives when the bass kicks in.",
  },
  {
    name: 'Cole B.', initials: 'CB', grad: 'linear-gradient(140deg, #2A5E40, #71C07F)',
    meta: 'Sophomore · He/Him', archetype: 'The Main Character', aIcon: Icon.Music,
    week: ['miss', 'match', 'miss', 'match', 'today'],
    prompt: 'Also three times this week. House anthems aligned.',
    horoscope: "A Main Character crossed your path. He brings the high energy you love, matching your answers Tuesday and Thursday. Expect a connection built on singing every word to the chorus — starting with the one you both picked tonight.",
  },
  {
    name: 'Sofia L.', initials: 'SL', grad: 'linear-gradient(140deg, #71C07F, #2F7D3F)',
    meta: 'Sophomore · She/Her', archetype: 'The Mood Curator', aIcon: Icon.Moon,
    week: ['match', 'miss', 'miss', 'match', 'today'],
    prompt: "Same song, three different nights. That's not random.",
    horoscope: "A Mood Curator is aligned with you. Her week ran nocturnal like yours — same answer Monday, same answer Thursday — and she chose 'Electric Feel' the moment you did. The reading: late-night drives, shared headphones, no small talk required.",
  },
];
const MARCUS_SONG = { name: 'Electric Feel', artist: 'MGMT', art: '/artists/MGMT-profile.jpeg' };
"""
if "const MARCUS_PEOPLE" not in text:
    text = text.replace("const ALESSIA_PEOPLE = [", marcus_people + "\nconst ALESSIA_PEOPLE = [")

text = text.replace(
    "activeUserId === 'alessia' ? ALESSIA_PEOPLE : PEOPLE;",
    "activeUserId === 'marcus' ? MARCUS_PEOPLE : activeUserId === 'alessia' ? ALESSIA_PEOPLE : PEOPLE;"
)
text = text.replace(
    "activeUserId === 'alessia' ? ALESSIA_SONG : SONG;",
    "activeUserId === 'marcus' ? MARCUS_SONG : activeUserId === 'alessia' ? ALESSIA_SONG : SONG;"
)

# 6. Wrapped Data
marcus_wrapped = """  marcus: {
    heroAccent: '#3B82F6', heroGrad: 'linear-gradient(140deg, #10B981, #3B82F6)',
    topPct: 38,
    label: 'The Deep Cut Generalist',
    statLabel: 'more niche at Georgetown',
    sub: 'Tame Impala, MGMT, Fleetwood Mac, MK — you share a different lane with almost everyone.',
    storyPicks: ['Tame Impala', 'MGMT', 'Fleetwood Mac'],
    song: { title: 'Electric Feel', artist: 'MGMT' },
    friends: [
      { n: 'Maddie R.', t: 'Matched 3x', p: 'MR', c: '#F97316' },
      { n: 'Cole B.', t: 'Matched 2x', p: 'CB', c: '#3B82F6' },
    ],
  },
"""
if "marcus: {" not in text:
    text = text.replace("  alessia: {", marcus_wrapped + "  alessia: {")

with open("components/HomeScreen.tsx", "w") as f:
    f.write(text)

print("HomeScreen.tsx patched successfully for Marcus!")
