export type ArtistBucket =
  | "Beach House"
  | "Bon Iver"
  | "Cigarettes After Sex"
  | "Clairo"
  | "Daniel Caesar"
  | "Faye Webster"
  | "Frank Ocean"
  | "Gracie Abrams"
  | "H.E.R."
  | "Hozier"
  | "Kali Uchis"
  | "Lana Del Rey"
  | "Laufey"
  | "Lil Yachty"
  | "Men I Trust"
  | "Noah Kahan"
  | "Omar Apollo"
  | "Phoebe Bridgers"
  | "PinkPantheress"
  | "SZA"
  | "Steve Lacy"
  | "The Lumineers"
  | "The xx"
  | "beabadoobee"
;

export interface SofiaSong {
  artist: string;
  title: string;
  album: string;
  cover: string;
  bucket: ArtistBucket;
}

export function norm(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

const ARTIST_PROFILE: Record<string, string> = {
  "phoebebridgers": "/covers/phoebebridgers-punisher-coverart.jpeg",
  "boniver": "/covers/boniver-foremma-coverart.jpeg",
  "lanadelrey": "/covers/lanadelreyultraviolence-coverart.jpeg",
  "beabadoobee": "/covers/beabadoobee-gluesong-coverart.jpeg",
  "hozier": "/covers/hozierunheard-coverart.jpeg",
  "kaliuchis": "/covers/kaliuchis-sinmiedo-coverart.jpeg",
  "menitrust": "/covers/menitrust-headroom-coverart.jpeg",
  "pinkpantheress": "/covers/pinkpantheress-turnitup-coverart.jpeg",
  "danielcaesar": "/covers/danielcaesar-neverenough-coverart.jpeg",
  "stevelacy": "/covers/stevelacydarkred-coverart.jpeg",
  "omarapollo": "/covers/omarapollo-ivory-coverart.jpeg",
  "beachhouse": "/covers/beachhousebloom-coverart.jpeg",
  "clairo": "/covers/clairoimmunity-coverart.jpeg",
  "thelumineers": "/assets/artists/lumineers-profile.jpeg",
  "cigarettesaftersex": "/assets/artists/cigsaftersex-profile.jpeg",
  "frankocean": "/covers/frankoceanchannel-coverart.jpeg",
  "noahkahan": "/covers/noahkahanstickseason-coverart.jpeg",
  "laufey": "/covers/laufey-bewitched-coverart.jpeg",
  "her": "/covers/blackcoffeewishyouwerehere-coverart.jpeg",
  "thexx": "/artists/thexx-profile.jpeg",
  "sza": "/covers/zachbryanburn-coverart.jpeg",
  "lilyachty": "/assets/artists/FayeWebsterSpotify.jpeg",
  "fayewebster": "/covers/fayewebsterunderdressed-coverart.jpeg",
  "gracieabrams": "/covers/gracieabrams-secretofus-coverart.jpeg",
};

const ALBUM_COVER: Record<string, string> = {
  "atlantamillionairesclub": "/covers/fayewebster-atlantamillionairesclub-coverart.jpeg",
  "atlantamillionairesclub": "/covers/fayewebster-atlantamillionairesclub-coverart.jpeg",
  "fayewebster": "/covers/fayewebsterfayewebsteralbum-coverart.jpeg",
  "immunity": "/covers/clairoimmunity-coverart.jpeg",
  "immunity": "/covers/clairoimmunity-coverart.jpeg",
  "immunity": "/covers/clairoimmunity-coverart.jpeg",
  "diary001": "/covers/clairodiary001-coverart.jpeg",
  "sling": "/covers/clairosling-coverart.jpeg",
  "charm": "/covers/clairocharm-coverart.jpeg",
  "charm": "/covers/clairocharm-coverart.jpeg",
  "charm": "/covers/clairocharm-coverart.jpeg",
  "punisher": "/covers/phoebebridgers-punisher-coverart.jpeg",
  "punisher": "/covers/phoebebridgers-punisher-coverart.jpeg",
  "punisher": "/covers/phoebebridgers-punisher-coverart.jpeg",
  "punisher": "/covers/phoebebridgers-punisher-coverart.jpeg",
  "punisher": "/covers/phoebebridgers-punisher-coverart.jpeg",
  "sos": "/covers/szasos-coverart.jpeg",
  "sos": "/covers/szasos-coverart.jpeg",
  "lana": "/covers/szalana-coverart.jpeg",
  "sos": "/covers/szasos-coverart.jpeg",
  "blonde": "/covers/frankocean-blonde.jpeg",
  "blonde": "/covers/frankocean-blonde.jpeg",
  "blonde": "/covers/frankocean-blonde.jpeg",
  "blonde": "/covers/frankocean-blonde.jpeg",
  "chanelsingle": "/covers/frankchanelsingle-coverart.jpeg",
  "geminirights": "/covers/stevelacy-geminirights-coverart.jpeg",
  "geminirights": "/covers/stevelacy-geminirights-coverart.jpeg",
  "geminirights": "/covers/stevelacy-geminirights-coverart.jpeg",
  "freudian": "/covers/danielceaser-freudian-coverart.jpeg",
  "freudian": "/covers/danielceaser-freudian-coverart.jpeg",
  "neverenough": "/covers/danielcaesar-neverenough-coverart.jpeg",
  "ivory": "/covers/omarapollo-ivory-coverart.jpeg",
  "liveforme": "/covers/omarapollo-liveforme-coverart.jpeg",
  "redmooninvenus": "/covers/kali-redmooninvenus-coverart.jpeg",
  "ultraviolence": "/covers/lanadelreyultraviolence-coverart.jpeg",
  "borntodie": "/covers/lanaborntodie-coverart.jpeg",
  "depressioncherry": "/covers/beachhousedepressioncherry-coverart.jpeg",
  "bloom": "/covers/beachhousebloom-coverart.jpeg",
  "depressioncherry": "/covers/beachhousedepressioncherry-coverart.jpeg",
  "teendream": "/covers/beachhouseteendream-coverart.jpeg",
  "cigarettesaftersex": "/covers/cigsaftersexselftitled-coverart.jpeg",
  "cigarettesaftersex": "/covers/cigsaftersexselftitled-coverart.jpeg",
  "cigarettesaftersex": "/covers/cigsaftersexselftitled-coverart.jpeg",
  "xx": "/covers/xxcoexist-coverart.jpeg",
  "coexist": "/covers/xxcoexist-coverart.jpeg",
  "onclejazz": "/covers/manitrust-onclejazz-coverart.jpeg",
  "onclejazz": "/covers/manitrust-onclejazz-coverart.jpeg",
  "stickseason": "/covers/noahkahanstickseason-coverart.jpeg",
  "hozier": "/covers/hozierunheard-coverart.jpeg",
  "cleopatra": "/covers/lumineerscleo-coverart.jpeg",
  "bewitched": "/covers/laufey-bewitched-coverart.jpeg",
  "tohellwithit": "/covers/pinkpantheress-tohellwithit-coverart.jpeg",
};

function bucketFor(artist: string): ArtistBucket {
  return artist.split(',')[0].trim() as ArtistBucket;
}

function resolveCover(artist: string, title: string, album: string): string {
  const albumKey = norm(album);
  if (ALBUM_COVER[albumKey]) return ALBUM_COVER[albumKey];

  const primaryArtist = artist.split(',')[0].trim();
  const artistKey = norm(primaryArtist);
  return ARTIST_PROFILE[artistKey] ?? ARTIST_PROFILE['fayewebster'] ?? "";
}

type RawRow = [string, string, string];

const RAW_CATALOG: RawRow[] = [
  ["Faye Webster", "Right Side of My Neck", "Atlanta Millionaires Club"],
  ["Faye Webster", "Kingston", "Atlanta Millionaires Club"],
  ["Faye Webster", "I Know You", "Faye Webster"],
  ["Faye Webster", "In A Good Way", "I Know I’m Funny haha"],
  ["Faye Webster", "A Dream With a Baseball Player", "I Know I’m Funny haha"],
  ["Faye Webster", "Better Distractions", "I Know I’m Funny haha"],
  ["Faye Webster", "But Not Kiss", "Underdressed at the Symphony"],
  ["Faye Webster, Lil Yachty", "Lego Ring", "Underdressed at the Symphony"],
  ["Clairo", "Bags", "Immunity"],
  ["Clairo", "Sofia", "Immunity"],
  ["Clairo", "Alewife", "Immunity"],
  ["Clairo", "Pretty Girl", "Pretty Girl — Single"],
  ["Clairo", "Flaming Hot Cheetos", "diary 001"],
  ["Clairo", "Amoeba", "Sling"],
  ["Clairo", "Sexy to Someone", "Charm"],
  ["Clairo", "Juna", "Charm"],
  ["Clairo", "Add Up My Love", "Charm"],
  ["Phoebe Bridgers", "Kyoto", "Punisher"],
  ["Phoebe Bridgers", "Scott Street", "Stranger in the Alps"],
  ["Phoebe Bridgers", "Motion Sickness", "Stranger in the Alps"],
  ["Phoebe Bridgers", "Garden Song", "Punisher"],
  ["Phoebe Bridgers", "Moon Song", "Punisher"],
  ["Phoebe Bridgers", "Chinese Satellite", "Punisher"],
  ["Phoebe Bridgers", "I Know The End", "Punisher"],
  ["SZA", "Snooze", "SOS"],
  ["SZA", "Good Days", "SOS"],
  ["SZA", "Saturn", "Lana"],
  ["SZA", "Kill Bill", "SOS"],
  ["SZA", "Broken Clocks", "Ctrl"],
  ["SZA", "Normal Girl", "Ctrl"],
  ["SZA", "Drew Barrymore", "Ctrl"],
  ["SZA", "Garden (Say It Like Dat)", "Ctrl"],
  ["Frank Ocean", "Pink + White", "Blonde"],
  ["Frank Ocean", "Nights", "Blonde"],
  ["Frank Ocean", "Thinkin Bout You", "channel ORANGE"],
  ["Frank Ocean", "Ivy", "Blonde"],
  ["Frank Ocean", "Self Control", "Blonde"],
  ["Frank Ocean", "Chanel", "Chanel — Single"],
  ["Steve Lacy", "Bad Habit", "Gemini Rights"],
  ["Steve Lacy", "Dark Red", "Dark Red — Single"],
  ["Steve Lacy", "Helmet", "Gemini Rights"],
  ["Steve Lacy", "Mercury", "Gemini Rights"],
  ["Daniel Caesar, H.E.R.", "Best Part", "Freudian"],
  ["Daniel Caesar, Kali Uchis", "Get You", "Freudian"],
  ["Daniel Caesar", "Japanese Denim", "Japanese Denim — Single"],
  ["Daniel Caesar", "Always", "NEVER ENOUGH"],
  ["Omar Apollo", "Evergreen (You Didn’t Deserve Me At All)", "Ivory"],
  ["Omar Apollo", "3 Boys", "Live For Me"],
  ["Kali Uchis", "telepatía", "Sin Miedo (del Amor y Otros Demonios)"],
  ["Kali Uchis", "Moonlight", "Red Moon In Venus"],
  ["Lana Del Rey", "Brooklyn Baby", "Ultraviolence"],
  ["Lana Del Rey", "Video Games", "Born To Die"],
  ["Lana Del Rey", "Cinnamon Girl", "Norman Fucking Rockwell!"],
  ["Lana Del Rey", "Let The Light In", "Did you know that there’s a tunnel under Ocean Blvd"],
  ["Beach House", "Space Song", "Depression Cherry"],
  ["Beach House", "Myth", "Bloom"],
  ["Beach House", "PPP", "Depression Cherry"],
  ["Beach House", "Silver Soul", "Teen Dream"],
  ["Cigarettes After Sex", "Apocalypse", "Cigarettes After Sex"],
  ["Cigarettes After Sex", "K.", "Cigarettes After Sex"],
  ["Cigarettes After Sex", "Sweet", "Cigarettes After Sex"],
  ["The xx", "Intro", "xx"],
  ["The xx", "Angels", "Coexist"],
  ["Men I Trust", "Show Me How", "Oncle Jazz"],
  ["Men I Trust", "Numb", "Oncle Jazz"],
  ["Noah Kahan", "Stick Season", "Stick Season"],
  ["Noah Kahan", "Dial Drunk", "Stick Season (We’ll All Be Here Forever)"],
  ["Hozier", "Too Sweet", "Unheard — EP"],
  ["Hozier", "Cherry Wine - Live", "Hozier"],
  ["Bon Iver", "Skinny Love", "For Emma, Forever Ago"],
  ["The Lumineers", "Ophelia", "Cleopatra"],
  ["Gracie Abrams", "I Love You, I’m Sorry", "The Secret of Us"],
  ["beabadoobee", "Glue Song", "Glue Song — Single"],
  ["Laufey", "From The Start", "Bewitched"],
  ["PinkPantheress", "Pain", "to hell with it"],
];

export const SOFIA_CATALOG: SofiaSong[] = RAW_CATALOG.map(([artist, title, album]) => ({
  artist,
  title,
  album,
  bucket: bucketFor(artist),
  cover: resolveCover(artist, title, album),
}));

function buildHintSongs(): SofiaSong[] {
  return SOFIA_CATALOG.slice(0, 8);
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
