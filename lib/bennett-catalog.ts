export type ArtistBucket =
  | "Playboi Carti"
  | "Ken Carson"
  | "Destroy Lonely"
  | "Young Thug"
  | "Gunna"
  | "Lil Baby"
  | "Future"
  | "Travis Scott"
  | "Drake"
  | "Disclosure"
  | "Route 94"
  | "Chris Lake";

export interface BennettSong {
  artist: string;
  title: string;
  album: string;
  cover: string;
  bucket: ArtistBucket;
}

const COVERS = "/covers";
const ARTISTS = "/assets/artists"; // using mixed paths like existing catalogs
const ARTISTS_PUBLIC = "/artists";

export function norm(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

const ALBUM_COVER: Record<string, string> = {
  wholelottared: `${COVERS}/wholelottared-coverart.jpeg`,
  playboicarti: `${COVERS}/playboicarti-selftitled-coverart.jpeg`,
  dielit: `${COVERS}/dielit-coverart.jpeg`,
  teenx: `${COVERS}/kencarson-teenx-coverart.jpeg`,
  agreatchaos: `${COVERS}/kencarsonagreatchaos-coverart.jpeg`,
  agreatchaosdeluxe: `${COVERS}/kencarsonagreatchaos-coverart.jpeg`,
  x: `${COVERS}/kencarsonX-coverart.jpeg`,
  ineedu: `${COVERS}/kencarson-ineedu-coverart.jpeg`,
  ineedsingle: `${COVERS}/kencarson-ineedu-coverart.jpeg`,
  ineedusingle: `${COVERS}/kencarson-ineedu-coverart.jpeg`,
  morechaos: `${COVERS}/kencarsonmorechaos-coverart.jpeg`,
  nostylist: `${COVERS}/nostylist-coverart.jpeg`,
  iflookscouldkill: `${COVERS}/iflookscouldkill-coverart.jpeg`,
  3: `${COVERS}/destroylonely<:32-coverart.jpeg`,
  nsultra: `${COVERS}/destroylonelynsultra-coverart.jpeg`,
  somuchfun: `${COVERS}/somuchfun-coverart.jpeg`,
  barter6: `${COVERS}/barter6-coverart.jpeg`,
  slimeseason3: `${COVERS}/slimeseason3-coverart.jpeg`,
  slimeseason2: `${COVERS}/slimeseason2-coverart.jpeg`,
  slimelanguage2: `${COVERS}/slimelanguage2-coverart.jpeg`,
  agiftacurse: `${COVERS}/gunnagiftandcurse-coverart.jpeg`,
  dripharder: `${COVERS}/gunnadripharder.jpeg`,
  ds4ever: `${COVERS}/gunnads4ever-coverart.jpeg`,
  oneofwun: `${COVERS}/gunnaoneofwun-coverart.jpeg`,
  bankingonmesingle: `${COVERS}/gunnabankingonme-coverart.jpeg`,
  toohard: `${COVERS}/lilbabytoohard-coverart.jpeg`,
  harderthanever: `${COVERS}/lilbabyharderthanever-coverart.jpeg`,
  myturn: `${COVERS}/lilbabymyturn-coverart.jpeg`,
  itsonlyme: `${COVERS}/lilbabyitsonlyme-coverart.jpeg`,
  wedonttrustyou: `${COVERS}/futurewedonttrustyou-coverart.jpeg`,
  ineverlikedyou: `${COVERS}/futureineverlikedyou-coverart.jpeg`,
  future: `${COVERS}/futuremaskoff-future-coverart.jpeg`,
  "56nights": `${COVERS}/future56nights-coverart.jpeg`,
  utopia: `${COVERS}/travisscott-utopia.jpeg`,
  astroworld: `${COVERS}/travisscottastroworld-coverart.jpeg`,
  birdsinthetrapsingmcknight: `${COVERS}/travisscott-goosebumps-birdsinthetrap-coverart.jpeg`,
  highestintheroomsingle: `${COVERS}/travisscotthighestintheroom-coverart.jpeg`,
  herloss: `${COVERS}/drakeherloss.jpeg`,
  forallthedogs: `${COVERS}/drakeforallthedogs-coverart.jpeg`,
  scorpion: `${COVERS}/drakescorpion-coverart.jpeg`,
  certifiedloverboy: `${COVERS}/drakecertifiedloverboy-coverart.jpeg`,
  settle: `${COVERS}/disclosuresettle-coverart.jpeg`,
  mylovesingle: `${COVERS}/route94mylove-coverart.jpeg`,
  intheyumasingle: `${COVERS}/chrislake-yuma-coverart.jpeg`,
  morebabysingle: `${COVERS}/chrislake-morebaby-coverart.jpeg`,
};

const ARTIST_PROFILE: Record<string, string> = {
  playboicarti: `${ARTISTS_PUBLIC}/playboicarti-profile.jpeg`,
  kencarson: `${ARTISTS_PUBLIC}/kencarson-profile.jpeg`,
  destroylonely: `${ARTISTS_PUBLIC}/destroylonely-profile.jpeg`,
  youngthug: `${ARTISTS_PUBLIC}/youngthug-profile.jpeg`,
  youngstonerlife: `${ARTISTS_PUBLIC}/youngthug-profile.jpeg`, // map YSL to Thug
  gunna: `${ARTISTS_PUBLIC}/gunnaprofile.jpeg`,
  lilbaby: `${ARTISTS_PUBLIC}/lilbaby-profile.jpeg`,
  future: `${ARTISTS_PUBLIC}/future-profile.jpeg`,
  travisscott: `${ARTISTS_PUBLIC}/travisscott-profile.jpeg`,
  drake: `${ARTISTS_PUBLIC}/drake-profile.jpeg`,
  disclosure: `${ARTISTS_PUBLIC}/disclosurespotifynew.jpeg`,
  route94: `${ARTISTS_PUBLIC}/route94-profile.jpeg`,
  chrislake: `${ARTISTS_PUBLIC}/chrislake-profile.jpeg`,
};

function bucketFor(artist: string): ArtistBucket {
  if (artist.includes("Playboi Carti")) return "Playboi Carti";
  if (artist.includes("Ken Carson")) return "Ken Carson";
  if (artist.includes("Destroy Lonely")) return "Destroy Lonely";
  if (artist.includes("Young Thug") || artist.includes("Young Stoner Life")) return "Young Thug";
  if (artist.includes("Gunna")) return "Gunna";
  if (artist.includes("Lil Baby")) return "Lil Baby";
  if (artist.includes("Future")) return "Future";
  if (artist.includes("Travis Scott")) return "Travis Scott";
  if (artist.includes("Drake")) return "Drake";
  if (artist.includes("Disclosure")) return "Disclosure";
  if (artist.includes("Route 94")) return "Route 94";
  if (artist.includes("Chris Lake")) return "Chris Lake";
  return "Playboi Carti"; // fallback
}

function resolveCover(artist: string, title: string, album: string): string {
  const albumKey = norm(album);
  if (ALBUM_COVER[albumKey]) return ALBUM_COVER[albumKey];
  
  // Try mapping specific artist string to key
  let artistKey = norm(artist.split(",")[0]); // take first artist
  if (artistKey.includes("youngstonerlife")) artistKey = "youngthug";
  
  return ARTIST_PROFILE[artistKey] ?? `${ARTISTS}/${artistKey}.png`;
}

type RawRow = [string, string, string];

const RAW_CATALOG: RawRow[] = [
  ["Playboi Carti", "Sky", "Whole Lotta Red"],
  ["Playboi Carti", "Stop Breathing", "Whole Lotta Red"],
  ["Playboi Carti", "Magnolia", "Playboi Carti"],
  ["Playboi Carti, Lil Uzi Vert", "wokeuplikethis*", "Playboi Carti"],
  ["Playboi Carti", "Shoota", "Die Lit"],
  ["Playboi Carti", "R.I.P.", "Die Lit"],
  ["Playboi Carti", "Fell In Luv", "Die Lit"],
  ["Playboi Carti", "ILoveUIHateU", "Whole Lotta Red"],
  ["Playboi Carti", "Vamp Anthem", "Whole Lotta Red"],
  ["Playboi Carti", "New N3on", "Whole Lotta Red"],
  ["Ken Carson", "Yale", "Teen X"],
  ["Ken Carson", "Fighting My Demons", "A Great Chaos"],
  ["Ken Carson", "overseas", "A Great Chaos (Deluxe)"],
  ["Ken Carson", "Jennifer’s Body", "A Great Chaos"],
  ["Ken Carson", "Freestyle 2", "X"],
  ["Ken Carson", "Rock N Roll", "Project X"],
  ["Ken Carson", "ss", "A Great Chaos (Deluxe)"],
  ["Ken Carson", "me n my kup", "A Great Chaos"],
  ["Ken Carson", "i need u", "i need u — Single"],
  ["Ken Carson", "Delusional", "More Chaos"],
  ["Destroy Lonely", "NOSTYLIST", "NO STYLIST"],
  ["Destroy Lonely", "if looks could kill", "If Looks Could Kill"],
  ["Destroy Lonely", "Bane", "</3²"],
  ["Destroy Lonely", "how u feel?", "If Looks Could Kill"],
  ["Destroy Lonely", "VTMNTSCOAT", "NO STYLIST"],
  ["Destroy Lonely", "CRYSTLCSTLES", "NO STYLIST"],
  ["Destroy Lonely", "TURNINUP", "NS+ (ULTRA)"],
  ["Destroy Lonely", "NEVEREVER", "If Looks Could Kill"],
  ["Destroy Lonely", "LOUVRE", "If Looks Could Kill"],
  ["Young Thug", "Hot", "So Much Fun"],
  ["Young Thug, J. Cole, Travis Scott", "The London", "So Much Fun"],
  ["Young Thug", "Check", "Barter 6"],
  ["Young Thug", "Digits", "Slime Season 3"],
  ["Young Thug", "Best Friend", "Slime Season"],
  ["Young Thug", "With That", "Barter 6"],
  ["Young Stoner Life, Young Thug, Gunna", "Ski", "Slime Language 2"],
  ["Young Stoner Life, Young Thug, Gunna, Drake", "Solid", "Slime Language 2"],
  ["Gunna", "fukumean", "a Gift & a Curse"],
  ["Lil Baby, Gunna", "Drip Too Hard", "Drip Harder"],
  ["Gunna, Future, Young Thug", "pushin P", "DS4EVER"],
  ["Gunna", "one of wun", "One of Wun"],
  ["Gunna", "Banking On Me", "Banking On Me — Single"],
  ["Gunna", "bread & butter", "a Gift & a Curse"],
  ["Gunna, Future", "too easy", "DS4EVER"],
  ["Gunna", "rodeo dr", "a Gift & a Curse"],
  ["Lil Baby", "Freestyle", "Too Hard"],
  ["Lil Baby, Drake", "Yes Indeed", "Harder Than Ever"],
  ["Lil Baby", "Woah", "My Turn"],
  ["Lil Baby", "Emotionally Scarred", "My Turn"],
  ["Lil Baby", "Sum 2 Prove", "My Turn"],
  ["Lil Baby", "In A Minute", "It’s Only Me"],
  ["Lil Baby", "California Breeze", "It’s Only Me"],
  ["Lil Baby", "On Me", "On Me — Single"],
  ["Future, Metro Boomin, Kendrick Lamar", "Like That", "WE DON’T TRUST YOU"],
  ["Future, Metro Boomin, Travis Scott, Playboi Carti", "Type Shit", "WE DON’T TRUST YOU"],
  ["Future, Drake, Tems", "WAIT FOR U", "I NEVER LIKED YOU"],
  ["Future", "Mask Off", "FUTURE"],
  ["Future", "March Madness", "56 Nights"],
  ["Future", "PUFFIN ON ZOOTIEZ", "I NEVER LIKED YOU"],
  ["Future, Metro Boomin, Travis Scott", "Cinderella", "WE DON’T TRUST YOU"],
  ["Travis Scott, Playboi Carti", "FE!N", "UTOPIA"],
  ["Travis Scott", "I KNOW ?", "UTOPIA"],
  ["Travis Scott", "SICKO MODE", "ASTROWORLD"],
  ["Travis Scott", "goosebumps", "Birds in the Trap Sing McKnight"],
  ["Travis Scott", "HIGHEST IN THE ROOM", "HIGHEST IN THE ROOM — Single"],
  ["Drake, 21 Savage", "Rich Flex", "Her Loss"],
  ["Drake, J. Cole", "First Person Shooter", "For All The Dogs"],
  ["Drake", "Nonstop", "Scorpion"],
  ["Drake, 21 Savage, Project Pat", "Knife Talk", "Certified Lover Boy"],
  ["Disclosure, Sam Smith", "Latch", "Settle"],
  ["Disclosure, AlunaGeorge", "White Noise", "Settle"],
  ["Disclosure, Eliza Doolittle", "You & Me", "Settle"],
  ["Route 94, Jess Glynne", "My Love", "My Love — Single"],
  ["Chris Lake, Aatig", "In The Yuma", "In The Yuma — Single"],
  ["Chris Lake, Aluna", "More Baby", "More Baby — Single"],
];

export const BENNETT_CATALOG: BennettSong[] = RAW_CATALOG.map(([artist, title, album]) => ({
  artist,
  title,
  album,
  bucket: bucketFor(artist),
  cover: resolveCover(artist, title, album),
}));

function buildHintSongs(): BennettSong[] {
  const picks: [string, string, string?][] = [
    ["Ken Carson", "Yale", undefined],
    ["Playboi Carti", "Sky", undefined],
    ["Destroy Lonely", "NOSTYLIST", undefined],
    ["Gunna", "fukumean", undefined],
    ["Lil Baby, Gunna", "Drip Too Hard", undefined],
    ["Route 94, Jess Glynne", "My Love", undefined],
  ];
  const out: BennettSong[] = [];
  for (const [artist, title, album] of picks) {
    const hit = BENNETT_CATALOG.find(
      (s) => s.artist === artist && s.title === title && (album ? s.album === album : true)
    );
    if (hit) out.push(hit);
  }
  return out.length ? out : BENNETT_CATALOG.slice(0, 6);
}

const HINT_SONGS = buildHintSongs();

function scoreMatch(song: BennettSong, tokens: string[]): number {
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

function scoreSubstring(song: BennettSong, query: string): number {
  const hay = `${song.title} ${song.artist} ${song.album}`.toLowerCase();
  if (!hay.includes(query)) return -1;
  if (song.title.toLowerCase().includes(query)) return 8;
  if (song.artist.toLowerCase().includes(query)) return 6;
  return 3;
}

export function searchBennettCatalog(query: string, limit = 8): BennettSong[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return HINT_SONGS.slice(0, limit);

  const tokens = trimmed.split(/\s+/).filter(Boolean);

  let ranked = BENNETT_CATALOG.map((song) => ({ song, score: scoreMatch(song, tokens) }))
    .filter((x) => x.score >= 0)
    .sort((a, b) => b.score - a.score);

  if (!ranked.length) {
    ranked = BENNETT_CATALOG.map((song) => ({ song, score: scoreSubstring(song, trimmed) }))
      .filter((x) => x.score >= 0)
      .sort((a, b) => b.score - a.score);
  }

  return ranked.slice(0, limit).map((x) => x.song);
}

export const BENNETT_CATALOG_COUNT = BENNETT_CATALOG.length;
