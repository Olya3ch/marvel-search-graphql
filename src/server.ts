import express, { Application, Request, Response } from "express";
import { schema, rootValue } from "./schema";
import { graphqlHTTP } from "express-graphql";

const app: Application = express();

app.use(express.json());

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
