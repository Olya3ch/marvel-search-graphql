import request from "supertest";
import { connectToDatabase } from "../repository/db";
import { createApolloServer } from "../utils";

const queryData = {
  query: `mutation addReview($comicId: Int, $review: String) {
    addReview(comicId: $comicId, review: $review) {
      review
      comicId
    }
  }`,
  variables: { comicId: 99901, review: "Wow" },
};

describe("addReview mutation", () => {
  let server: any, url: string;

  beforeAll(async () => {
    ({ server, url } = await createApolloServer({ port: 0 }));
    connectToDatabase();
  });

  it("should execute mutation", async () => {
    const response = await request(url).post("/").send(queryData);
    expect(response.body.data.addReview).toEqual({
      review: "Wow",
      comicId: 99901,
    });
  });

  afterAll(async () => {
    await server?.stop();
  });
});
