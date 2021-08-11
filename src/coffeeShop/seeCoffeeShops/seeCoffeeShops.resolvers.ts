import { Resolvers } from "./../../types.d";
const resolvers: Resolvers = {
  Query: {
    seeCoffeeShops: async (_, { lastId }, { client }) => {
      return await client.coffeeShop.findMany({
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && {
          cursor: {
            id: lastId,
          },
        }),
      });
    },
  },
};
export default resolvers;
