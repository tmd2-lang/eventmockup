export type RevealNight = {
  nightLabel: string;
  nightOrdinal: string;
  question: string;
  topSong: string;
  topArtist: string;
  topArt: string;
  consensusPct: number;
  totalVotes: number;
  wordCloud: { word: string; size: 'xl' | 'lg' | 'md' | 'sm' }[];
  tomorrowTeaser: string;
};

/** v2: single pinned reveal night (formerly N1). Full N1–N10 set lives in archive/v1. */
export const ACTIVE_REVEAL_NIGHT: RevealNight = {
  nightLabel: 'Night one · the reveal',
  nightOrdinal: 'one',
  question: 'What song would play first at a Hoya house party right now?',
  topSong: 'Not Like Us',
  topArtist: 'Kendrick Lamar',
  topArt: '/artists/kendrick.png',
  consensusPct: 38,
  totalVotes: 1204,
  wordCloud: [
    { word: 'Not Like Us', size: 'xl' },
    { word: 'Espresso', size: 'lg' },
    { word: 'HUMBLE.', size: 'lg' },
    { word: 'luther', size: 'md' },
    { word: 'Blinding Lights', size: 'md' },
    { word: 'Starboy', size: 'sm' },
    { word: 'Good 4 U', size: 'sm' },
  ],
  tomorrowTeaser: 'Tomorrow: The most iconic chorus of the last 5 years?',
};
