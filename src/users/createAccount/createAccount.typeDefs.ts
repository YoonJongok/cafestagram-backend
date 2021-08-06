import { gql } from "apollo-server-express";

export default gql`
  type CreateAccountResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createUser(
      email: String!
      password: String!
      username: String!
      name: String!
    ): CreateAccountResult!
  }
`;
