import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ListenOptions } from "net";
import { resolvers } from "../graphql/resolvers";
import { typeDefs } from "../graphql/schema";

export const createTestApolloServer = async (
  listenOptions: ListenOptions = { port: 0 }
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
