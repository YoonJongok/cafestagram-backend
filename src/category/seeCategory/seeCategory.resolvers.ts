import { Resolvers } from "../../types";
const resolvers: Resolvers = {
  Query: {
    seeCategory: async (_, { id, lastId }, { client }) => {
      return await client.category
        .findUnique({
          where: { id },
        })
        .shops({
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });
    },
  },
};
export default resolvers;
