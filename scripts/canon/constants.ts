/** Display name → slug. Single source for import + app. */
export const PROFILE_SLUGS: Record<string, string> = {
  "Jordan D.": "jordan",
  "Alessia C.": "alessia",
  "Charlotte W.": "charlotte",
  "Cole B.": "cole",
  "Sofia L.": "sofia",
  "Bennett R.": "bennett",
  "Caroline M.": "caroline",
  "Maddie R.": "maddie",
  "Marcus T.": "marcus",
};

export function slugFromDisplayName(name: string): string {
  const slug = PROFILE_SLUGS[name.trim()];
  if (!slug) throw new Error(`Unknown profile display name: ${name}`);
  return slug;
}

/** Identity from lib/users.tsx + Profiles sheet order for sort_order. */
export const PROFILE_IDENTITY: Array<{
  id: string;
  display_name: string;
  first_name: string;
  year_level: string;
  pronouns: string;
  school: string;
  archetype_name: string;
  archetype_id: string;
  avatar_url: string;
  gradient: string;
  hot_take: string;
  sort_order: number;
}> = [
  {
    id: "jordan",
    display_name: "Jordan D.",
    first_name: "Jordan",
    year_level: "Senior",
    pronouns: "He/him",
    school: "Georgetown",
    archetype_name: "The Hypnotist",
    archetype_id: "hypnotist",
    avatar_url: "/assets/Jordan-profile.png",
    gradient: "linear-gradient(145deg, #F97316, #EA8CE1)",
    hot_take: "House music is just jazz for people who can't sleep.",
    sort_order: 1,
  },
  {
    id: "alessia",
    display_name: "Alessia C.",
    first_name: "Alessia",
    year_level: "Junior",
    pronouns: "She/Her",
    school: "Georgetown",
    archetype_name: "The Afterglow",
    archetype_id: "afterglow",
    avatar_url: "/assets/alessianewprofile.png",
    gradient: "linear-gradient(145deg, #e8c4f0, #8b5cf6)",
    hot_take: "The Weeknd is better when he sounds haunted, not famous.",
    sort_order: 2,
  },
  {
    id: "charlotte",
    display_name: "Charlotte W.",
    first_name: "Charlotte",
    year_level: "Sophomore",
    pronouns: "She/her",
    school: "Georgetown",
    archetype_name: "The Pop Oracle",
    archetype_id: "main-character",
    avatar_url: "/assets/Charlotte-Profile.png",
    gradient: "linear-gradient(145deg, #FF6B9D, #C2410C)",
    hot_take: "Mainstream music is only basic when you have no emotional range.",
    sort_order: 3,
  },
  {
    id: "cole",
    display_name: "Cole B.",
    first_name: "Cole",
    year_level: "Junior",
    pronouns: "He/him",
    school: "Georgetown",
    archetype_name: "The Social Aux",
    archetype_id: "social-aux",
    avatar_url: "/assets/Cole-profile.png",
    gradient: "linear-gradient(145deg, #3B82F6, #14B8A6)",
    hot_take: "The best aux is knowing when to stop proving your taste.",
    sort_order: 4,
  },
  {
    id: "sofia",
    display_name: "Sofia L.",
    first_name: "Sofia",
    year_level: "Sophomore",
    pronouns: "She/Her",
    school: "Georgetown",
    archetype_name: "The Mood Curator",
    archetype_id: "mood-curator",
    avatar_url: "/assets/sofia-profile.png",
    gradient: "linear-gradient(145deg, #14B8A6, #3B82F6)",
    hot_take: "I do not trust people who do not have a playlist for crying on public transit.",
    sort_order: 5,
  },
  {
    id: "bennett",
    display_name: "Bennett R.",
    first_name: "Bennett",
    year_level: "Junior",
    pronouns: "He/him",
    school: "Georgetown",
    archetype_name: "The Pregame Menace",
    archetype_id: "pregame-menace",
    avatar_url: "/assets/bennet-profile.png",
    gradient: "linear-gradient(145deg, #14110D, #ef4444)",
    hot_take: "Pregames only die when someone gets scared of playing Carti.",
    sort_order: 6,
  },
  {
    id: "caroline",
    display_name: "Caroline M.",
    first_name: "Caroline",
    year_level: "Sophomore",
    pronouns: "She/her",
    school: "Georgetown",
    archetype_name: "The Southern Romantic",
    archetype_id: "southern-romantic",
    avatar_url: "/assets/caroline-profile.png",
    gradient: "linear-gradient(145deg, #F5D783, #D97706)",
    hot_take: "Country music is only corny if you've never screamed it with your friends at midnight.",
    sort_order: 7,
  },
  {
    id: "maddie",
    display_name: "Maddie R.",
    first_name: "Maddie",
    year_level: "Junior",
    pronouns: "She/Her",
    school: "Georgetown",
    archetype_name: "The Alt Socialite",
    archetype_id: "algorithm-dodger",
    avatar_url: "/assets/Maddie-profile.png",
    gradient: "linear-gradient(145deg, #14B8A6, #A78BFA)",
    hot_take: "The best playlists have at least one song that makes no sense until the third drink.",
    sort_order: 8,
  },
  {
    id: "marcus",
    display_name: "Marcus T.",
    first_name: "Marcus",
    year_level: "Senior",
    pronouns: "He/Him",
    school: "Georgetown",
    archetype_name: "The Deep Cut Generalist",
    archetype_id: "deep-cut",
    avatar_url: "/assets/Marcus-profile.png",
    gradient: "linear-gradient(145deg, #10B981, #3B82F6)",
    hot_take: "The best aux is one your dad would respect and your friends would still dance to.",
    sort_order: 9,
  },
];

export const ANSWER_PROFILE_COLUMNS: Record<string, string> = {
  "Jordan D.": "jordan",
  "Alessia C.": "alessia",
  "Charlotte W.": "charlotte",
  "Cole B.": "cole",
  "Sofia L.": "sofia",
  "Bennett R.": "bennett",
  "Caroline M.": "caroline",
  "Maddie R.": "maddie",
  "Marcus T.": "marcus",
};

export function answerTypeToKind(answerType: string): "song" | "artist" | "genre" {
  const map: Record<string, "song" | "artist" | "genre"> = {
    Song: "song",
    Artist: "artist",
    Genre: "genre",
  };
  const kind = map[answerType.trim()];
  if (!kind) throw new Error(`Unknown answer_type: ${answerType}`);
  return kind;
}

/** Excel serial date → ISO date string (UTC). */
export function excelSerialToIsoDate(serial: number): string {
  const utcMs = Math.round((serial - 25569) * 86400 * 1000);
  return new Date(utcMs).toISOString().slice(0, 10);
}

/** Parse "Title — Artist" for display; does not affect answer_kind. */
export function parseAnswerText(text: string): { title: string | null; artist: string | null } {
  const trimmed = text.trim();
  const sep = " — ";
  if (trimmed.includes(sep)) {
    const [title, artist] = trimmed.split(sep);
    return { title: title.trim() || null, artist: artist.trim() || null };
  }
  return { title: null, artist: null };
}

export function normalizePairIds(a: string, b: string): [string, string] {
  return a < b ? [a, b] : [b, a];
}

export const EXPECTED_COUNTS = {
  profiles: 9,
  daily_questions: 28,
  daily_answers: 252,
  connection_pairs: 16,
  connection_roster: 29,
} as const;
