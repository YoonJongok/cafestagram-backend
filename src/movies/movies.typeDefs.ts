import { gql } from "apollo-server";

export default gql`
  type Movie {
    id: Int!
    title: String!
    description: String!
  }
  type Query {
    movies: [Movie]
  }
  type Mutation {
    createMovie(title: String!, description: String!): Movie
  }
`;
