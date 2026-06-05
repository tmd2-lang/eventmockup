export type ArtistBucket =
  | "A$AP Rocky"
  | "ANOTR, Abel Balder"
  | "Arctic Monkeys"
  | "Calvin Harris"
  | "Calvin Harris, Disciples"
  | "Chris Lake, Aatig"
  | "Dire Straits"
  | "Disclosure"
  | "Disclosure, AlunaGeorge"
  | "Disclosure, Eliza Doolittle"
  | "Disclosure, Lorde"
  | "Disclosure, Sam Smith"
  | "Duke Dumont"
  | "Duke Dumont, Jax Jones"
  | "Eagles"
  | "Empire of the Sun"
  | "Fleetwood Mac"
  | "Fred again.., The Blessed Madonna"
  | "Freddie Gibbs, Madlib"
  | "Freddie Gibbs, Madlib, Pusha T, Killer Mike"
  | "Freddie Gibbs, The Alchemist"
  | "Freddie Gibbs, The Alchemist, Rick Ross"
  | "Freddie Gibbs, The Alchemist, Tyler, The Creator"
  | "Gorillaz"
  | "Isaiah Rashad"
  | "Isaiah Rashad, Zacari, Kendrick Lamar"
  | "Joey Bada$$"
  | "Joey Bada$$, Capital STEEZ"
  | "KAYTRANADA"
  | "KAYTRANADA, Anderson .Paak"
  | "KAYTRANADA, H.E.R."
  | "KAYTRANADA, Kali Uchis"
  | "KAYTRANADA, Rochelle Jordan"
  | "KAYTRANADA, Syd"
  | "MGMT"
  | "MK"
  | "MK, Becky Hill"
  | "MK, Dom Dolla"
  | "MK, Jonas Blue, Becky Hill"
  | "Mac Miller"
  | "Mac Miller, Anderson .Paak"
  | "Nas"
  | "Pink Floyd"
  | "Pusha T"
  | "Queen"
  | "Route 94, Jess Glynne"
  | "Storm Queen, MK"
  | "Tame Impala"
  | "The Rolling Stones"
  | "The Strokes"
  | "Tom Petty"
  | "Tom Petty and the Heartbreakers"
;

