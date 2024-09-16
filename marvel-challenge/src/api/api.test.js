import {
  fetchCharacters,
  fetchSearchCharacterByName,
  fetchCharacterById,
  fetchCharacterComics,
} from "./marvel";
import {
  comicsAdapter,
  characterAdapter,
  allCharactersAdapter,
} from "./adapter";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Marvel API functions", () => {
  it("should fetch and adapt characters correctly", async () => {
    const mockData = {
      data: {
        results: [
          {
            id: 1,
            name: "Spider-Man",
            thumbnail: {
              path: "http://example.com/spiderman",
              extension: "jpg",
            },
          },
        ],
      },
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const characters = await fetchCharacters();
    expect(characters).toEqual([
      {
        id: 1,
        name: "Spider-Man",
        description: undefined,
        img: "http://example.com/spiderman.jpg",
      },
    ]);
  });

  it("should handle fetch error in fetchCharacters", async () => {
    fetchMock.mockRejectOnce(new Error("Failed to fetch"));

    const characters = await fetchCharacters();
    expect(characters).toEqual([]);
  });

  it("should fetch and adapt characters by search name", async () => {
    const mockData = {
      data: {
        results: [
          {
            id: 2,
            name: "Iron Man",
            thumbnail: { path: "http://example.com/ironman", extension: "jpg" },
          },
        ],
      },
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const characters = await fetchSearchCharacterByName("Iron Man");
    expect(characters).toEqual([
      {
        id: 2,
        name: "Iron Man",
        description: undefined,
        img: "http://example.com/ironman.jpg",
      },
    ]);
  });

  it("should handle fetch error in fetchSearchCharacterByName", async () => {
    fetchMock.mockRejectOnce(new Error("Failed to fetch"));

    const characters = await fetchSearchCharacterByName("Iron Man");
    expect(characters).toEqual([]);
  });

  it("should fetch and adapt character by ID", async () => {
    const mockData = {
      data: {
        results: [
          {
            id: 3,
            name: "Thor",
            description: "God of Thunder",
            thumbnail: { path: "http://example.com/thor", extension: "jpg" },
          },
        ],
      },
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const character = await fetchCharacterById(3);
    expect(character).toEqual({
      id: 3,
      name: "Thor",
      description: "God of Thunder",
      img: "http://example.com/thor.jpg",
    });
  });

  it("should handle fetch error in fetchCharacterById", async () => {
    fetchMock.mockRejectOnce(new Error("Failed to fetch"));

    const character = await fetchCharacterById(3);
    expect(character).toBeNull();
  });

  it("should fetch and return character comics", async () => {
    const mockData = [
      {
        id: 4,
        title: "Thor #1",
        thumbnail: { path: "http://example.com/thor-comic", extension: "jpg" },
        dates: [],
      },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const comics = await fetchCharacterComics(3);
    expect(comics).toEqual([
      {
        id: 4,
        img: "http://example.com/thor-comic.jpg",
        title: "Thor #1",
        dates: [],
      },
    ]);
  });

  it("should handle fetch error in fetchCharacterComics", async () => {
    fetchMock.mockRejectOnce(new Error("Failed to fetch"));

    const comics = await fetchCharacterComics(3);
    expect(comics).toBeNull();
  });
});

describe("Adapters", () => {
  it("should adapt all characters correctly", () => {
    const mockData = {
      results: [
        {
          id: 5,
          name: "Hulk",
          thumbnail: { path: "http://example.com/hulk", extension: "jpg" },
        },
      ],
    };

    const adaptedCharacters = allCharactersAdapter(mockData);
    expect(adaptedCharacters).toEqual([
      {
        id: 5,
        name: "Hulk",
        description: undefined,
        img: "http://example.com/hulk.jpg",
      },
    ]);
  });

  it("should adapt comics correctly", () => {
    const mockComics = [
      {
        id: 6,
        title: "Hulk #1",
        thumbnail: { path: "http://example.com/hulk-comic", extension: "jpg" },
        dates: [],
      },
    ];

    const adaptedComics = comicsAdapter(mockComics);
    expect(adaptedComics).toEqual([
      {
        id: 6,
        img: "http://example.com/hulk-comic.jpg",
        title: "Hulk #1",
        dates: [],
      },
    ]);
  });

  it("should adapt character correctly", () => {
    const mockData = {
      data: {
        results: [
          {
            id: 7,
            name: "Black Widow",
            description: "Spy",
            thumbnail: {
              path: "http://example.com/blackwidow",
              extension: "jpg",
            },
          },
        ],
      },
    };

    const adaptedCharacter = characterAdapter(mockData);
    expect(adaptedCharacter).toEqual({
      id: 7,
      name: "Black Widow",
      description: "Spy",
      img: "http://example.com/blackwidow.jpg",
    });
  });

  it("should handle errors in characterAdapter", () => {
    const invalidData = {};

    const adaptedCharacter = characterAdapter(invalidData);
    expect(adaptedCharacter).toBeNull();
  });
});
