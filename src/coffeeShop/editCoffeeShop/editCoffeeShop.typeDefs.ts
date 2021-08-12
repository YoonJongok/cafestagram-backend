import { gql } from "apollo-server-express";
export default gql`
  type EditCoffeeShopResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editCoffeeShop(
      id: Int!
      latitude: String
      longitude: String
      file: Upload
      caption: String
    ): EditCoffeeShopResult!
  }
`;