export interface MarcusSong {
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
  currents: `${COVERS}/currents-coverart.jpeg`,
  oracularspectacular: `${COVERS}/oracularspectacular-coverart.jpeg`,
  bandana: `${COVERS}/bandana-coverart.jpeg`,
  "17single": `${COVERS}/MK17-coverart.jpeg`,
  rumours: `${COVERS}/rumorsfleetwood-coverart.jpeg`,
  isthisit: `${COVERS}/isthisit-coverart.jpeg`,
  roomonfire: `${COVERS}/roomonfirestrokes-coverart.jpeg`,
  thenewabnormal: `${COVERS}/thenewabnormal-coverart.jpeg`,
  am: `${COVERS}/favworstnightmare-coverart.jpeg`,
  favouriteworstnightmare: `${COVERS}/favworstnightmare-coverart.jpeg`,
  demondays: `${COVERS}/demondays-coverart.jpeg`,
  letitbleed: `${COVERS}/letitbleed-coverart.jpeg`,
  aftermath: `${COVERS}/rollingstones-aftermath-coverart.jpeg`,
  tattooyou: `${COVERS}/rollingstones-tattooyou-coverart.jpeg`,
  fullmoonfever: `${COVERS}/fullmoonfever-coverart.jpeg`,
  hotelcalifornia: `${COVERS}/hotelcali-coverart.jpeg`,
  direstraits: `${COVERS}/direstraits-cverart.jpeg`,
  thegame: `${COVERS}/queenthegame-coverart.jpeg`,
  jazz: `${COVERS}/queenjazz-coverart.jpeg`,
  adayattheraces: `${COVERS}/queendayattheraces-coverart.jpeg`,
  wishyouwerehere: `${COVERS}/pinkfloyd-wishuwerehere-coverart.jpeg`,
  thewall: `${COVERS}/pinkfloyd-thewall-coverart.jpeg`,
  settle: `${COVERS}/disclosuresettle-coverart.jpeg`,
  caracal: `${COVERS}/disclosurecaracal-coverart.jpeg`,
  "18months": `${COVERS}/calvin18months-coverart.jpeg`,
  motion: `${COVERS}/calvinharrismotion-coverart.jpeg`,
  actuallife: `${COVERS}/fredagain-actuallife-coverart.jpeg`,
  alfredo: `${COVERS}/freddiegibbsalfredo-coverart.jpeg`,
  pinata: `${COVERS}/pinata-coverart.jpeg`,
  thesunstirade: `${COVERS}/sunstirade-coverart.jpeg`,
  thehouseisburning: `${COVERS}/houseisburning-coverart.jpeg`,
  kids: `${COVERS}/kidsmacmiller-coverart.jpeg`,
  thedivinefeminine: `${COVERS}/divinefeminie-coverart.jpeg`,
  swimming: `${COVERS}/swimming-coverart.jpeg`,
  illmatic: `${COVERS}/illmatic-coverart.jpeg`,
  daytona: `${COVERS}/daytona-coverart.jpeg`,
};
const ARTIST_PROFILE: Record<string, string> = {
  tameimpala: `${ARTISTS}/tameimpala-profile.jpeg`,
  mgmt: `${ARTISTS}/MGMT-profile.jpeg`,
  fleetwoodmac: `${ARTISTS}/fleetwoodmac-profike.jpeg`,
  mk: `${ARTISTS}/MK-profile.jpeg`,
  freddiegibbs: `${ARTISTS}/freddiegibbs-profile.jpeg`,
  thestrokes: `${ARTISTS}/thestrokes-profile.jpeg`,
  kaytranada: `/artists/katry-profile.jpeg`,
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
  if (artistKey.includes("freddiegibbs")) artistKey = "freddiegibbs";
  if (artistKey.includes("kaytranada")) artistKey = "kaytranada";
  if (artistKey.includes("mk")) artistKey = "mk";
  return ARTIST_PROFILE[artistKey] ?? `${ARTISTS}/${artistKey}.jpeg`;
}

type RawRow = [ArtistBucket, string, string];

