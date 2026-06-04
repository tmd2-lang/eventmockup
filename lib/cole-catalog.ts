export type ArtistBucket =
  | "Beyoncé"
  | "Calvin Harris"
  | "Chris Lake"
  | "Disclosure"
  | "Drake"
  | "FISHER"
  | "Frank Ocean"
  | "Future"
  | "Gunna"
  | "Hozier"
  | "Kygo"
  | "Lil Baby"
  | "Luke Combs"
  | "Morgan Wallen"
  | "Noah Kahan"
  | "Post Malone"
  | "Rihanna"
  | "SZA"
  | "Sabrina Carpenter"
  | "Taylor Swift"
  | "The Weeknd"
  | "Travis Scott"
  | "Zach Bryan";

export interface ColeSong {
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
  morelife: `${COVERS}/drakepassionfruitandmorelife-coverart.jpeg`,
  views: `${COVERS}/drakeviews-coverart.jpeg`,
  scorpion: `${COVERS}/drakescorpion-coverart.jpeg`,
  nothingwasthesame: `${COVERS}/drakenothingwasthesame-coverart.jpeg`,
  honestlynevermind: `${COVERS}/drakejimmycookshonestlynevermind-coverart.jpeg`,
  certifiedloverboy: `${COVERS}/drakecertifiedloverboy-coverart.jpeg`,
  herloss: `${COVERS}/drakeherloss.jpeg`,
  searchrescuesingle: `${COVERS}/drakesearchandrescue-coverart.jpeg`,
  forallthedogs: `${COVERS}/drakeforallthedogs-coverart.jpeg`,
  utopia: `${COVERS}/travisscott-utopia.jpeg`,
  astroworld: `${COVERS}/travisscottastroworld-coverart.jpeg`,
  birdsinthetrapsingmcknight: `${COVERS}/travisscott-goosebumps-birdsinthetrap-coverart.jpeg`,
  highestintheroomsingle: `${COVERS}/travisscotthighestintheroom-coverart.jpeg`,
  ineverlikedyou: `${COVERS}/futureineverlikedyou-coverart.jpeg`,
  future: `${COVERS}/futuremaskoff-future-coverart.jpeg`,
  wedonttrustyou: `${COVERS}/futurewedonttrustyou-coverart.jpeg`,
  agiftacurse: `${COVERS}/gunnagiftandcurse-coverart.jpeg`,
  dripharder: `${COVERS}/gunnadripharder.jpeg`,
  ds4ever: `${COVERS}/gunnads4ever-coverart.jpeg`,
  oneofwun: `${COVERS}/gunnaoneofwun-coverart.jpeg`,
  toohard: `${COVERS}/lilbabytoohard-coverart.jpeg`,
  harderthanever: `${COVERS}/lilbabyharderthanever-coverart.jpeg`,
  myturn: `${COVERS}/lilbabymyturn-coverart.jpeg`,
  itsonlyme: `${COVERS}/lilbabyitsonlyme-coverart.jpeg`,
  onethingatatime: `${COVERS}/morganwallenonethingatatime-coverart.jpeg`,
  dangerousthedoublealbum: `${COVERS}/morganwallendangerous-coverart.jpeg`,
  ifiknowme: `${COVERS}/morganwallen-ifiknowme-coverart.jpeg`,
  imtheproblem: `${COVERS}/morganwallenimtheproblem-coverart.jpeg`,
  americanheartbreak: `${COVERS}/zachbryanamericanheartbreak-coverart.jpeg`,
  zachbryan: `${COVERS}/zachbryanzachbryanselftitled-coverart.jpeg`,
  thegreatamericanbarscene: `${COVERS}/zachbryangreatamericanbarscene-coverart.jpeg`,
  summertimeblues: `${COVERS}/zachbryansummertimeblues-coverart.jpeg`,
  burnburnburnsingle: `${COVERS}/zachbryanburn-coverart.jpeg`,
  dawnssingle: `${COVERS}/zachbryandawns-coverart.jpeg`,
  gettinold: `${COVERS}/lukecombs-gettingold-coverart.jpeg`,
  thisonesforyoutoo: `${COVERS}/lukecombsthisone'sforyoutoo-coverart.jpeg`,
  thisonesforyou: `${COVERS}/lukecombsthisoneforyoucoverart.jpeg`,
  growinup: `${COVERS}/lukecombsgrowingup-coverart.jpeg`,
  f1trillion: `${COVERS}/postmalonef1trillion-coverart.jpeg`,
  hollywoodsbleeding: `${COVERS}/postmalonehollywoodsbleeding-coverart.jpeg`,
  spidermanintothespiderversehollywoodsbleeding: `${COVERS}/postmalonespiderverse-coverart.jpeg`,
  stoney: `${COVERS}/postmalonestoney-coverart.jpeg`,
  sos: `${COVERS}/szasos-coverart.jpeg`,
  ctrl: `${COVERS}/szacrtrl-coverart.jpeg`,
  lana: `${COVERS}/szalana-coverart.jpeg`,
  lover: `${COVERS}/taylorswift-lover-coverart.jpeg`,
  "1989": `${COVERS}/tswift-1989-coverart.jpeg`,
  midnights: `${COVERS}/tswift-midnights-coverart.jpeg`,
  renaissance: `${COVERS}/beyoncerenaissance-coverart.jpeg`,
  cowboycarter: `${COVERS}/cowboycarterbeyonce-coverart.jpeg`,
  "4": `${COVERS}/beyonce4-coverart.jpeg`,
  shortnsweet: `${COVERS}/sabrinashortnsweet-coverart.jpeg`,
  anti: `${COVERS}/rihannaanti-coverart.jpeg`,
  settle: `${COVERS}/disclosuresettle-coverart.jpeg`,
  "18months": `${COVERS}/calvin18months-coverart.jpeg`,
  motion: `${COVERS}/calvinharrismotion-coverart.jpeg`,
  thisiswhatyoucameforsingle: `${COVERS}/calvinharris-thisiswhatyoucamefor-coverart.jpeg`,
  intheyumasingle: `${COVERS}/chrislake-yuma-coverart.jpeg`,
  morebabysingle: `${COVERS}/chrislake-morebaby-coverart.jpeg`,
  cloudnine: `${COVERS}/kygocloudnine-coverart.jpeg`,
  losingitsingle: `${COVERS}/fisherlosingit-coverart.jpeg`,
  afterhours: `${COVERS}/theweekndafterhours-coverart.jpeg`,
  starboy: `${COVERS}/weekndstarboy-coverart.jpeg`,
  dawnfm: `${COVERS}/weeknddawnfm-coverart.jpeg`,
  blonde: `${COVERS}/frankocean-blonde.jpeg`,
  stickseason: `${COVERS}/noahkahanstickseason-coverart.jpeg`,
  stickseasonwellallbehereforever: `${COVERS}/noahkahanstickseason-coverart.jpeg`,
  unheardep: `${COVERS}/hozierunheard-coverart.jpeg`,
};

