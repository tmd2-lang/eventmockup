export type ArtistBucket =
  | "Lana Del Rey"
  | "The Weeknd"
  | "Beach House"
  | "Billie Eilish"
  | "Disclosure"
  | "Disco Lines"
  | "Chris Stussy"
  | "Adam Port"
  | "Peggy Gou"
  | "ANOTR"
  | "Solomun"
  | "Calvin Harris";

export interface AlessiaSong {
  artist: string;
  title: string;
  album: string;
  cover: string;
  bucket: ArtistBucket;
}

const COVERS = "/covers";
const ARTISTS = "/artists";

export function norm(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

const ALBUM_COVER: Record<string, string> = {
  borntodie: `${COVERS}/lanaborntodie-coverart.jpeg`,
  ultraviolence: `${COVERS}/lanadelreyultraviolence-coverart.jpeg`,
  gatsby: `${COVERS}/lanagatsby-coverart.jpeg`,
  normanfuckingrockwell: `${COVERS}/lananormanrock-coverart.jpeg`,
  oceanblvd: `${COVERS}/lanaocean-coverart.jpeg`,
  sayyes: `${COVERS}/lanasayyes-coverart.jpeg`,
  starboy: `${COVERS}/weekndstarboy-coverart.jpeg`,
  afterhours: `${COVERS}/theweekndafterhours-coverart.jpeg`,
  dawnfm: `${COVERS}/weeknddawnfm-coverart.jpeg`,
  trilogy: `${COVERS}/weekndtrilogy-coverart.jpeg`,
  kissland: `${COVERS}/weeknd-kissland-coverart.jpeg`,
  beautybehindthemadness: `${COVERS}/weekndbeautybehindthemadness-coverart.jpeg`,
  mydearmelancholy: `${COVERS}/theweeknd-dearmelancholy-coverart.jpeg`,
  hurryuptomorrow: `${COVERS}/weekndhurryuptomorrow-coverart.jpeg`,
  depressioncherry: `${COVERS}/beachhousedepressioncherry-coverart.jpeg`,
  teendream: `${COVERS}/beachhouseteendream-coverart.jpeg`,
  bloom: `${COVERS}/beachhousebloom-coverart.jpeg`,
  oncetwicemelody: `${COVERS}/beachhouse-oncetwicemelody-coverart.jpeg`,
  whenweallfallasleep: `${COVERS}/billiewhenwefallasleep-coverart.jpeg`,
  happierthanever: `${COVERS}/billiehappier-coverart.jpeg`,
  hitmehardandsoft: `${COVERS}/billiehitmehard-coverart.jpeg`,
  everythingiwanted: `${COVERS}/billieeverythingiwanted-coverart.jpeg`,
  settle: `${COVERS}/disclosuresettle-coverart.jpeg`,
  caracal: `${COVERS}/disclosurecaracal-coverart.jpeg`,
  energy: `${COVERS}/disclosureenergy-coverart.jpeg`,
  babygirl: `${COVERS}/discolinesbabygirl-coverart.jpeg`,
  idonttrustasoul: `${COVERS}/discolines-idonttrustasoul-coverart.jpeg`,
  nobrokeboys: `${COVERS}/discolines-nobrokeboys-coverart.jpeg`,
  allnightlong: `${COVERS}/chrisstussy-allnightlong-coverart.jpeg`,
  desire: `${COVERS}/chrisstussy-desire-coverart.jpeg`,
  breather: `${COVERS}/chrisstussybreahter-coverart.jpeg`,
  wideawake: `${COVERS}/chrisstussywideawake-coverart.jpeg`,
  wontstop: `${COVERS}/chrisstussywontstop-coverart.jpeg`,
  planet9: `${COVERS}/adamport-planet9-coverart.jpeg`,
  formsoflove: `${COVERS}/adamportformsoflove-coverart.jpeg`,
  movesingle: `${COVERS}/move-coverart.jpeg`,
  igo: `${COVERS}/peggygouigo-coverart.jpeg`,
  itgoeslike: `${COVERS}/peggygougoeslike-coverart.jpeg`,
  relaxmyeyes: `${COVERS}/ANOTR-relaxmyeyes-coverart.jpeg`,
  talktoyou: `${COVERS}/ANOTR-talktoyou-coverart.jpeg`,
  onatrip: `${COVERS}/ANOTR-onatrip-coverart.jpeg`,
  vertigo: `${COVERS}/ANOTR-Vertigo-coverart.jpeg`,
  turnitup: `${COVERS}/ANOTR-24-coverart.jpeg`,
  likeit: `${COVERS}/ANOTR-Likeit-coverart.jpeg`,
  nobodyisnotloved: `${COVERS}/solomunnobodyisnotloved-coverart.jpeg`,
  friends: `${COVERS}/solomunfriends-coverart.jpeg`,
  kack: `${COVERS}/solomunkack-coverart.jpeg`,
  "18months": `${COVERS}/calvin18months-coverart.jpeg`,
  motion: `${COVERS}/calvinharrismotion-coverart.jpeg`,
  thisiswhatyoucamefor: `${COVERS}/calvinharris-thisiswhatyoucamefor-coverart.jpeg`,
  howdeepisyourlove: `${COVERS}/calvinharrishowdeep-coverart.jpeg`,
};

const ARTIST_PROFILE: Record<string, string> = {
  lanadelrey: `/assets/artists/lanadelreyspotifynew.jpeg`,
  theweeknd: `${ARTISTS}/theweekndprofile.jpeg`,
  beachhouse: `/assets/artists/beachhousespotifynew.jpeg`,
  billieeilish: `${ARTISTS}/billieeilish-profile.jpeg`,
  disclosure: `/assets/artists/disclosurespotifynew.jpeg`,
  discolines: `${ARTISTS}/discolines-profile.jpeg`,
  chrisstussy: `${ARTISTS}/chrisstussy-profile.jpeg`,
  adamport: `/assets/artists/adamportspotifynew.jpeg`,
  peggygou: `${ARTISTS}/peggygou-profile.jpeg`,
  anotr: `${ARTISTS}/anotr-profile.jpeg`,
  solomun: `${ARTISTS}/solomun-profile.jpeg`,
  calvinharris: `${ARTISTS}/calvinharris-profile.jpeg`,
};

function bucketFor(artist: string): ArtistBucket {
  return artist as ArtistBucket;
}

function resolveCover(artist: string, title: string, album: string): string {
  const albumKey = norm(album);
  if (ALBUM_COVER[albumKey]) return ALBUM_COVER[albumKey];

  const artistKey = norm(artist);
  return ARTIST_PROFILE[artistKey] ?? `/assets/artists/lanadelreyspotifynew.jpeg`;
}

type RawRow = [ArtistBucket, string, string];

const RAW_CATALOG: RawRow[] = [
  ["Lana Del Rey", "Brooklyn Baby", "Ultraviolence"],
  ["Lana Del Rey", "West Coast", "Ultraviolence"],
  ["Lana Del Rey", "Cruel World", "Ultraviolence"],
  ["Lana Del Rey", "Video Games", "Born To Die"],
  ["Lana Del Rey", "Summertime Sadness", "Born To Die"],
  ["Lana Del Rey", "Young and Beautiful", "Gatsby"],
  ["Lana Del Rey", "Cinnamon Girl", "Norman Fucking Rockwell"],
  ["Lana Del Rey", "A&W", "Ocean Blvd"],
  ["Lana Del Rey", "Say Yes To Heaven", "Say Yes"],
  ["The Weeknd", "Starboy", "Starboy"],
  ["The Weeknd", "Die For You", "Starboy"],
  ["The Weeknd", "Blinding Lights", "After Hours"],
  ["The Weeknd", "Save Your Tears", "After Hours"],
  ["The Weeknd", "Take My Breath", "Dawn FM"],
  ["The Weeknd", "House Of Balloons", "Trilogy"],
  ["The Weeknd", "Wicked Games", "Trilogy"],
  ["The Weeknd", "Kiss Land", "Kiss Land"],
  ["The Weeknd", "The Hills", "Beauty Behind The Madness"],
  ["The Weeknd", "Call Out My Name", "My Dear Melancholy"],
  ["The Weeknd", "Hurry Up Tomorrow", "Hurry Up Tomorrow"],
  ["Beach House", "Space Song", "Depression Cherry"],
  ["Beach House", "Sparks", "Depression Cherry"],
  ["Beach House", "Silver Soul", "Teen Dream"],
  ["Beach House", "Zebra", "Teen Dream"],
  ["Beach House", "Myth", "Bloom"],
  ["Beach House", "Lazuli", "Bloom"],
  ["Beach House", "Once Twice Melody", "Once Twice Melody"],
  ["Billie Eilish", "bad guy", "When We All Fall Asleep"],
  ["Billie Eilish", "bury a friend", "When We All Fall Asleep"],
  ["Billie Eilish", "Happier Than Ever", "Happier Than Ever"],
  ["Billie Eilish", "LUNCH", "Hit Me Hard And Soft"],
  ["Billie Eilish", "BIRDS OF A FEATHER", "Hit Me Hard And Soft"],
  ["Billie Eilish", "everything i wanted", "Everything I Wanted"],
  ["Disclosure", "Latch", "Settle"],
  ["Disclosure", "White Noise", "Settle"],
  ["Disclosure", "Omen", "Caracal"],
  ["Disclosure", "Magnets", "Caracal"],
  ["Disclosure", "ENERGY", "Energy"],
  ["Disco Lines", "Baby Girl", "Baby Girl"],
  ["Disco Lines", "I Don't Trust A Soul", "I Don't Trust A Soul"],
  ["Disco Lines", "No Broke Boys", "No Broke Boys"],
  ["Chris Stussy", "All Night Long", "All Night Long"],
  ["Chris Stussy", "Desire", "Desire"],
  ["Chris Stussy", "Breather", "Breather"],
  ["Chris Stussy", "Wide Awake", "Wide Awake"],
  ["Chris Stussy", "Wont Stop", "Wont Stop"],
  ["Adam Port", "Move", "Move Single"],
  ["Adam Port", "Planet 9", "Planet 9"],
  ["Adam Port", "Forms Of Love", "Forms Of Love"],
  ["Peggy Gou", "I Go", "I Go"],
  ["Peggy Gou", "It Goes Like (Nanana)", "It Goes Like"],
  ["ANOTR", "Relax My Eyes", "Relax My Eyes"],
  ["ANOTR", "Talk To You", "Talk To You"],
  ["ANOTR", "How You Feel", "On A Trip"],
  ["ANOTR", "Vertigo", "Vertigo"],
  ["ANOTR", "24 (Turn It Up)", "Turn It Up"],
  ["ANOTR", "Like It", "Like It"],
  ["Solomun", "Nobody Is Not Loved", "Nobody Is Not Loved"],
  ["Solomun", "Friends", "Friends"],
  ["Solomun", "Kack", "Kack"],
  ["Calvin Harris", "Feel So Close", "18 Months"],
  ["Calvin Harris", "Sweet Nothing", "18 Months"],
  ["Calvin Harris", "Summer", "Motion"],
  ["Calvin Harris", "Blame", "Motion"],
  ["Calvin Harris", "This Is What You Came For", "This Is What You Came For"],
  ["Calvin Harris", "How Deep Is Your Love", "How Deep Is Your Love"],
];

export const ALESSIA_CATALOG: AlessiaSong[] = RAW_CATALOG.map(([artist, title, album]) => ({
  artist,
  title,
  album,
  bucket: bucketFor(artist),
  cover: resolveCover(artist, title, album),
}));

function buildHintSongs(): AlessiaSong[] {
  const picks: [string, string, string?][] = [
    ["Lana Del Rey", "Brooklyn Baby", undefined],
    ["Adam Port", "Move", undefined],
    ["The Weeknd", "Call Out My Name", undefined],
    ["Beach House", "Space Song", undefined],
    ["Disclosure", "Latch", undefined],
    ["Disco Lines", "Baby Girl", undefined],
  ];
  const out: AlessiaSong[] = [];
  for (const [artist, title, album] of picks) {
    const hit = ALESSIA_CATALOG.find(
      (s) => s.artist === artist && s.title === title && (album ? s.album === album : true)
    );
    if (hit) out.push(hit);
  }
  return out.length ? out : ALESSIA_CATALOG.slice(0, 6);
}

const HINT_SONGS = buildHintSongs();

function scoreMatch(song: AlessiaSong, tokens: string[]): number {
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

function scoreSubstring(song: AlessiaSong, query: string): number {
  const hay = `${song.title} ${song.artist} ${song.album}`.toLowerCase();
  if (!hay.includes(query)) return -1;
  if (song.title.toLowerCase().includes(query)) return 8;
  if (song.artist.toLowerCase().includes(query)) return 6;
  return 3;
}

export function searchAlessiaCatalog(query: string, limit = 8): AlessiaSong[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return HINT_SONGS.slice(0, limit);

  const tokens = trimmed.split(/\s+/).filter(Boolean);

  let ranked = ALESSIA_CATALOG.map((song) => ({ song, score: scoreMatch(song, tokens) }))
    .filter((x) => x.score >= 0)
    .sort((a, b) => b.score - a.score);

  if (!ranked.length) {
    ranked = ALESSIA_CATALOG.map((song) => ({ song, score: scoreSubstring(song, trimmed) }))
      .filter((x) => x.score >= 0)
      .sort((a, b) => b.score - a.score);
  }

  return ranked.slice(0, limit).map((x) => x.song);
}

export const ALESSIA_CATALOG_COUNT = ALESSIA_CATALOG.length;
