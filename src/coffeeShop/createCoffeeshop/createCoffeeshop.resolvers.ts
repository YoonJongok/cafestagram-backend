import { handleUpload, processCategories } from "./../coffeeShop.utils";
import { protectedResolver } from "../../users/users.util";
import { Resolvers } from "./../../types.d";
const resolvers: Resolvers = {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        { name, longitude, latitude, file, caption },
        { loggedInUser, client }
      ) => {
        try {
          let categoryObj = [];
          if (caption) {
            //parse caption
            //get or create the category
            categoryObj = processCategories(caption);
          }

          //save the coffeeShop with the parsed categories
          //add the coffeeShop to the categories
          const coffeeShop = await client.coffeeShop.create({
            data: {
              name,
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              ...(latitude && { latitude }),
              ...(longitude && { longitude }),
              ...(categoryObj.length > 0 && {
                categories: {
                  connectOrCreate: categoryObj,
                },
              }),
            },
          });
          let photoUrl = null;
          if (file) {
            photoUrl = await handleUpload(file, loggedInUser.id);
            await client.coffeeShopPhoto.create({
              data: {
                url: photoUrl,
                shop: {
                  connect: {
                    id: coffeeShop.id,
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
