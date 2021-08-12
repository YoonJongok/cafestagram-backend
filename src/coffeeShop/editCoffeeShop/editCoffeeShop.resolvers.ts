import { handleUpload, processCategories } from "./../coffeeShop.utils";
import { protectedResolver } from "../../users/users.util";
import { Resolvers } from "./../../types.d";

const resolvers: Resolvers = {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (
        _,
        { id, latitude, longitude, caption, file },
        { loggedInUser, client }
      ) => {
        const old = await client.coffeeShop.findFirst({
          where: {
            id,
            userId: loggedInUser.id,
          },
          include: {
            categories: {
              select: {
                name: true,
              },
            },
            photos: {
              select: {
                url: true,
              },
            },
          },
        });
        if (!old) {
          return {
            ok: false,
            error: "Coffeeshop not found.",
          };
        }
        try {
          await client.coffeeShop.update({
            where: {
              id,
            },
            data: {
              ...(latitude && { latitude }),
              ...(longitude && { longitude }),
              ...(caption && {
                categories: {
                  disconnect: old.categories,
                  connectOrCreate: processCategories(caption),
                },
              }),
            },
          });

          let photoUrl: string = null;
          if (file) {
            photoUrl = await handleUpload(file, loggedInUser.id);
            await client.coffeeShopPhoto.create({
              data: {
                url: photoUrl,
                shop: {
                  connect: {
                    id,
                  },
                },
              },
            });
          }

          return {
            ok: true,
          };
        } catch (error) {
          return {
            ok: false,
            error,
          };
        }
      }
    ),
  },
};
export default resolvers;
