import re

raw = """
1
Tame Impala
Let It Happen
Currents
2
Tame Impala
The Less I Know The Better
Currents
3
Tame Impala
Eventually
Currents
4
Tame Impala
New Person, Same Old Mistakes
Currents
5
Tame Impala
Borderline
The Slow Rush
6
Tame Impala
Lost In Yesterday
The Slow Rush
7
Tame Impala
Elephant
Lonerism
8
Tame Impala
Feels Like We Only Go Backwards
Lonerism
9
Tame Impala
Mind Mischief
Lonerism
10
Tame Impala
Solitude Is Bliss
InnerSpeaker
11
MGMT
Electric Feel
Oracular Spectacular
12
MGMT
Kids
Oracular Spectacular
13
MGMT
Time to Pretend
Oracular Spectacular
14
MGMT
Little Dark Age
Little Dark Age
15
MGMT
Congratulations
Congratulations
16
The Strokes
Reptilia
Room on Fire
17
The Strokes
Someday
Is This It
18
The Strokes
Last Nite
Is This It
19
The Strokes
The Adults Are Talking
The New Abnormal
20
The Strokes
Ode To The Mets
The New Abnormal
21
Arctic Monkeys
Do I Wanna Know?
AM
22
Arctic Monkeys
505
Favourite Worst Nightmare
23
Arctic Monkeys
Fluorescent Adolescent
Favourite Worst Nightmare
24
Arctic Monkeys
R U Mine?
AM
25
Gorillaz
Feel Good Inc.
Demon Days
26
Gorillaz
On Melancholy Hill
Plastic Beach
27
Empire of the Sun
Walking On A Dream
Walking On A Dream
28
Empire of the Sun
We Are The People
Walking On A Dream
29
Fleetwood Mac
Dreams
Rumours
30
Fleetwood Mac
The Chain
Rumours
31
Fleetwood Mac
Go Your Own Way
Rumours
32
Fleetwood Mac
Everywhere
Tango in the Night
33
Fleetwood Mac
Rhiannon
Fleetwood Mac
34
The Rolling Stones
Gimme Shelter
Let It Bleed
35
The Rolling Stones
Sympathy For The Devil
Beggars Banquet
36
The Rolling Stones
Paint It Black
Aftermath
37
The Rolling Stones
Start Me Up
Tattoo You
38
Tom Petty and the Heartbreakers
American Girl
Tom Petty and the Heartbreakers
39
Tom Petty
Free Fallin’
Full Moon Fever
40
Tom Petty and the Heartbreakers
Mary Jane’s Last Dance
Greatest Hits
41
Tom Petty
Runnin’ Down a Dream
Full Moon Fever
42
Eagles
Hotel California
Hotel California
43
Eagles
Take It Easy
Eagles
44
Eagles
Life in the Fast Lane
Hotel California
45
Dire Straits
Sultans of Swing
Dire Straits
46
Dire Straits
Money for Nothing
Brothers in Arms
47
Queen
Another One Bites the Dust
The Game
48
Queen
Don’t Stop Me Now
Jazz
49
Queen
Somebody to Love
A Day at the Races
50
Pink Floyd
Wish You Were Here
Wish You Were Here
51
Pink Floyd
Comfortably Numb
The Wall
52
Pink Floyd
Another Brick in the Wall, Pt. 2
The Wall
53
MK
17
17 — Single
54
MK
Burning
Burning — Single
55
MK, Becky Hill
Piece of Me
Piece of Me — Single
56
MK, Jonas Blue, Becky Hill
Back & Forth
Back & Forth — Single
57
MK, Dom Dolla
Rhyme Dust
Rhyme Dust — Single
58
Storm Queen, MK
Look Right Through - MK Dub III
Look Right Through — Single
59
Route 94, Jess Glynne
My Love
My Love — Single
60
Disclosure, Sam Smith
Latch
Settle
61
Disclosure, AlunaGeorge
White Noise
Settle
62
Disclosure, Eliza Doolittle
You & Me
Settle
63
Disclosure
F For You
Settle
64
Disclosure, Lorde
Magnets
Caracal
65
KAYTRANADA, Kali Uchis
10%
BUBBA
66
KAYTRANADA, Anderson .Paak
Glowed Up
99.9%
67
KAYTRANADA, Syd
You’re the One
99.9%
68
KAYTRANADA
Lite Spots
99.9%
69
KAYTRANADA, H.E.R.
Intimidated
Intimidated — EP
70
KAYTRANADA, Rochelle Jordan
Lover/Friend
TIMELESS
71
Duke Dumont
Ocean Drive
Blasé Boys Club Part 1
72
Duke Dumont, Jax Jones
I Got U
I Got U — Single
73
Calvin Harris
Feel So Close
18 Months
74
Calvin Harris
Summer
Motion
75
Calvin Harris, Disciples
How Deep Is Your Love
How Deep Is Your Love — Single
76
Fred again.., The Blessed Madonna
Marea (we’ve lost dancing)
Actual Life
77
Chris Lake, Aatig
In The Yuma
In The Yuma — Single
78
ANOTR, Abel Balder
Relax My Eyes
Relax My Eyes — Single
79
Freddie Gibbs, The Alchemist
1985
Alfredo
80
Freddie Gibbs, The Alchemist, Rick Ross
Scottie Beam
Alfredo
81
Freddie Gibbs, The Alchemist, Tyler, The Creator
Something to Rap About
Alfredo
82
Freddie Gibbs, Madlib
Crime Pays
Bandana
83
Freddie Gibbs, Madlib
Thuggin’
Piñata
84
Freddie Gibbs, Madlib, Pusha T, Killer Mike
Palmolive
Bandana
85
Joey Bada$$, Capital STEEZ
Survival Tactics
1999
86
Joey Bada$$
Waves
1999
87
Joey Bada$$
Love Is Only a Feeling
Love Is Only a Feeling — Single
88
Joey Bada$$
DEVASTATED
ALL-AMERIKKKAN BADA$$
89
Isaiah Rashad
Free Lunch
The Sun’s Tirade
90
Isaiah Rashad, Zacari, Kendrick Lamar
Wat’s Wrong
The Sun’s Tirade
91
Isaiah Rashad
4r Da Squaw
The Sun’s Tirade
92
Isaiah Rashad
Headshots (4r Da Locals)
The House Is Burning
93
Mac Miller
The Spins
K.I.D.S.
94
Mac Miller, Anderson .Paak
Dang!
The Divine Feminine
95
Mac Miller
Self Care
Swimming
96
Mac Miller
Blue World
Circles
97
Nas
N.Y. State of Mind
Illmatic
98
Nas
The World Is Yours
Illmatic
99
A$AP Rocky
Sundress
Sundress — Single
100
Pusha T
If You Know You Know
DAYTONA
"""

