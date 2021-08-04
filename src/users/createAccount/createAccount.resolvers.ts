import * as bcrypt from "bcrypt";
import client from "../../client";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    createUser: async (_, { email, password, username, name }) => {
      //check if userbane or email already on DB
      try {
        const existUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              { email },
            ],
          },
        });

        if (existUser) {
          throw new Error("This username or email already taken.");
        }

        const uglyPassword = await bcrypt.hash(password, 10);
        return client.user.create({
          data: {
            email,
            username,
            name,
            password: uglyPassword,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default resolvers;
