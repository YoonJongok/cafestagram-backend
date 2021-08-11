import { gql } from "apollo-server-express";
export default gql`
  type CoffeeShop {
    id: String!
    name: String!
    latitude: String
    longitude: String
    user: User!
    photos: [CoffeeShopPhoto]
    categories: [Category]
    createdAt: String
    updatedAt: String
  }

  type CoffeeShopPhoto {
    id: String!
    url: String!
    shop: CoffeeShop
    createdAt: String
    updatedAt: String
  }
`;