const ARTIST_PROFILE: Record<string, string> = {
  drake: `${ARTISTS}/drake-profile.jpeg`,
  travisscott: `${ARTISTS}/travisscott-profile.jpeg`,
  future: `${ARTISTS}/future-profile.jpeg`,
  gunna: `${ARTISTS}/gunnaprofile.jpeg`,
  lilbaby: `${ARTISTS}/lilbaby-profile.jpeg`,
  morganwallen: `${ARTISTS}/morganwallen-profile.jpeg`,
  zachbryan: `${ARTISTS}/zachbryan-profile.jpeg`,
  lukecombs: `${ARTISTS}/lukecombs-profile.jpeg`,
  postmalone: `${ARTISTS}/postmalone-profile.jpeg`,
  sza: `${ARTISTS}/sza-profile.jpeg`,
  taylorswift: `${ARTISTS}/taylorswift-updatedprofile-usethis-profile.jpeg`,
  beyonc: `${ARTISTS}/beyonce-profile.jpeg`,
  sabrinacarpenter: `${ARTISTS}/sabrinacarpenter-profile.jpeg`,
  rihanna: `${ARTISTS}/rihanna-profile.jpeg`,
  disclosure: `/assets/artists/disclosurespotifynew.jpeg`,
  calvinharris: `${ARTISTS}/calvinharris-profile.jpeg`,
  chrislake: `${ARTISTS}/chrislake-profile.jpeg`,
  kygo: `${ARTISTS}/kygo-profile.jpeg`,
  fisher: `${ARTISTS}/fisher-profile.jpeg`,
  theweeknd: `${ARTISTS}/theweekndprofile.jpeg`,
  frankocean: `${ARTISTS}/frankocean-profile.jpeg`,
  noahkahan: `${ARTISTS}/noahkahan-profile.jpeg`,
  hozier: `${ARTISTS}/hozier-profile.jpeg`,
};

