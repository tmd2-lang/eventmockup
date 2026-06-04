export type ArtistBucket =
  | "Megan Moroney"
  | "Zach Bryan"
  | "Morgan Wallen"
  | "Kacey Musgraves"
  | "Taylor Swift"
  | "Noah Kahan"
  | "Luke Combs"
  | "Lainey Wilson"
  | "Post Malone"
  | "Hozier"
  | "The Lumineers"
  | "Lana Del Rey"
  | "SZA";

export interface CarolineSong {
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
  lucky: `${COVERS}/meganlucky-coverart.jpeg`,
  amiokay: `${COVERS}/meganmoroneyamiokay-coverart.jpeg`,
  "6monthslatersingle": `${COVERS}/6monthslater-coverart.jpeg`,
  americanheartbreak: `${COVERS}/zachbryanamericanheartbreak-coverart.jpeg`,
  zachbryan: `${COVERS}/zachbryanzachbryanselftitled-coverart.jpeg`,
  thegreatamericanbarscene: `${COVERS}/zachbryangreatamericanbarscene-coverart.jpeg`,
  summertimeblues: `${COVERS}/zachbryansummertimeblues-coverart.jpeg`,
  burnburnburnsingle: `${COVERS}/zachbryanburn-coverart.jpeg`,
  deann: `${COVERS}/zachbryan-deann-coverart.jpeg`,
  dawnssingle: `${COVERS}/zachbryandawns-coverart.jpeg`,
  onethingatatime: `${COVERS}/morganwallenonethingatatime-coverart.jpeg`,
  imtheproblem: `${COVERS}/morganwallenimtheproblem-coverart.jpeg`,
  dangerousthedoublealbum: `${COVERS}/morganwallendangerous-coverart.jpeg`,
  ifiknowme: `${COVERS}/morganwallen-ifiknowme-coverart.jpeg`,
  goldenhour: `${COVERS}/kaceygoldenhour-coverart.jpeg`,
  deeperwell: `${COVERS}/kaceymusgraves-deeperwell-coverart.jpeg`,
  starcrossed: `${COVERS}/kaceymusgraves-starcrossed-coverart.jpeg`,
  sametrailerdifferentpark: `${COVERS}/kaceysametrailer-coverart.jpeg`,
  lover: `${COVERS}/taylorswift-lover-coverart.jpeg`,
  "1989": `${COVERS}/tswift-1989-coverart.jpeg`,
  fearless: `${COVERS}/tswift-fearless-coverart.jpeg`,
  folklore: `${COVERS}/tswift-folklore-coverart.jpeg`,
  redtaylorsversion: `${COVERS}/tswift-red-taylorversion-coverart.jpeg`,
  stickseason: `${COVERS}/noahkahanstickseason-coverart.jpeg`,
  stickseasonwellallbehereforever: `${COVERS}/noahkahanstickseason-coverart.jpeg`,
  stickseasonforever: `${COVERS}/noahkahanstickseason-coverart.jpeg`,
  gettinold: `${COVERS}/lukecombs-gettingold-coverart.jpeg`,
  thisonesforyou: `${COVERS}/lukecombsthisoneforyoucoverart.jpeg`,
  thisonesforyoutoo: `${COVERS}/lukecombsthisone'sforyoutoo-coverart.jpeg`,
  growinup: `${COVERS}/lukecombsgrowingup-coverart.jpeg`,
  bellbottomcountry: `${COVERS}/laineywilson-bellbottom-coverart.jpeg`,
  f1trillion: `${COVERS}/postmalonef1trillion-coverart.jpeg`,
  unheardep: `${COVERS}/hozierunheard-coverart.jpeg`,
  cleopatra: `${COVERS}/lumineerscleo-coverart.jpeg`,
  didyouknowthattheresatunnelunderoceanblvd: `${COVERS}/lanaocean-coverart.jpeg`,
  sos: `${COVERS}/szasos-coverart.jpeg`,
};

const ARTIST_PROFILE: Record<string, string> = {
  meganmoroney: `${ARTISTS}/meganmoroney-profile.jpeg`,
  zachbryan: `${ARTISTS}/zachbryan-profile.jpeg`,
  morganwallen: `${ARTISTS}/morganwallen-profile.jpeg`,
  kaceymusgraves: `${ARTISTS}/kaceymusgraves-profile.jpeg`,
  taylorswift: `${ARTISTS}/taylorswift-updatedprofile-usethis-profile.jpeg`,
  noahkahan: `${ARTISTS}/noahkahan-profile.jpeg`,
  lukecombs: `${ARTISTS}/lukecombs-profile.jpeg`,
  laineywilson: `${ARTISTS}/laineywilson-profile.jpeg`,
  hozier: `${ARTISTS}/hozier-profile.jpeg`,
  thelumineers: `${ARTISTS}/lumineers-profile.jpeg`,
  lanadelrey: `${ARTISTS}/lanadelrey-profile.jpeg`,
  sza: `${ARTISTS}/sza-profile.jpeg`,
};

