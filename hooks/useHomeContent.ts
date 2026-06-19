"use client";

import { useEffect, useState } from "react";
import type { HomeNewsRow, HomeShowRow } from "@/lib/supabase/types";
import { getFidelityNews, getFidelityShows } from "@/lib/homeFidelity";

type HomeContentState = {
  loading: boolean;
  error: string | null;
  news: HomeNewsRow[];
  shows: HomeShowRow[];
};

const EMPTY: HomeContentState = {
  loading: true,
  error: null,
  news: [],
  shows: [],
};

export function useHomeContent(profileId: string): HomeContentState {
  const [state, setState] = useState<HomeContentState>(EMPTY);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setState({ loading: true, error: null, news: [], shows: [] });

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
        });
      } catch (err) {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : "Failed to load home content";
        setState({
          loading: false,
          error: message,
          news: getFidelityNews(profileId),
          shows: getFidelityShows(profileId),
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
