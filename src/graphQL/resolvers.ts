import {
  getCharacters,
  addComicsToCharacters,
  getCharacterById,
  getComicsByCharacterId,
  getComicById,
  getCharactersByComicId,
} from "../repository/requests";

export const hello = () => "Hello world!";

export const characters = async () => {
  const characters = await getCharacters();
  const results = await addComicsToCharacters(characters);
  return results;
};

export const character = async (args: { id: number }) => {
  const character = await getCharacterById(args.id);
  const comics = await getComicsByCharacterId(args.id);
  return { ...character, ...{ comics: comics } };
};

export const comic = async (args: { id: number }) => {
  const comic = await getComicById(args.id);
  const characters = await getCharactersByComicId(args.id);

  return { ...comic, characters: characters };
};