function bucketFor(artist: string): ArtistBucket {
  if (artist.includes("Zach Bryan")) return "Zach Bryan";
  if (artist.includes("Noah Kahan")) return "Noah Kahan";
  if (artist.includes("Post Malone")) return "Post Malone";
  return artist as ArtistBucket;
}

function resolveCover(artist: string, title: string, album: string): string {
  const albumKey = norm(album);
  if (ALBUM_COVER[albumKey]) return ALBUM_COVER[albumKey];
  const artistKey = norm(bucketFor(artist));
  return ARTIST_PROFILE[artistKey] ?? `${ARTISTS}/${artistKey}.png`;
}

type RawRow = [string, string, string];

const RAW_CATALOG: RawRow[] = [
  ["Megan Moroney", "Tennessee Orange", "Lucky"],
  ["Megan Moroney", "Am I Okay?", "Am I Okay?"],
  ["Megan Moroney", "I’m Not Pretty", "Lucky"],
  ["Megan Moroney", "No Caller ID", "Am I Okay?"],
  ["Megan Moroney", "Wonder", "Lucky"],
  ["Megan Moroney", "6 Months Later", "6 Months Later — Single"],
  ["Megan Moroney", "Girl in the Mirror", "Lucky"],
  ["Megan Moroney", "Man on the Moon", "Am I Okay?"],
  ["Zach Bryan", "Something in the Orange", "American Heartbreak"],
  ["Zach Bryan, Kacey Musgraves", "I Remember Everything", "Zach Bryan"],
  ["Zach Bryan", "Pink Skies", "The Great American Bar Scene"],
  ["Zach Bryan", "Oklahoma Smokeshow", "Summertime Blues"],
  ["Zach Bryan", "Burn, Burn, Burn", "Burn, Burn, Burn — Single"],
  ["Zach Bryan", "Heading South", "DeAnn"],
  ["Zach Bryan", "Sun to Me", "American Heartbreak"],
  ["Zach Bryan", "Dawns", "Dawns — Single"],
  ["Zach Bryan", "Something in the Orange - Z&E’s Version", "American Heartbreak"],
  ["Morgan Wallen", "Last Night", "One Thing at a Time"],
  ["Morgan Wallen", "Love Somebody", "I’m The Problem"],
  ["Morgan Wallen", "I’m The Problem", "I’m The Problem"],
  ["Morgan Wallen", "Thinkin’ Bout Me", "One Thing at a Time"],
  ["Morgan Wallen", "You Proof", "One Thing at a Time"],
  ["Morgan Wallen", "Wasted On You", "Dangerous: The Double Album"],
  ["Morgan Wallen", "Sand In My Boots", "Dangerous: The Double Album"],
  ["Morgan Wallen", "Whiskey Glasses", "If I Know Me"],
  ["Kacey Musgraves", "Slow Burn", "Golden Hour"],
  ["Kacey Musgraves", "Space Cowboy", "Golden Hour"],
  ["Kacey Musgraves", "Rainbow", "Golden Hour"],
  ["Kacey Musgraves", "Golden Hour", "Golden Hour"],
  ["Kacey Musgraves", "Deeper Well", "Deeper Well"],
  ["Kacey Musgraves", "The Architect", "Deeper Well"],
  ["Kacey Musgraves", "Too Good to be True", "Deeper Well"],
  ["Kacey Musgraves", "justified", "star-crossed"],
  ["Kacey Musgraves", "Follow Your Arrow", "Same Trailer Different Park"],
  ["Kacey Musgraves", "Merry Go ’Round", "Same Trailer Different Park"],
  ["Taylor Swift", "Cruel Summer", "Lover"],
  ["Taylor Swift", "Style", "1989"],
  ["Taylor Swift", "Love Story", "Fearless"],
  ["Taylor Swift", "You Belong With Me", "Fearless"],
  ["Taylor Swift", "august", "folklore"],
  ["Taylor Swift", "betty", "folklore"],
  ["Taylor Swift", "champagne problems", "evermore"],
  ["Taylor Swift", "All Too Well (10 Minute Version)", "Red (Taylor’s Version)"],
  ["Noah Kahan", "Stick Season", "Stick Season"],
  ["Noah Kahan", "Dial Drunk", "Stick Season (We’ll All Be Here Forever)"],
  ["Noah Kahan", "Northern Attitude", "Stick Season"],
  ["Noah Kahan", "All My Love", "Stick Season"],
  ["Noah Kahan", "She Calls Me Back", "Stick Season"],
  ["Noah Kahan", "You’re Gonna Go Far", "Stick Season (We’ll All Be Here Forever)"],
  ["Noah Kahan, Post Malone", "Dial Drunk", "Stick Season (Forever)"],
  ["Luke Combs", "Fast Car", "Gettin’ Old"],
  ["Luke Combs", "When It Rains It Pours", "This One’s for You"],
  ["Luke Combs", "Beautiful Crazy", "This One’s for You Too"],
  ["Luke Combs", "The Kind of Love We Make", "Growin’ Up"],
  ["Luke Combs", "Forever After All", "What You See Ain’t Always What You Get"],
  ["Luke Combs", "Ain’t No Love In Oklahoma", "Twisters: The Album"],
  ["Lainey Wilson", "Heart Like A Truck", "Bell Bottom Country"],
  ["Lainey Wilson", "Watermelon Moonshine", "Bell Bottom Country"],
  ["Lainey Wilson", "Wildflowers and Wild Horses", "Bell Bottom Country"],
  ["Lainey Wilson", "Hang Tight Honey", "Whirlwind"],
  ["Lainey Wilson", "Country’s Cool Again", "Whirlwind"],
  ["Post Malone, Morgan Wallen", "I Had Some Help", "F-1 Trillion"],
  ["Post Malone, Blake Shelton", "Pour Me A Drink", "F-1 Trillion"],
  ["Post Malone, Luke Combs", "Guy For That", "F-1 Trillion"],
  ["Post Malone", "Yours", "F-1 Trillion"],
  ["Hozier", "Too Sweet", "Unheard — EP"],
  ["Hozier", "Cherry Wine - Live", "Hozier"],
  ["The Lumineers", "Ophelia", "Cleopatra"],
  ["Lana Del Rey", "Let The Light In", "Did you know that there’s a tunnel under Ocean Blvd"],
  ["SZA", "Snooze", "SOS"],
];

