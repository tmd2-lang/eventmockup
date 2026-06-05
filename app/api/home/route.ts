import { NextResponse } from "next/server";
import { getHomeContentForProfile } from "@/lib/supabase/queries/home";
import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/server";
import {
  EMPTY_HOME_RESPONSE,
  isMissingTableError,
  profileExists,
} from "@/lib/supabase/emptyBundles";

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

    if (!(await profileExists(supabase, profileId))) {
      return NextResponse.json({ error: `Profile not found: ${profileId}` }, { status: 404 });
    }

    try {
      const bundle = await getHomeContentForProfile(supabase, profileId);
      if (!bundle) {
        return NextResponse.json({
          profileId,
          ...EMPTY_HOME_RESPONSE,
          meta: { newsCount: 0, showsCount: 0, hasWrapped: false, empty: true },
        });
      }

      return NextResponse.json({
        profileId,
        news: bundle.news,
        shows: bundle.shows,
        wrapped: bundle.wrapped,
        meta: {
          newsCount: bundle.news.length,
          showsCount: bundle.shows.length,
          hasWrapped: bundle.wrapped != null,
        },
      });
    } catch (err) {
      if (isMissingTableError(err)) {
        return NextResponse.json({
          profileId,
          ...EMPTY_HOME_RESPONSE,
          meta: { newsCount: 0, showsCount: 0, hasWrapped: false, empty: true },
        });
      }
      throw err;
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
