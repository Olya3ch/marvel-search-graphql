import request from "supertest";
import { characters } from "../graphql/resolvers";
import { createApolloServer } from "../utils";

const { objectContaining, arrayContaining } = expect;

const queryData = {
  query: `query Comic($comicId: Int) {
    comic(id: $comicId) {
      title
      characters {
        name
      }
    }
  }
  `,
  variables: { comicId: 99901 },
};

describe("comic resolver", () => {
  let server: any, url: string;

  beforeAll(async () => {
    ({ server, url } = await createApolloServer({ port: 0 }));
  });

  it("shows comic by id", async () => {
    const response = await request(url).post("/").send(queryData);
    expect(response.body.data?.comic).toEqual(
      objectContaining({
        title: "Captain Carter: Woman Out Of Time (Trade Paperback)",
        characters: arrayContaining([
          objectContaining({
            name: "Peggy Carter (Captain Carter)",
          }),
        ]),
      })
    );
  });

  afterAll(async () => {
    await server?.stop();
  });
});
