import { gql } from "apollo-server-express";

export default gql`
  type Category {
    id: String!
    name: String!
    slug: String
    shops: [CoffeeShop]
    totalShops: Int
    createdAt: String
    updatedAt: String
  }
`;