lines = [line.strip() for line in raw.split("\n") if line.strip()]
songs = []
for i in range(0, len(lines), 4):
    if i + 3 < len(lines):
        num = lines[i]
        artist = lines[i+1]
        song = lines[i+2]
        album = lines[i+3]
        songs.append((artist, song, album))

unique_artists = sorted(list(set(a for a,_,_ in songs)))

content = f"""export type ArtistBucket =
{chr(10).join('  | "' + a.replace('"', '\\"') + '"' for a in unique_artists)};

export interface MarcusSong {{
  artist: string;
  title: string;
  album: string;
  cover: string;
  bucket: ArtistBucket;
}}

const COVERS = "/covers";
const ARTISTS = "/artists";

export function norm(s: string): string {{
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "");
}}

const ALBUM_COVER: Record<string, string> = {{}};
const ARTIST_PROFILE: Record<string, string> = {{}};

function bucketFor(artist: string): ArtistBucket {{
  return artist as ArtistBucket;
}}

function resolveCover(artist: string, title: string, album: string): string {{
  const albumKey = norm(album);
  if (ALBUM_COVER[albumKey]) return ALBUM_COVER[albumKey];
  let artistKey = norm(artist);
  // handle joint artists
  if (artistKey.includes("disclosure")) artistKey = "disclosure";
  if (artistKey.includes("freddiegibbs")) artistKey = "freddiegibbs";
  if (artistKey.includes("kaytranada")) artistKey = "kaytranada";
  if (artistKey.includes("mk")) artistKey = "mk";
  return ARTIST_PROFILE[artistKey] ?? `${{ARTISTS}}/${{artistKey}}.jpeg`;
}}

type RawRow = [ArtistBucket, string, string];

const RAW_CATALOG: RawRow[] = [
"""

