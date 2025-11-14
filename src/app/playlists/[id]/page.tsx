"use client";

import { useParams } from 'next/navigation';
import { useAppContext } from '@/components/Providers';
import { SongList } from '@/components/SongList';
import Image from 'next/image';

export default function PlaylistDetailPage() {
  const { id } = useParams();
  const { playlists, songs } = useAppContext();

  const playlist = playlists.find((p) => p.id === id);

  if (!playlist) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-2xl font-bold">Playlist not found</h1>
      </div>
    );
  }

  const playlistSongs = songs.filter((song) => playlist.songIds.includes(song.id));

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8 mb-8">
        <div className="w-48 h-48 md:w-56 md:h-56 relative flex-shrink-0">
            <Image
                data-ai-hint="music playlist cover"
                src={`https://picsum.photos/seed/${playlist.id}/300/300`}
                alt={playlist.name}
                fill
                className="rounded-lg object-cover shadow-2xl"
            />
        </div>
        <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">Playlist</p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter break-words">{playlist.name}</h1>
            <p className="text-muted-foreground mt-2 max-w-prose">{playlist.description}</p>
            <p className="text-sm text-muted-foreground mt-2">{playlistSongs.length} songs</p>
        </div>
      </div>
      <SongList songs={playlistSongs} playlistSongs={playlistSongs}/>
    </div>
  );
}
