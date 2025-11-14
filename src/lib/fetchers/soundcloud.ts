const SOUNDCLOUD_KEY = process.env.SOUNDCLOUD_CLIENT_ID;

export async function fetchFromSoundCloud(query: string) {
    if (!SOUNDCLOUD_KEY) {
        console.warn("SoundCloud client ID not found. Skipping SoundCloud API call.");
        return [];
    }

  const res = await fetch(
    `https://api-v2.soundcloud.com/search/tracks?q=${encodeURIComponent(
      query
    )}&client_id=${SOUNDCLOUD_KEY}&limit=5`
  );

  if (!res.ok) {
    console.error(`SoundCloud API error: ${res.status} ${res.statusText}`);
    return [];
  }

  const data = await res.json();

  return data.collection
    .filter((t: any) => t.streamable)
    .map((track: any) => ({
      id: `soundcloud:${track.id}`,
      title: track.title,
      artist: track.user.username,
      artwork: track.artwork_url || track.user.avatar_url,
      streamUrl: `${track.uri}/stream?client_id=${SOUNDCLOUD_KEY}`,
      duration: track.duration / 1000,
      source: "soundcloud",
    }));
}
