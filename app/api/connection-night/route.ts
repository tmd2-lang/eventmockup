import { NextResponse } from "next/server";
import { buildDailyRevealBundle } from "@/lib/dailyReveal";
import { getCanonBundle, getDailyAnswersForProfiles } from "@/lib/supabase/queries/canon";
import { getDailyQuestions } from "@/lib/supabase/queries/daily";
import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function GET(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      {
        error: "Supabase not configured",
        hint: "Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local, then restart the dev server",
      },
      { status: 503 }
    );
  }

  const { searchParams } = new URL(request.url);
  const profileId = searchParams.get("profile")?.trim().toLowerCase();
  if (!profileId) {
    return NextResponse.json({ error: "Missing query param: profile" }, { status: 400 });
  }

  try {
    const supabase = createServerSupabaseClient();
    const [bundle, questions] = await Promise.all([
      getCanonBundle(supabase, profileId),
      getDailyQuestions(supabase),
    ]);
    if (!bundle) {
      return NextResponse.json({ error: `Profile not found: ${profileId}` }, { status: 404 });
    }

    const reveal = buildDailyRevealBundle(questions, bundle.dailyAnswers);
    const matchIds = bundle.connectionRoster.map((row) => row.match_id);
    const matchAnswersById = await getDailyAnswersForProfiles(supabase, matchIds);

    return NextResponse.json({
      profileId,
      currentDayNumber: reveal.currentDayNumber,
      currentAnswer: reveal.currentAnswer,
      connectionRoster: bundle.connectionRoster,
      dailyAnswers: bundle.dailyAnswers,
      matchAnswersById,
      dailyQuestions: questions,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
