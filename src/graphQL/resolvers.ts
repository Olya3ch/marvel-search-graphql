import {
  getCharacters,
  addComicsToCharacters,
  getCharacterById,
  getComicsByCharacterId,
  getComicById,
  getCharactersByComicId,
} from "../repository/requests";
import { addReview } from "./mutations";

const hello = () => "Hello world!";

const characters = async () => {
  const characters = await getCharacters();
  const results = await addComicsToCharacters(characters);
  return results;
};

const character = async (_: any, args: { id: number }) => {
  const character = await getCharacterById(args.id);
  const comics = await getComicsByCharacterId(args.id);
  return { ...character, ...{ comics: comics } };
};

const comic = async (_: any, args: { id: number }) => {
  const comic = await getComicById(args.id);
  const characters = await getCharactersByComicId(args.id);

  return { ...comic, characters: characters };
};

export const resolvers = {
  Query: { hello, characters, character, comic },
  Mutation: { addReview },
};
