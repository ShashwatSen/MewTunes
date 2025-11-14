const JAMENDO_KEY = process.env.JAMENDO_CLIENT_ID;

export async function fetchFromJamendo(query: string) {
  if (!JAMENDO_KEY) {
    console.warn("Jamendo client ID not found. Skipping Jamendo API call.");
    return [];
  }

  const res = await fetch(
    `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_KEY}&format=json&limit=5&search=${encodeURIComponent(
      query
    )}`
  );
  if (!res.ok) {
    console.error(`Jamendo API error: ${res.status} ${res.statusText}`);
    return [];
  }
  const data = await res.json();

  return data.results.map((track: any) => ({
    id: `jamendo:${track.id}`,
    title: track.name,
    artist: track.artist_name,
    artwork: track.image,
    streamUrl: track.audio,
    duration: track.duration,
    source: "jamendo",
  }));
}
