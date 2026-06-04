export type ArtistBucket =
  | "Faye Webster"
  | "Clairo"
  | "Phoebe Bridgers"
  | "SZA"
  | "Frank Ocean"
  | "Steve Lacy";

export interface SofiaSong {
  artist: string;
  title: string;
  album: string;
  cover: string;
  bucket: ArtistBucket;
}

const ARTISTS = "/assets/artists";
const COVERS = "/covers";

export function norm(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

const ARTIST_PROFILE: Record<string, string> = {
  fayewebster: `${ARTISTS}/FayeWebsterSpotify.jpeg`,
  clairo: `${ARTISTS}/ClairoSpotify.jpeg`,
  phoebebridgers: `${ARTISTS}/PhoebeBridgersSpotify.jpeg`,
  sza: `${ARTISTS}/SZASpotify.jpeg`,
  frankocean: `${ARTISTS}/frankocean-profile.jpeg`,
  stevelacy: `${ARTISTS}/SteveLacySpotify.jpeg`,
};

function bucketFor(artist: string): ArtistBucket {
  return artist as ArtistBucket;
}

function resolveCover(artist: string, title: string, album: string): string {
  const artistKey = norm(artist);
  return ARTIST_PROFILE[artistKey] ?? `/assets/artists/FayeWebsterSpotify.jpeg`;
}

type RawRow = [ArtistBucket, string, string];

const RAW_CATALOG: RawRow[] = [
  ["Faye Webster", "Right Side of My Neck", "Atlanta Millionaires Club"],
  ["Clairo", "Bags", "Immunity"],
  ["Phoebe Bridgers", "Motion Sickness", "Stranger in the Alps"],
  ["SZA", "Good Days", "SOS"],
  ["Frank Ocean", "Self Control", "Blonde"],
  ["Steve Lacy", "Bad Habit", "Gemini Rights"],
];

export const SOFIA_CATALOG: SofiaSong[] = RAW_CATALOG.map(([artist, title, album]) => ({
  artist,
  title,
  album,
  bucket: bucketFor(artist),
  cover: resolveCover(artist, title, album),
}));

function buildHintSongs(): SofiaSong[] {
  return SOFIA_CATALOG.slice(0, 6);
}

const HINT_SONGS = buildHintSongs();

function scoreMatch(song: SofiaSong, tokens: string[]): number {
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

function scoreSubstring(song: SofiaSong, query: string): number {
  const hay = `${song.title} ${song.artist} ${song.album}`.toLowerCase();
  if (!hay.includes(query)) return -1;
  if (song.title.toLowerCase().includes(query)) return 8;
  if (song.artist.toLowerCase().includes(query)) return 6;
  return 3;
}

export function searchSofiaCatalog(query: string, limit = 8): SofiaSong[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return HINT_SONGS.slice(0, limit);

  const tokens = trimmed.split(/\s+/).filter(Boolean);

  let ranked = SOFIA_CATALOG.map((song) => ({ song, score: scoreMatch(song, tokens) }))
    .filter((x) => x.score >= 0)
    .sort((a, b) => b.score - a.score);

  if (!ranked.length) {
    ranked = SOFIA_CATALOG.map((song) => ({ song, score: scoreSubstring(song, trimmed) }))
      .filter((x) => x.score >= 0)
      .sort((a, b) => b.score - a.score);
  }

  return ranked.slice(0, limit).map((x) => x.song);
}

export const SOFIA_CATALOG_COUNT = SOFIA_CATALOG.length;
