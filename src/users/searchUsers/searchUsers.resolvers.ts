import { Resolvers } from "./../../types.d";
const resolvers: Resolvers = {
  Query: {
    searchUsers: async (_, { keyword, lastId }, { client }) => {
      const users = await client.user.findMany({
        where: {
          OR: [
            {
              username: {
                startsWith: keyword.toLowerCase(),
              },
            },
            {
              email: {
                startsWith: keyword.toLowerCase(),
              },
            },
          ],
        },
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      });
      return users;
    },
  },
};

export default resolvers;
