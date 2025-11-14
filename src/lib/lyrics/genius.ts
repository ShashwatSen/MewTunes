import Genius from "genius-lyrics";
const client = new Genius.Client();

export async function fetchLyrics(title: string, artist: string) {
  try {
    const searches = await client.songs.search(`${title} ${artist}`);
    if (!searches.length) return null;

    const song = searches[0];
    const lyrics = await song.lyrics();
    return lyrics || null;
  } catch (err) {
    console.error("Lyrics error:", err);
    return null;
  }
}
