"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Play, Pause, SkipBack, SkipForward, ListMusic, Volume2,
  X, Waves, Shuffle, Repeat
} from "lucide-react";
import { useAppContext } from "./Providers";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger
} from "./ui/sheet";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";

export function MusicPlayer() {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    playNext,
    playPrevious,
    playbackQueue,
    removeFromQueue,
    shuffle,
    toggleShuffle,
    repeatMode,
    toggleRepeat,
    isFullscreenPlayer,
    setIsFullscreenPlayer,
  } = useAppContext();

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isBuffering, setIsBuffering] = useState(false);

  /* ---------------------------------------------------- */
  /* AUDIO SETUP                                           */
  /* ---------------------------------------------------- */

  useEffect(() => {
    if (!audioRef.current || !currentSong) return;
    audioRef.current.src = currentSong.audioSrc;
    audioRef.current.load();
    if (isPlaying) audioRef.current.play();
  }, [currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    isPlaying ? audio.play() : audio.pause();
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => {
      setDuration(audio.duration);
      setIsBuffering(false);
    };

    const updateProgress = () => setProgress(audio.currentTime);
    const onWaiting = () => setIsBuffering(true);
    const onCanPlay = () => setIsBuffering(false);

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("ended", playNext);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("ended", playNext);
    };
  }, [playNext]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const handleSeek = (val: number[]) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = val[0];
    setProgress(val[0]);
  };

  const formatTime = (sec: number) => {
    if (!sec) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  /* ---------------------------------------------------- */
  /* FULLSCREEN PLAYER (SPOTIFY STYLE)                     */
  /* ---------------------------------------------------- */

  const touchStartY = useRef(0);
  const handleTouchStart = (e: any) => (touchStartY.current = e.touches[0].clientY);
  const handleTouchMove = (e: any) => {
    const diff = e.touches[0].clientY - touchStartY.current;
    if (diff > 80) setIsFullscreenPlayer(false);
  };

  if (isFullscreenPlayer && currentSong) {
    return (
      <div
        className="fixed inset-0 z-50 bg-background flex flex-col"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div className="flex items-center justify-between p-4">
          <X className="h-6 w-6" onClick={() => setIsFullscreenPlayer(false)} />
          <p className="font-semibold">{currentSong.title}</p>
          <div className="w-6"></div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6">
          <Image
            src={currentSong.albumArtUrl || "https://picsum.photos/seed/fallback/500"}
            alt={currentSong.title}
            width={500}
            height={500}
            className="rounded-xl object-cover shadow-lg w-64 h-64 xs:w-72 xs:h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 transition-all"
          />

          <div className="text-center">
            <p className="text-xl md:text-2xl font-bold">{currentSong.title}</p>
            <p className="text-sm text-muted-foreground md:text-base">{currentSong.artist}</p>
          </div>

          <Slider value={[progress]} onValueChange={handleSeek} max={duration} className="w-full" />

          <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          <div className="flex items-center justify-center gap-5 md:gap-7">
            <Button variant="ghost" size="icon" onClick={toggleShuffle}>
              <Shuffle className={cn("h-6 w-6", shuffle && "text-primary")} />
            </Button>

            <Button variant="ghost" size="icon" onClick={playPrevious}>
              <SkipBack className="h-7 w-7" />
            </Button>

            <Button
              variant="default"
              size="icon"
              className="h-16 w-16 md:h-20 md:w-20 rounded-full"
              onClick={togglePlay}
            >
              {isBuffering ? (
                <div className="animate-spin border-4 border-t-transparent rounded-full h-8 w-8" />
              ) : isPlaying ? (
                <Pause className="h-10 w-10" />
              ) : (
                <Play className="h-10 w-10" />
              )}
            </Button>

            <Button variant="ghost" size="icon" onClick={playNext}>
              <SkipForward className="h-7 w-7" />
            </Button>

            <Button variant="ghost" size="icon" onClick={toggleRepeat}>
              <Repeat className={cn("h-6 w-6", repeatMode !== "off" && "text-primary")} />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------- */
  /* MINI PLAYER (BOTTOM BAR — SPOTIFY EXACT)              */
  /* ---------------------------------------------------- */

  return (
    <footer className="bg-card/50 border-t backdrop-blur-md relative">
      <audio ref={audioRef} />

      <Slider
        value={[progress]}
        onValueChange={handleSeek}
        max={duration}
        step={1}
        className="absolute -top-1 h-1 w-full [&>span:first-child]:h-1 [&>span:last-child]:hidden"
      />

      <div className="w-full max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* LEFT */}
        <div
          className="flex items-center gap-3 min-w-0"
          onClick={() => setIsFullscreenPlayer(true)}
        >
          {currentSong ? (
            <Image
              src={currentSong.albumArtUrl || "https://picsum.photos/seed/fallback/48/48"}
              alt={currentSong.album || "Album Art"}
              width={48}
              height={48}
              className="rounded-md object-cover h-12 w-12"
            />
          ) : (
            <div className="h-12 w-12 bg-muted rounded-md flex items-center justify-center">
              <ListMusic className="h-6 w-6 text-muted-foreground" />
            </div>
          )}

          <div className="min-w-0">
            <p className="font-semibold text-sm truncate">
              {currentSong?.title || "Not Playing"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {currentSong?.artist || "Select a song"}
            </p>
          </div>
        </div>

        {/* DESKTOP CONTROLS */}
        <div className="hidden md:flex flex-col items-center gap-1">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={playPrevious}>
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button variant="default" size="icon" onClick={togglePlay} disabled={!currentSong}>
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={playNext}>
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>

          <div className="text-xs text-muted-foreground">
            {formatTime(progress)} / {formatTime(duration)}
          </div>
        </div>

        {/* RIGHT (DESKTOP) */}
        <div className="hidden md:flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <ListMusic className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent>
              <SheetHeader>
                <SheetTitle>Playback Queue</SheetTitle>
              </SheetHeader>

              <div className="mt-4 space-y-2">
                {playbackQueue.length > 0 ? (
                  playbackQueue.map((song) => (
                    <Card key={song.id} className="p-2">
                      <CardContent className="flex items-center justify-between p-0">
                        <div className="flex items-center gap-3">
                          <Image
                            src={song.albumArtUrl || "https://picsum.photos/seed/fallback/40/40"}
                            width={40}
                            height={40}
                            className="rounded-md"
                            alt={song.album || ""}
                          />
                          <div>
                            <p className="text-sm font-medium">{song.title}</p>
                            <p className="text-xs text-muted-foreground">{song.artist}</p>
                          </div>
                        </div>

                        <Button variant="ghost" size="icon" onClick={() => removeFromQueue(song.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-10">Queue is empty</p>
                )}
              </div>
            </SheetContent>
          </Sheet>

          {/* Volume — hidden on mobile, visible on desktop */}
          <div className="flex items-center gap-2 w-28">
            <Volume2 className="h-5 w-5 text-muted-foreground" />
            <Slider value={[volume * 100]} max={100} onValueChange={(v) => setVolume(v[0] / 100)} />
          </div>
        </div>

        {/* MOBILE CONTROLS (PLAY + QUEUE) */}
        <div className="md:hidden flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={togglePlay} disabled={!currentSong}>
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <ListMusic className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent>
              <SheetHeader>
                <SheetTitle>Playback Queue</SheetTitle>
              </SheetHeader>

              <div className="mt-4 space-y-2">
                {playbackQueue.length > 0 ? (
                  playbackQueue.map((song) => (
                    <Card key={song.id} className="p-2">
                      <CardContent className="flex items-center justify-between p-0">
                        <div className="flex items-center gap-3">
                          <Image
                            src={song.albumArtUrl || "https://picsum.photos/seed/fallback/40/40"}
                            width={40}
                            height={40}
                            className="rounded-md"
                            alt=""
                          />
                          <div>
                            <p className="text-sm font-medium">{song.title}</p>
                            <p className="text-xs text-muted-foreground">{song.artist}</p>
                          </div>
                        </div>

                        <Button variant="ghost" size="icon" onClick={() => removeFromQueue(song.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-10">Queue is empty</p>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </footer>
  );
}
