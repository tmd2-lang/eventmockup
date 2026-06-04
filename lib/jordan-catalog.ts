export type ArtistBucket =
  | "Keinemusik"
  | "JUNO (DE)"
  | "Prospa"
  | "Black Coffee"
  | "Drake"
  | "Travis Scott"
  | "Future"
  | "Popcaan"
  | "Chris Lake"
  | "ANOTR";

export interface JordanSong {
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

/** Album / project → cover art (your filenames in public/covers) */
const ALBUM_COVER: Record<string, string> = {
  iceman: `${COVERS}/drake-iceman-coverart.jpeg`,
  habibti: `${COVERS}/drake-habibti-spotify.jpeg`,
  maidofhonour: `${COVERS}/drake-maidofhonor-iceman.jpeg`,
  movesingle: `${COVERS}/move-coverart.jpeg`,
  saywhatsingle: `${COVERS}/saywhat-coverart.jpeg`,
  theraptureptiiisingle: `${COVERS}/raptureiii-coverart.jpeg`,
  lesgoutsingle: `${COVERS}/lesgout-coverart.jpeg`,
  thandazasingle: `${COVERS}/thandaza-coverart.jpeg`,
  crazyforitsingle: `${COVERS}/crazyforit-coverart.jpeg`,
  youaresafekeinemusikcatalog: `${COVERS}/youaresafe-coverart-worksformuye.jpeg`,
  championsingle: `${COVERS}/champion-coverart.jpeg`,
  alligotsingle: `${COVERS}/alligot-coverart.jpeg`,
  sendreturn: `${COVERS}/sendreturn-coverart.jpeg`,
  lastdancesingle: `${COVERS}/lastdance-coverart.jpeg`,
  heatsingle: `${COVERS}/junoheat-coverart.jpeg`,
  getemupsingle: `${COVERS}/junogetemup-coverart.jpeg`,
  allalonesingle: `${COVERS}/junoallalone-coverart.jpeg`,
  dopaminasingle: `${COVERS}/junodopamina-coverart.jpeg`,
  reversesingle: `${COVERS}/junoreverse-coverart.jpeg`,
  quericosingle: `${COVERS}/junoquerico-coverart.jpeg`,
  ridewithmesingle: `${COVERS}/junoridewithme-coverart.jpeg`,
  troubledsingleedit: `${COVERS}/junotroubled-coverart.jpeg`,
  suffocatingsingle: `${COVERS}/junosuffocating-coverart.jpeg`,
  thisrhythmsingle: `${COVERS}/propsathisrhytm-coverart.jpeg`,
  freeyourmindsingle: `${COVERS}/freeyourmind-coverart.jpeg`,
  dontstopsingle: `${COVERS}/prospadontstop-coverart.jpeg`,
  controltheparty: `${COVERS}/prospaecstacy-coverart.jpeg`,
  prayersingle: `${COVERS}/prospalovesongs-coverart.jpeg`,
  lovesongssingle: `${COVERS}/prospalovesongs-coverart.jpeg`,
  youdontownmesingle: `${COVERS}/prospayoudontownme-coverart.jpeg`,
  wantneedlovesingle: `${COVERS}/prospawhatneedlove-coverart.jpeg`,
  ifyouwantmylovingsingle: `${COVERS}/propsaifyouwantmyloving-coverart.jpeg`,
  babysingle: `${COVERS}/prospababy-coverart.jpeg`,
  drivesinglesubconsciouslyera: `${COVERS}/blackcoffeedrive-coverart.jpeg`,
  wishyouwereheresingle: `${COVERS}/blackcoffeewishyouwerehere-coverart.jpeg`,
  subconsciously: `${COVERS}/blackcoffeesubconsciously-coverart.jpeg`,
  homebrewed: `${COVERS}/blackcoffeehomebrewed-coverart.jpeg`,
  piecesofme: `${COVERS}/blackcoffeewedanceagain-coverart.jpeg`,
  omeexyongs4u: `${COVERS}/drakesexysongs4u-coverart.jpeg`,
  whatdidimisssingle: `${COVERS}/drakewhatdidiimiss-coverart.jpeg`,
  morelife: `${COVERS}/drakepassionfruitandmorelife-coverart.jpeg`,
  views: `${COVERS}/drakeviews-coverart.jpeg`,
  honestlynevermind: `${COVERS}/drakejimmycookshonestlynevermind-coverart.jpeg`,
  certifiedloverboy: `${COVERS}/drakecertifiedloverboy-coverart.jpeg`,
  herloss: `${COVERS}/drakeherloss.jpeg`,
  forallthedogs: `${COVERS}/drakeforallthedogs-coverart.jpeg`,
  searchrescuesingle: `${COVERS}/drakesearchandrescue-coverart.jpeg`,
  utopia: `${COVERS}/travisscott-utopia.jpeg`,
  "4x4single": `${COVERS}/travisscott4x4-coverart.jpeg`,
  highestintheroomsingle: `${COVERS}/travisscotthighestintheroom-coverart.jpeg`,
  astroworld: `${COVERS}/travisscottastroworld-coverart.jpeg`,
  birdsinthetrapsingmcnight: `${COVERS}/travisscott-goosebumps-birdsinthetrap-coverart.jpeg`,
  wedonttrustyou: `${COVERS}/futurewedonttrustyou-coverart.jpeg`,
  westilldonttrustyou: `${COVERS}/future-westilldonttrustyou-coverart.png`,
  mixtapepluto: `${COVERS}/futuremixtapepluto-coverart.jpeg`,
  ineverlikedyou: `${COVERS}/futureineverlikedyou-coverart.jpeg`,
  future: `${COVERS}/futuremaskoff-future-coverart.jpeg`,
  "56nights": `${COVERS}/future56nights-coverart.jpeg`,
  fixtape: `${COVERS}/popcaanfixtape-coverart.jpeg`,
  greatishe: `${COVERS}/popcaangreatishe-coverart.jpeg`,
  vanquish: `${COVERS}/popcaanmytype-coverart.jpeg`,
  forever: `${COVERS}/popcaan-forever-coverart.jpeg`,
  wherewecomefrom: `${COVERS}/popcaan-wherewecomefrom-coverart.jpeg`,
  intheyumasingle: `${COVERS}/chrislake-yuma-coverart.jpeg`,
  somebodysingle: `${COVERS}/chrislake-somebody-coverart.jpeg`,
  chemistry: `${COVERS}/chrislake-chemistry-coverart.jpeg`,
  summertimebluessingle: `${COVERS}/chrislake-summertimeblues-coverart.jpeg`,
  begginsingle: `${COVERS}/chrislake-beggin-coverart.jpeg`,
  morebabysingle: `${COVERS}/chrislake-morebaby-coverart.jpeg`,
  turnoffthelightssingle: `${COVERS}/chrislake-turnoffthelights-coverart.jpeg`,
  toxicsingle: `${COVERS}/chrislake-toxic-coverart.jpeg`,
  relaxmyeyessingle: `${COVERS}/ANOTR-relaxmyeyes-coverart.jpeg`,
  talktoyousingle: `${COVERS}/ANOTR-talktoyou-coverart.jpeg`,
  onatrip: `${COVERS}/ANOTR-onatrip-coverart.jpeg`,
  vertigosingle: `${COVERS}/ANOTR-Vertigo-coverart.jpeg`,
  "24turnitupsingle": `${COVERS}/ANOTR-24-coverart.jpeg`,
  likeitsingle: `${COVERS}/ANOTR-Likeit-coverart.jpeg`,
};

const ARTIST_PROFILE: Record<string, string> = {
  keinemusik: `${ARTISTS}/keinemusik-spotify-propic.jpeg`,
  junode: `${ARTISTS}/juno-profile.jpeg`,
  prospa: `${ARTISTS}/prospa-profile.jpeg`,
  blackcoffee: `${ARTISTS}/blackcoffee-profile.jpeg`,
  drake: `${ARTISTS}/drake-profile.jpeg`,
  travisscott: `${ARTISTS}/travisscott-profile.jpeg`,
  future: `${ARTISTS}/future-profile.jpeg`,
  popcaan: `${ARTISTS}/popcaan-profile.jpeg`,
  chrislake: `${ARTISTS}/chrislake-profile.jpeg`,
  anotr: `${ARTISTS}/anotr-profile.jpeg`,
};

function bucketFor(artist: string): ArtistBucket {
  return artist as ArtistBucket;
}

function resolveCover(artist: string, title: string, album: string): string {
  const albumKey = norm(album);
  if (ALBUM_COVER[albumKey]) return ALBUM_COVER[albumKey];

  // Shared collab single art
  if (norm(title).includes("rapture")) return `${COVERS}/raptureiii-coverart.jpeg`;

  const artistKey = norm(artist);
  return ARTIST_PROFILE[artistKey] ?? `${ARTISTS}/drake-profile.jpeg`;
}

type RawRow = [ArtistBucket, string, string];

const RAW_CATALOG: RawRow[] = [
  ["Keinemusik", "Move", "Move — Single"],
  ["Keinemusik", "Say What", "Say What — Single"],
  ["Keinemusik", "The Rapture Pt.III", "The Rapture Pt.III — Single"],
  ["Keinemusik", "Les Gout", "Les Gout — Single"],
  ["Keinemusik", "Thandaza", "Thandaza — Single"],
  ["Keinemusik", "Crazy For It", "Crazy For It — Single"],
  ["Keinemusik", "Muyè", "You Are Safe / Keinemusik catalog"],
  ["Keinemusik", "Champion", "Champion — Single"],
  ["Keinemusik", "All I Got", "All I Got — Single"],
  ["Keinemusik", "Send Return", "Send Return"],
  ["JUNO (DE)", "Last Dance", "Last Dance — Single"],
  ["JUNO (DE)", "Heat", "Heat — Single"],
  ["JUNO (DE)", "Get Em Up", "Get Em Up — Single"],
  ["JUNO (DE)", "All Alone", "All Alone — Single"],
  ["JUNO (DE)", "Dopamina", "Dopamina — Single"],
  ["JUNO (DE)", "Reverse", "Reverse — Single"],
  ["JUNO (DE)", "Que Rico", "Que Rico — Single"],
  ["JUNO (DE)", "Ride With Me", "Ride With Me — Single"],
  ["JUNO (DE)", "Troubled - Edit", "Troubled — Single/Edit"],
  ["JUNO (DE)", "Suffocating", "Suffocating — Single"],
  ["Prospa", "This Rhythm", "This Rhythm — Single"],
  ["Prospa", "Free Your Mind", "Free Your Mind — Single"],
  ["Prospa", "Don't Stop", "Don't Stop — Single"],
  ["Prospa", "Ecstasy (Over & Over)", "Control The Party"],
  ["Prospa", "Prayer - Edit", "Prayer — Single"],
  ["Prospa", "Love Songs", "Love Songs — Single"],
  ["Prospa", "You Don't Own Me", "You Don't Own Me — Single"],
  ["Prospa", "WANT NEED LOVE", "WANT NEED LOVE — Single"],
  ["Prospa", "If You Want My Loving", "If You Want My Loving — Single"],
  ["Prospa", "Baby", "Baby — Single"],
  ["Black Coffee", "Drive", "Drive — Single / Subconsciously era"],
  ["Black Coffee", "Wish You Were Here", "Wish You Were Here — Single"],
  ["Black Coffee", "The Rapture Pt.III", "The Rapture Pt.III — Single"],
  ["Black Coffee", "Ready For You", "Subconsciously"],
  ["Black Coffee", "Never Gonna Forget", "Subconsciously"],
  ["Black Coffee", "Your Eyes", "Subconsciously"],
  ["Black Coffee", "SBCNCSLY", "Subconsciously"],
  ["Black Coffee", "Superman", "Home Brewed"],
  ["Black Coffee", "We Dance Again", "Pieces of Me"],
  ["Black Coffee", "You Need Me", "Subconsciously"],
  ["Drake", "NOKIA", "$ome $exy $ongs 4 U"],
  ["Drake", "What Did I Miss?", "What Did I Miss? — Single"],
  ["Drake", "Passionfruit", "More Life"],
  ["Drake", "One Dance", "Views"],
  ["Drake", "Jimmy Cooks", "Honestly, Nevermind"],
  ["Drake", "Fair Trade", "Certified Lover Boy"],
  ["Drake", "Rich Flex", "Her Loss"],
  ["Drake", "IDGAF", "For All The Dogs"],
  ["Drake", "First Person Shooter", "For All The Dogs"],
  ["Drake", "Search & Rescue", "Search & Rescue — Single"],
  ["Travis Scott", "FE!N", "UTOPIA"],
  ["Travis Scott", "I KNOW ?", "UTOPIA"],
  ["Travis Scott", "MY EYES", "UTOPIA"],
  ["Travis Scott", "MELTDOWN", "UTOPIA"],
  ["Travis Scott", "TELEKINESIS", "UTOPIA"],
  ["Travis Scott", "TOPIA TWINS", "UTOPIA"],
  ["Travis Scott", "4X4", "4X4 — Single"],
  ["Travis Scott", "HIGHEST IN THE ROOM", "HIGHEST IN THE ROOM — Single"],
  ["Travis Scott", "SICKO MODE", "ASTROWORLD"],
  ["Travis Scott", "goosebumps", "Birds in the Trap Sing McKnight"],
  ["Future", "Like That", "WE DON'T TRUST YOU"],
  ["Future", "Type Shit", "WE DON'T TRUST YOU"],
  ["Future", "Cinderella", "WE DON'T TRUST YOU"],
  ["Future", "We Still Don't Trust You", "WE STILL DON'T TRUST YOU"],
  ["Future", "Too Fast", "MIXTAPE PLUTO"],
  ["Future", "LIL DEMON", "MIXTAPE PLUTO"],
  ["Future", "WAIT FOR U", "I NEVER LIKED YOU"],
  ["Future", "PUFFIN ON ZOOTIEZ", "I NEVER LIKED YOU"],
  ["Future", "Mask Off", "FUTURE"],
  ["Future", "March Madness", "56 Nights"],
  ["Popcaan", "TWIST & TURN", "FIXTAPE"],
  ["Popcaan", "We Caa Done", "Great Is He"],
  ["Popcaan", "My Type", "Vanquish"],
  ["Popcaan", "Silence", "Forever"],
  ["Popcaan", "Family", "Forever"],
  ["Popcaan", "Only Man She Want", "Where We Come From"],
  ["Popcaan", "Everything Nice", "Where We Come From"],
  ["Popcaan", "Love Yuh Bad", "Where We Come From"],
  ["Popcaan", "Party Shot (Ravin Pt. 2)", "Where We Come From"],
  ["Popcaan", "ALL I NEED", "FIXTAPE"],
  ["Chris Lake", "In The Yuma", "In The Yuma — Single"],
  ["Chris Lake", "Somebody", "Somebody — Single"],
  ["Chris Lake", "Ease My Mind", "Chemistry"],
  ["Chris Lake", "Summertime Blues", "Summertime Blues — Single"],
  ["Chris Lake", "Beggin'", "Beggin' — Single"],
  ["Chris Lake", "More Baby", "More Baby — Single"],
  ["Chris Lake", "Turn off the Lights", "Turn off the Lights — Single"],
  ["Chris Lake", "Toxic", "Toxic — Single"],
  ["Chris Lake", "Savana", "Chemistry"],
  ["Chris Lake", "On & On", "Chemistry"],
  ["ANOTR", "Relax My Eyes", "Relax My Eyes — Single"],
  ["ANOTR", "Talk To You", "Talk To You — Single"],
  ["ANOTR", "How You Feel", "On A Trip"],
  ["ANOTR", "Vertigo", "Vertigo — Single"],
  ["ANOTR", "Currency (Count On Me)", "On A Trip"],
  ["ANOTR", "24 (Turn It Up)", "24 (Turn It Up) — Single"],
  ["ANOTR", "Care For You", "On A Trip"],
  ["ANOTR", "SET IT ON FIRE", "On A Trip"],
  ["ANOTR", "Hold On, Let Go", "On A Trip"],
  ["ANOTR", "Like It", "Like It — Single"],
  // Drake trilogy (18 + 14 + 11 = 43)
  ["Drake", "Make Them Cry", "Iceman"],
  ["Drake", "Dust", "Iceman"],
  ["Drake", "Whisper My Name", "Iceman"],
  ["Drake", "Janice STFU", "Iceman"],
  ["Drake", "Ran To Atlanta ft. Future, Molly Santana", "Iceman"],
  ["Drake", "Shabang", "Iceman"],
  ["Drake", "Make Them Pay", "Iceman"],
  ["Drake", "Burning Bridges", "Iceman"],
  ["Drake", "National Treasures", "Iceman"],
  ["Drake", "B's On The Table ft. 21 Savage", "Iceman"],
  ["Drake", "What Did I Miss?", "Iceman"],
  ["Drake", "Plot Twist", "Iceman"],
  ["Drake", "2 Hard 4 The Radio", "Iceman"],
  ["Drake", "Make Them Remember", "Iceman"],
  ["Drake", "Little Birdie", "Iceman"],
  ["Drake", "Don't Worry", "Iceman"],
  ["Drake", "Firm Friends", "Iceman"],
  ["Drake", "Make Them Know", "Iceman"],
  ["Drake", "Hoe Phase", "Maid of Honour"],
  ["Drake", "Road Trips", "Maid of Honour"],
  ["Drake", "Outside Tweaking ft. Stunna Sandy", "Maid of Honour"],
  ["Drake", "Cheetah Print ft. Sexyy Red", "Maid of Honour"],
  ["Drake", "Which One ft. Central Cee", "Maid of Honour"],
  ["Drake", "Amazing Shape ft. Popcaan", "Maid of Honour"],
  ["Drake", "BBW", "Maid of Honour"],
  ["Drake", "True Bestie ft. Iconic Savvy", "Maid of Honour"],
  ["Drake", "Where's Your Stuff Interlude", "Maid of Honour"],
  ["Drake", "New Bestie", "Maid of Honour"],
  ["Drake", "Q&A", "Maid of Honour"],
  ["Drake", "Stuck", "Maid of Honour"],
  ["Drake", "Goose and The Juice", "Maid of Honour"],
  ["Drake", "Princess", "Maid of Honour"],
  ["Drake", "Rusty Intro", "Habibti"],
  ["Drake", "WNBA", "Habibti"],
  ["Drake", "Slap The City ft. Qendresa", "Habibti"],
  ["Drake", "High Fives", "Habibti"],
  ["Drake", "Hurrr Nor Thurrr ft. Sexyy Red", "Habibti"],
  ["Drake", "I'm Spent ft. Loe Shimmy", "Habibti"],
  ["Drake", "Classic", "Habibti"],
  ["Drake", "Gen 5", "Habibti"],
  ["Drake", "White Bone", "Habibti"],
  ["Drake", "Fortworth ft. PARTYNEXTDOOR", "Habibti"],
  ["Drake", "Prioritizing", "Habibti"],
];

export const JORDAN_CATALOG: JordanSong[] = RAW_CATALOG.map(([artist, title, album]) => ({
  artist,
  title,
  album,
  bucket: bucketFor(artist),
  cover: resolveCover(artist, title, album),
}));

function buildHintSongs(): JordanSong[] {
  const picks: [string, string, string?][] = [
    ["Keinemusik", "Move", undefined],
    ["Keinemusik", "Say What", undefined],
    ["Drake", "What Did I Miss?", "Iceman"],
    ["Black Coffee", "Drive", undefined],
    ["Prospa", "Free Your Mind", undefined],
    ["Travis Scott", "FE!N", undefined],
  ];
  const out: JordanSong[] = [];
  for (const [artist, title, album] of picks) {
    const hit = JORDAN_CATALOG.find(
      (s) => s.artist === artist && s.title === title && (album ? s.album === album : true)
    );
    if (hit) out.push(hit);
  }
  return out.length ? out : JORDAN_CATALOG.slice(0, 6);
}

const HINT_SONGS = buildHintSongs();

function scoreMatch(song: JordanSong, tokens: string[]): number {
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

function scoreSubstring(song: JordanSong, query: string): number {
  const hay = `${song.title} ${song.artist} ${song.album}`.toLowerCase();
  if (!hay.includes(query)) return -1;
  if (song.title.toLowerCase().includes(query)) return 8;
  if (song.artist.toLowerCase().includes(query)) return 6;
  return 3;
}

/** Dynamic synced-library search (replaces hardcoded SYNCED + .includes().slice(0,4)) */
export function searchJordanCatalog(query: string, limit = 8): JordanSong[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return HINT_SONGS.slice(0, limit);

  const tokens = trimmed.split(/\s+/).filter(Boolean);

  let ranked = JORDAN_CATALOG.map((song) => ({ song, score: scoreMatch(song, tokens) }))
    .filter((x) => x.score >= 0)
    .sort((a, b) => b.score - a.score);

  // Fallback: match full query string (helps "fe!n", partial artist names)
  if (!ranked.length) {
    ranked = JORDAN_CATALOG.map((song) => ({ song, score: scoreSubstring(song, trimmed) }))
      .filter((x) => x.score >= 0)
      .sort((a, b) => b.score - a.score);
  }

  return ranked.slice(0, limit).map((x) => x.song);
}

export const JORDAN_CATALOG_COUNT = JORDAN_CATALOG.length;

// Legacy alias
export type Song = JordanSong;
