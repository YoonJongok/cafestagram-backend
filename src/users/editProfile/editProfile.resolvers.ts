import { handleUpload } from "./../../coffeeShop/coffeeShop.utils";
import * as bcrypt from "bcrypt";
import { GraphQLUpload } from "graphql-upload";
import { protectedResolver } from "../users.util";
import { Resolvers } from "./../../types.d";

const resolvers: Resolvers = {
  //@ts-ignore
  Upload: GraphQLUpload,
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        {
          email,
          username,
          password: newPassword,
          name,
          location,
          avatar,
          githubUsername,
        },
        { loggedInUser, client }
      ) => {
        let avatarUrl = null;

        if (avatar) {
          avatarUrl = await handleUpload(avatar, loggedInUser.id);
        }

        let uglyPassword = null;
        if (newPassword) {
          uglyPassword = await bcrypt.hash(newPassword, 10);
        }

        const updatedUser = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            email,
            username,
            name,
            location,
            githubUsername,
            ...(avatarUrl && { avatar: avatarUrl }),
            ...(uglyPassword && { password: uglyPassword }),
          },
        });
        if (updatedUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Could not update profile.",
          };
        }
      }
    ),
  },
};
export default resolvers;
