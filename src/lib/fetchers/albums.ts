export async function searchAlbums(query: string) {
    const mb = await fetch(
      `https://musicbrainz.org/ws/2/release/?query=${encodeURIComponent(
        query
      )}&fmt=json&limit=5`
    ).then((r) => r.json());
  
    const saavn = await fetch(
      `https://saavn.dev/api/search/albums?query=${encodeURIComponent(query)}`
    ).then((r) => r.json());
  
    return {
      musicbrainz: mb.releases || [],
      saavn: saavn.data?.results || [],
    };
  }
  