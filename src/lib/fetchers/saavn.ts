// src/lib/fetchers/saavn.ts

export async function fetchFromSaavn(query: string) {
    try {
      const res = await fetch(
        `https://saavn.dev/api/search/songs?query=${encodeURIComponent(query)}`
      );
  
      if (!res.ok) {
        console.error("Saavn API Error:", res.status);
        return [];
      }
  
      const data = await res.json();
      if (!data?.data?.results?.length) return [];
  
      return data.data.results.map((track: any) => {
        // Saavn gives multiple quality URLs — we select the highest.
        const bestQuality =
          track.downloadUrl?.[track.downloadUrl.length - 1]?.url ||
          track.downloadUrl?.[0]?.url ||
          null;
  
        return {
          id: `saavn:${track.id}`,
          title: track.name,
          artist: track.primaryArtists,
          albumArtUrl: track.image?.[2]?.url || track.image?.[0]?.url,
          audioSrc: bestQuality,
          duration: track.duration,
          source: "saavn",
        };
      });
    } catch (err) {
      console.error("Saavn Fetch Error:", err);
      return [];
    }
  }
  