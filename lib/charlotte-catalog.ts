export type ArtistBucket =
  | "Taylor Swift"
  | "SZA"
  | "Drake"
  | "Beyoncé"
  | "Frank Ocean"
  | "Tyler, The Creator"
  | "Sabrina Carpenter"
  | "Ariana Grande"
  | "Rihanna"
  | "The Weeknd"
  | "Olivia Rodrigo"
  | "Dua Lipa";

export interface CharlotteSong {
  artist: string;
  title: string;
  album: string;
  cover: string;
  bucket: ArtistBucket;
}

const COVERS = "/covers";
const ARTISTS = "/artists";

/** Normalize for album/title matching */
export function norm(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

/** 
 * Map of normalized album name to cover art filename.
 * Please ensure the files in public/covers match these paths.
 */
const ALBUM_COVER: Record<string, string> = {
  lover: `${COVERS}/taylorswift-lover-coverart.jpeg`,
  "1989": `${COVERS}/tswift-1989-coverart.jpeg`,
  midnights: `${COVERS}/tswift-midnights-coverart.jpeg`,
  folklore: `${COVERS}/tswift-folklore-coverart.jpeg`,
  reputation: `${COVERS}/tswift-reputation-coverart.jpeg`,
  fearless: `${COVERS}/tswift-fearless-coverart.jpeg`,
  redtaylorsversion: `${COVERS}/tswift-red-taylorversion-coverart.jpeg`,
  "1989taylorsversion": `${COVERS}/tswift1989taylorversion-coverart.jpeg`,
  sos: `${COVERS}/szasos-coverart.jpeg`,
  ctrl: `${COVERS}/szacrtrl-coverart.jpeg`,
  lana: `${COVERS}/szalana-coverart.jpeg`,
  morelife: `${COVERS}/drakepassionfruitandmorelife-coverart.jpeg`,
  views: `${COVERS}/drakeviews-coverart.jpeg`,
  scorpion: `${COVERS}/drakescorpion-coverart.jpeg`,
  nothingwasthesame: `${COVERS}/drakenothingwasthesame-coverart.jpeg`,
  honestlynevermind: `${COVERS}/drakejimmycookshonestlynevermind-coverart.jpeg`,
  certifiedloverboy: `${COVERS}/drakecertifiedloverboy-coverart.jpeg`,
  herloss: `${COVERS}/drakeherloss.jpeg`,
  searchrescuesingle: `${COVERS}/drakesearchandrescue-coverart.jpeg`,
  forallthedogs: `${COVERS}/drakeforallthedogs-coverart.jpeg`,
  renaissance: `${COVERS}/beyoncerenaissance-coverart.jpeg`,
  cowboycarter: `${COVERS}/cowboycarterbeyonce-coverart.jpeg`,
  lemonade: `${COVERS}/beyoncelemonade-coverart.jpeg`,
  "4": `${COVERS}/beyonce4-coverart.jpeg`,
  dangerouslyinlove: `${COVERS}/beyoncedangerousylove-coverart.jpeg`,
  blonde: `${COVERS}/frankocean-blonde.jpeg`,
  channelorange: `${COVERS}/frankoceanchannel-coverart.jpeg`,
  chanelsingle: `${COVERS}/frankchanelsingle-coverart.jpeg`,
  igor: `${COVERS}/tylerigor-coverart.jpeg`,
  bestinterestsingle: `${COVERS}/tylerbestinterestsingle-coverart.jpeg`,
  callmeifyougetlost: `${COVERS}/tylercallmeifyougetlost-coverart.jpeg`,
  shortnsweet: `${COVERS}/sabrinashortnsweet-coverart.jpeg`,
  emailsicantsendfwd: `${COVERS}/sabrinaemails-coverart.jpeg`,
  emailsicantsend: `${COVERS}/sabrinaemails-coverart.jpeg`,
  manchildsingle: `${COVERS}/sabrinamanchild-coverart.jpeg`,
  eternalsunshine: `${COVERS}/arianaeternalsunshine-coverart.jpeg`,
  positions: `${COVERS}/arianapositions-coverart.jpeg`,
  dangerouswoman: `${COVERS}/arianadangerouswoman-coverart.jpeg`,
  thankunext: `${COVERS}/arianathankunext-coverart.jpeg`,
  anti: `${COVERS}/rihannaanti-coverart.jpeg`,
  unapologetic: `${COVERS}/rihannaunapolegitic-coverart.jpeg`,
  talkthattalk: `${COVERS}/talkthattalk-coverart.jpeg`,
  loud: `${COVERS}/rihannaloud-coverart.jpeg`,
  goodgirlgonebad: `${COVERS}/rihannagoodgirlgonebad-coverart.jpeg`,
  afterhours: `${COVERS}/theweekndafterhours-coverart.jpeg`,
  starboy: `${COVERS}/weekndstarboy-coverart.jpeg`,
  beautybehindthemadness: `${COVERS}/weekndbeautybehindthemadness-coverart.jpeg`,
  dawnfm: `${COVERS}/weeknddawnfm-coverart.jpeg`,
  trilogy: `${COVERS}/weekndtrilogy-coverart.jpeg`,
  guts: `${COVERS}/oliviarodrigoguts-coverart.jpeg`,
  gutsspilled: `${COVERS}/oliviarodrigoguts-coverart.jpeg`,
  sour: `${COVERS}/oliviarodrigosour-coverart.jpeg`,
  futurenostalgia: `${COVERS}/dualipafuturenostalgia-coverart.jpeg`,
  barbiethealbum: `${COVERS}/dualipabarbie-coverart.jpeg`,
  radicaloptimism: `${COVERS}/dualiparadicaloptism-coverart.jpeg`,
  dualipa: `${COVERS}/dualipaselftitled-coverart.jpeg`,
};

/** Map of normalized artist name to profile picture */
const ARTIST_PROFILE: Record<string, string> = {
  taylorswift: `${ARTISTS}/taylorswift-updatedprofile-usethis-profile.jpeg`,
  sza: `${ARTISTS}/sza-profile.jpeg`,
  drake: `${ARTISTS}/drake-profile.jpeg`,
  beyonc: `${ARTISTS}/beyonce-profile.jpeg`,
  frankocean: `${ARTISTS}/frankocean-profile.jpeg`,
  tylerthecreator: `${ARTISTS}/tylerthecreator-profile.jpeg`,
  sabrinacarpenter: `${ARTISTS}/sabrinacarpenter-profile.jpeg`,
  arianagrande: `${ARTISTS}/arianagrande-profile.jpeg`,
  rihanna: `${ARTISTS}/rihanna-profile.jpeg`,
  oliviarodrigo: `${ARTISTS}/oliviarodrigo-profile.jpeg`,
  dualipa: `${ARTISTS}/dualipa-profile.jpeg`,
};

function bucketFor(artist: string): ArtistBucket {
  return artist as ArtistBucket;
}

function resolveCover(artist: string, title: string, album: string): string {
  const albumKey = norm(album);
  if (ALBUM_COVER[albumKey]) return ALBUM_COVER[albumKey];

  // Try to find a normalized image based on artist + album
  const dynamicCoverPath = `${COVERS}/${norm(artist)}-${albumKey}.jpeg`;
  
  // As a fallback, we use the artist's profile picture.
  const artistKey = norm(artist);
  return ARTIST_PROFILE[artistKey] ?? `${ARTISTS}/${artistKey}.png`; // fallback to generic png
}

type RawRow = [ArtistBucket, string, string];

const RAW_CATALOG: RawRow[] = [
  ["Taylor Swift", "Cruel Summer", "Lover"],
  ["Taylor Swift", "Style", "1989"],
  ["Taylor Swift", "Anti-Hero", "Midnights"],
  ["Taylor Swift", "Blank Space", "1989"],
  ["Taylor Swift", "august", "folklore"],
  ["Taylor Swift", "cardigan", "folklore"],
  ["Taylor Swift", "Lover", "Lover"],
  ["Taylor Swift", "Don’t Blame Me", "reputation"],
  ["Taylor Swift", "You Belong With Me", "Fearless"],
  ["Taylor Swift", "Love Story", "Fearless"],
  ["Taylor Swift", "All Too Well (10 Minute Version)", "Red (Taylor’s Version)"],
  ["Taylor Swift", "Is It Over Now?", "1989 (Taylor’s Version)"],
  ["SZA", "Snooze", "SOS"],
  ["SZA", "Kill Bill", "SOS"],
  ["SZA", "Good Days", "SOS"],
  ["SZA", "Broken Clocks", "Ctrl"],
  ["SZA", "The Weekend", "Ctrl"],
  ["SZA", "Normal Girl", "Ctrl"],
  ["SZA", "Shirt", "SOS"],
  ["SZA", "Saturn", "Lana"],
  ["SZA", "Nobody Gets Me", "SOS"],
  ["SZA", "Garden (Say It Like Dat)", "Ctrl"],
  ["Drake", "Passionfruit", "More Life"],
  ["Drake", "One Dance", "Views"],
  ["Drake", "Nice For What", "Scorpion"],
  ["Drake", "God’s Plan", "Scorpion"],
  ["Drake", "Hold On, We’re Going Home", "Nothing Was the Same"],
  ["Drake", "Jimmy Cooks", "Honestly, Nevermind"],
  ["Drake", "Fair Trade", "Certified Lover Boy"],
  ["Drake", "Rich Flex", "Her Loss"],
  ["Drake", "Search & Rescue", "Search & Rescue — Single"],
  ["Drake", "IDGAF", "For All the Dogs"],
  ["Beyoncé", "CUFF IT", "RENAISSANCE"],
  ["Beyoncé", "TEXAS HOLD ’EM", "COWBOY CARTER"],
  ["Beyoncé", "BREAK MY SOUL", "RENAISSANCE"],
  ["Beyoncé", "ALIEN SUPERSTAR", "RENAISSANCE"],
  ["Beyoncé", "AMERICA HAS A PROBLEM", "RENAISSANCE"],
  ["Beyoncé", "Formation", "Lemonade"],
  ["Beyoncé", "Love On Top", "4"],
  ["Beyoncé", "Crazy In Love", "Dangerously in Love"],
  ["Frank Ocean", "Pink + White", "Blonde"],
  ["Frank Ocean", "Nights", "Blonde"],
  ["Frank Ocean", "Thinkin Bout You", "channel ORANGE"],
  ["Frank Ocean", "Lost", "channel ORANGE"],
  ["Frank Ocean", "Ivy", "Blonde"],
  ["Frank Ocean", "White Ferrari", "Blonde"],
  ["Frank Ocean", "Self Control", "Blonde"],
  ["Frank Ocean", "Chanel", "Chanel — Single"],
  ["Tyler, The Creator", "See You Again", "Flower Boy"],
  ["Tyler, The Creator", "EARFQUAKE", "IGOR"],
  ["Tyler, The Creator", "BEST INTEREST", "BEST INTEREST — Single"],
  ["Tyler, The Creator", "SWEET / I THOUGHT YOU WANTED TO DANCE", "CALL ME IF YOU GET LOST"],
  ["Tyler, The Creator", "WUSYANAME", "CALL ME IF YOU GET LOST"],
  ["Tyler, The Creator", "LEMONHEAD", "CALL ME IF YOU GET LOST"],
  ["Tyler, The Creator", "NEW MAGIC WAND", "IGOR"],
  ["Tyler, The Creator", "ARE WE STILL FRIENDS?", "IGOR"],
  ["Sabrina Carpenter", "Espresso", "Short n’ Sweet"],
  ["Sabrina Carpenter", "Please Please Please", "Short n’ Sweet"],
  ["Sabrina Carpenter", "Taste", "Short n’ Sweet"],
  ["Sabrina Carpenter", "Feather", "emails i can’t send fwd:"],
  ["Sabrina Carpenter", "Nonsense", "emails i can’t send"],
  ["Sabrina Carpenter", "Juno", "Short n’ Sweet"],
  ["Sabrina Carpenter", "Bed Chem", "Short n’ Sweet"],
  ["Sabrina Carpenter", "Manchild", "Manchild — Single"],
  ["Ariana Grande", "we can’t be friends (wait for your love)", "eternal sunshine"],
  ["Ariana Grande", "yes, and?", "eternal sunshine"],
  ["Ariana Grande", "the boy is mine", "eternal sunshine"],
  ["Ariana Grande", "supernatural", "eternal sunshine"],
  ["Ariana Grande", "positions", "Positions"],
  ["Ariana Grande", "Into You", "Dangerous Woman"],
  ["Ariana Grande", "no tears left to cry", "Sweetener"],
  ["Ariana Grande", "thank u, next", "thank u, next"],
  ["Rihanna", "Needed Me", "ANTI"],
  ["Rihanna", "Love On The Brain", "ANTI"],
  ["Rihanna", "Work", "ANTI"],
  ["Rihanna", "Diamonds", "Unapologetic"],
  ["Rihanna", "We Found Love", "Talk That Talk"],
  ["Rihanna", "Only Girl (In The World)", "Loud"],
  ["Rihanna", "Don’t Stop The Music", "Good Girl Gone Bad"],
  ["Rihanna", "Umbrella", "Good Girl Gone Bad"],
  ["The Weeknd", "Blinding Lights", "After Hours"],
  ["The Weeknd", "Starboy", "Starboy"],
  ["The Weeknd", "Die For You", "Starboy"],
  ["The Weeknd", "The Hills", "Beauty Behind the Madness"],
  ["The Weeknd", "Save Your Tears", "After Hours"],
  ["The Weeknd", "Out of Time", "Dawn FM"],
  ["The Weeknd", "I Feel It Coming", "Starboy"],
  ["The Weeknd", "Wicked Games", "Trilogy"],
  ["Olivia Rodrigo", "vampire", "GUTS"],
  ["Olivia Rodrigo", "drivers license", "SOUR"],
  ["Olivia Rodrigo", "good 4 u", "SOUR"],
  ["Olivia Rodrigo", "deja vu", "SOUR"],
  ["Olivia Rodrigo", "obsessed", "GUTS (spilled)"],
  ["Olivia Rodrigo", "bad idea right?", "GUTS"],
  ["Dua Lipa", "Levitating", "Future Nostalgia"],
  ["Dua Lipa", "Don’t Start Now", "Future Nostalgia"],
  ["Dua Lipa", "Dance The Night", "Barbie The Album"],
  ["Dua Lipa", "Houdini", "Radical Optimism"],
  ["Dua Lipa", "New Rules", "Dua Lipa"],
  ["Dua Lipa", "Break My Heart", "Future Nostalgia"],
];

export const CHARLOTTE_CATALOG: CharlotteSong[] = RAW_CATALOG.map(([artist, title, album]) => ({
  artist,
  title,
  album,
  bucket: bucketFor(artist),
  cover: resolveCover(artist, title, album),
}));

function buildHintSongs(): CharlotteSong[] {
  const picks: [string, string, string?][] = [
    ["Taylor Swift", "Cruel Summer", undefined],
    ["SZA", "Snooze", undefined],
    ["Drake", "Passionfruit", undefined],
    ["Frank Ocean", "Pink + White", undefined],
    ["Sabrina Carpenter", "Espresso", undefined],
    ["Beyoncé", "CUFF IT", undefined],
  ];
  const out: CharlotteSong[] = [];
  for (const [artist, title, album] of picks) {
    const hit = CHARLOTTE_CATALOG.find(
      (s) => s.artist === artist && s.title === title && (album ? s.album === album : true)
    );
    if (hit) out.push(hit);
  }
  return out.length ? out : CHARLOTTE_CATALOG.slice(0, 6);
}

const HINT_SONGS = buildHintSongs();

function scoreMatch(song: CharlotteSong, tokens: string[]): number {
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

function scoreSubstring(song: CharlotteSong, query: string): number {
  const hay = `${song.title} ${song.artist} ${song.album}`.toLowerCase();
  if (!hay.includes(query)) return -1;
  if (song.title.toLowerCase().includes(query)) return 8;
  if (song.artist.toLowerCase().includes(query)) return 6;
  return 3;
}

export function searchCharlotteCatalog(query: string, limit = 8): CharlotteSong[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return HINT_SONGS.slice(0, limit);

  const tokens = trimmed.split(/\s+/).filter(Boolean);

  let ranked = CHARLOTTE_CATALOG.map((song) => ({ song, score: scoreMatch(song, tokens) }))
    .filter((x) => x.score >= 0)
    .sort((a, b) => b.score - a.score);

  if (!ranked.length) {
    ranked = CHARLOTTE_CATALOG.map((song) => ({ song, score: scoreSubstring(song, trimmed) }))
      .filter((x) => x.score >= 0)
      .sort((a, b) => b.score - a.score);
  }

  return ranked.slice(0, limit).map((x) => x.song);
}

export const CHARLOTTE_CATALOG_COUNT = CHARLOTTE_CATALOG.length;
