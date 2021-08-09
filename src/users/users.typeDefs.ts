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
    followers: [User]
    following: [User]
    totalFollowing: Int!
    totalFollowers: Int!
    isFollowing: Boolean!
    isMe: Boolean!
  }
`;
