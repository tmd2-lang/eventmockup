import re

raw = """
1
Charli XCX
360
BRAT
2
Charli XCX
Club classics
BRAT
3
Charli XCX
Von dutch
BRAT
4
Charli XCX
Apple
BRAT
5
Charli XCX
Guess
BRAT and it’s the same but there’s three more songs so it’s not
6
Charli XCX
B2b
BRAT
7
Charli XCX
Talk talk
BRAT
8
Charli XCX
Sympathy is a knife
BRAT
9
Charli XCX
Vroom Vroom
Vroom Vroom — EP
10
Charli XCX
Unlock It
Pop 2
11
Charli XCX
Track 10
Pop 2
12
Charli XCX
Good Ones
CRASH
13
PinkPantheress
Pain
to hell with it
14
PinkPantheress
Break It Off
to hell with it
15
PinkPantheress
Just for me
to hell with it
16
PinkPantheress
Passion
to hell with it
17
PinkPantheress
I must apologise
to hell with it
18
PinkPantheress
Boy’s a liar Pt. 2
Heaven knows
19
PinkPantheress
Mosquito
Heaven knows
20
PinkPantheress
Capable of love
Heaven knows
21
PinkPantheress
Nice to meet you
Heaven knows
22
PinkPantheress
Turn it up
Turn it up — Single
23
The Dare
Girls
What’s Wrong With New York?
24
The Dare
Good Time
What’s Wrong With New York?
25
The Dare
Perfume
What’s Wrong With New York?
26
The Dare
I Destroyed Disco
What’s Wrong With New York?
27
The Dare
You’re Invited
What’s Wrong With New York?
28
The Dare
All Night
What’s Wrong With New York?
29
The Dare
Open Up
What’s Wrong With New York?
30
The Dare
Movement
What’s Wrong With New York?
31
Addison Rae
Diet Pepsi
Diet Pepsi — Single
32
Addison Rae
Aquamarine
Aquamarine — Single
33
Addison Rae
Headphones On
Headphones On — Single
34
Addison Rae
High Fashion
High Fashion — Single
35
Addison Rae
Fame is a Gun
Fame is a Gun — Single
36
Addison Rae
2 die 4
AR — EP
37
Lil Uzi Vert
XO Tour Llif3
Luv Is Rage 2
38
Lil Uzi Vert
20 Min
Luv Is Rage 2
39
Lil Uzi Vert
Just Wanna Rock
Just Wanna Rock — Single
40
Lil Uzi Vert
The Way Life Goes
Luv Is Rage 2
41
Lil Uzi Vert
Money Longer
Lil Uzi Vert vs. The World
42
Lil Uzi Vert
Do What I Want
The Perfect LUV Tape
43
Lil Uzi Vert
Sanguine Paradise
Sanguine Paradise — Single
44
Lil Uzi Vert
Erase Your Social
The Perfect LUV Tape
45
Lil Uzi Vert
That Way
Eternal Atake
46
Lil Uzi Vert
Myron
Eternal Atake / LUV vs. The World 2
47
Stick Figure
Angels Above Me
World on Fire
48
Stick Figure
World on Fire
World on Fire
49
Stick Figure
Once in a Lifetime
World on Fire
50
Stick Figure
Shine
World on Fire
51
Stick Figure
All for You
World on Fire
52
Stick Figure
Above the Storm
World on Fire
53
Stick Figure
Easy Runaway
World on Fire
54
Stick Figure
Fire on the Horizon
Wisdom
55
Phoenix
Lisztomania
Wolfgang Amadeus Phoenix
56
Phoenix
1901
Wolfgang Amadeus Phoenix
57
Phoenix
If I Ever Feel Better
United
58
Phoenix
Trying To Be Cool
Bankrupt!
59
Phoenix
Entertainment
Bankrupt!
60
Phoenix
Ti Amo
Ti Amo
61
Phoenix
Alpha Zulu
Alpha Zulu
62
Phoenix
Tonight
Alpha Zulu
63
Phoenix
Winter Solstice
Alpha Zulu
64
Two Door Cinema Club
What You Know
Tourist History
65
Two Door Cinema Club
Undercover Martyn
Tourist History
66
Two Door Cinema Club
Something Good Can Work
Tourist History
67
Two Door Cinema Club
Cigarettes in the Theatre
Tourist History
68
Two Door Cinema Club
I Can Talk
Tourist History
69
Two Door Cinema Club
Sun
Beacon
70
Two Door Cinema Club
Changing of the Seasons
Changing of the Seasons — EP
71
Two Door Cinema Club
Bad Decisions
Gameshow
72
Steve Lacy
Bad Habit
Gemini Rights
73
Steve Lacy
Dark Red
Dark Red — Single
74
Steve Lacy
Helmet
Gemini Rights
75
Steve Lacy
Mercury
Gemini Rights
76
Steve Lacy
N Side
Apollo XXI
77
Steve Lacy
C U Girl
Steve Lacy’s Demo
78
Tame Impala
The Less I Know The Better
Currents
79
Tame Impala
Let It Happen
Currents
80
Tame Impala
Borderline
The Slow Rush
81
Tame Impala
New Person, Same Old Mistakes
Currents
82
Tame Impala
Lost in Yesterday
The Slow Rush
83
Tame Impala
Eventually
Currents
84
Disclosure, Sam Smith
Latch
Settle
85
Disclosure, AlunaGeorge
White Noise
Settle
86
Disclosure, Eliza Doolittle
You & Me
Settle
87
Disclosure
F For You
Settle
88
Disclosure, Lorde
Magnets
Caracal
89
Empire of the Sun
Walking On A Dream
Walking On A Dream
90
Empire of the Sun
We Are The People
Walking On A Dream
91
Empire of the Sun
Alive
Ice on the Dune
92
MGMT
Electric Feel
Oracular Spectacular
93
MGMT
Kids
Oracular Spectacular
94
MGMT
Time to Pretend
Oracular Spectacular
95
Dominic Fike
3 Nights
Don’t Forget About Me, Demos
96
Dominic Fike
Mona Lisa
Spider-Man: Across the Spider-Verse
97
Mac Miller
The Spins
K.I.D.S.
98
Mac Miller
Dang!
The Divine Feminine
99
Playboi Carti
Sky
Whole Lotta Red
100
Ice Spice, PinkPantheress
Boy’s a liar Pt. 2
Heaven knows
101
The 1975
Somebody Else
I like it when you sleep, for you are so beautiful yet so unaware of it
102
The 1975
Robbers
The 1975
103
The 1975
Sex
The 1975
104
The 1975
Chocolate
The 1975
105
The 1975
Love It If We Made It
A Brief Inquiry Into Online Relationships
106
The 1975
It’s Not Living (If It’s Not With You)
A Brief Inquiry Into Online Relationships
107
The 1975
The Sound
I like it when you sleep, for you are so beautiful yet so unaware of it
108
The 1975
About You
Being Funny in a Foreign Language
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
{chr(10).join('  | "' + a + '"' for a in unique_artists)};

export interface MaddieSong {{
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

const ALBUM_COVER: Record<string, string> = {{
  brat: `${{COVERS}}/brat-coverart.jpeg`,
  vroomvroomep: `${{COVERS}}/vroomvroom-coverart.jpeg`,
  pop2: `${{COVERS}}/pop2-coverart.jpeg`,
  crash: `${{COVERS}}/charlixcx-crash-coverart.jpeg`,
  tohellwithit: `${{COVERS}}/pinkpantheress-tohellwithit-coverart.jpeg`,
  heavenknows: `${{COVERS}}/heavenknows-coverart.jpeg`,
  turnitupsingle: `${{COVERS}}/pinkpantheress-turnitup-coverart.jpeg`,
  whatswrongwithnewyork: `${{COVERS}}/whatswrongwithnewyork-coverart.jpeg`,
  dietpepsisingle: `${{COVERS}}/dietpepsi-coverart.jpeg`,
  aquamarinesingle: `${{COVERS}}/aquamarine-coverart.jpeg`,
  headphonesonsingle: `${{COVERS}}/headphones-coverart.jpeg`,
  highfashionsingle: `${{COVERS}}/highfashion-coverart.jpeg`,
  fameisagunsingle: `${{COVERS}}/fameisagun-coverart.jpeg`,
  arep: `${{COVERS}}/addisonraear-coverart.jpeg`,
  luvisrage2: `${{COVERS}}/luvisrage2-coverart.jpeg`,
  justwannarocksingle: `${{COVERS}}/justwannarock-coverart.jpeg`,
  liluzivertvstheworld: `${{COVERS}}/liluzivertvstheworld-coverart.jpeg`,
  theperfectluvtape: `${{COVERS}}/perfectluvtape-coverart.jpeg`,
  sanguineparadisesingle: `${{COVERS}}/sanguineparadise-coverart.jpeg`,
  eternalatake: `${{COVERS}}/eternalatake-coverart.jpeg`,
  eternalatakeluvvstheworld2: `${{COVERS}}/eternalatake-coverart.jpeg`,
  worldonfire: `${{COVERS}}/stickfigure-coverart.jpeg`,
  wisdom: `${{COVERS}}/fireonthehorizonstickfigure-coverart.jpeg`,
  wolfgangamadeusphoenix: `${{COVERS}}/wolfgangamadeus-coverart.jpeg`,
  united: `${{COVERS}}/phoenixuntied-coverart.jpeg`,
  bankrupt: `${{COVERS}}/bankruptphoenix-coverart.jpeg`,
  tiamo: `${{COVERS}}/tiamophoenix-coverart.jpeg`,
  alphazulu: `${{COVERS}}/alphazulu-coverart.jpeg`,
  touristhistory: `${{COVERS}}/touristhistory-coverart.jpeg`,
  beacon: `${{COVERS}}/beacon-coverart.jpeg`,
  changingoftheseasonsep: `${{COVERS}}/changingoftheseasons-coverart.jpeg`,
  gameshow: `${{COVERS}}/gameshow-coverart.jpeg`,
  geminirights: `${{COVERS}}/stevelacy-geminirights-coverart.jpeg`,
  darkredsingle: `${{COVERS}}/stevelacydarkred-coverart.jpeg`,
  apolloxxi: `${{COVERS}}/stevelacy-geminirights-coverart.jpeg`,
  stevelacysdemo: `${{COVERS}}/stevelacy-geminirights-coverart.jpeg`,
  currents: `${{COVERS}}/currents-coverart.jpeg`,
  theslowrush: `${{COVERS}}/slowrush-coverart.jpeg`,
  settle: `${{COVERS}}/disclosuresettle-coverart.jpeg`,
  caracal: `${{COVERS}}/disclosurecaracal-coverart.jpeg`,
  walkingonadream: `${{COVERS}}/walkingonadream-coverart.jpeg`,
  iceonthedune: `${{COVERS}}/iceonthedune-coverart.jpeg`,
  oracularspectacular: `${{COVERS}}/oracularspectacular-coverart.jpeg`,
  dontforgetaboutmedemos: `${{COVERS}}/dontforgetaboutmedemos-coverart.jpeg`,
  spidermanacrossthespiderverse: `${{COVERS}}/postmalonespiderverse-coverart.jpeg`,
  kids: `${{COVERS}}/kidsmacmiller-coverart.jpeg`,
  thedivinefeminine: `${{COVERS}}/divinefeminie-coverart.jpeg`,
  wholelottared: `${{COVERS}}/wholelottared-coverart.jpeg`,
  "bratanditsthesamebuttheresthreemoresongssoitsnot": `${{COVERS}}/brat-coverart.jpeg`,
  ilikeitwhenyousleepforyouaresobeautifulyetsounawareofit: `${{COVERS}}/ilikeitwhenyousleep-1975-coverart.jpeg`,
  the1975: `${{COVERS}}/1975selftitled-coverart.jpeg`,
  abriefinquiryintoonlinerelationships: `${{COVERS}}/briefinquiry-coverart.jpeg`,
  beingfunnyinaforeignlanguage: `${{COVERS}}/beingfunny-coverart.jpeg`,
}};

const ARTIST_PROFILE: Record<string, string> = {{
  charlixcx: `${{ARTISTS}}/charliexcx-profile.jpeg`,
  pinkpantheress: `${{ARTISTS}}/pinkpantheress-profile.jpeg`,
  thedare: `${{ARTISTS}}/thedare-profile.jpeg`,
  addisonrae: `${{ARTISTS}}/addisonrae-profile.jpeg`,
  liluzivert: `${{ARTISTS}}/liluzivert-profile.jpeg`,
  stickfigure: `${{ARTISTS}}/stickfigure-profile.jpeg`,
  phoenix: `${{ARTISTS}}/phoenix-profile.jpeg`,
  twodoorcinemaclub: `${{ARTISTS}}/2doorcinemaclub-profile.jpeg`,
  stevelacy: `${{ARTISTS}}/stevelacy-profile.jpeg`,
  tameimpala: `${{ARTISTS}}/tameimpala-profile.jpeg`,
  disclosure: `${{ARTISTS}}/disclosurespotifynew.jpeg`,
  empireofthesun: `${{ARTISTS}}/empireofthesun-profile.jpeg`,
  mgmt: `${{ARTISTS}}/MGMT-profile.jpeg`,
  dominicfike: `${{ARTISTS}}/dominicfike-profile.jpeg`,
  macmiller: `${{ARTISTS}}/macmiller-profile.jpeg`,
  playboicarti: `${{ARTISTS}}/playboicarti-profile.jpeg`,
  icespice: `${{ARTISTS}}/icespicespotify.jpeg`,
  the1975: `${{ARTISTS}}/the1975-profile.jpeg`,
}};

function bucketFor(artist: string): ArtistBucket {{
  return artist as ArtistBucket;
}}

function resolveCover(artist: string, title: string, album: string): string {{
  const albumKey = norm(album);
  if (ALBUM_COVER[albumKey]) return ALBUM_COVER[albumKey];
  let artistKey = norm(artist);
  // handle joint artists
  if (artistKey.includes("disclosure")) artistKey = "disclosure";
  if (artistKey.includes("icespice")) artistKey = "icespice";
  if (artistKey.includes("1975")) artistKey = "the1975";
  return ARTIST_PROFILE[artistKey] ?? `${{ARTISTS}}/${{artistKey}}.jpeg`;
}}

type RawRow = [ArtistBucket, string, string];

const RAW_CATALOG: RawRow[] = [
"""

