export type ArtistBucket =
  | "Addison Rae"
  | "Charli XCX"
  | "Disclosure"
  | "Disclosure, AlunaGeorge"
  | "Disclosure, Eliza Doolittle"
  | "Disclosure, Lorde"
  | "Disclosure, Sam Smith"
  | "Dominic Fike"
  | "Empire of the Sun"
  | "Ice Spice, PinkPantheress"
  | "Lil Uzi Vert"
  | "MGMT"
  | "Mac Miller"
  | "Phoenix"
  | "PinkPantheress"
  | "Playboi Carti"
  | "Steve Lacy"
  | "Stick Figure"
  | "Tame Impala"
  | "The 1975"
  | "The Dare"
  | "Two Door Cinema Club";

export interface MaddieSong {
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
  brat: `${COVERS}/brat-coverart.jpeg`,
  vroomvroomep: `${COVERS}/vroomvroom-coverart.jpeg`,
  pop2: `${COVERS}/pop2-coverart.jpeg`,
  crash: `${COVERS}/charlixcx-crash-coverart.jpeg`,
  tohellwithit: `${COVERS}/pinkpantheress-tohellwithit-coverart.jpeg`,
  heavenknows: `${COVERS}/heavenknows-coverart.jpeg`,
  turnitupsingle: `${COVERS}/pinkpantheress-turnitup-coverart.jpeg`,
  whatswrongwithnewyork: `${COVERS}/whatswrongwithnewyork-coverart.jpeg`,
  dietpepsisingle: `${COVERS}/dietpepsi-coverart.jpeg`,
  aquamarinesingle: `${COVERS}/aquamarine-coverart.jpeg`,
  headphonesonsingle: `${COVERS}/headphones-coverart.jpeg`,
  highfashionsingle: `${COVERS}/highfashion-coverart.jpeg`,
  fameisagunsingle: `${COVERS}/fameisagun-coverart.jpeg`,
  arep: `${COVERS}/addisonraear-coverart.jpeg`,
  luvisrage2: `${COVERS}/luvisrage2-coverart.jpeg`,
  justwannarocksingle: `${COVERS}/justwannarock-coverart.jpeg`,
  liluzivertvstheworld: `${COVERS}/liluzivertvstheworld-coverart.jpeg`,
  theperfectluvtape: `${COVERS}/perfectluvtape-coverart.jpeg`,
  sanguineparadisesingle: `${COVERS}/sanguineparadise-coverart.jpeg`,
  eternalatake: `${COVERS}/eternalatake-coverart.jpeg`,
  eternalatakeluvvstheworld2: `${COVERS}/eternalatake-coverart.jpeg`,
  worldonfire: `${COVERS}/stickfigure-coverart.jpeg`,
  wisdom: `${COVERS}/fireonthehorizonstickfigure-coverart.jpeg`,
  wolfgangamadeusphoenix: `${COVERS}/wolfgangamadeus-coverart.jpeg`,
  united: `${COVERS}/phoenixuntied-coverart.jpeg`,
  bankrupt: `${COVERS}/bankruptphoenix-coverart.jpeg`,
  tiamo: `${COVERS}/tiamophoenix-coverart.jpeg`,
  alphazulu: `${COVERS}/alphazulu-coverart.jpeg`,
  touristhistory: `${COVERS}/touristhistory-coverart.jpeg`,
  beacon: `${COVERS}/beacon-coverart.jpeg`,
  changingoftheseasonsep: `${COVERS}/changingoftheseasons-coverart.jpeg`,
  gameshow: `${COVERS}/gameshow-coverart.jpeg`,
  geminirights: `${COVERS}/stevelacy-geminirights-coverart.jpeg`,
  darkredsingle: `${COVERS}/stevelacydarkred-coverart.jpeg`,
  apolloxxi: `${COVERS}/stevelacy-geminirights-coverart.jpeg`,
  stevelacysdemo: `${COVERS}/stevelacy-geminirights-coverart.jpeg`,
  currents: `${COVERS}/currents-coverart.jpeg`,
  theslowrush: `${COVERS}/slowrush-coverart.jpeg`,
  settle: `${COVERS}/disclosuresettle-coverart.jpeg`,
  caracal: `${COVERS}/disclosurecaracal-coverart.jpeg`,
  walkingonadream: `${COVERS}/walkingonadream-coverart.jpeg`,
  iceonthedune: `${COVERS}/iceonthedune-coverart.jpeg`,
  oracularspectacular: `${COVERS}/oracularspectacular-coverart.jpeg`,
  dontforgetaboutmedemos: `${COVERS}/dontforgetaboutmedemos-coverart.jpeg`,
  spidermanacrossthespiderverse: `${COVERS}/postmalonespiderverse-coverart.jpeg`,
  kids: `${COVERS}/kidsmacmiller-coverart.jpeg`,
  thedivinefeminine: `${COVERS}/divinefeminie-coverart.jpeg`,
  wholelottared: `${COVERS}/wholelottared-coverart.jpeg`,
  "bratanditsthesamebuttheresthreemoresongssoitsnot": `${COVERS}/brat-coverart.jpeg`,
  ilikeitwhenyousleepforyouaresobeautifulyetsounawareofit: `${COVERS}/ilikeitwhenyousleep-1975-coverart.jpeg`,
  the1975: `${COVERS}/1975selftitled-coverart.jpeg`,
  abriefinquiryintoonlinerelationships: `${COVERS}/briefinquiry-coverart.jpeg`,
  beingfunnyinaforeignlanguage: `${COVERS}/beingfunny-coverart.jpeg`,
};

