import { gql } from "apollo-server-express";
export default gql`
  scalar Upload
  type EditProfileResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      email: String
      username: String
      password: String
      name: String
      location: String
      avatar: Upload
      githubUsername: String
    ): EditProfileResult!
  }
`;