for artist, song, album in songs:
    artist_esc = artist.replace('"', '\\"')
    song_esc = song.replace('"', '\\"')
    album_esc = album.replace('"', '\\"')
    content += f'  ["{artist_esc}", "{song_esc}", "{album_esc}"],\n'

content += """];

export const MARCUS_CATALOG: MarcusSong[] = RAW_CATALOG.map(([artist, title, album]) => ({
  artist,
  title,
  album,
  bucket: bucketFor(artist),
  cover: resolveCover(artist, title, album),
}));

function buildHintSongs(): MarcusSong[] {
  const picks: [string, string, string?][] = [
    ["Tame Impala", "Let It Happen", undefined],
    ["MGMT", "Electric Feel", undefined],
    ["Fleetwood Mac", "Dreams", undefined],
    ["MK", "17", undefined],
    ["Freddie Gibbs, Madlib", "Crime Pays", undefined],
    ["KAYTRANADA, Kali Uchis", "10%", undefined],
  ];
  const out: MarcusSong[] = [];
  for (const [artist, title, album] of picks) {
    const hit = MARCUS_CATALOG.find(
      (s) => s.artist === artist && s.title === title && (album ? s.album === album : true)
    );
    if (hit) out.push(hit);
  }
  return out.length ? out : MARCUS_CATALOG.slice(0, 6);
}

const HINT_SONGS = buildHintSongs();

function scoreMatch(song: MarcusSong, tokens: string[]): number {
  const hay = `${song.title} ${song.artist} ${song.album}`.toLowerCase();
  let score = 0;
  for (const t of tokens) {
    if (!hay.includes(t)) return -1;
    if (song.title.toLowerCase().startsWith(t)) score += 12;
    else if (song.title.toLowerCase().includes(t)) score += 6;
    else if (song.artist.toLowerCase().includes(t)) score += 4;
    else score += 2;
  }
  return score;
}

function scoreSubstring(song: MarcusSong, query: string): number {
  const hay = `${song.title} ${song.artist} ${song.album}`.toLowerCase();
  if (!hay.includes(query)) return -1;
  if (song.title.toLowerCase().includes(query)) return 8;
  if (song.artist.toLowerCase().includes(query)) return 6;
  return 3;
}

export function searchMarcusCatalog(query: string, limit = 8): MarcusSong[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return HINT_SONGS.slice(0, limit);

  const tokens = trimmed.split(/\s+/).filter(Boolean);

  let ranked = MARCUS_CATALOG.map((song) => ({ song, score: scoreMatch(song, tokens) }))
    .filter((x) => x.score >= 0)
    .sort((a, b) => b.score - a.score);

  if (!ranked.length) {
    ranked = MARCUS_CATALOG.map((song) => ({ song, score: scoreSubstring(song, trimmed) }))
      .filter((x) => x.score >= 0)
      .sort((a, b) => b.score - a.score);
  }

  return ranked.slice(0, limit).map((x) => x.song);
}

export const MARCUS_CATALOG_COUNT = MARCUS_CATALOG.length;
"""

with open("lib/marcus-catalog.ts", "w") as f:
    f.write(content)
print("Created marcus-catalog.ts")

# Now update users.tsx
with open("lib/users.tsx", "r") as f:
    users_content = f.read()

