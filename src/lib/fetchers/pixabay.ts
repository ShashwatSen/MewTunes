const PIXABAY_KEY = process.env.PIXABAY_API_KEY;

export async function fetchFromPixabay(query: string) {
  if (!PIXABAY_KEY) {
    console.warn("Pixabay API key missing. Skipping Pixabay API call.");
    return [];
  }

  const res = await fetch(
    `https://pixabay.com/api/music/?key=${PIXABAY_KEY}&q=${encodeURIComponent(
      query
    )}&per_page=10`
  );

  if (!res.ok) {
    console.error(`Pixabay API error: ${res.status} ${res.statusText}`);
    return [];
  }

  const data = await res.json();
  return (
    data.hits?.map((track: any) => ({
      id: `pixabay:${track.id}`,
      title: track.title,
      artist: track.user,
      artwork: track.image || "https://picsum.photos/200",
      streamUrl: track.audio,
      duration: track.duration,
      source: "pixabay",
    })) || []
  );
}
