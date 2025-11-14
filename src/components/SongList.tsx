"use client";

import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { useAppContext } from "./Providers";
import type { Song } from "@/lib/types";
import { Plus, Play, MoreHorizontal, Heart, Share2, ListPlus } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent } from "./ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface SongListProps {
  songs: Song[];
  title?: string;
  playlistSongs?: Song[];
  layout?: "table" | "list";
}

const SongItem = ({ song, playlistSongs }: { song: Song; playlistSongs?: Song[] }) => {
  const { playSong, addToQueue, addSongToPlaylist, playlists } = useAppContext();
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: "Action Triggered",
      description: `${action} on "${song.title}"`,
    });
  };

  return (
    <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 group">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <Image
          src={song.albumArtUrl || 'https://picsum.photos/seed/fallback/40/40'}
          alt={song.album || song.title}
          width={40}
          height={40}
          className="rounded-md"
        />
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{song.title}</p>
          <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" onClick={() => playSong(song, playlistSongs)}>
          <Play className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleAction('Share')}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => addToQueue(song)}>
              <ListPlus className="mr-2 h-4 w-4" />
              Add to Queue
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAction('Favorite')}>
              <Heart className="mr-2 h-4 w-4" />
              Favorite
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Plus className="mr-2 h-4 w-4" />
                Add to Playlist
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {playlists.map(p => (
                  <DropdownMenuItem key={p.id} onClick={() => addSongToPlaylist(p.id, song.id)}>
                    {p.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};


export const SongList = React.memo(function SongList({ songs, title, playlistSongs, layout = "table" }: SongListProps) {
  const { playSong, addToQueue, addSongToPlaylist, playlists } = useAppContext();

  if (!songs || songs.length === 0) {
    return <p className="text-muted-foreground text-center py-8">No songs to display.</p>;
  }
  
  const formatDuration = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (layout === "list") {
    return (
      <div className="space-y-2">
        {title && <h2 className="text-2xl font-semibold tracking-tight mb-4">{title}</h2>}
        {songs.map(song => (
          <SongItem key={song.id} song={song} playlistSongs={playlistSongs || songs} />
        ))}
      </div>
    );
  }

  return (
    <div>
      {title && <h2 className="text-2xl font-semibold tracking-tight mb-4">{title}</h2>}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Album</TableHead>
              <TableHead className="text-right">Duration</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {songs.map((song, index) => (
              <TableRow key={song.id} className="group">
                <TableCell className="text-muted-foreground">{index + 1}</TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-4">
                    <Image
                      src={song.albumArtUrl || 'https://picsum.photos/seed/fallback/40/40'}
                      alt={song.album || song.title}
                      width={40}
                      height={40}
                      className="rounded-md hidden sm:block"
                    />
                    <div>
                      <div className="truncate">{song.title}</div>
                      <div className="text-sm text-muted-foreground truncate">{song.artist}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">{song.album}</TableCell>
                <TableCell className="text-right text-muted-foreground">{formatDuration(song.duration || 0)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" onClick={() => playSong(song, playlistSongs || songs)}>
                      <Play className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => addToQueue(song)}>
                          <ListPlus className="mr-2 h-4 w-4" /> Add to Queue
                        </DropdownMenuItem>
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <Plus className="mr-2 h-4 w-4" /> Add to Playlist
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent>
                            {playlists.map(p => (
                              <DropdownMenuItem key={p.id} onClick={() => addSongToPlaylist(p.id, song.id)}>
                                {p.name}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
});
SongList.displayName = 'SongList';
