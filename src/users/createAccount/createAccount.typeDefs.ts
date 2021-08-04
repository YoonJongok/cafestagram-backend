import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createUser(
      email: String!
      password: String!
      username: String!
      name: String!
    ): User
  }
`;
