import type { ConnectionRosterRow, DailyAnswerRow, DailyQuestionRow } from "@/lib/supabase/types";
import type { UserProfile } from "@/lib/users";
import {
  buildWeekAnswerGrid,
  sharedPickCardForPair,
  type SharedPickCard,
  type WeekGridCell,
} from "@/lib/sharedPickRule";

export type ConnectionNightSong = {
  name: string;
  artist: string;
  art: string;
};

export type ConnectionNightPerson = {
  id: string;
  name: string;
  initials: string;
  grad: string;
  meta: string;
  archetype: string;
  aIconKey: string;
  horoscope: string;
  prompt: string;
  score: number;
  matchType: string;
  sharedLane: string | null;
  sharedPickCard: SharedPickCard | null;
  weekGrid: WeekGridCell[] | null;
};

function initialsFromName(name: string): string {
  return name
    .split(/[\s.]+/)
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2);
}

function metaFromUser(user: UserProfile): string {
  return [user.yearLevel, user.pronouns].filter(Boolean).join(" · ");
}

function promptFromRoster(row: ConnectionRosterRow, sharedPickCard: SharedPickCard | null): string {
  if (sharedPickCard) return sharedPickCard.label;
  if (row.shared_lane) return `${row.match_type} match · ${row.shared_lane}`;
  return `${row.match_type} · score ${row.score}`;
}

/** Best-effort cover path from answer text (assets live in public/). */
export function coverArtForAnswer(answer: DailyAnswerRow | null, fallback = "/artists/frank-blond.png"): string {
  if (!answer) return fallback;
  if (answer.cover_url) return answer.cover_url;
  const artist = answer.artist?.trim();
  if (!artist) return fallback;
  const slug = artist.toLowerCase().replace(/[^a-z0-9]+/g, "");
  return `/artists/${slug}-profile.jpeg`;
}

export function songFromAnswer(answer: DailyAnswerRow | null, fallbackArt: string): ConnectionNightSong | null {
  if (!answer) return null;
  const name = answer.title?.trim() || answer.answer_text.split(" — ")[0]?.trim() || answer.answer_text;
  const artist = answer.artist?.trim() || answer.answer_text.split(" — ")[1]?.trim() || "";
  return {
    name,
    artist,
    art: coverArtForAnswer(answer, fallbackArt),
  };
}

export function mapRosterToPeople(
  roster: ConnectionRosterRow[],
  usersById: Record<string, UserProfile>,
  viewerId: string,
  viewerAnswers: DailyAnswerRow[],
  matchAnswersById: Record<string, DailyAnswerRow[]>,
  questions: DailyQuestionRow[],
  currentDay: number
): ConnectionNightPerson[] {
  return roster.map((row) => {
    const user = usersById[row.match_id];
    const displayName = user?.name ?? row.match_id;
    const sharedPickCard = sharedPickCardForPair(viewerId, row.match_id);
    const weekGrid = sharedPickCard
      ? null
      : buildWeekAnswerGrid(questions, viewerAnswers, matchAnswersById[row.match_id] ?? [], currentDay);

    return {
      id: row.match_id,
      name: displayName,
      initials: initialsFromName(displayName),
      grad: user?.gradient ?? "linear-gradient(140deg, #F97316, #EA8CE1)",
      meta: user ? metaFromUser(user) : "",
      archetype: user?.archetype ?? "Ligo match",
      aIconKey: user?.archetypeIcon ?? "music",
      horoscope: row.why_copy,
      prompt: promptFromRoster(row, sharedPickCard),
      score: row.score,
      matchType: row.match_type,
      sharedLane: row.shared_lane,
      sharedPickCard,
      weekGrid,
    };
  });
}
