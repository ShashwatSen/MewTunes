import { NextResponse } from "next/server";
import { getAllMusic } from "@/lib/music-api";

export async function GET() {
  try {
    const songs = await getAllMusic();
    return NextResponse.json({ data: songs });
  } catch (error) {
    console.error("Error fetching music:", error);
    return NextResponse.json({ error: "Failed to fetch music" }, { status: 500 });
  }
}
