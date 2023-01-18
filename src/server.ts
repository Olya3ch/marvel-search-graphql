import { connectToDatabase } from "./repository/db";
import { createApolloServer } from "./utils";

connectToDatabase().then(async () => {
  const { url } = await createApolloServer();
  console.log(`🚀 Server ready at ${url}`);
});