for artist, song, album in songs:
    # Escape quotes
    artist = artist.replace('"', '\\"')
    song = song.replace('"', '\\"')
    album = album.replace('"', '\\"')
    content += f'  ["{artist}", "{song}", "{album}"],\n'

content += """];

export const MADDIE_CATALOG: MaddieSong[] = RAW_CATALOG.map(([artist, title, album]) => ({
  artist,
  title,
  album,
  bucket: bucketFor(artist),
  cover: resolveCover(artist, title, album),
}));

function buildHintSongs(): MaddieSong[] {
  const picks: [string, string, string?][] = [
    ["Charli XCX", "360", undefined],
    ["PinkPantheress", "Boy’s a liar Pt. 2", undefined],
    ["The Dare", "Girls", undefined],
    ["Lil Uzi Vert", "20 Min", undefined],
    ["Tame Impala", "The Less I Know The Better", undefined],
    ["MGMT", "Electric Feel", undefined],
  ];
  const out: MaddieSong[] = [];
  for (const [artist, title, album] of picks) {
    const hit = MADDIE_CATALOG.find(
      (s) => s.artist === artist && s.title === title && (album ? s.album === album : true)
    );
    if (hit) out.push(hit);
  }
  return out.length ? out : MADDIE_CATALOG.slice(0, 6);
}

const HINT_SONGS = buildHintSongs();

function scoreMatch(song: MaddieSong, tokens: string[]): number {
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

function scoreSubstring(song: MaddieSong, query: string): number {
  const hay = `${song.title} ${song.artist} ${song.album}`.toLowerCase();
  if (!hay.includes(query)) return -1;
  if (song.title.toLowerCase().includes(query)) return 8;
  if (song.artist.toLowerCase().includes(query)) return 6;
  return 3;
}

export function searchMaddieCatalog(query: string, limit = 8): MaddieSong[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return HINT_SONGS.slice(0, limit);

  const tokens = trimmed.split(/\\s+/).filter(Boolean);

  let ranked = MADDIE_CATALOG.map((song) => ({ song, score: scoreMatch(song, tokens) }))
    .filter((x) => x.score >= 0)
    .sort((a, b) => b.score - a.score);

  if (!ranked.length) {
    ranked = MADDIE_CATALOG.map((song) => ({ song, score: scoreSubstring(song, trimmed) }))
      .filter((x) => x.score >= 0)
      .sort((a, b) => b.score - a.score);
  }

  return ranked.slice(0, limit).map((x) => x.song);
}

export const MADDIE_CATALOG_COUNT = MADDIE_CATALOG.length;
"""

with open("lib/maddie-catalog.ts", "w") as f:
    f.write(content)
