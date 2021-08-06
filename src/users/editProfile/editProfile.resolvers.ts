import * as bcrypt from "bcrypt";
import * as fs from "fs";
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
          const { filename, createReadStream } = await avatar;
          const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
          const readStream = createReadStream();
          const writeStream = fs.createWriteStream(
            process.cwd() + "/uploads/" + newFilename
          );
          readStream.pipe(writeStream);
          avatarUrl = `http://localhost:4000/static/${newFilename}`;
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
