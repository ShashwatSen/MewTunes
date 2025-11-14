import { NextResponse } from "next/server";
import { searchAlbums } from "@/lib/fetchers/albums";

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

    const results = await searchAlbums(query);

    return NextResponse.json({
      albums: results,
    });
  } catch (error) {
    console.error("Album Search Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch albums" },
      { status: 500 }
    );
  }
}
