import client from "../../client";
import { Resolvers } from "./../../types.d";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { username, password }) => {
      //find the user with arg.username
      const user = await client.user.findFirst({
        where: {
          username,
        },
      });
      if (!user) {
        return {
          ok: false,
          error: "We could not find this user. Please type the right username",
        };
      }
      //check password with args.password
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: "This was wrong password. Please type the password again",
        };
      }
      //issue a token and send it to the user
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      return {
        ok: true,
        token,
      };
    },
  },
};

export default resolvers;
