import express, { Application, Request, Response } from "express";
import { graphqlHTTP } from "express-graphql";
import { rootValue, schema } from "./graphQL/schema";
import { connectToDatabase } from "./repository/db";

const app: Application = express();

app.use(express.json());

connectToDatabase()
  .then(() => {
    app.get("/", (_req: Request, res: Response) => {
      res.send("Hello world");
    });

    app.use(
      "/graphql",
      graphqlHTTP({
        schema: schema,
        rootValue: rootValue,
        graphiql: true,
      })
    );

    app.listen(4001, () => {
      console.log(`Server running on 4001`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
