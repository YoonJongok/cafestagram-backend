import { processCategories } from "./../coffeeShop.utils";
import { protectedResolver } from "../../users/users.util";
import { Resolvers } from "./../../types.d";

const resolvers: Resolvers = {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (
        _,
        { id, latitude, longitude, caption },
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
          },
        });
        if (!old) {
          return {
            ok: false,
            error: "Coffeeshop not found.",
          };
        }
        await client.coffeeShop.update({
          where: {
            id,
          },
          data: {
            ...(latitude && { latitude }),
            ...(longitude && { longitude }),
            categories: {
              disconnect: old.categories,
              connectOrCreate: processCategories(caption),
            },
          },
        });

        return {
          ok: true,
        };
      }
    ),
  },
};
export default resolvers;
