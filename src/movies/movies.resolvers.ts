import client from "../client";
import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Query: {
    movies: () => client.movie.findMany(),
  },
  Mutation: {
    createMovie: (_, { title, description }) =>
      client.movie.create({
        data: {
          title,
          description,
        },
      }),
  },
};

export default resolvers;