export const CAROLINE_CATALOG: CarolineSong[] = RAW_CATALOG.map(([artist, title, album]) => ({
  artist,
  title,
  album,
  bucket: bucketFor(artist),
  cover: resolveCover(artist, title, album),
}));

function buildHintSongs(): CarolineSong[] {
  const picks: [string, string, string?][] = [
    ["Megan Moroney", "Tennessee Orange", undefined],
    ["Zach Bryan", "Something in the Orange", undefined],
    ["Morgan Wallen", "Last Night", undefined],
    ["Kacey Musgraves", "Slow Burn", undefined],
    ["Taylor Swift", "Cruel Summer", undefined],
    ["Noah Kahan", "Stick Season", undefined],
  ];
  const out: CarolineSong[] = [];
  for (const [artist, title, album] of picks) {
    const hit = CAROLINE_CATALOG.find(
      (s) => s.artist === artist && s.title === title && (album ? s.album === album : true)
    );
    if (hit) out.push(hit);
  }
  return out.length ? out : CAROLINE_CATALOG.slice(0, 6);
}

const HINT_SONGS = buildHintSongs();

function scoreMatch(song: CarolineSong, tokens: string[]): number {
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

function scoreSubstring(song: CarolineSong, query: string): number {
  const hay = `${song.title} ${song.artist} ${song.album}`.toLowerCase();
  if (!hay.includes(query)) return -1;
  if (song.title.toLowerCase().includes(query)) return 8;
  if (song.artist.toLowerCase().includes(query)) return 6;
  return 3;
}

export function searchCarolineCatalog(query: string, limit = 8): CarolineSong[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return HINT_SONGS.slice(0, limit);

  const tokens = trimmed.split(/\s+/).filter(Boolean);

  let ranked = CAROLINE_CATALOG.map((song) => ({ song, score: scoreMatch(song, tokens) }))
    .filter((x) => x.score >= 0)
    .sort((a, b) => b.score - a.score);

  if (!ranked.length) {
    ranked = CAROLINE_CATALOG.map((song) => ({ song, score: scoreSubstring(song, trimmed) }))
      .filter((x) => x.score >= 0)
      .sort((a, b) => b.score - a.score);
  }

  return ranked.slice(0, limit).map((x) => x.song);
}
