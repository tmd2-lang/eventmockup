import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";

export function isMissingTableError(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const code = (err as { code?: string }).code;
  return code === "42P01" || code === "PGRST205";
}

export async function profileExists(
  supabase: SupabaseClient<Database>,
  profileId: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", profileId)
    .maybeSingle();
  if (error) {
    if (isMissingTableError(error)) return false;
    throw error;
  }
  return data != null;
}

export const EMPTY_DAILY_RESPONSE = {
  currentDayNumber: null,
  currentQuestion: null,
  currentAnswer: null,
  answerTrail: [] as unknown[],
};

export const EMPTY_CONNECTION_RESPONSE = {
  currentDayNumber: null,
  currentAnswer: null,
  connectionRoster: [] as unknown[],
  dailyAnswers: [] as unknown[],
  matchAnswersById: {} as Record<string, unknown[]>,
  dailyQuestions: [] as unknown[],
};

export const EMPTY_HOME_RESPONSE = {
  news: [] as unknown[],
  shows: [] as unknown[],
  wrapped: null,
};
