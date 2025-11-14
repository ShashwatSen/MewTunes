"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { Song, Playlist, User, AppContextType } from "@/lib/types";
import { fetchAllMusic, fetchTrendingSongs } from "@/lib/music-api";
import { useToast } from "@/hooks/use-toast";
import { LoadingScreen } from "./LoadingScreen";

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [trending, setTrending] = useState<Song[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying, isFullscreenPlayer, setIsFullscreenPlayer] = useState(false);
  const [playbackQueue, setPlaybackQueue] = useState<Song[]>([]);
  const { toast } = useToast();

  const [user, setUser] = useState<User | null>({
    id: 'user-123',
    name: 'Alex Doe',
    email: 'alex.doe@example.com',
    avatarUrl: 'https://picsum.photos/seed/alex/100/100'
  });

  useEffect(() => {
    async function loadInitialData() {
      try {
        setIsLoading(true);
        const [allSongs, trendingSongs, initialPlaylists] = await Promise.all([
          fetchAllMusic(),
          fetchTrendingSongs(),
          Promise.resolve([
            { id: 'p1', name: 'Chill Vibes', description: 'Relax and unwind with these laid-back tracks.', songIds: [] },
            { id: 'p2', name: 'Workout Fuel', description: 'High-energy beats to power your workout.', songIds: [] },
            { id: 'p3', name: 'Focus Zone', description: 'Instrumental tracks to help you concentrate.', songIds: [] },
            { id: 'p4', name: 'Late Night Drive', description: 'The perfect soundtrack for a drive after dark.', songIds: [] },
          ])
        ]);

        const populatedPlaylists = initialPlaylists.map((pl, index) => ({
          ...pl,
          songIds: allSongs.slice(index * 5, index * 5 + 5).map(s => s.id)
        }));

        setSongs(allSongs);
        setTrending(trendingSongs);
        setPlaylists(populatedPlaylists);
        
      } catch (err) {
        console.error("Error loading initial data:", err);
        toast({
          variant: "destructive",
          title: "Failed to load music",
          description: "There was an error fetching the music library. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadInitialData();
  }, [toast]);

  const togglePlay = useCallback(() => {
    if (currentSong) {
      setIsPlaying((prev) => !prev);
    }
  }, [currentSong]);

  const playSong = useCallback((song: Song, playlist: Song[] = songs) => {
    setCurrentSong(song);
    // If a specific playlist is provided for context (e.g., from a playlist page), use it for the queue.
    // Otherwise, default to all songs.
    setPlaybackQueue(playlist);
    setIsPlaying(true);
  }, [songs]);

  const playNext = useCallback(() => {
    if (!currentSong || playbackQueue.length === 0) return;
    const currentIndex = playbackQueue.findIndex((s) => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % playbackQueue.length;
    setCurrentSong(playbackQueue[nextIndex]);
    setIsPlaying(true);
  }, [currentSong, playbackQueue]);

  const playPrevious = useCallback(() => {
    if (!currentSong || playbackQueue.length === 0) return;
    const currentIndex = playbackQueue.findIndex((s) => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + playbackQueue.length) % playbackQueue.length;
    setCurrentSong(playbackQueue[prevIndex]);
    setIsPlaying(true);
  }, [currentSong, playbackQueue]);

  const addToQueue = useCallback((song: Song) => {
    setPlaybackQueue((prev) => {
      if (prev.find(s => s.id === song.id)) return prev;
      return [...prev, song];
    });
    toast({ title: "Added to queue", description: song.title });
  }, [toast]);
  
  const removeFromQueue = useCallback((songId: string) => {
    setPlaybackQueue((prev) => prev.filter((s) => s.id !== songId));
  }, []);

  const createPlaylist = useCallback((name: string, description: string) => {
    const newPlaylist: Playlist = {
      id: `p${Date.now()}`,
      name,
      description,
      songIds: [],
    };
    setPlaylists((prev) => [...prev, newPlaylist]);
    toast({ title: "Playlist created!", description: `"${name}" has been created.` });
  }, [toast]);

  const addSongToPlaylist = useCallback((playlistId: string, songId:string) => {
    setPlaylists((prev) =>
      prev.map((pl) => {
        if (pl.id === playlistId) {
          if (pl.songIds.includes(songId)) {
            toast({ variant: "default", title: "Already in playlist", description: "This song is already in the playlist." });
            return pl;
          }
          toast({ title: "Song added", description: "Successfully added to your playlist." });
          return { ...pl, songIds: [...pl.songIds, songId] };
        }
        return pl;
      })
    );
  }, [toast]);

  const contextValue: AppContextType = {
    songs,
    playlists,
    setPlaylists,
    trending,
    isLoading,
    currentSong,
    isPlaying,
    playbackQueue,
    setPlaybackQueue,
    playSong,
    togglePlay,
    playNext,
    playPrevious,
    addToQueue,
    removeFromQueue,
    createPlaylist,
    addSongToPlaylist,
    user,
    isFullscreenPlayer,
    setIsFullscreenPlayer,
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used inside AppProvider");
  return ctx;
}
