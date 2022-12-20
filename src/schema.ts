import { graphql, buildSchema } from "graphql";
import axios from "axios";

const OMDBApiURL = `http://www.omdbapi.com/?apikey=8bf835a0`;

export const schema = buildSchema(`
    type Movie {
        Title: String
        Year: String
        imdbID: String
        Poster: String
    }
    type Query {
        hello: String
        searchMovies(movieName: String): [Movie]
    }
`);

const searchMovies = async (args: { movieName: String }) => {
  const { data } = await axios.get(OMDBApiURL + `&s=${args.movieName}`);
  return data.Search;
};
const hello = () => "Hello world!";

export const rootValue = { hello, searchMovies };