const ARTIST_PROFILE: Record<string, string> = {
  charlixcx: `${ARTISTS}/charliexcx-profile.jpeg`,
  pinkpantheress: `${ARTISTS}/pinkpantheress-profile.jpeg`,
  thedare: `${ARTISTS}/thedare-profile.jpeg`,
  addisonrae: `${ARTISTS}/addisonrae-profile.jpeg`,
  liluzivert: `${ARTISTS}/liluzivert-profile.jpeg`,
  stickfigure: `${ARTISTS}/stickfigure-profile.jpeg`,
  phoenix: `${ARTISTS}/phoenix-profile.jpeg`,
  twodoorcinemaclub: `${ARTISTS}/2doorcinemaclub-profile.jpeg`,
  stevelacy: `${ARTISTS}/stevelacy-profile.jpeg`,
  tameimpala: `${ARTISTS}/tameimpala-profile.jpeg`,
  disclosure: `${ARTISTS}/disclosurespotifynew.jpeg`,
  empireofthesun: `${ARTISTS}/empireofthesun-profile.jpeg`,
  mgmt: `${ARTISTS}/MGMT-profile.jpeg`,
  dominicfike: `${ARTISTS}/dominicfike-profile.jpeg`,
  macmiller: `${ARTISTS}/macmiller-profile.jpeg`,
  playboicarti: `${ARTISTS}/playboicarti-profile.jpeg`,
  icespice: `${ARTISTS}/icespicespotify.jpeg`,
  the1975: `${ARTISTS}/the1975-profile.jpeg`,
};

function bucketFor(artist: string): ArtistBucket {
  return artist as ArtistBucket;
}

function resolveCover(artist: string, title: string, album: string): string {
  const albumKey = norm(album);
  if (ALBUM_COVER[albumKey]) return ALBUM_COVER[albumKey];
  let artistKey = norm(artist);
  // handle joint artists
  if (artistKey.includes("disclosure")) artistKey = "disclosure";
  if (artistKey.includes("icespice")) artistKey = "icespice";
  if (artistKey.includes("1975")) artistKey = "the1975";
  return ARTIST_PROFILE[artistKey] ?? `${ARTISTS}/${artistKey}.jpeg`;
}

type RawRow = [ArtistBucket, string, string];

