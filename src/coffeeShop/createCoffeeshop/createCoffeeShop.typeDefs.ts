import { gql } from "apollo-server-express";
export default gql`
  type CreateCoffeeShopResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createCoffeeShop(
      name: String!
      latitude: String
      longitude: String
      file: Upload
      caption: String
    ): CreateCoffeeShopResult!
  }
`;
