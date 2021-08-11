import { processCategories } from "./../coffeeShop.utils";
import { protectedResolver } from "../../users/users.util";
import { Resolvers } from "./../../types.d";
const resolvers: Resolvers = {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        { name, longitude, latitude, caption },
        { loggedInUser, client }
      ) => {
        let categoryObj = [];
        if (caption) {
          //parse caption
          //get or create the category
          categoryObj = processCategories(caption);
        }

        //save the coffeeShop with the parsed categories
        //add the coffeeShop to the categories
        return await client.coffeeShop.create({
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
      }
    ),
  },
};

export default resolvers;
