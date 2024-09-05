import { Tilt_Neon } from "next/font/google";

export const allCharactersAdapter = (data) => {
  if (!data || !data.results) return [];

  return data.results.map((character) => ({
    id: character.id,
    name: character.name,
    img: `${character.thumbnail.path}.${character.thumbnail.extension}`,
  }));
};

export const comicsAdapter = (comics) => {
  return comics.map((comic) => ({
    id: comic.id,
    img: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
    title: comic.title,
    dates: comic.dates.map((date) => ({
      type: date.type,
      date: date.date,
    })),
  }));
};
