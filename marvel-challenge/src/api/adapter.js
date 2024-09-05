export const allCharactersAdapter = (data) => {
  if (!data || !data.results) return [];

  return data.results.map((character) => ({
    id: character.id,
    description: character.description,
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

export const characterAdapter = (data) => {
  console.log("Full data:", data);

  // Asegúrate de que data.data.results existe y tiene elementos
  if (
    !data ||
    !data.data ||
    !data.data.results ||
    data.data.results.length === 0
  ) {
    console.error("No results found.");
    return null;
  }

  const character = data.data.results[0];

  console.log("Character data:", character);

  if (!character) {
    console.error("Character is undefined.");
    return null;
  }

  // Asegúrate de que la propiedad thumbnail existe
  if (!character.thumbnail) {
    console.error("Character thumbnail is undefined.");
    return null;
  }

  const { path, extension } = character.thumbnail;

  // Verifica si path y extension están definidos
  if (!path || !extension) {
    console.error("Thumbnail path or extension is missing.");
    return null;
  }

  return {
    id: character.id,
    name: character.name,
    description: character.description,
    img: `${path}.${extension}`,
  };
};
