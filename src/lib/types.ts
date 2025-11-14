export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration?: number;
  albumArtUrl?: string;
  audioSrc?: string;
  source?: string;
}

export type MusicSource = 'audius' | 'soundcloud' | 'musopen' | 'spotify' | 'youtube-music';

export interface MusicSourceResult extends Song {
  source: MusicSource;
  sourceUrl: string;
}


export type Playlist = {
  id: string;
  name: string;
  description: string;
  songIds: string[];
};

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

export type AppContextType = {
  songs: Song[];
  playlists: Playlist[];
  setPlaylists: React.Dispatch<React.SetStateAction<Playlist[]>>;
  trending: Song[];
  currentSong: Song | null;
  isPlaying: boolean;
  playbackQueue: Song[];
  setPlaybackQueue: React.Dispatch<React.SetStateAction<Song[]>>;
  playSong: (song: Song, playlist?: Song[]) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
  addToQueue: (song: Song) => void;
  removeFromQueue: (songId: string) => void;
  createPlaylist: (name: string, description: string) => void;
  addSongToPlaylist: (playlistId: string, songId: string) => void;
  isLoading: boolean;
  user: User | null;
};
