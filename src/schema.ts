import { graphql, buildSchema } from "graphql";
import axios from "axios";
import { apiUrl, apiCredentials } from "./utils";

export const schema = buildSchema(`
    type Character {
        id: Int
        name: String
        description: String
    }
    type Query {
        hello: String
        character(id: Int): Character
        characters: [Character]
    }
`);

const characters = async () => {
  const { data } = await axios.get(
    apiUrl + "/characters?orderBy=-modified&" + apiCredentials
  );
  return data.data.results;
};

const character = async (args: { id: number }) => {
  const { data } = await axios.get(
    apiUrl + `/characters/${args.id}?` + apiCredentials
  );
  return data.data.results[0];
};

const hello = () => "Hello world!";

export const rootValue = { hello, characters, character };