marcus_profile = """  marcus: {
    id: 'marcus',
    name: 'Marcus T.',
    firstName: 'Marcus',
    avatar: '/assets/Marcus-profile.png',
    archetype: 'The Deep Cut Generalist',
    archetypeIcon: 'deep-cut',
    gradient: 'linear-gradient(145deg, #10B981, #3B82F6)',
    yearLevel: 'Senior',
    pronouns: 'He/Him',
    school: 'Georgetown',
    profile: {
      earnedArchetypeId: 'deep-cut',
      heldWeeks: '1 week',
      earnedBlurb: "The true mixer. Marcus is no longer niche for niche sake. He can move from Fleetwood Mac to Freddie Gibbs, MK to Tame Impala, Disclosure to The Strokes, and make it feel like one worldview.",
      traits: [
        { n: '38%', l: <><b>more niche</b> at Georgetown</> },
        { n: '12', l: <><b>core artists</b> carried your week</> },
        { n: '1', l: <><b>perfect transition</b> made the room stop and ask for the song</> }
      ],
      artists: [
        { name: 'Tame Impala', photo: `/artists/tameimpala-profile.jpeg`, pos: 'center 20%', rank: 1 },
        { name: 'MGMT', photo: `/artists/MGMT-profile.jpeg`, pos: 'center 20%', rank: 2 },
        { name: 'Fleetwood Mac', photo: `/artists/fleetwoodmac-profile.jpeg`, pos: 'center 20%', rank: 3 },
        { name: 'MK', photo: `/artists/mk-profile.jpeg`, pos: 'center 20%', rank: 4 },
        { name: 'Freddie Gibbs', photo: `/artists/freddiegibbs-profile.jpeg`, pos: 'center 20%', rank: 5 },
        { name: 'KAYTRANADA', photo: `/artists/kaytranada-profile.jpeg`, pos: 'center 20%', rank: 6 },
      ],
      afterHoursCover: [
        `/artists/tameimpala-profile.jpeg`,
        `/artists/MGMT-profile.jpeg`,
        `/artists/fleetwoodmac-profile.jpeg`,
        `/artists/mk-profile.jpeg`,
      ],
      playlistTrackCount: 100,
      answerTrail: [
        { day: 'Today', song: 'Electric Feel', artist: 'MGMT', today: true },
        { day: 'Sun', song: 'Let It Happen', artist: 'Tame Impala' },
        { day: 'Sat', song: '17', artist: 'MK' },
        { day: 'Fri', song: 'Crime Pays', artist: 'Freddie Gibbs, Madlib' },
        { day: 'Thu', song: 'Dreams', artist: 'Fleetwood Mac' },
        { day: 'Wed', song: '10%', artist: 'KAYTRANADA, Kali Uchis' },
        { day: 'Tue', song: 'Reptilia', artist: 'The Strokes' },
      ],
      playlistTracks: [
        { title: 'Electric Feel', artist: 'MGMT', dur: '3:49', photo: `/artists/MGMT-profile.jpeg`, coverArt: `/covers/mgmtoracularspectacular-coverart.jpeg` },
        { title: 'Let It Happen', artist: 'Tame Impala', dur: '7:47', photo: `/artists/tameimpala-profile.jpeg`, coverArt: `/covers/currents-coverart.jpeg` },
        { title: '17', artist: 'MK', dur: '3:16', photo: `/artists/mk-profile.jpeg`, coverArt: `/covers/mk17-coverart.jpeg` },
        { title: 'Crime Pays', artist: 'Freddie Gibbs, Madlib', dur: '3:02', photo: `/artists/freddiegibbs-profile.jpeg`, coverArt: `/covers/bandana-coverart.jpeg` },
      ],
      pastReads: [
        { type: 'time-machine', date: 'Your Music Horoscope', head: "You’re the compatibility wild card today.", body: 'Your last five check-ins jump from MGMT and Tame Impala into MK and Freddie Gibbs, which means your night starts chill, hits the dancefloor, and somehow ends with everyone agreeing on your taste.' },
        { type: 'honest', date: 'Hot Take', head: '“The best aux is one your dad would respect and your friends would still dance to.”', body: 'Tame Impala, MGMT, Fleetwood Mac, MK — you share a different lane with almost everyone.' },
      ],
      currentStreak: 4,
      longestStreak: 11,
      tasteEvolution: [
        { month: 'March', archetype: 'The Mood Curator' },
        { month: 'April', archetype: 'The Deep Cut Generalist' },
        { month: 'May', archetype: 'The Deep Cut Generalist', note: 'held 2 weeks' },
      ],
      rarestPicks: [
        { stat: 'Top 38%', label: 'more niche at Georgetown' },
      ],
      connectedSongs: [
        { song: 'Let It Happen', artist: 'Tame Impala', people: 5 },
        { song: '17', artist: 'MK', people: 2 },
        { song: 'Reptilia', artist: 'The Strokes', people: 4 },
      ],
      firstToPick: [
        { text: 'Tame Impala energy' },
        { text: 'Mixes everything' },
        { text: 'Unites the room' }
      ],
      hotTake: 'The best aux is one your dad would respect and your friends would still dance to.',
      nowListening: { title: 'Electric Feel', artist: 'MGMT', photo: `/artists/MGMT-profile.jpeg`, coverArt: `/covers/mgmtoracularspectacular-coverart.jpeg` },
      onRepeat: [
        { title: 'Electric Feel', artist: 'MGMT', photo: `/artists/MGMT-profile.jpeg`, coverArt: `/covers/mgmtoracularspectacular-coverart.jpeg` },
        { title: 'Let It Happen', artist: 'Tame Impala', photo: `/artists/tameimpala-profile.jpeg`, coverArt: `/covers/currents-coverart.jpeg` },
        { title: '17', artist: 'MK', photo: `/artists/mk-profile.jpeg`, coverArt: `/covers/mk17-coverart.jpeg` },
      ],
      archetypeSubline: (
        <>
          <b style={{ color: '#fff' }}>38%</b> more niche · <b style={{ color: '#fff' }}>Tame, MGMT, Fleetwood</b> core · <span style={{ color: '#3B82F6', fontWeight: 600 }}>the true mixer</span>
        </>
      ),
      mainstreamScoreAccent: 'Top 38%',
      mainstreamScoreRest: 'more niche at Georgetown',
      mainstreamMeterPct: 62,
      mainstreamFootnote: (
        <>
          <b>Tame Impala, MGMT, Fleetwood Mac, MK</b> — you share a different lane with almost everyone.
        </>
      ),
      horoscope: {
        headline: "You’re the compatibility wild card today.",
        body: 'Your last five check-ins jump from MGMT and Tame Impala into MK and Freddie Gibbs, which means your night starts chill, hits the dancefloor, and somehow ends with everyone agreeing on your taste.',
        chips: [
          { label: 'Tame Impala energy', tone: 'orange' },
          { label: 'Mixes everything', tone: 'yellow' },
          { label: 'Unites the room', tone: 'pink' },
        ],
      },
      playlistName: 'the true mixer',
      secretTrack: {
        label: 'Guilty Pleasure',
        title: 'Dreams',
        artist: 'Fleetwood Mac',
        cover: `/covers/rumours-coverart.jpeg`,
        accentColor: '#3B82F6',
      },
      receiptsFooter: 'Built from your daily answers · Tame Impala, MGMT, Fleetwood Mac, MK, Freddie Gibbs, The Rolling Stones, and 100 tracks across the semester.',
      notifications: [
        { ic: 'M', bg: 'linear-gradient(145deg,#14B8A6,#A78BFA)', text: <><b>Maddie</b> bumped you — you&apos;re a <b>85% match</b> on Tame Impala and The Strokes.</>, time: '11 min ago', unread: true },
        { ic: 'C', bg: 'linear-gradient(145deg,#3B82F6,#14B8A6)', text: <><b>Cole</b> bumped you — you&apos;re a <b>75% match</b> on MK and Disclosure.</>, time: '15 min ago', unread: true },
        { ic: '◉', bg: '#0A0907', text: <>Your archetype held steady — <b>The Deep Cut Generalist</b> for 2 weeks running.</>, time: '4 hr ago', unread: true },
      ],
    }
  },
"""

