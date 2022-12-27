import { graphql, buildSchema } from "graphql";
import axios from "axios";
import { apiUrl, apiCredentials } from "./utils";

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
    }
    type Query {
        hello: String
        character(id: Int): Character
        characters: [Character]
        comic(id: Int): Comic
    }
`);
const hello = () => "Hello world!";

const characters = async () => {
  const { data } = await axios.get(
    apiUrl + "/characters?orderBy=-modified&" + apiCredentials
  );
  const results = data.data.results;

  const resultsWithComics = results.map(
    async (character: Record<string, any>) => {
      const comicsResponse = await axios.get(
        apiUrl + `/characters/${character.id}/comics?limit=5&` + apiCredentials
      );
      const comicsData = comicsResponse.data.data.results;

      return { ...character, comics: comicsData };
    }
  );
  return resultsWithComics;
};

const character = async (args: { id: number }) => {
  const characterResponse = await axios.get(
    apiUrl + `/characters/${args.id}?` + apiCredentials
  );
  const characterData = characterResponse.data.data.results[0];

  const comicsResponse = await axios.get(
    apiUrl + `/characters/${args.id}/comics?limit=5&` + apiCredentials
  );
  const comicsData = { comics: comicsResponse.data.data.results };

  const results = { ...characterData, ...comicsData };
  return results;
};

const comic = async (args: { id: number }) => {
  const { data } = await axios.get(
    apiUrl + `/comics/${args.id}?` + apiCredentials
  );
  return data.data.results[0];
};

export const rootValue = { hello, characters, character, comic };