const RAW_CATALOG: RawRow[] = [
  ["Tame Impala", "Let It Happen", "Currents"],
  ["Tame Impala", "The Less I Know The Better", "Currents"],
  ["Tame Impala", "Eventually", "Currents"],
  ["Tame Impala", "New Person, Same Old Mistakes", "Currents"],
  ["Tame Impala", "Borderline", "The Slow Rush"],
  ["Tame Impala", "Lost In Yesterday", "The Slow Rush"],
  ["Tame Impala", "Elephant", "Lonerism"],
  ["Tame Impala", "Feels Like We Only Go Backwards", "Lonerism"],
  ["Tame Impala", "Mind Mischief", "Lonerism"],
  ["Tame Impala", "Solitude Is Bliss", "InnerSpeaker"],
  ["MGMT", "Electric Feel", "Oracular Spectacular"],
  ["MGMT", "Kids", "Oracular Spectacular"],
  ["MGMT", "Time to Pretend", "Oracular Spectacular"],
  ["MGMT", "Little Dark Age", "Little Dark Age"],
  ["MGMT", "Congratulations", "Congratulations"],
  ["The Strokes", "Reptilia", "Room on Fire"],
  ["The Strokes", "Someday", "Is This It"],
  ["The Strokes", "Last Nite", "Is This It"],
  ["The Strokes", "The Adults Are Talking", "The New Abnormal"],
  ["The Strokes", "Ode To The Mets", "The New Abnormal"],
  ["Arctic Monkeys", "Do I Wanna Know?", "AM"],
  ["Arctic Monkeys", "505", "Favourite Worst Nightmare"],
  ["Arctic Monkeys", "Fluorescent Adolescent", "Favourite Worst Nightmare"],
  ["Arctic Monkeys", "R U Mine?", "AM"],
  ["Gorillaz", "Feel Good Inc.", "Demon Days"],
  ["Gorillaz", "On Melancholy Hill", "Plastic Beach"],
  ["Empire of the Sun", "Walking On A Dream", "Walking On A Dream"],
  ["Empire of the Sun", "We Are The People", "Walking On A Dream"],
  ["Fleetwood Mac", "Dreams", "Rumours"],
  ["Fleetwood Mac", "The Chain", "Rumours"],
  ["Fleetwood Mac", "Go Your Own Way", "Rumours"],
  ["Fleetwood Mac", "Everywhere", "Tango in the Night"],
  ["Fleetwood Mac", "Rhiannon", "Fleetwood Mac"],
  ["The Rolling Stones", "Gimme Shelter", "Let It Bleed"],
  ["The Rolling Stones", "Sympathy For The Devil", "Beggars Banquet"],
  ["The Rolling Stones", "Paint It Black", "Aftermath"],
  ["The Rolling Stones", "Start Me Up", "Tattoo You"],
  ["Tom Petty and the Heartbreakers", "American Girl", "Tom Petty and the Heartbreakers"],
  ["Tom Petty", "Free Fallin’", "Full Moon Fever"],
  ["Tom Petty and the Heartbreakers", "Mary Jane’s Last Dance", "Greatest Hits"],
  ["Tom Petty", "Runnin’ Down a Dream", "Full Moon Fever"],
  ["Eagles", "Hotel California", "Hotel California"],
  ["Eagles", "Take It Easy", "Eagles"],
  ["Eagles", "Life in the Fast Lane", "Hotel California"],
  ["Dire Straits", "Sultans of Swing", "Dire Straits"],
  ["Dire Straits", "Money for Nothing", "Brothers in Arms"],
  ["Queen", "Another One Bites the Dust", "The Game"],
  ["Queen", "Don’t Stop Me Now", "Jazz"],
  ["Queen", "Somebody to Love", "A Day at the Races"],
  ["Pink Floyd", "Wish You Were Here", "Wish You Were Here"],
  ["Pink Floyd", "Comfortably Numb", "The Wall"],
  ["Pink Floyd", "Another Brick in the Wall, Pt. 2", "The Wall"],
  ["MK", "17", "17 — Single"],
  ["MK", "Burning", "Burning — Single"],
  ["MK, Becky Hill", "Piece of Me", "Piece of Me — Single"],
  ["MK, Jonas Blue, Becky Hill", "Back & Forth", "Back & Forth — Single"],
  ["MK, Dom Dolla", "Rhyme Dust", "Rhyme Dust — Single"],
  ["Storm Queen, MK", "Look Right Through - MK Dub III", "Look Right Through — Single"],
  ["Route 94, Jess Glynne", "My Love", "My Love — Single"],
  ["Disclosure, Sam Smith", "Latch", "Settle"],
  ["Disclosure, AlunaGeorge", "White Noise", "Settle"],
  ["Disclosure, Eliza Doolittle", "You & Me", "Settle"],
  ["Disclosure", "F For You", "Settle"],
  ["Disclosure, Lorde", "Magnets", "Caracal"],
  ["KAYTRANADA, Kali Uchis", "10%", "BUBBA"],
  ["KAYTRANADA, Anderson .Paak", "Glowed Up", "99.9%"],
  ["KAYTRANADA, Syd", "You’re the One", "99.9%"],
  ["KAYTRANADA", "Lite Spots", "99.9%"],
  ["KAYTRANADA, H.E.R.", "Intimidated", "Intimidated — EP"],
  ["KAYTRANADA, Rochelle Jordan", "Lover/Friend", "TIMELESS"],
  ["Duke Dumont", "Ocean Drive", "Blasé Boys Club Part 1"],
  ["Duke Dumont, Jax Jones", "I Got U", "I Got U — Single"],
  ["Calvin Harris", "Feel So Close", "18 Months"],
  ["Calvin Harris", "Summer", "Motion"],
  ["Calvin Harris, Disciples", "How Deep Is Your Love", "How Deep Is Your Love — Single"],
  ["Fred again.., The Blessed Madonna", "Marea (we’ve lost dancing)", "Actual Life"],
  ["Chris Lake, Aatig", "In The Yuma", "In The Yuma — Single"],
  ["ANOTR, Abel Balder", "Relax My Eyes", "Relax My Eyes — Single"],
  ["Freddie Gibbs, The Alchemist", "1985", "Alfredo"],
  ["Freddie Gibbs, The Alchemist, Rick Ross", "Scottie Beam", "Alfredo"],
  ["Freddie Gibbs, The Alchemist, Tyler, The Creator", "Something to Rap About", "Alfredo"],
  ["Freddie Gibbs, Madlib", "Crime Pays", "Bandana"],
  ["Freddie Gibbs, Madlib", "Thuggin’", "Piñata"],
  ["Freddie Gibbs, Madlib, Pusha T, Killer Mike", "Palmolive", "Bandana"],
  ["Joey Bada$$, Capital STEEZ", "Survival Tactics", "1999"],
  ["Joey Bada$$", "Waves", "1999"],
  ["Joey Bada$$", "Love Is Only a Feeling", "Love Is Only a Feeling — Single"],
  ["Joey Bada$$", "DEVASTATED", "ALL-AMERIKKKAN BADA$$"],
  ["Isaiah Rashad", "Free Lunch", "The Sun’s Tirade"],
  ["Isaiah Rashad, Zacari, Kendrick Lamar", "Wat’s Wrong", "The Sun’s Tirade"],
  ["Isaiah Rashad", "4r Da Squaw", "The Sun’s Tirade"],
  ["Isaiah Rashad", "Headshots (4r Da Locals)", "The House Is Burning"],
  ["Mac Miller", "The Spins", "K.I.D.S."],
  ["Mac Miller, Anderson .Paak", "Dang!", "The Divine Feminine"],
  ["Mac Miller", "Self Care", "Swimming"],
  ["Mac Miller", "Blue World", "Circles"],
  ["Nas", "N.Y. State of Mind", "Illmatic"],
  ["Nas", "The World Is Yours", "Illmatic"],
  ["A$AP Rocky", "Sundress", "Sundress — Single"],
  ["Pusha T", "If You Know You Know", "DAYTONA"],
];

