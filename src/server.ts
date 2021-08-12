require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import * as logger from "morgan";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.util";
import client from "./client";
import { graphqlUploadExpress } from "graphql-upload";
const PORT = process.env.PORT;

async function startApolloServer() {
  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      return { loggedInUser: await getUser(req.headers.token), client };
    },
  });

  await apollo.start();

  const app = express();
  app.use(logger("tiny"));

  app.use(graphqlUploadExpress());
  app.use("/static", express.static("uploads"));

  apollo.applyMiddleware({ app });

  //@ts-ignore
  await new Promise((resolve) => app.listen({ port: PORT }, resolve));

  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
}

startApolloServer();
