import { NextResponse } from "next/server";
import { fetchLyrics } from "@/lib/lyrics/genius";

export async function GET(req: Request) {
  const p = new URL(req.url).searchParams;
  const title = p.get("title");
  const artist = p.get("artist");

  if (!title || !artist)
    return NextResponse.json({ error: "Missing params" }, { status: 400 });

  const lyrics = await fetchLyrics(title, artist);
  return NextResponse.json({ lyrics });
}
