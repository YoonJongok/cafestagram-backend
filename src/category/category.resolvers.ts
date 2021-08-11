import { Resolvers } from "./../types.d";

const resolvers: Resolvers = {
  Category: {
    totalShops: ({ id }, _, { client }) =>
      client.coffeeShop.count({
        where: {
          categories: {
            some: {
              id,
            },
          },
        },
      }),
  },
};
export default resolvers;
