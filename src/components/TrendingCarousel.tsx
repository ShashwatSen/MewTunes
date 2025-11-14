"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useAppContext } from "./Providers";
import { Play } from "lucide-react";

export function TrendingCarousel() {
  const { trending, playSong } = useAppContext();

  if (!trending || trending.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">Trending Now</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {trending.map((song) => (
            <CarouselItem key={song.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
              <div className="group relative overflow-hidden rounded-lg">
                <Image
                  data-ai-hint="trending music album art"
                  src={song.albumArtUrl || `https://picsum.photos/seed/${song.id}/300/300`}
                  alt={song.title}
                  width={300}
                  height={300}
                  className="object-cover w-full aspect-square transition-transform group-hover:scale-105"
                />
                <div 
                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => playSong(song, trending)}
                >
                  <button className="bg-primary text-primary-foreground rounded-full p-3">
                    <Play className="h-6 w-6 fill-current" />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <p className="font-bold text-white text-sm truncate">{song.title}</p>
                    <p className="text-xs text-white/80 truncate">{song.artist}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
}
