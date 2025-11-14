import { fetchFromJamendo } from "./jamendo";
import { fetchFromSoundCloud } from "./soundcloud";
import { fetchFromYouTube } from "./youtube";
import { fetchFromPixabay } from "./pixabay";
import { fetchFromFMA } from "./fma";
import { fetchFromSaavn } from "./saavn";

import type { Song } from "../types";

export async function unifiedSearch(query: string): Promise<Song[]> {
  const [jamendo, soundcloud, youtube, pixabay, fma, saavn] = await Promise.allSettled([
    fetchFromJamendo(query),
    fetchFromSoundCloud(query),
    fetchFromYouTube(query),
    fetchFromPixabay(query),
    fetchFromFMA(query),
    fetchFromSaavn(query),
  ]);

  const jamendoTracks =
    jamendo.status === "fulfilled"
      ? jamendo.value.map((t: any) => ({
          id: `jamendo:${t.id}`,
          title: t.title,
          artist: t.artist,
          source: "Jamendo",
          audioSrc: t.streamUrl,
          albumArtUrl: t.artwork,
          duration: t.duration,
        }))
      : [];

  const soundcloudTracks =
    soundcloud.status === "fulfilled"
      ? soundcloud.value.map((t: any) => ({
          id: `soundcloud:${t.id}`,
          title: t.title,
          artist: t.artist,
          source: "SoundCloud",
          audioSrc: t.streamUrl,
          albumArtUrl: t.artwork,
          duration: t.duration,
        }))
      : [];

  const youtubeTracks =
    youtube.status === "fulfilled"
      ? youtube.value.map((v: any) => ({
          id: `youtube:${v.id}`,
          title: v.snippet.title,
          artist: v.snippet.channelTitle,
          source: "YouTube",
          audioSrc: `https://www.youtube.com/watch?v=${v.id}`,
          albumArtUrl: v.snippet.thumbnails.high.url,
          duration: 0,
        }))
      : [];

  const pixabayTracks =
    pixabay.status === "fulfilled"
      ? pixabay.value.map((t: any) => ({
          id: `pixabay:${t.id}`,
          title: t.title,
          artist: t.artist,
          source: "Pixabay",
          audioSrc: t.streamUrl,
          albumArtUrl: t.artwork,
          duration: t.duration,
        }))
      : [];

  const fmaTracks =
    fma.status === "fulfilled"
      ? fma.value.map((t: any) => ({
          id: `fma:${t.id}`,
          title: t.title,
          artist: t.artist,
          source: "FMA",
          audioSrc: t.streamUrl,
          albumArtUrl: t.artwork,
          duration: t.duration,
        }))
      : [];

  const saavnTracks =
  saavn.status === "fulfilled"
    ? saavn.value.map((t: any) => ({
        id: t.id,
        title: t.title,
        artist: t.artist,
        source: "Saavn",
        audioSrc: t.audioSrc,
        albumArtUrl: t.albumArtUrl,
        duration: t.duration,
      }))
    : [];


  let allTracks = [
    ...jamendoTracks,
    ...soundcloudTracks,
    ...youtubeTracks,
    ...pixabayTracks,
    ...fmaTracks,
    ...saavnTracks,
  ];

  allTracks = allTracks.filter(
    (t) =>
      t.audioSrc &&
      typeof t.audioSrc === "string" &&
      t.audioSrc.startsWith("http")
  );

  allTracks = allTracks.filter(
    (t, index, self) =>
      index === self.findIndex((x) => x.audioSrc === t.audioSrc)
  );

  allTracks.sort(() => 0.5 - Math.random());

  return allTracks.slice(0, 25);
}
