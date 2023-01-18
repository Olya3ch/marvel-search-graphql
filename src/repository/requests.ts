import axios from "axios";
import { apiUrlConstructor } from "../utils";

export const getCharacters = async () => {
  const { data } = await axios.get(
    apiUrlConstructor("/characters?orderBy=-modified&")
  );
  return data.data.results;
};

export const getComicsByCharacterId = async (id: number) => {
  const { data } = await axios.get(
    apiUrlConstructor(`/characters/${id}/comics?limit=5&`)
  );
  return data.data.results;
};

export const addComicsToCharacters = async (
  charactersObject: Record<string, any>
) => {
  const resultsWithComics = charactersObject.map(
    async (character: Record<string, any>) => {
      const comicsData = getComicsByCharacterId(character.id);
      return { ...character, comics: comicsData };
    }
  );
  return resultsWithComics;
};

export const getCharacterById = async (id: number) => {
  const { data } = await axios.get(apiUrlConstructor(`/characters/${id}?`));
  return data.data.results[0];
};

export const getComicById = async (id: number) => {
  const { data } = await axios.get(apiUrlConstructor(`/comics/${id}?`));
  return data.data.results[0];
};

export const getCharactersByComicId = async (id: number) => {
  const { data } = await axios.get(
    apiUrlConstructor(`/comics/${id}/characters?`)
  );
  return data.data.results;
};
