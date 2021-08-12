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
    photos: ({ id }, { lastId }, { client }) =>
      client.coffeeShop
        .findUnique({
          where: { id },
        })
        .photos({
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        }),
  },
};
export default resolvers;
