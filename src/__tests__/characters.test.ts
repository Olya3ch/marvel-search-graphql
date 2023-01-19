import { ApolloServer } from "@apollo/server";
import request from "supertest";
import { createApolloServer } from "../utils";

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
  let server: ApolloServer, url: string;

  beforeAll(async () => {
    ({ server, url } = await createApolloServer({ port: 0 }));
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
