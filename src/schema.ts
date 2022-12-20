import { graphql, buildSchema } from "graphql";

export const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

export const rootValue = { hello: () => "Hello world!" };
