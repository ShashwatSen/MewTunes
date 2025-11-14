export async function searchPlaylists(query: string) {
    const youtube = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=playlist&q=${encodeURIComponent(
        query
      )}&key=${process.env.YT_KEY}`
    ).then((r) => r.json());
  
    const jamendo = await fetch(
      `https://api.jamendo.com/v3.0/playlists/?client_id=${
        process.env.JAMENDO_CLIENT_ID
      }&format=json&search=${encodeURIComponent(query)}`
    ).then((r) => r.json());
  
    return {
      youtube: youtube.items || [],
      jamendo: jamendo.results || [],
    };
  }
  