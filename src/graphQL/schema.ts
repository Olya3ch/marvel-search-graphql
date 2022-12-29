import { buildSchema } from "graphql";
import { addReview } from "./mutations";
import { hello, characters, character, comic } from "./resolvers";

export const schema = buildSchema(`
    type Character {
        id: Int
        name: String
        description: String
        comics: [Comic]
    }
    type Comic {
        id: Int
        title: String
        characters: [Character]
    }
    type Review {
      id: String
      comicId: Int
      review: String
    }
    type Query {
        hello: String
        character(id: Int): Character
        characters: [Character]
        comic(id: Int): Comic
    }
    type Mutation {
      addReview(comicId: Int, review: String): Review
    }
`);

export const rootValue = { hello, characters, character, comic, addReview };