idx_charlotte = users_content.find("  charlotte: {")
if idx_charlotte != -1 and "marcus: {" not in users_content:
    new_users_content = users_content[:idx_charlotte] + marcus_profile + users_content[idx_charlotte:]
    with open("lib/users.tsx", "w") as f:
        f.write(new_users_content)
    print("Inserted Marcus into users.tsx")

# Now update archetypes.tsx
with open("components/profile/archetypes.tsx", "r") as f:
    arch_content = f.read()

new_arch = """  {
    id: "deep-cut",
    name: "The Deep Cut Generalist",
    descriptor: "The true mixer. Moves from Fleetwood Mac to Freddie Gibbs and makes it feel like one worldview.",
    ring: ["#10B981", "#3B82F6", "#8B5CF6"],
    accent: "#3B82F6",
    eyebrow: "#3B82F6",
    glow:
      "radial-gradient(400px 220px at 10% 0%, rgba(59,130,246,0.2), transparent 60%), radial-gradient(320px 260px at 100% 100%, rgba(16,185,129,0.12), transparent 60%)",
    seal: "globe",
  },
"""

if "deep-cut" not in arch_content:
    arch_content = arch_content.replace('];\n\nexport function getArchetypeById', new_arch + '];\n\nexport function getArchetypeById')
    with open("components/profile/archetypes.tsx", "w") as f:
        f.write(arch_content)
    print("Added archetype to archetypes.tsx")
