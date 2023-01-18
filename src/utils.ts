import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ListenOptions } from "net";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/schema";
import { Md5 } from "ts-md5";
import * as dotenv from "dotenv";

dotenv.config();

const ts = new Date().getTime();
const publicKeyApi = process.env.MARVEL_API_PUBLIC_KEY!;
const stringToHash = ts + process.env.MARVEL_API_PRIVATE_KEY! + publicKeyApi;
const hash = Md5.hashStr(stringToHash);

export const apiBaseUrl = "https://gateway.marvel.com:443/v1/public";
export const apiCredentials = `ts=${ts}&apikey=${publicKeyApi}&hash=${hash}`;

export const apiUrlConstructor = (endpoint: String) => {
  return apiBaseUrl + endpoint + apiCredentials;
};

export const createApolloServer = async (
  listenOptions: ListenOptions = { port: 4000 }
) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  const { url } = await startStandaloneServer(server, {
    listen: listenOptions,
  });
  return { server, url };
};
