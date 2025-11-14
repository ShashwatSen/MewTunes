import type { Song, Playlist } from './types';

// The initial songs are now fetched via API.
export const songs: Song[] = [];

export const playlists: Playlist[] = [
  { id: 'p1', name: 'Chill Vibes', description: 'Relax and unwind with these laid-back tracks.', songIds: ['sp1', 'yt1'] },
  { id: 'p2', name: 'Workout Fuel', description: 'High-energy beats to power your workout.', songIds: [] },
  { id: 'p3', name: 'Focus Zone', description: 'Instrumental tracks to help you concentrate.', songIds: [] },
  { id: 'p4', name: 'Late Night Drive', description: 'The perfect soundtrack for a drive after dark.', songIds: [] },
  { id: 'p5', name: 'Old is Gold', description: 'Classic hits that never get old.', songIds: [] },
];
