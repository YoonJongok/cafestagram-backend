import client from "../../client";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeProfile: async (_, { username }) =>
      await client.user.findUnique({
        where: {
          username,
        },
      }),
  },
};

export default resolvers;
