import { searchCatalog, CatalogTrack } from './catalog';

export type LigoSong = {
  artist: string;
  title: string;
  album: string;
  cover: string;
};

export function searchLigoCatalog(query: string, limit = 8): LigoSong[] {
  const results = searchCatalog(query, limit);
  return results.map((t: CatalogTrack) => ({
    artist: t.artist,
    title: t.title,
    album: t.album,
    cover: t.coverArt,
  }));
}
