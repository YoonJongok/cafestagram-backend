import { Resolvers } from "../../types";
const resolvers: Resolvers = {
  Query: {
    seeCategory: async (_, { lastId }, { client }) =>
      await client.category.findMany({
        select: {
          shops: true,
          name: true,
        },
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && {
          cursor: {
            id: lastId,
          },
        }),
      }),
  },
};
export default resolvers;
