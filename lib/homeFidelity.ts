import type { HomeNewsRow, HomeShowRow } from "@/lib/supabase/types";
import fidelity from "@/lib/data/home-fidelity.json";

type RawNews = {
  art: string;
  src: string;
  when: string;
  head: string;
};

type RawShow = {
  name: string;
  venue: string;
  when: string;
  tag: string;
  tagCls: "green" | "orange";
  art: string;
};

const newsByProfile = fidelity.news as Record<string, RawNews[]>;
const showsByProfile = fidelity.shows as Record<string, RawShow[]>;

export function getFidelityNews(profileId: string): HomeNewsRow[] {
  const items = newsByProfile[profileId] ?? [];
  return items.map((item, index) => ({
    id: `${profileId}-news-${index}`,
    profile_id: profileId,
    sort_order: index,
    art_url: item.art,
    source_label: item.src,
    time_label: item.when,
    headline: item.head,
  }));
}

export function getFidelityShows(profileId: string): HomeShowRow[] {
  const items = showsByProfile[profileId] ?? [];
  return items.map((item, index) => ({
    id: `${profileId}-show-${index}`,
    profile_id: profileId,
    sort_order: index,
    name: item.name,
    venue: item.venue,
    when_label: item.when,
    tag: item.tag,
    tag_style: item.tagCls,
    art_url: item.art,
  }));
}
