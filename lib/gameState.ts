import { getDayIndex } from './gameQuestions';

export type GameResult = { score: number };
export type FormatId = 'trivia' | 'ranking' | 'soundmoji';

export type DailyResults = {
  dayIndex: number;
  trivia: GameResult | null;
  ranking: GameResult | null;
  soundmoji: GameResult | null;
};

function key(userId: string) {
  return `ligo:games:${userId}`;
}

export function loadDailyResults(userId: string): DailyResults {
  const today = getDayIndex();
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(key(userId)) : null;
    if (raw) {
      const stored = JSON.parse(raw) as DailyResults;
      if (stored.dayIndex === today) return stored;
    }
  } catch { /* ignore */ }
  return { dayIndex: today, trivia: null, ranking: null, soundmoji: null };
}

export function saveGameResult(userId: string, format: FormatId, score: number): DailyResults {
  const current = loadDailyResults(userId);
  const updated: DailyResults = { ...current, [format]: { score } };
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key(userId), JSON.stringify(updated));
    }
  } catch { /* ignore */ }
  return updated;
}
