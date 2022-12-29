import { buildSchema } from "graphql";
import axios from "axios";
import { apiUrlConstructor } from "./api";
import { Review } from "./db";

export const schema = buildSchema(`
    type Character {
        id: Int
        name: String
        description: String
        comics: [Comic]
    }
    type Comic {
        id: Int
        title: String
        characters: [Character]
    }
    type Review {
      id: String
      comicId: Int
      review: String
    }
    type Query {
        hello: String
        character(id: Int): Character
        characters: [Character]
        comic(id: Int): Comic
    }
    type Mutation {
      addReview(comicId: Int, review: String): Review
    }
`);
const hello = () => "Hello world!";

const characters = async () => {
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

const character = async (args: { id: number }) => {
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

const comic = async (args: { id: number }) => {
  const { data } = await axios.get(apiUrlConstructor(`/comics/${args.id}?`));
  const comicData = data.data.results[0];
  const characterResponse = await axios.get(
    apiUrlConstructor(`/comics/${args.id}/characters?`)
  );
  const characterData = characterResponse.data.data.results;

  return { ...comicData, characters: characterData };
};

const addReview = (args: { comicId: number; review: String }) => {
  const review = new Review({
    comicId: args.comicId,
    review: args.review,
  });
  return review.save();
};

export const rootValue = { hello, characters, character, comic, addReview };
