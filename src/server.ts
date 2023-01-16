import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/schema";
import { connectToDatabase } from "./repository/db";

connectToDatabase().then(async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server);
  console.log(`🚀 Server ready at ${url}`);
});
