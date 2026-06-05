"use client";

import { useEffect, useState } from "react";
import type { HomeNewsRow, HomeShowRow } from "@/lib/supabase/types";
import { getFidelityNews, getFidelityShows } from "@/lib/homeFidelity";
import { parseWrappedContent } from "@/lib/wrappedUtils";

type HomeContentState = {
  loading: boolean;
  error: string | null;
  news: HomeNewsRow[];
  shows: HomeShowRow[];
  wrapped: Record<string, unknown> | null;
};

const EMPTY: HomeContentState = {
  loading: true,
  error: null,
  news: [],
  shows: [],
  wrapped: null,
};

export function useHomeContent(profileId: string): HomeContentState {
  const [state, setState] = useState<HomeContentState>(EMPTY);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setState({ loading: true, error: null, news: [], shows: [], wrapped: null });

      try {
        const res = await fetch(`/api/home?profile=${encodeURIComponent(profileId)}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || data.hint || `Request failed (${res.status})`);
        }

        if (cancelled) return;

        const apiNews: HomeNewsRow[] = data.news ?? [];
        const apiShows: HomeShowRow[] = data.shows ?? [];
        const useFidelity = data.meta?.empty === true || (!apiNews.length && !apiShows.length);

        setState({
          loading: false,
          error: null,
          news: apiNews.length ? apiNews : useFidelity ? getFidelityNews(profileId) : [],
          shows: apiShows.length ? apiShows : useFidelity ? getFidelityShows(profileId) : [],
          wrapped: parseWrappedContent(data.wrapped),
        });
      } catch (err) {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : "Failed to load home content";
        setState({
          loading: false,
          error: message,
          news: getFidelityNews(profileId),
          shows: getFidelityShows(profileId),
          wrapped: null,
        });
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [profileId]);

  return state;
}
