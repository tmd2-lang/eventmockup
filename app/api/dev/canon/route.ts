import { NextResponse } from "next/server";
import { getCanonBundle } from "@/lib/supabase/queries/canon";
import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function GET(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      {
        error: "Supabase not configured",
        hint: "Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local",
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
    const bundle = await getCanonBundle(supabase, profileId);
    if (!bundle) {
      return NextResponse.json({ error: `Profile not found: ${profileId}` }, { status: 404 });
    }

    return NextResponse.json({
      profile: bundle.profile,
      dailyAnswers: bundle.dailyAnswers,
      connectionRoster: bundle.connectionRoster,
      meta: {
        dailyAnswerCount: bundle.dailyAnswers.length,
        rosterCount: bundle.connectionRoster.length,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