function bucketFor(artist: string): ArtistBucket {
  return artist as ArtistBucket;
}

function resolveCover(artist: string, title: string, album: string): string {
  const albumKey = norm(album);
  if (ALBUM_COVER[albumKey]) return ALBUM_COVER[albumKey];
  const artistKey = norm(artist);
  return ARTIST_PROFILE[artistKey] ?? `${ARTISTS}/${artistKey}.png`;
}

type RawRow = [ArtistBucket, string, string];

const RAW_CATALOG: RawRow[] = [
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
  ["Travis Scott", "FE!N", "UTOPIA"],
  ["Travis Scott", "I KNOW ?", "UTOPIA"],
  ["Travis Scott", "MY EYES", "UTOPIA"],
  ["Travis Scott", "MELTDOWN", "UTOPIA"],
  ["Travis Scott", "SICKO MODE", "ASTROWORLD"],
  ["Travis Scott", "goosebumps", "Birds in the Trap Sing McKnight"],
  ["Travis Scott", "HIGHEST IN THE ROOM", "HIGHEST IN THE ROOM — Single"],
  ["Future", "WAIT FOR U", "I NEVER LIKED YOU"],
  ["Future", "PUFFIN ON ZOOTIEZ", "I NEVER LIKED YOU"],
  ["Future", "Mask Off", "FUTURE"],
  ["Future", "Like That", "WE DON’T TRUST YOU"],
  ["Future", "Type Shit", "WE DON’T TRUST YOU"],
  ["Gunna", "fukumean", "a Gift & a Curse"],
  ["Gunna", "drip too hard", "Drip Harder"],
  ["Gunna", "pushin P", "DS4EVER"],
  ["Gunna", "one of wun", "One of Wun"],
  ["Lil Baby", "Freestyle", "Too Hard"],
  ["Lil Baby", "Yes Indeed", "Harder Than Ever"],
  ["Lil Baby", "Woah", "My Turn"],
  ["Lil Baby", "In A Minute", "It’s Only Me"],
  ["Morgan Wallen", "Last Night", "One Thing at a Time"],
  ["Morgan Wallen", "Thinkin’ Bout Me", "One Thing at a Time"],
  ["Morgan Wallen", "You Proof", "One Thing at a Time"],
  ["Morgan Wallen", "Wasted On You", "Dangerous: The Double Album"],
  ["Morgan Wallen", "Whiskey Glasses", "If I Know Me"],
  ["Morgan Wallen", "Sand In My Boots", "Dangerous: The Double Album"],
  ["Morgan Wallen", "Love Somebody", "I’m The Problem"],
  ["Zach Bryan", "Something in the Orange", "American Heartbreak"],
  ["Zach Bryan", "I Remember Everything", "Zach Bryan"],
  ["Zach Bryan", "Pink Skies", "The Great American Bar Scene"],
  ["Zach Bryan", "Oklahoma Smokeshow", "Summertime Blues"],
  ["Zach Bryan", "Burn, Burn, Burn", "Burn, Burn, Burn — Single"],
  ["Zach Bryan", "Dawns", "Dawns — Single"],
  ["Luke Combs", "Fast Car", "Gettin’ Old"],
  ["Luke Combs", "Beautiful Crazy", "This One’s for You Too"],
  ["Luke Combs", "When It Rains It Pours", "This One’s for You"],
  ["Luke Combs", "The Kind of Love We Make", "Growin’ Up"],
  ["Post Malone", "I Had Some Help", "F-1 Trillion"],
  ["Post Malone", "Pour Me A Drink", "F-1 Trillion"],
  ["Post Malone", "Circles", "Hollywood’s Bleeding"],
  ["Post Malone", "Sunflower", "Spider-Man: Into the Spider-Verse / Hollywood’s Bleeding"],
  ["Post Malone", "Congratulations", "Stoney"],
  ["SZA", "Snooze", "SOS"],
  ["SZA", "Kill Bill", "SOS"],
  ["SZA", "The Weekend", "Ctrl"],
  ["SZA", "Good Days", "SOS"],
  ["SZA", "Saturn", "Lana"],
  ["Taylor Swift", "Cruel Summer", "Lover"],
  ["Taylor Swift", "Style", "1989"],
  ["Taylor Swift", "Anti-Hero", "Midnights"],
  ["Beyoncé", "CUFF IT", "RENAISSANCE"],
  ["Beyoncé", "TEXAS HOLD ’EM", "COWBOY CARTER"],
  ["Beyoncé", "Love On Top", "4"],
  ["Sabrina Carpenter", "Espresso", "Short n’ Sweet"],
  ["Sabrina Carpenter", "Please Please Please", "Short n’ Sweet"],
  ["Rihanna", "Needed Me", "ANTI"],
  ["Rihanna", "Work", "ANTI"],
  ["Disclosure", "Latch", "Settle"],
  ["Disclosure", "White Noise", "Settle"],
  ["Disclosure", "You & Me", "Settle"],
  ["Calvin Harris", "Feel So Close", "18 Months"],
  ["Calvin Harris", "Summer", "Motion"],
  ["Calvin Harris", "This Is What You Came For", "This Is What You Came For — Single"],
  ["Chris Lake", "In The Yuma", "In The Yuma — Single"],
  ["Chris Lake", "More Baby", "More Baby — Single"],
  ["Kygo", "Firestone", "Cloud Nine"],
  ["FISHER", "Losing It", "Losing It — Single"],
  ["The Weeknd", "Blinding Lights", "After Hours"],
  ["The Weeknd", "Die For You", "Starboy"],
  ["The Weeknd", "Out of Time", "Dawn FM"],
  ["Frank Ocean", "Pink + White", "Blonde"],
  ["Frank Ocean", "Nights", "Blonde"],
  ["Noah Kahan", "Stick Season", "Stick Season"],
  ["Noah Kahan", "Dial Drunk", "Stick Season (We’ll All Be Here Forever)"],
  ["Hozier", "Too Sweet", "Unheard — EP"],
];

