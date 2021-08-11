import { Resolvers } from "./../types.d";
import client from "../client";
const resolvers: Resolvers = {
  CoffeeShop: {
    user: ({ userId }, _) => {
      return client.user.findUnique({ where: { id: userId } });
    },
    categories: ({ id }, _) => {
      return client.category.findMany({
        where: {
          shops: {
            some: {
              id,
            },
          },
        },
      });
    },
  },
};
export default resolvers;