export const MARCUS_CATALOG: MarcusSong[] = RAW_CATALOG.map(([artist, title, album]) => ({
  artist,
  title,
  album,
  bucket: bucketFor(artist),
  cover: resolveCover(artist, title, album),
}));

function buildHintSongs(): MarcusSong[] {
  const picks: [string, string, string?][] = [
    ["Tame Impala", "Let It Happen", undefined],
    ["MGMT", "Electric Feel", undefined],
    ["Fleetwood Mac", "Dreams", undefined],
    ["MK", "17", undefined],
    ["Freddie Gibbs, Madlib", "Crime Pays", undefined],
    ["KAYTRANADA, Kali Uchis", "10%", undefined],
  ];
  const out: MarcusSong[] = [];
  for (const [artist, title, album] of picks) {
    const hit = MARCUS_CATALOG.find(
      (s) => s.artist === artist && s.title === title && (album ? s.album === album : true)
    );
    if (hit) out.push(hit);
  }
  return out.length ? out : MARCUS_CATALOG.slice(0, 6);
}

const HINT_SONGS = buildHintSongs();

function scoreMatch(song: MarcusSong, tokens: string[]): number {
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

function scoreSubstring(song: MarcusSong, query: string): number {
  const hay = `${song.title} ${song.artist} ${song.album}`.toLowerCase();
  if (!hay.includes(query)) return -1;
  if (song.title.toLowerCase().includes(query)) return 8;
  if (song.artist.toLowerCase().includes(query)) return 6;
  return 3;
}

export function searchMarcusCatalog(query: string, limit = 8): MarcusSong[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return HINT_SONGS.slice(0, limit);

  const tokens = trimmed.split(/\s+/).filter(Boolean);

  let ranked = MARCUS_CATALOG.map((song) => ({ song, score: scoreMatch(song, tokens) }))
    .filter((x) => x.score >= 0)
    .sort((a, b) => b.score - a.score);

  if (!ranked.length) {
    ranked = MARCUS_CATALOG.map((song) => ({ song, score: scoreSubstring(song, trimmed) }))
      .filter((x) => x.score >= 0)
      .sort((a, b) => b.score - a.score);
  }

  return ranked.slice(0, limit).map((x) => x.song);
}

export const MARCUS_CATALOG_COUNT = MARCUS_CATALOG.length;
