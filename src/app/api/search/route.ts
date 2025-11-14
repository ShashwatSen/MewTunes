import { NextResponse } from "next/server";
import { unifiedSearch } from "@/lib/fetchers";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";
  if (!query) return NextResponse.json({ error: "Missing query" }, { status: 400 });

  try {
    const results = await unifiedSearch(query);
    return NextResponse.json({ results });
  } catch (err) {
    console.error("Search API Error:", err);
    return NextResponse.json({ error: "Failed to fetch music" }, { status: 500 });
  }
}
