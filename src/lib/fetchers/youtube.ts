const YT_KEY = process.env.YOUTUBE_API_KEY;

export async function fetchFromYouTube(query: string) {
  if (!YT_KEY) {
    console.warn("YouTube API key not found. Skipping YouTube API call.");
    return [];
  }

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoCategoryId=10&maxResults=5&q=${encodeURIComponent(
      query
    )}&key=${YT_KEY}`
  );

  if (!res.ok) {
    console.error(`YouTube API error: ${res.status} ${res.statusText}`);
    return [];
  }

  const data = await res.json();

  if (!data.items) {
    console.warn("No items found in YouTube response for query:", query);
    return [];
  }

  return data.items.map((v: any) => ({
    id: `youtube:${v.id.videoId}`,
    title: v.snippet.title,
    artist: v.snippet.channelTitle,
    artwork: v.snippet.thumbnails.medium.url,
    streamUrl: `https://www.youtube.com/embed/${v.id.videoId}`,
    source: "youtube",
    snippet: v.snippet
  }));
}
