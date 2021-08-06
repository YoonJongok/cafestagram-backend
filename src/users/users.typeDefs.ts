import { gql } from "apollo-server";
export default gql`
  type User {
    id: Int!
    email: String!
    username: String!
    name: String
    location: String
    avatar: String
    githubUsername: String
    createdAt: String!
    updatedAt: String!
  }
`;
