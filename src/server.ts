import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { rootValue } from "./graphql/resolvers";
import { schema } from "./graphql/schema";
import { connectToDatabase } from "./repository/db";

connectToDatabase().then(async () => {
  const server = new ApolloServer({
    schema,
    rootValue,
  });

  const { url } = await startStandaloneServer(server);
  console.log(`🚀 Server ready at ${url}`);
});
