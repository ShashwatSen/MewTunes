export async function fetchFromFMA(query: string) {
    try {
      const res = await fetch(
        `https://freemusicarchive.org/api/trackSearch?q=${encodeURIComponent(query)}&limit=10&format=json`
      );
  
      if (!res.ok) {
        console.error(`FMA API error: ${res.status} ${res.statusText}`);
        return [];
      }
  
      const data = await res.json();
  
      return (
        data.aTracks?.map((track: any) => ({
          id: `fma:${track.track_id}`,
          title: track.track_title,
          artist: track.artist_name,
          artwork: track.track_image_file || "https://picsum.photos/200",
          streamUrl: track.track_file_url,
          duration: Number(track.track_duration) || 0,
          source: "fma",
        })) || []
      );
    } catch (err) {
      console.error("FMA fetch failed:", err);
      return [];
    }
  }
  