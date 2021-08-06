import * as jwt from "jsonwebtoken";
import client from "../client";
import { Resolver } from "../types";

type TokenType = string | jwt.JwtPayload;

export const getUser = async (token: string) => {
  try {
    if (!token) {
      return null;
    }
    const verifiedToken: TokenType = await jwt.verify(
      token,
      process.env.SECRET_KEY
    );

    if (verifiedToken["id"]) {
      const user = await client.user.findUnique({
        where: { id: verifiedToken["id"] },
      });
      if (user) {
        return user;
      }
    }
    return null;
  } catch {
    return null;
  }
};

export function protectedResolver(ourResolver: Resolver) {
  return function (root, arg, ctx, info) {
    if (!ctx.loggedInUser) {
      return {
        ok: false,
        error: "Please log in to perform this action.",
      };
    }
    return ourResolver(root, arg, ctx, info);
  };
}
