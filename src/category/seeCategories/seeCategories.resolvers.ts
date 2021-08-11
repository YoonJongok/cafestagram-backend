import { Resolvers } from "./../../types.d";
const resolvers: Resolvers = {
  Query: {
    seeCategories: async (_, { lastId }, { client }) =>
      await client.category.findMany({
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
  },
};
export default resolvers;
