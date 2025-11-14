import { NextResponse } from "next/server";
import { searchPlaylists } from "@/lib/fetchers/playlist";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json(
        { error: "Missing query parameter ?q=" },
        { status: 400 }
      );
    }

    const results = await searchPlaylists(query);

    return NextResponse.json({
      playlists: results,
    });
  } catch (error) {
    console.error("Playlist Search Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch playlists" },
      { status: 500 }
    );
  }
}