const RAW_CATALOG: RawRow[] = [
  ["Charli XCX", "360", "BRAT"],
  ["Charli XCX", "Club classics", "BRAT"],
  ["Charli XCX", "Von dutch", "BRAT"],
  ["Charli XCX", "Apple", "BRAT"],
  ["Charli XCX", "Guess", "BRAT and it’s the same but there’s three more songs so it’s not"],
  ["Charli XCX", "B2b", "BRAT"],
  ["Charli XCX", "Talk talk", "BRAT"],
  ["Charli XCX", "Sympathy is a knife", "BRAT"],
  ["Charli XCX", "Vroom Vroom", "Vroom Vroom — EP"],
  ["Charli XCX", "Unlock It", "Pop 2"],
  ["Charli XCX", "Track 10", "Pop 2"],
  ["Charli XCX", "Good Ones", "CRASH"],
  ["PinkPantheress", "Pain", "to hell with it"],
  ["PinkPantheress", "Break It Off", "to hell with it"],
  ["PinkPantheress", "Just for me", "to hell with it"],
  ["PinkPantheress", "Passion", "to hell with it"],
  ["PinkPantheress", "I must apologise", "to hell with it"],
  ["PinkPantheress", "Boy’s a liar Pt. 2", "Heaven knows"],
  ["PinkPantheress", "Mosquito", "Heaven knows"],
  ["PinkPantheress", "Capable of love", "Heaven knows"],
  ["PinkPantheress", "Nice to meet you", "Heaven knows"],
  ["PinkPantheress", "Turn it up", "Turn it up — Single"],
  ["The Dare", "Girls", "What’s Wrong With New York?"],
  ["The Dare", "Good Time", "What’s Wrong With New York?"],
  ["The Dare", "Perfume", "What’s Wrong With New York?"],
  ["The Dare", "I Destroyed Disco", "What’s Wrong With New York?"],
  ["The Dare", "You’re Invited", "What’s Wrong With New York?"],
  ["The Dare", "All Night", "What’s Wrong With New York?"],
  ["The Dare", "Open Up", "What’s Wrong With New York?"],
  ["The Dare", "Movement", "What’s Wrong With New York?"],
  ["Addison Rae", "Diet Pepsi", "Diet Pepsi — Single"],
  ["Addison Rae", "Aquamarine", "Aquamarine — Single"],
  ["Addison Rae", "Headphones On", "Headphones On — Single"],
  ["Addison Rae", "High Fashion", "High Fashion — Single"],
  ["Addison Rae", "Fame is a Gun", "Fame is a Gun — Single"],
  ["Addison Rae", "2 die 4", "AR — EP"],
  ["Lil Uzi Vert", "XO Tour Llif3", "Luv Is Rage 2"],
  ["Lil Uzi Vert", "20 Min", "Luv Is Rage 2"],
  ["Lil Uzi Vert", "Just Wanna Rock", "Just Wanna Rock — Single"],
  ["Lil Uzi Vert", "The Way Life Goes", "Luv Is Rage 2"],
  ["Lil Uzi Vert", "Money Longer", "Lil Uzi Vert vs. The World"],
  ["Lil Uzi Vert", "Do What I Want", "The Perfect LUV Tape"],
  ["Lil Uzi Vert", "Sanguine Paradise", "Sanguine Paradise — Single"],
  ["Lil Uzi Vert", "Erase Your Social", "The Perfect LUV Tape"],
  ["Lil Uzi Vert", "That Way", "Eternal Atake"],
  ["Lil Uzi Vert", "Myron", "Eternal Atake / LUV vs. The World 2"],
  ["Stick Figure", "Angels Above Me", "World on Fire"],
  ["Stick Figure", "World on Fire", "World on Fire"],
  ["Stick Figure", "Once in a Lifetime", "World on Fire"],
  ["Stick Figure", "Shine", "World on Fire"],
  ["Stick Figure", "All for You", "World on Fire"],
  ["Stick Figure", "Above the Storm", "World on Fire"],
  ["Stick Figure", "Easy Runaway", "World on Fire"],
  ["Stick Figure", "Fire on the Horizon", "Wisdom"],
  ["Phoenix", "Lisztomania", "Wolfgang Amadeus Phoenix"],
  ["Phoenix", "1901", "Wolfgang Amadeus Phoenix"],
  ["Phoenix", "If I Ever Feel Better", "United"],
  ["Phoenix", "Trying To Be Cool", "Bankrupt!"],
  ["Phoenix", "Entertainment", "Bankrupt!"],
  ["Phoenix", "Ti Amo", "Ti Amo"],
  ["Phoenix", "Alpha Zulu", "Alpha Zulu"],
  ["Phoenix", "Tonight", "Alpha Zulu"],
  ["Phoenix", "Winter Solstice", "Alpha Zulu"],
  ["Two Door Cinema Club", "What You Know", "Tourist History"],
  ["Two Door Cinema Club", "Undercover Martyn", "Tourist History"],
  ["Two Door Cinema Club", "Something Good Can Work", "Tourist History"],
  ["Two Door Cinema Club", "Cigarettes in the Theatre", "Tourist History"],
  ["Two Door Cinema Club", "I Can Talk", "Tourist History"],
  ["Two Door Cinema Club", "Sun", "Beacon"],
  ["Two Door Cinema Club", "Changing of the Seasons", "Changing of the Seasons — EP"],
  ["Two Door Cinema Club", "Bad Decisions", "Gameshow"],
  ["Steve Lacy", "Bad Habit", "Gemini Rights"],
  ["Steve Lacy", "Dark Red", "Dark Red — Single"],
  ["Steve Lacy", "Helmet", "Gemini Rights"],
  ["Steve Lacy", "Mercury", "Gemini Rights"],
  ["Steve Lacy", "N Side", "Apollo XXI"],
  ["Steve Lacy", "C U Girl", "Steve Lacy’s Demo"],
  ["Tame Impala", "The Less I Know The Better", "Currents"],
  ["Tame Impala", "Let It Happen", "Currents"],
  ["Tame Impala", "Borderline", "The Slow Rush"],
  ["Tame Impala", "New Person, Same Old Mistakes", "Currents"],
  ["Tame Impala", "Lost in Yesterday", "The Slow Rush"],
  ["Tame Impala", "Eventually", "Currents"],
  ["Disclosure, Sam Smith", "Latch", "Settle"],
  ["Disclosure, AlunaGeorge", "White Noise", "Settle"],
  ["Disclosure, Eliza Doolittle", "You & Me", "Settle"],
  ["Disclosure", "F For You", "Settle"],
  ["Disclosure, Lorde", "Magnets", "Caracal"],
  ["Empire of the Sun", "Walking On A Dream", "Walking On A Dream"],
  ["Empire of the Sun", "We Are The People", "Walking On A Dream"],
  ["Empire of the Sun", "Alive", "Ice on the Dune"],
  ["MGMT", "Electric Feel", "Oracular Spectacular"],
  ["MGMT", "Kids", "Oracular Spectacular"],
  ["MGMT", "Time to Pretend", "Oracular Spectacular"],
  ["Dominic Fike", "3 Nights", "Don’t Forget About Me, Demos"],
  ["Dominic Fike", "Mona Lisa", "Spider-Man: Across the Spider-Verse"],
  ["Mac Miller", "The Spins", "K.I.D.S."],
  ["Mac Miller", "Dang!", "The Divine Feminine"],
  ["Playboi Carti", "Sky", "Whole Lotta Red"],
  ["Ice Spice, PinkPantheress", "Boy’s a liar Pt. 2", "Heaven knows"],
  ["The 1975", "Somebody Else", "I like it when you sleep, for you are so beautiful yet so unaware of it"],
  ["The 1975", "Robbers", "The 1975"],
  ["The 1975", "Sex", "The 1975"],
  ["The 1975", "Chocolate", "The 1975"],
  ["The 1975", "Love It If We Made It", "A Brief Inquiry Into Online Relationships"],
  ["The 1975", "It’s Not Living (If It’s Not With You)", "A Brief Inquiry Into Online Relationships"],
  ["The 1975", "The Sound", "I like it when you sleep, for you are so beautiful yet so unaware of it"],
  ["The 1975", "About You", "Being Funny in a Foreign Language"],
];

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

  const tokens = trimmed.split(/\s+/).filter(Boolean);

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
