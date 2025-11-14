const AUDIO_DB_KEY = process.env.AUDIO_DB_KEY!;

export async function fetchArtistMeta(artist: string) {
  const res = await fetch(
    `https://www.theaudiodb.com/api/v1/json/${AUDIO_DB_KEY}/search.php?s=${encodeURIComponent(
      artist
    )}`
  );
  const data = await res.json();
  return data?.artists?.[0] || null;
}
