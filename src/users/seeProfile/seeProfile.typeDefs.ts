import { gql } from "apollo-server";
export default gql`
  type Query {
    users: [User]
    seeProfile(username: String!): User
  }
`;
