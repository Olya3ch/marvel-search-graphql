import axios from "axios";
import { apiUrlConstructor } from "../repository/api";

export const hello = () => "Hello world!";

export const characters = async () => {
  const { data } = await axios.get(
    apiUrlConstructor("/characters?orderBy=-modified&")
  );
  const results = data.data.results;

  const resultsWithComics = results.map(
    async (character: Record<string, any>) => {
      const comicsResponse = await axios.get(
        apiUrlConstructor(`/characters/${character.id}/comics?limit=5&`)
      );
      const comicsData = comicsResponse.data.data.results;

      return { ...character, comics: comicsData };
    }
  );
  return resultsWithComics;
};

export const character = async (args: { id: number }) => {
  const characterResponse = await axios.get(
    apiUrlConstructor(`/characters/${args.id}?`)
  );
  const characterData = characterResponse.data.data.results[0];

  const comicsResponse = await axios.get(
    apiUrlConstructor(`/characters/${args.id}/comics?limit=5&`)
  );
  const comicsData = { comics: comicsResponse.data.data.results };

  const results = { ...characterData, ...comicsData };
  return results;
};

export const comic = async (args: { id: number }) => {
  const { data } = await axios.get(apiUrlConstructor(`/comics/${args.id}?`));
  const comicData = data.data.results[0];
  const characterResponse = await axios.get(
    apiUrlConstructor(`/comics/${args.id}/characters?`)
  );
  const characterData = characterResponse.data.data.results;

  return { ...comicData, characters: characterData };
};
