"use client";

import { useAppContext } from "@/components/Providers";
import { SongList } from "@/components/SongList";
import { TrendingCarousel } from "@/components/TrendingCarousel";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  const { songs, playlists } = useAppContext();

  const typewriterWords = [
    { text: "Discover" },
    { text: "your" },
    { text: "next" },
    { text: "favorite" },
    { text: "song.", className: "text-primary" },
  ];

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-center text-center">
        <TypewriterEffect words={typewriterWords} />
      </div>

      <TrendingCarousel />

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Featured Playlists</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {playlists.map((playlist) => (
            <Link href={`/playlists/${playlist.id}`} key={playlist.id}>
              <div className="group space-y-2">
                <div className="aspect-square relative bg-muted rounded-lg flex items-center justify-center group-hover:bg-card/60 transition-colors">
                  <Image
                    data-ai-hint="music playlist cover"
                    src={`https://picsum.photos/seed/${playlist.id}/300/300`}
                    alt={playlist.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    className="rounded-lg object-cover"
                  />
                </div>
                <div>
                    <h3 className="font-semibold truncate group-hover:text-primary">{playlist.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{playlist.songIds.length} songs</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <SongList songs={songs} title="Explore Music" />
    </div>
  );
}
