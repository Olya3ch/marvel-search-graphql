import request from "supertest";
import { createTestApolloServer } from "./utils";

const { objectContaining, arrayContaining } = expect;

const queryData = {
  query: `query CharactersList {
  characters {
    name
    description
    id
    comics {
      title
    }
  }
}`,
};

describe("characters resolver", () => {
  let server: any, url: string;

  beforeAll(async () => {
    ({ server, url } = await createTestApolloServer());
  });

  it("shows character list", async () => {
    const response = await request(url).post("/").send(queryData);
    expect(response.body.data?.characters).toEqual(
      arrayContaining([
        objectContaining({
          name: "Peggy Carter (Captain Carter)",
          description: "",
          id: 1017857,
          comics: arrayContaining([
            objectContaining({
              title: "Captain Carter (2022) #4",
            }),
          ]),
        }),
      ])
    );
  });

  afterAll(async () => {
    await server?.stop();
  });
});
