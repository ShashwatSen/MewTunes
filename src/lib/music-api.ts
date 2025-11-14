import type { Song } from './types';
import { unifiedSearch } from './fetchers';

export type MusicSource = 'spotify' | 'youtube-music' | 'soundcloud' | 'audius' | 'musopen';

export interface MusicSourceResult extends Song {
  source: MusicSource;
  sourceUrl: string;
}

export async function fetchTrendingSongs() {
  const res = await fetch("/api/trending");
  if (!res.ok) throw new Error("Failed to fetch trending songs");
  const { data } = await res.json();
  return data;
}
export async function fetchAllMusic(): Promise<Song[]> {
  const res = await fetch("/api/music");
  if (!res.ok) throw new Error("Failed to fetch all music");
  const { data } = await res.json();
  return data;
}
/** 🔹 Fetch everything together */
export async function getAllMusic(): Promise<Song[]> {
  // Use the unified search to get a broad selection of music for the main list.
  const tracks = await unifiedSearch('popular music');
  // Filter out tracks that don't have a direct audio source for the <audio> tag.
  return tracks.filter((t) => t.audioSrc && !t.audioSrc.includes('youtube.com'));
}

/** 🔹 Filtered source search (optional) */
export async function getMusicFromSource(
  source: MusicSource,
  query: { title?: string; artist?: string; album?: string }
): Promise<MusicSourceResult[]> {
  const all = (await getAllMusic()) as MusicSourceResult[];
  const results = all.filter((s) => s.source === source);
  return results.filter((song) => {
    return (
      (!query.title || song.title.toLowerCase().includes(query.title.toLowerCase())) &&
      (!query.artist || song.artist.toLowerCase().includes(query.artist.toLowerCase()))
    );
  });
}
