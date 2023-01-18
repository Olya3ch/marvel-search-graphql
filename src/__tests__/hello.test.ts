import request from "supertest";
import { createApolloServer } from "../utils";

const queryData = {
  query: `query hello{
    hello
  }`,
};

describe("hello resolver", () => {
  let server: any, url: string;

  beforeAll(async () => {
    ({ server, url } = await createApolloServer({ port: 0 }));
  });

  it("says hello", async () => {
    const response = await request(url).post("/").send(queryData);
    expect(response.body.data?.hello).toBe("Hello world!");
  });

  afterAll(async () => {
    await server?.stop();
  });
});
