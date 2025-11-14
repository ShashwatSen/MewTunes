import { NextResponse } from "next/server";
import { fetchFromJamendo } from "@/lib/fetchers/jamendo";
import { fetchFromYouTube } from "@/lib/fetchers/youtube";

export async function GET() {
  try {
    const [jamendoResult, youtubeResult] = await Promise.allSettled([
      fetchFromJamendo("trending"),
      fetchFromYouTube("top hits"),
    ]);

    const jamendo = jamendoResult.status === 'fulfilled' ? jamendoResult.value : [];
    const youtube = youtubeResult.status === 'fulfilled' ? youtubeResult.value : [];

    const combined = [
      ...jamendo.map((t: any) => ({
        id: `jamendo:${t.id}`,
        title: t.title,
        artist: t.artist,
        source: "Jamendo",
        audioSrc: t.streamUrl,
        albumArtUrl: t.artwork,
        duration: t.duration,
      })),
      ...youtube.map((v: any) => ({
        id: `youtube:${v.id}`,
        title: v.snippet.title,
        artist: v.snippet.channelTitle,
        source: "YouTube",
        audioSrc: `https://www.youtube.com/watch?v=${v.id}`,
        albumArtUrl: v.snippet.thumbnails.high.url,
        duration: v.duration || 0,
      })),
    ];

    return NextResponse.json({ data: combined });
  } catch (err: any) {
    console.error("Error fetching trending:", err);
    return NextResponse.json({ error: "Failed to fetch trending" }, { status: 500 });
  }
}
