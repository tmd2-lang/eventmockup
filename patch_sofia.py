import sys
import re

raw_table = """
1	Faye Webster	Right Side of My Neck	Atlanta Millionaires Club
2	Faye Webster	Kingston	Atlanta Millionaires Club
3	Faye Webster	I Know You	Faye Webster
4	Faye Webster	In A Good Way	I Know I’m Funny haha
5	Faye Webster	A Dream With a Baseball Player	I Know I’m Funny haha
6	Faye Webster	Better Distractions	I Know I’m Funny haha
7	Faye Webster	But Not Kiss	Underdressed at the Symphony
8	Faye Webster, Lil Yachty	Lego Ring	Underdressed at the Symphony
9	Clairo	Bags	Immunity
10	Clairo	Sofia	Immunity
11	Clairo	Alewife	Immunity
12	Clairo	Pretty Girl	Pretty Girl — Single
13	Clairo	Flaming Hot Cheetos	diary 001
14	Clairo	Amoeba	Sling
15	Clairo	Sexy to Someone	Charm
16	Clairo	Juna	Charm
17	Clairo	Add Up My Love	Charm
18	Phoebe Bridgers	Kyoto	Punisher
19	Phoebe Bridgers	Scott Street	Stranger in the Alps
20	Phoebe Bridgers	Motion Sickness	Stranger in the Alps
21	Phoebe Bridgers	Garden Song	Punisher
22	Phoebe Bridgers	Moon Song	Punisher
23	Phoebe Bridgers	Chinese Satellite	Punisher
24	Phoebe Bridgers	I Know The End	Punisher
25	SZA	Snooze	SOS
26	SZA	Good Days	SOS
27	SZA	Saturn	Lana
28	SZA	Kill Bill	SOS
29	SZA	Broken Clocks	Ctrl
30	SZA	Normal Girl	Ctrl
31	SZA	Drew Barrymore	Ctrl
32	SZA	Garden (Say It Like Dat)	Ctrl
33	Frank Ocean	Pink + White	Blonde
34	Frank Ocean	Nights	Blonde
35	Frank Ocean	Thinkin Bout You	channel ORANGE
36	Frank Ocean	Ivy	Blonde
37	Frank Ocean	Self Control	Blonde
38	Frank Ocean	Chanel	Chanel — Single
39	Steve Lacy	Bad Habit	Gemini Rights
40	Steve Lacy	Dark Red	Dark Red — Single
41	Steve Lacy	Helmet	Gemini Rights
42	Steve Lacy	Mercury	Gemini Rights
43	Daniel Caesar, H.E.R.	Best Part	Freudian
44	Daniel Caesar, Kali Uchis	Get You	Freudian
45	Daniel Caesar	Japanese Denim	Japanese Denim — Single
46	Daniel Caesar	Always	NEVER ENOUGH
47	Omar Apollo	Evergreen (You Didn’t Deserve Me At All)	Ivory
48	Omar Apollo	3 Boys	Live For Me
49	Kali Uchis	telepatía	Sin Miedo (del Amor y Otros Demonios)
50	Kali Uchis	Moonlight	Red Moon In Venus
51	Lana Del Rey	Brooklyn Baby	Ultraviolence
52	Lana Del Rey	Video Games	Born To Die
53	Lana Del Rey	Cinnamon Girl	Norman Fucking Rockwell!
54	Lana Del Rey	Let The Light In	Did you know that there’s a tunnel under Ocean Blvd
55	Beach House	Space Song	Depression Cherry
56	Beach House	Myth	Bloom
57	Beach House	PPP	Depression Cherry
58	Beach House	Silver Soul	Teen Dream
59	Cigarettes After Sex	Apocalypse	Cigarettes After Sex
60	Cigarettes After Sex	K.	Cigarettes After Sex
61	Cigarettes After Sex	Sweet	Cigarettes After Sex
62	The xx	Intro	xx
63	The xx	Angels	Coexist
64	Men I Trust	Show Me How	Oncle Jazz
65	Men I Trust	Numb	Oncle Jazz
66	Noah Kahan	Stick Season	Stick Season
67	Noah Kahan	Dial Drunk	Stick Season (We’ll All Be Here Forever)
68	Hozier	Too Sweet	Unheard — EP
69	Hozier	Cherry Wine - Live	Hozier
70	Bon Iver	Skinny Love	For Emma, Forever Ago
71	The Lumineers	Ophelia	Cleopatra
72	Gracie Abrams	I Love You, I’m Sorry	The Secret of Us
73	beabadoobee	Glue Song	Glue Song — Single
74	Laufey	From The Start	Bewitched
75	PinkPantheress	Pain	to hell with it
"""

with open("current_images.txt") as f:
    images = [line.strip() for line in f.readlines()]

def norm(s):
    return re.sub(r'[^a-z0-9]', '', s.lower())

def search_image(query_parts):
    query = norm(''.join(query_parts))
    for img in images:
        if query in norm(img):
            return "/" + img.split("public/", 1)[-1]
    return None

