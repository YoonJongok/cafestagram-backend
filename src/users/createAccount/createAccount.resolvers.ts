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
          return {
            ok: false,
            error: "User already exist with this email or username",
          };
        }

        const uglyPassword = await bcrypt.hash(password, 10);
        await client.user.create({
          data: {
            email,
            username,
            name,
            password: uglyPassword,
          },
        });
        return {
          ok: true,
        };
      } catch (error) {
        return {
          ok: false,
          error: "We are sorry, We could not make the account.",
        };
      }
    },
  },
};

export default resolvers;
