import { load } from "cheerio";

export interface IAskForLyrics_return {
  title: string;
  artist: string;
  lyrics: string[];
}

export const askForLyrics = async (
  song: string
): Promise<IAskForLyrics_return> => {
  const response = await fetch(
    `https://www.google.com/search?q=${encodeURIComponent(
      song
    )}+lyrics&ie=UTF-8&tob=true`
  );
  const html = await response.text();
  const $ = load(html);

  const lyrics: string[] = $("div[jsname=WbKHeb]")[0]
    .children.map((i: any) =>
      i.children.map((j: any) => j.children.map((k: any) => k.data))
    )
    .reduce(
      (acum, i) => [...acum, ["\n"], ...i.filter((j: any) => j.length > 0)],
      []
    )
    .map((i: any) => i[0]);

  const nameStuff = $('span[class="yKMVIe"]')?.text();
  const artistsStuff = $('div[class="wx62f PZPZlf x7XAkb"]').text();

  if (lyrics.length === 0) throw new Error("Lyrics not found!");

  return {
    title: nameStuff,
    artist: artistsStuff,
    lyrics: lyrics,
  };
};
