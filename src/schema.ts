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
        characters: [Character]
    }
`);

const characters = async () => {
  const { data } = await axios.get(
    apiUrl + "/characters?orderBy=-modified&" + apiCredentials
  );
  return data.data.results;
};
const hello = () => "Hello world!";

export const rootValue = { hello, characters };
