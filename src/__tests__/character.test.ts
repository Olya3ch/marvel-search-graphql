import request from "supertest";
import { createApolloServer } from "../utils";

const { objectContaining, arrayContaining } = expect;

const queryData = {
  query: `query Character($characterId: Int) {
    character(id: $characterId) {
     name
      comics {
        title
      }
    }
  }`,
  variables: { characterId: 1017857 },
};

describe("character resolver", () => {
  let server: any, url: string;

  beforeAll(async () => {
    ({ server, url } = await createApolloServer({ port: 0 }));
  });

  it("shows character by id", async () => {
    const response = await request(url).post("/").send(queryData);
    expect(response.body.data?.character).toEqual(
      objectContaining({
        name: "Peggy Carter (Captain Carter)",
        comics: arrayContaining([
          objectContaining({
            title: "Captain Carter (2022) #4",
          }),
        ]),
      })
    );
  });

  afterAll(async () => {
    await server?.stop();
  });
});