data = []
for line in raw_table.strip().split('\n'):
    parts = line.split('\t')
    if len(parts) == 4:
        idx, artist, title, album = parts
        data.append((artist, title, album))

artists = set()
for a, t, al in data:
    for sub_a in a.split(','):
        artists.add(sub_a.strip())

missing_artists = []
artist_profiles = {
    norm("Cigarettes After Sex"): "/assets/artists/cigsaftersex-profile.jpeg",
    norm("The Lumineers"): "/assets/artists/lumineers-profile.jpeg",
}

for a in artists:
    if norm(a) in artist_profiles:
        continue
    match = search_image([a])
    if match:
        artist_profiles[norm(a)] = match
    else:
        missing_artists.append(a)

missing_albums = []
album_covers = {
    norm("Cigarettes After Sex"): "/covers/cigsaftersexselftitled-coverart.jpeg",
    norm("Cleopatra"): "/covers/lumineerscleo-coverart.jpeg",
}

for a, t, al in data:
    key = norm(al)
    if key not in album_covers:
        match = search_image([a, al]) or search_image([al])
        if match:
            album_covers[key] = match
        else:
            missing_albums.append(f"{a} - {al}")

artists_str = chr(10).join(['  | "' + a + '"' for a in sorted(artists)])
artist_profiles_str = chr(10).join(['  "' + norm(a) + '": "' + artist_profiles.get(norm(a), '/assets/artists/FayeWebsterSpotify.jpeg') + '",' for a in artists])
album_covers_str = chr(10).join(['  "' + norm(al) + '": "' + album_covers[norm(al)] + '",' for a, t, al in data if norm(al) in album_covers])
raw_catalog_str = chr(10).join(['  ["' + a + '", "' + t.replace('"', '\\"') + '", "' + al.replace('"', '\\"') + '"],' for a, t, al in data])

ts_code = f"""export type ArtistBucket =
{artists_str}
;

export interface SofiaSong {{
  artist: string;
  title: string;
  album: string;
  cover: string;
  bucket: ArtistBucket;
}}

export function norm(s: string): string {{
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "");
}}

const ARTIST_PROFILE: Record<string, string> = {{
{artist_profiles_str}
}};

const ALBUM_COVER: Record<string, string> = {{
{album_covers_str}
}};

function bucketFor(artist: string): ArtistBucket {{
  return artist.split(',')[0].strip() as ArtistBucket;
}}

function resolveCover(artist: string, title: string, album: string): string {{
  const albumKey = norm(album);
  if (ALBUM_COVER[albumKey]) return ALBUM_COVER[albumKey];

  const primaryArtist = artist.split(',')[0].strip();
  const artistKey = norm(primaryArtist);
  return ARTIST_PROFILE[artistKey] ?? ARTIST_PROFILE['fayewebster'] ?? "";
}}

type RawRow = [string, string, string];

const RAW_CATALOG: RawRow[] = [
{raw_catalog_str}
];

export const SOFIA_CATALOG: SofiaSong[] = RAW_CATALOG.map(([artist, title, album]) => ({{
  artist,
  title,
  album,
  bucket: bucketFor(artist),
  cover: resolveCover(artist, title, album),
}}));

function buildHintSongs(): SofiaSong[] {{
  return SOFIA_CATALOG.slice(0, 8);
}}

const HINT_SONGS = buildHintSongs();

function scoreMatch(song: SofiaSong, tokens: string[]): number {{
  const hay = `${{song.title}} ${{song.artist}} ${{song.album}}`.toLowerCase();
  let score = 0;
  for (const t of tokens) {{
    if (!hay.includes(t)) return -1;
    if (song.title.toLowerCase().startsWith(t)) score += 12;
    else if (song.title.toLowerCase().includes(t)) score += 6;
    else if (song.artist.toLowerCase().includes(t)) score += 4;
    else score += 2;
  }}
  return score;
}}

function scoreSubstring(song: SofiaSong, query: string): number {{
  const hay = `${{song.title}} ${{song.artist}} ${{song.album}}`.toLowerCase();
  if (!hay.includes(query)) return -1;
  if (song.title.toLowerCase().includes(query)) return 8;
  if (song.artist.toLowerCase().includes(query)) return 6;
  return 3;
}}

export function searchSofiaCatalog(query: string, limit = 8): SofiaSong[] {{
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return HINT_SONGS.slice(0, limit);

  const tokens = trimmed.split(/\\s+/).filter(Boolean);

  let ranked = SOFIA_CATALOG.map((song) => ({{ song, score: scoreMatch(song, tokens) }}))
    .filter((x) => x.score >= 0)
    .sort((a, b) => b.score - a.score);

  if (!ranked.length) {{
    ranked = SOFIA_CATALOG.map((song) => ({{ song, score: scoreSubstring(song, trimmed) }}))
      .filter((x) => x.score >= 0)
      .sort((a, b) => b.score - a.score);
  }}

  return ranked.slice(0, limit).map((x) => x.song);
}}

export const SOFIA_CATALOG_COUNT = SOFIA_CATALOG.length;
"""

with open("lib/sofia-catalog.ts", "w") as f:
    f.write(ts_code)