export const COLE_CATALOG: ColeSong[] = RAW_CATALOG.map(([artist, title, album]) => ({
  artist,
  title,
  album,
  bucket: bucketFor(artist),
  cover: resolveCover(artist, title, album),
}));

function buildHintSongs(): ColeSong[] {
  const picks: [string, string, string?][] = [
    ["Drake", "Passionfruit", undefined],
    ["Travis Scott", "FE!N", undefined],
    ["Morgan Wallen", "Last Night", undefined],
    ["Gunna", "fukumean", undefined],
    ["Future", "WAIT FOR U", undefined],
    ["SZA", "Snooze", undefined],
  ];
  const out: ColeSong[] = [];
  for (const [artist, title, album] of picks) {
    const hit = COLE_CATALOG.find(
      (s) => s.artist === artist && s.title === title && (album ? s.album === album : true)
    );
    if (hit) out.push(hit);
  }
  return out.length ? out : COLE_CATALOG.slice(0, 6);
}

const HINT_SONGS = buildHintSongs();

function scoreMatch(song: ColeSong, tokens: string[]): number {
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

function scoreSubstring(song: ColeSong, query: string): number {
  const hay = `${song.title} ${song.artist} ${song.album}`.toLowerCase();
  if (!hay.includes(query)) return -1;
  if (song.title.toLowerCase().includes(query)) return 8;
  if (song.artist.toLowerCase().includes(query)) return 6;
  return 3;
}

export function searchColeCatalog(query: string, limit = 8): ColeSong[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return HINT_SONGS.slice(0, limit);

  const tokens = trimmed.split(/\s+/).filter(Boolean);

  let ranked = COLE_CATALOG.map((song) => ({ song, score: scoreMatch(song, tokens) }))
    .filter((x) => x.score >= 0)
    .sort((a, b) => b.score - a.score);

  if (!ranked.length) {
    ranked = COLE_CATALOG.map((song) => ({ song, score: scoreSubstring(song, trimmed) }))
      .filter((x) => x.score >= 0)
      .sort((a, b) => b.score - a.score);
  }

  return ranked.slice(0, limit).map((x) => x.song);
}

export const COLE_CATALOG_COUNT = COLE_CATALOG.length;
